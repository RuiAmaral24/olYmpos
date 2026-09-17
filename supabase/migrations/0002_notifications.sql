create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  type text not null,
  actor_user_id uuid references auth.users(id) on delete set null,
  title text not null,
  body text,
  target_url text,
  related_entity_type text,
  related_entity_id uuid,
  payload jsonb not null default '{}'::jsonb,
  dedupe_key text,
  read_at timestamptz,
  created_at timestamptz not null default now(),
  constraint notifications_type_not_blank check (btrim(type) <> ''),
  constraint notifications_title_not_blank check (btrim(title) <> ''),
  constraint notifications_target_internal check (
    target_url is null
    or (target_url like '/%' and target_url not like '//%')
  )
);

create index if not exists notifications_user_created_at_idx
  on public.notifications(user_id, created_at desc);

create index if not exists notifications_user_unread_idx
  on public.notifications(user_id, created_at desc)
  where read_at is null;

create unique index if not exists notifications_user_dedupe_key_idx
  on public.notifications(user_id, dedupe_key)
  where dedupe_key is not null;

alter table public.notifications enable row level security;

grant select on public.notifications to authenticated;
grant insert on public.notifications to service_role;

create policy "Users can view their own notifications"
  on public.notifications for select
  using (auth.uid() = user_id);

create or replace function public.mark_notification_read(notification_id uuid)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.notifications
  set read_at = now()
  where id = notification_id
    and user_id = auth.uid()
    and read_at is null;

  return found;
end;
$$;

create or replace function public.mark_all_notifications_read()
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  updated_count integer;
begin
  update public.notifications
  set read_at = now()
  where user_id = auth.uid()
    and read_at is null;

  get diagnostics updated_count = row_count;
  return updated_count;
end;
$$;

revoke all on function public.mark_notification_read(uuid) from public;
revoke all on function public.mark_all_notifications_read() from public;
grant execute on function public.mark_notification_read(uuid) to authenticated;
grant execute on function public.mark_all_notifications_read() to authenticated;
