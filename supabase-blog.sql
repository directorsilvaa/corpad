create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  category text not null,
  excerpt text not null,
  cover_image text,
  content text not null,
  status text not null default 'draft' check (status in ('draft', 'published', 'scheduled')),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.blog_posts
  add column if not exists subtitle text,
  add column if not exists image_alt text,
  add column if not exists author_name text,
  add column if not exists author_photo text,
  add column if not exists author_role text,
  add column if not exists author_bio text,
  add column if not exists meta_title text,
  add column if not exists meta_description text,
  add column if not exists keyword text,
  add column if not exists cta_label text,
  add column if not exists cta_url text,
  add column if not exists cta_text text;

alter table public.blog_posts
  drop constraint if exists blog_posts_status_check;

alter table public.blog_posts
  add constraint blog_posts_status_check check (status in ('draft', 'published', 'scheduled'));

alter table public.blog_posts enable row level security;

create policy "Published posts are public"
  on public.blog_posts
  for select
  using (status = 'published' or auth.role() = 'authenticated');

create policy "Authenticated admins can insert posts"
  on public.blog_posts
  for insert
  to authenticated
  with check (true);

create policy "Authenticated admins can update posts"
  on public.blog_posts
  for update
  to authenticated
  using (true)
  with check (true);

create policy "Authenticated admins can delete posts"
  on public.blog_posts
  for delete
  to authenticated
  using (true);

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists blog_posts_updated_at on public.blog_posts;

create trigger blog_posts_updated_at
  before update on public.blog_posts
  for each row
  execute function public.set_updated_at();

insert into storage.buckets (id, name, public)
values ('blog-images', 'blog-images', true)
on conflict (id) do update set public = true;

create policy "Blog images are public"
  on storage.objects
  for select
  using (bucket_id = 'blog-images');

create policy "Authenticated admins can upload blog images"
  on storage.objects
  for insert
  to authenticated
  with check (bucket_id = 'blog-images');

create policy "Authenticated admins can update blog images"
  on storage.objects
  for update
  to authenticated
  using (bucket_id = 'blog-images')
  with check (bucket_id = 'blog-images');

create policy "Authenticated admins can delete blog images"
  on storage.objects
  for delete
  to authenticated
  using (bucket_id = 'blog-images');
