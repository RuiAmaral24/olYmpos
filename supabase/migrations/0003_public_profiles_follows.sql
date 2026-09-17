-- Authenticated community profiles and follow relationships.

create or replace view public.public_profiles
with (security_barrier = true, security_invoker = false)
as
select
  id,
  username,
  full_name,
  bio,
  avatar_url,
  created_at
from public.profiles;

revoke all on public.public_profiles from public;
revoke all on public.public_profiles from anon;
grant select on public.public_profiles to authenticated;

-- Preserve existing usernames. Add case-insensitive uniqueness only when the
-- current data proves that doing so is non-destructive.
do $$
begin
  if exists (
    select lower(username)
    from public.profiles
    group by lower(username)
    having count(*) > 1
  ) then
    raise warning 'Skipped profiles_username_lower_unique because case-insensitive username collisions exist.';
  else
    create unique index if not exists profiles_username_lower_unique
      on public.profiles (lower(username));
  end if;
end;
$$;

-- Existing legacy values remain untouched; new and changed usernames must be
-- safe as a single URL segment and match the application validation.
alter table public.profiles
  add constraint profiles_username_route_safe
  check (username ~ '^[A-Za-z0-9_-]{3,30}$') not valid;

create table public.follows (
  follower_id uuid not null references public.profiles(id) on delete cascade,
  followed_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (follower_id, followed_id),
  constraint follows_prevent_self_follow check (follower_id <> followed_id)
);

create index follows_followed_created_at_idx
  on public.follows (followed_id, created_at desc);

alter table public.follows enable row level security;

grant select, insert, delete on public.follows to authenticated;

create policy "Authenticated users can view follows"
  on public.follows for select
  to authenticated
  using (true);

create policy "Users can create their own follows"
  on public.follows for insert
  to authenticated
  with check (
    auth.uid() = follower_id
    and follower_id <> followed_id
  );

create policy "Users can delete their own follows"
  on public.follows for delete
  to authenticated
  using (auth.uid() = follower_id);

create or replace function public.notify_new_follow()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  actor_username text;
  actor_name text;
  actor_target text;
begin
  select
    profiles.username,
    coalesce(nullif(btrim(profiles.full_name), ''), '@' || profiles.username)
  into actor_username, actor_name
  from public.profiles
  where profiles.id = new.follower_id;

  if actor_username is null then
    return new;
  end if;

  actor_target := case
    when actor_username ~ '^[A-Za-z0-9_-]{3,30}$'
      then '/users/' || actor_username
    else null
  end;

  insert into public.notifications (
    user_id,
    actor_user_id,
    type,
    title,
    body,
    target_url,
    related_entity_type,
    related_entity_id,
    payload
  )
  values (
    new.followed_id,
    new.follower_id,
    'follow',
    actor_name || ' started following you',
    null,
    actor_target,
    'profile',
    new.follower_id,
    jsonb_build_object('username', actor_username)
  );

  return new;
end;
$$;

revoke all on function public.notify_new_follow() from public;

create trigger follows_create_notification
  after insert on public.follows
  for each row
  execute function public.notify_new_follow();
