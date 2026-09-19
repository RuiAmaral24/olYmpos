-- Explicitly published reviews and flat replies. Existing public.reviews rows
-- remain private library notes and are never copied by this migration.

create table public.public_reviews (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  library_item_id uuid references public.library_items(id) on delete set null,
  content text not null,
  rating numeric(3, 1),
  media_title text not null,
  media_category text not null,
  media_cover_url text,
  media_year integer,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint public_reviews_content_length check (
    length(btrim(content)) between 1 and 10000
  ),
  constraint public_reviews_rating_range check (
    rating is null or (rating >= 0 and rating <= 5)
  ),
  constraint public_reviews_media_category check (
    media_category in ('anime', 'movie', 'game')
  )
);

create unique index public_reviews_user_library_item_unique
  on public.public_reviews (user_id, library_item_id)
  where library_item_id is not null;

create index public_reviews_user_published_at_idx
  on public.public_reviews (user_id, published_at desc)
  where published_at is not null;

create table public.review_replies (
  id uuid primary key default gen_random_uuid(),
  review_id uuid not null references public.public_reviews(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  content text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint review_replies_content_length check (
    length(btrim(content)) between 1 and 2000
  )
);

create index review_replies_review_created_at_idx
  on public.review_replies (review_id, created_at);

create trigger public_reviews_set_updated_at
  before update on public.public_reviews
  for each row execute function public.set_updated_at();

create trigger review_replies_set_updated_at
  before update on public.review_replies
  for each row execute function public.set_updated_at();

alter table public.public_reviews enable row level security;
alter table public.review_replies enable row level security;

revoke all on public.public_reviews from public, anon, authenticated;
revoke all on public.review_replies from public, anon, authenticated;
grant select, insert, update, delete on public.public_reviews to authenticated;
grant select, insert, update, delete on public.review_replies to authenticated;

create or replace function public.can_view_public_review(target_review_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.public_reviews pr
    join public.profiles p on p.id = pr.user_id
    where pr.id = target_review_id
      and (
        pr.user_id = auth.uid()
        or (
          pr.published_at is not null
          and (
            p.profile_visibility = 'public'
            or exists (
              select 1
              from public.follows f
              where f.follower_id = auth.uid()
                and f.followed_id = pr.user_id
            )
          )
        )
      )
  );
$$;

revoke all on function public.can_view_public_review(uuid) from public;
grant execute on function public.can_view_public_review(uuid) to authenticated;

create policy "Authorized users can view public reviews"
  on public.public_reviews for select to authenticated
  using (public.can_view_public_review(id));

create policy "Users can create their own public reviews"
  on public.public_reviews for insert to authenticated
  with check (
    user_id = auth.uid()
    and (
      library_item_id is null
      or exists (
        select 1 from public.library_items li
        where li.id = library_item_id and li.user_id = auth.uid()
      )
    )
  );

create policy "Users can update their own public reviews"
  on public.public_reviews for update to authenticated
  using (user_id = auth.uid())
  with check (
    user_id = auth.uid()
    and (
      library_item_id is null
      or exists (
        select 1 from public.library_items li
        where li.id = library_item_id and li.user_id = auth.uid()
      )
    )
  );

create policy "Users can delete their own public reviews"
  on public.public_reviews for delete to authenticated
  using (user_id = auth.uid());

create policy "Authorized users can view review replies"
  on public.review_replies for select to authenticated
  using (public.can_view_public_review(review_id));

create policy "Authorized users can create review replies"
  on public.review_replies for insert to authenticated
  with check (
    user_id = auth.uid()
    and public.can_view_public_review(review_id)
  );

create policy "Users can update their own review replies"
  on public.review_replies for update to authenticated
  using (user_id = auth.uid())
  with check (
    user_id = auth.uid()
    and public.can_view_public_review(review_id)
  );

create policy "Users can delete their own review replies"
  on public.review_replies for delete to authenticated
  using (user_id = auth.uid());

create or replace function public.get_review_for_viewer(p_review_id uuid)
returns table (
  id uuid, content text, rating numeric, media_title text,
  media_category text, media_cover_url text, media_year integer,
  published_at timestamptz, created_at timestamptz, updated_at timestamptz,
  author_id uuid, author_username text, author_full_name text,
  author_avatar_url text, author_profile_visibility text, is_owner boolean
)
language sql
stable
security definer
set search_path = public
as $$
  select pr.id, pr.content, pr.rating, pr.media_title,
    pr.media_category, pr.media_cover_url, pr.media_year,
    pr.published_at, pr.created_at, pr.updated_at,
    p.id, p.username, p.full_name, p.avatar_url, p.profile_visibility,
    p.id = auth.uid()
  from public.public_reviews pr
  join public.profiles p on p.id = pr.user_id
  where pr.id = p_review_id
    and public.can_view_public_review(pr.id)
  limit 1;
$$;

create or replace function public.get_review_replies(
  p_review_id uuid, p_limit integer default 100, p_offset integer default 0
)
returns table (
  id uuid, review_id uuid, content text, created_at timestamptz,
  updated_at timestamptz, author_id uuid, author_username text,
  author_full_name text, author_avatar_url text, is_owner boolean
)
language sql
stable
security definer
set search_path = public
as $$
  select rr.id, rr.review_id, rr.content, rr.created_at, rr.updated_at,
    p.id, p.username, p.full_name, p.avatar_url, p.id = auth.uid()
  from public.review_replies rr
  join public.profiles p on p.id = rr.user_id
  where rr.review_id = p_review_id
    and public.can_view_public_review(p_review_id)
  order by rr.created_at asc
  limit least(greatest(coalesce(p_limit, 100), 1), 200)
  offset greatest(coalesce(p_offset, 0), 0);
$$;

create or replace function public.publish_review(p_library_item_id uuid)
returns uuid
language plpgsql
set search_path = public
as $$
declare
  owner_id uuid := auth.uid();
  item record;
  private_content text;
  published_review_id uuid;
begin
  if owner_id is null then raise exception 'Authentication required'; end if;

  select li.id, li.title, li.category, li.cover_url, li.year, li.rating
  into item
  from public.library_items li
  where li.id = p_library_item_id and li.user_id = owner_id
  for update;

  if not found then raise exception 'Library item not found'; end if;

  select pr.id into published_review_id
  from public.public_reviews pr
  where pr.user_id = owner_id and pr.library_item_id = item.id
  for update;

  if published_review_id is not null then
    update public.public_reviews
    set published_at = now(),
      media_title = item.title,
      media_category = item.category,
      media_cover_url = item.cover_url,
      media_year = item.year
    where id = published_review_id;
    return published_review_id;
  end if;

  select r.content into private_content
  from public.reviews r
  where r.library_item_id = item.id and r.user_id = owner_id
  order by r.updated_at desc
  limit 1;

  if private_content is null or btrim(private_content) = '' then
    raise exception 'Add and save a personal note before publishing';
  end if;

  insert into public.public_reviews (
    user_id, library_item_id, content, rating, media_title,
    media_category, media_cover_url, media_year, published_at
  ) values (
    owner_id, item.id, btrim(private_content), item.rating, item.title,
    item.category, item.cover_url, item.year, now()
  )
  on conflict (user_id, library_item_id) where library_item_id is not null
  do update set
    published_at = now(),
    media_title = excluded.media_title,
    media_category = excluded.media_category,
    media_cover_url = excluded.media_cover_url,
    media_year = excluded.media_year
  returning id into published_review_id;

  return published_review_id;
end;
$$;

create or replace function public.update_public_review(p_review_id uuid, p_content text)
returns boolean
language plpgsql
set search_path = public
as $$
begin
  if p_content is null or length(btrim(p_content)) not between 1 and 10000 then
    raise exception 'Review must be between 1 and 10000 characters';
  end if;

  update public.public_reviews
  set content = btrim(p_content)
  where id = p_review_id and user_id = auth.uid();
  return found;
end;
$$;

create or replace function public.unpublish_review(p_review_id uuid)
returns boolean
language plpgsql
set search_path = public
as $$
begin
  update public.public_reviews
  set published_at = null
  where id = p_review_id and user_id = auth.uid();
  return found;
end;
$$;

create or replace function public.create_review_reply(p_review_id uuid, p_content text)
returns uuid
language plpgsql
set search_path = public
as $$
declare reply_id uuid;
begin
  if auth.uid() is null then raise exception 'Authentication required'; end if;
  if p_content is null or length(btrim(p_content)) not between 1 and 2000 then
    raise exception 'Reply must be between 1 and 2000 characters';
  end if;

  insert into public.review_replies (review_id, user_id, content)
  values (p_review_id, auth.uid(), btrim(p_content))
  returning id into reply_id;
  return reply_id;
end;
$$;

create or replace function public.update_review_reply(p_reply_id uuid, p_content text)
returns boolean
language plpgsql
set search_path = public
as $$
begin
  if p_content is null or length(btrim(p_content)) not between 1 and 2000 then
    raise exception 'Reply must be between 1 and 2000 characters';
  end if;

  update public.review_replies
  set content = btrim(p_content)
  where id = p_reply_id and user_id = auth.uid();
  return found;
end;
$$;

create or replace function public.delete_review_reply(p_reply_id uuid)
returns boolean
language plpgsql
set search_path = public
as $$
begin
  delete from public.review_replies
  where id = p_reply_id and user_id = auth.uid();
  return found;
end;
$$;

create or replace function public.notify_review_reply()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  review_owner_id uuid;
  actor_username text;
  actor_name text;
begin
  select pr.user_id into review_owner_id
  from public.public_reviews pr where pr.id = new.review_id;

  if review_owner_id is null or review_owner_id = new.user_id then
    return new;
  end if;

  select p.username, coalesce(nullif(btrim(p.full_name), ''), '@' || p.username)
  into actor_username, actor_name
  from public.profiles p where p.id = new.user_id;

  insert into public.notifications (
    user_id, actor_user_id, type, title, body, target_url,
    related_entity_type, related_entity_id, payload, dedupe_key
  ) values (
    review_owner_id, new.user_id, 'review_reply',
    actor_name || ' replied to your review', left(new.content, 160),
    '/reviews/' || new.review_id, 'review', new.review_id,
    jsonb_build_object('username', actor_username),
    'review_reply:' || new.id
  );

  return new;
end;
$$;

create trigger review_replies_create_notification
  after insert on public.review_replies
  for each row execute function public.notify_review_reply();

revoke all on function public.get_review_for_viewer(uuid) from public;
revoke all on function public.get_review_replies(uuid, integer, integer) from public;
revoke all on function public.publish_review(uuid) from public;
revoke all on function public.update_public_review(uuid, text) from public;
revoke all on function public.unpublish_review(uuid) from public;
revoke all on function public.create_review_reply(uuid, text) from public;
revoke all on function public.update_review_reply(uuid, text) from public;
revoke all on function public.delete_review_reply(uuid) from public;
revoke all on function public.notify_review_reply() from public;

grant execute on function public.get_review_for_viewer(uuid) to authenticated;
grant execute on function public.get_review_replies(uuid, integer, integer) to authenticated;
grant execute on function public.publish_review(uuid) to authenticated;
grant execute on function public.update_public_review(uuid, text) to authenticated;
grant execute on function public.unpublish_review(uuid) to authenticated;
grant execute on function public.create_review_reply(uuid, text) to authenticated;
grant execute on function public.update_review_reply(uuid, text) to authenticated;
grant execute on function public.delete_review_reply(uuid) to authenticated;
