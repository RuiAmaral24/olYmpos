-- Privacy-aware profiles, follow requests, and controlled social access.

alter table public.profiles
  add column if not exists profile_visibility text not null default 'public';

alter table public.profiles
  drop constraint if exists profiles_profile_visibility_check;

alter table public.profiles
  add constraint profiles_profile_visibility_check
  check (profile_visibility in ('public', 'private'));

create or replace view public.public_profiles
with (security_barrier = true, security_invoker = false)
as
select id, username, full_name, avatar_url, created_at, profile_visibility
from public.profiles;

revoke all on public.public_profiles from public;
revoke all on public.public_profiles from anon;
grant select on public.public_profiles to authenticated;

create table if not exists public.follow_requests (
  requester_id uuid not null references public.profiles(id) on delete cascade,
  target_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (requester_id, target_id),
  constraint follow_requests_prevent_self_request check (requester_id <> target_id)
);

create index if not exists follow_requests_target_created_at_idx
  on public.follow_requests (target_id, created_at desc);

alter table public.follow_requests enable row level security;
revoke all on public.follow_requests from public, anon, authenticated;
grant select, delete on public.follow_requests to authenticated;

drop policy if exists "Authenticated users can view follows" on public.follows;
drop policy if exists "Users can create their own follows" on public.follows;
drop policy if exists "Users can delete their own follows" on public.follows;

revoke insert, update on public.follows from authenticated;
grant select, delete on public.follows to authenticated;

create policy "Users can view participating follows"
  on public.follows for select to authenticated
  using (auth.uid() = follower_id or auth.uid() = followed_id);

create policy "Users can delete their own follows"
  on public.follows for delete to authenticated
  using (auth.uid() = follower_id);

create policy "Users can view participating requests"
  on public.follow_requests for select to authenticated
  using (auth.uid() = requester_id or auth.uid() = target_id);

create policy "Requesters can cancel requests"
  on public.follow_requests for delete to authenticated
  using (auth.uid() = requester_id);

create or replace function public.follow_relationship(viewer_id uuid, target_id uuid)
returns text
language sql
stable
security definer
set search_path = public
as $$
  select case
    when viewer_id is null then 'none'
    when viewer_id = target_id then 'self'
    when exists (select 1 from public.follows where follower_id = viewer_id and followed_id = target_id) then 'following'
    when exists (select 1 from public.follow_requests where requester_id = viewer_id and follow_requests.target_id = follow_relationship.target_id) then 'requested'
    else 'none'
  end;
$$;

revoke all on function public.follow_relationship(uuid, uuid) from public;

create or replace function public.get_profile_for_viewer(profile_username text)
returns table (
  id uuid, username text, full_name text, bio text, avatar_url text,
  created_at timestamptz, profile_visibility text, relationship text,
  can_view_private_content boolean, followers_count bigint, following_count bigint
)
language sql
stable
security definer
set search_path = public
as $$
  select p.id, p.username, p.full_name,
    case when p.profile_visibility = 'public' or p.id = auth.uid()
      or exists (select 1 from public.follows f where f.follower_id = auth.uid() and f.followed_id = p.id)
      then p.bio else null end,
    p.avatar_url, p.created_at, p.profile_visibility,
    public.follow_relationship(auth.uid(), p.id),
    (p.profile_visibility = 'public' or p.id = auth.uid()
      or exists (select 1 from public.follows f where f.follower_id = auth.uid() and f.followed_id = p.id)),
    (select count(*) from public.follows f where f.followed_id = p.id),
    (select count(*) from public.follows f where f.follower_id = p.id)
  from public.profiles p
  where lower(p.username) = lower(btrim(profile_username))
  limit 1;
$$;

create or replace function public.discover_profiles(search_query text default '', result_limit integer default 20)
returns table (
  id uuid, username text, full_name text, bio text, avatar_url text,
  created_at timestamptz, profile_visibility text, relationship text,
  can_view_private_content boolean, followers_count bigint, following_count bigint
)
language sql
stable
security definer
set search_path = public
as $$
  select p.id, p.username, p.full_name,
    case when p.profile_visibility = 'public' or p.id = auth.uid()
      or exists (select 1 from public.follows f where f.follower_id = auth.uid() and f.followed_id = p.id)
      then p.bio else null end,
    p.avatar_url, p.created_at, p.profile_visibility,
    public.follow_relationship(auth.uid(), p.id),
    (p.profile_visibility = 'public' or p.id = auth.uid()
      or exists (select 1 from public.follows f where f.follower_id = auth.uid() and f.followed_id = p.id)),
    (select count(*) from public.follows f where f.followed_id = p.id),
    (select count(*) from public.follows f where f.follower_id = p.id)
  from public.profiles p
  where btrim(coalesce(search_query, '')) = ''
    or p.username ilike '%' || replace(replace(replace(btrim(search_query), '\\', '\\\\'), '%', '\\%'), '_', '\\_') || '%' escape '\'
    or coalesce(p.full_name, '') ilike '%' || replace(replace(replace(btrim(search_query), '\\', '\\\\'), '%', '\\%'), '_', '\\_') || '%' escape '\'
  order by p.created_at desc
  limit least(greatest(coalesce(result_limit, 20), 1), 50);
$$;

create or replace function public.get_profile_social_list(
  profile_id uuid, list_kind text, page_limit integer default 20, page_offset integer default 0
)
returns table (
  allowed boolean, id uuid, username text, full_name text, bio text,
  avatar_url text, created_at timestamptz, profile_visibility text,
  relationship text, can_view_private_content boolean, followers_count bigint,
  following_count bigint, relationship_created_at timestamptz
)
language plpgsql
stable
security definer
set search_path = public
as $$
declare access_allowed boolean;
begin
  if list_kind not in ('followers', 'following') then
    raise exception 'Invalid social list kind';
  end if;

  select p.profile_visibility = 'public' or p.id = auth.uid()
    or exists (select 1 from public.follows f where f.follower_id = auth.uid() and f.followed_id = p.id)
  into access_allowed from public.profiles p where p.id = profile_id;

  if coalesce(access_allowed, false) = false then
    return query select false, null::uuid, null::text, null::text, null::text,
      null::text, null::timestamptz, null::text, null::text, false,
      0::bigint, 0::bigint, null::timestamptz;
    return;
  end if;

  return query
  with selected as (
    select case when list_kind = 'followers' then f.follower_id else f.followed_id end user_id,
      f.created_at relation_created_at
    from public.follows f
    where (list_kind = 'followers' and f.followed_id = profile_id)
       or (list_kind = 'following' and f.follower_id = profile_id)
    order by f.created_at desc
    limit least(greatest(coalesce(page_limit, 20), 1), 50)
    offset greatest(coalesce(page_offset, 0), 0)
  )
  select true, p.id, p.username, p.full_name,
    case when p.profile_visibility = 'public' or p.id = auth.uid()
      or exists (select 1 from public.follows vf where vf.follower_id = auth.uid() and vf.followed_id = p.id)
      then p.bio else null end,
    p.avatar_url, p.created_at, p.profile_visibility,
    public.follow_relationship(auth.uid(), p.id),
    (p.profile_visibility = 'public' or p.id = auth.uid()
      or exists (select 1 from public.follows vf where vf.follower_id = auth.uid() and vf.followed_id = p.id)),
    (select count(*) from public.follows cf where cf.followed_id = p.id),
    (select count(*) from public.follows cf where cf.follower_id = p.id),
    selected.relation_created_at
  from selected join public.profiles p on p.id = selected.user_id
  order by selected.relation_created_at desc;
end;
$$;

create or replace function public.follow_or_request(target_id uuid)
returns text
language plpgsql
security definer
set search_path = public
as $$
declare requester uuid := auth.uid(); visibility text;
begin
  if requester is null then raise exception 'Authentication required'; end if;
  if requester = target_id then raise exception 'You cannot follow yourself'; end if;
  select profile_visibility into visibility from public.profiles where id = target_id for update;
  if not found then raise exception 'Profile not found'; end if;
  if exists (select 1 from public.follows where follower_id = requester and followed_id = target_id) then return 'following'; end if;
  if visibility = 'public' then
    delete from public.follow_requests where requester_id = requester and follow_requests.target_id = follow_or_request.target_id;
    insert into public.follows(follower_id, followed_id) values (requester, target_id) on conflict do nothing;
    return 'following';
  end if;
  insert into public.follow_requests(requester_id, target_id) values (requester, target_id) on conflict do nothing;
  return 'requested';
end;
$$;

create or replace function public.cancel_follow_request(target_id uuid)
returns boolean language sql security definer set search_path = public as $$
  delete from public.follow_requests where requester_id = auth.uid() and follow_requests.target_id = cancel_follow_request.target_id returning true;
$$;

create or replace function public.unfollow_user(target_id uuid)
returns boolean language sql security definer set search_path = public as $$
  delete from public.follows where follower_id = auth.uid() and followed_id = target_id returning true;
$$;

create or replace function public.accept_follow_request(requester_id uuid)
returns boolean
language plpgsql security definer set search_path = public as $$
declare target uuid := auth.uid(); actor_username text; actor_name text;
begin
  if target is null then raise exception 'Authentication required'; end if;
  perform 1 from public.follow_requests where follow_requests.requester_id = accept_follow_request.requester_id and target_id = target for update;
  if not found then return false; end if;
  insert into public.follows(follower_id, followed_id) values (requester_id, target) on conflict do nothing;
  delete from public.follow_requests where follow_requests.requester_id = accept_follow_request.requester_id and target_id = target;
  select username, coalesce(nullif(btrim(full_name), ''), '@' || username) into actor_username, actor_name from public.profiles where id = target;
  insert into public.notifications(user_id, actor_user_id, type, title, target_url, related_entity_type, related_entity_id, payload)
  values (requester_id, target, 'follow_request_accepted', actor_name || ' accepted your follow request',
    case when actor_username ~ '^[A-Za-z0-9_-]{3,30}$' then '/users/' || actor_username end,
    'profile', target, jsonb_build_object('username', actor_username));
  return true;
end;
$$;

create or replace function public.reject_follow_request(requester_id uuid)
returns boolean language sql security definer set search_path = public as $$
  delete from public.follow_requests where follow_requests.requester_id = reject_follow_request.requester_id and target_id = auth.uid() returning true;
$$;

create or replace function public.set_profile_visibility(new_visibility text)
returns text
language plpgsql security definer set search_path = public as $$
declare owner_id uuid := auth.uid(); request record; actor_username text; actor_name text;
begin
  if owner_id is null then raise exception 'Authentication required'; end if;
  if new_visibility not in ('public', 'private') then raise exception 'Invalid profile visibility'; end if;
  update public.profiles set profile_visibility = new_visibility where id = owner_id;
  if not found then raise exception 'Profile not found'; end if;
  if new_visibility = 'public' then
    select username, coalesce(nullif(btrim(full_name), ''), '@' || username) into actor_username, actor_name from public.profiles where id = owner_id;
    for request in select requester_id from public.follow_requests where target_id = owner_id for update loop
      insert into public.follows(follower_id, followed_id) values (request.requester_id, owner_id) on conflict do nothing;
      insert into public.notifications(user_id, actor_user_id, type, title, target_url, related_entity_type, related_entity_id, payload)
      values (request.requester_id, owner_id, 'follow_request_accepted', actor_name || ' accepted your follow request',
        case when actor_username ~ '^[A-Za-z0-9_-]{3,30}$' then '/users/' || actor_username end,
        'profile', owner_id, jsonb_build_object('username', actor_username));
    end loop;
    delete from public.follow_requests where target_id = owner_id;
  end if;
  return new_visibility;
end;
$$;

create or replace function public.get_follow_requests(request_kind text default 'incoming')
returns table (
  id uuid, username text, full_name text, avatar_url text, created_at timestamptz,
  profile_visibility text, requested_at timestamptz
)
language sql stable security definer set search_path = public as $$
  select p.id, p.username, p.full_name, p.avatar_url, p.created_at, p.profile_visibility, r.created_at
  from public.follow_requests r
  join public.profiles p on p.id = case when request_kind = 'incoming' then r.requester_id else r.target_id end
  where (request_kind = 'incoming' and r.target_id = auth.uid())
     or (request_kind = 'outgoing' and r.requester_id = auth.uid())
  order by r.created_at desc;
$$;

create or replace function public.notify_new_follow()
returns trigger language plpgsql security definer set search_path = public as $$
declare actor_username text; actor_name text; actor_target text;
begin
  if exists (select 1 from public.follow_requests where requester_id = new.follower_id and target_id = new.followed_id) then return new; end if;
  select username, coalesce(nullif(btrim(full_name), ''), '@' || username) into actor_username, actor_name from public.profiles where id = new.follower_id;
  if actor_username is null then return new; end if;
  actor_target := case when actor_username ~ '^[A-Za-z0-9_-]{3,30}$' then '/users/' || actor_username end;
  insert into public.notifications(user_id, actor_user_id, type, title, target_url, related_entity_type, related_entity_id, payload)
  values (new.followed_id, new.follower_id, 'follow', actor_name || ' started following you', actor_target, 'profile', new.follower_id, jsonb_build_object('username', actor_username));
  return new;
end;
$$;

create or replace function public.notify_new_follow_request()
returns trigger language plpgsql security definer set search_path = public as $$
declare actor_username text; actor_name text;
begin
  select username, coalesce(nullif(btrim(full_name), ''), '@' || username) into actor_username, actor_name from public.profiles where id = new.requester_id;
  insert into public.notifications(user_id, actor_user_id, type, title, target_url, related_entity_type, related_entity_id, payload)
  values (new.target_id, new.requester_id, 'follow_request', actor_name || ' requested to follow you', '/requests', 'profile', new.requester_id, jsonb_build_object('username', actor_username));
  return new;
end;
$$;

drop trigger if exists follow_requests_create_notification on public.follow_requests;
create trigger follow_requests_create_notification after insert on public.follow_requests
for each row execute function public.notify_new_follow_request();

revoke all on function public.get_profile_for_viewer(text) from public;
revoke all on function public.discover_profiles(text, integer) from public;
revoke all on function public.get_profile_social_list(uuid, text, integer, integer) from public;
revoke all on function public.follow_or_request(uuid) from public;
revoke all on function public.cancel_follow_request(uuid) from public;
revoke all on function public.unfollow_user(uuid) from public;
revoke all on function public.accept_follow_request(uuid) from public;
revoke all on function public.reject_follow_request(uuid) from public;
revoke all on function public.set_profile_visibility(text) from public;
revoke all on function public.get_follow_requests(text) from public;
revoke all on function public.notify_new_follow_request() from public;

grant execute on function public.get_profile_for_viewer(text) to authenticated;
grant execute on function public.discover_profiles(text, integer) to authenticated;
grant execute on function public.get_profile_social_list(uuid, text, integer, integer) to authenticated;
grant execute on function public.follow_or_request(uuid) to authenticated;
grant execute on function public.cancel_follow_request(uuid) to authenticated;
grant execute on function public.unfollow_user(uuid) to authenticated;
grant execute on function public.accept_follow_request(uuid) to authenticated;
grant execute on function public.reject_follow_request(uuid) to authenticated;
grant execute on function public.set_profile_visibility(text) to authenticated;
grant execute on function public.get_follow_requests(text) to authenticated;
