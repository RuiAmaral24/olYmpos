-- Phase 2 foundation schema for olYmpos.
-- Run this in your Supabase project before replacing mock data with CRUD.

create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text not null unique,
  full_name text,
  bio text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.library_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  category text not null check (category in ('anime', 'movie', 'game')),
  status text not null check (
    status in ('planned', 'watching', 'playing', 'completed', 'paused', 'dropped')
  ),
  rating numeric(3, 1) check (rating is null or (rating >= 0 and rating <= 10)),
  is_favorite boolean not null default false,
  cover_url text,
  year integer,
  description text,
  metadata_json jsonb not null default '{}'::jsonb,
  progress_json jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  library_item_id uuid not null references public.library_items(id) on delete cascade,
  content text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists library_items_user_id_idx
  on public.library_items(user_id);

create index if not exists library_items_user_category_status_idx
  on public.library_items(user_id, category, status);

create index if not exists reviews_user_id_idx
  on public.reviews(user_id);

create index if not exists reviews_library_item_id_idx
  on public.reviews(library_item_id);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_set_updated_at
  before update on public.profiles
  for each row
  execute function public.set_updated_at();

create trigger library_items_set_updated_at
  before update on public.library_items
  for each row
  execute function public.set_updated_at();

create trigger reviews_set_updated_at
  before update on public.reviews
  for each row
  execute function public.set_updated_at();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  base_username text;
  profile_username text;
begin
  base_username := coalesce(
    nullif(new.raw_user_meta_data ->> 'username', ''),
    split_part(new.email, '@', 1),
    'olympos-user'
  );

  profile_username := case
    when exists (
      select 1
      from public.profiles
      where username = base_username
    )
      then base_username || '-' || substr(new.id::text, 1, 8)
    else base_username
  end;

  insert into public.profiles (id, username, full_name)
  values (
    new.id,
    profile_username,
    nullif(new.raw_user_meta_data ->> 'full_name', '')
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.library_items enable row level security;
alter table public.reviews enable row level security;

create policy "Users can view their own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

create policy "Users can insert their own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "Users can view their own library items"
  on public.library_items for select
  using (auth.uid() = user_id);

create policy "Users can insert their own library items"
  on public.library_items for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own library items"
  on public.library_items for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can delete their own library items"
  on public.library_items for delete
  using (auth.uid() = user_id);

create policy "Users can view their own reviews"
  on public.reviews for select
  using (auth.uid() = user_id);

create policy "Users can insert their own reviews"
  on public.reviews for insert
  with check (
    auth.uid() = user_id
    and exists (
      select 1
      from public.library_items
      where library_items.id = reviews.library_item_id
        and library_items.user_id = auth.uid()
    )
  );

create policy "Users can update their own reviews"
  on public.reviews for update
  using (auth.uid() = user_id)
  with check (
    auth.uid() = user_id
    and exists (
      select 1
      from public.library_items
      where library_items.id = reviews.library_item_id
        and library_items.user_id = auth.uid()
    )
  );

create policy "Users can delete their own reviews"
  on public.reviews for delete
  using (auth.uid() = user_id);
