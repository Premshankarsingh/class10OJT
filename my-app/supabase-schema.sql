-- ============================================
-- Supabase Schema for Saraswati School CMS
-- Run this in Supabase SQL Editor
-- ============================================

-- 0. Users table (mirrors auth.users for custom profile data)
create table if not exists users (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  email text,
  phone text,
  gender text,
  role text not null default 'editor',
  status text not null default 'pending',
  approved_at timestamptz,
  created_at timestamptz default now()
);

alter table users enable row level security;

drop policy if exists "Users can read own data" on users;
drop policy if exists "Admin full access" on users;

-- Users can read their own row; admins can read all
create policy "Users can read own data"
  on users for select
  using (auth.uid() = id);

create policy "Admin full access"
  on users for all
  using (auth.jwt() ->> 'role' = 'authenticated' and exists (
    select 1 from users where id = auth.uid() and role = 'admin'
  ))
  with check (auth.jwt() ->> 'role' = 'authenticated' and exists (
    select 1 from users where id = auth.uid() and role = 'admin'
  ));

-- 1. News articles
create table if not exists cms_news (
  id bigint primary key,
  slug text,
  subject text,
  date text,
  title text,
  content text,
  author text,
  images jsonb default '[]'::jsonb,
  category text default 'general',
  "order" int default 0,
  created_at timestamptz default now()
);

-- 2. Staff members
create table if not exists cms_staff_members (
  id bigint primary key,
  name text,
  subject text,
  phone text,
  address text,
  photo text,
  branch text default 'general',
  "order" int default 0,
  created_at timestamptz default now()
);

-- 3. Facilities
create table if not exists cms_facilities (
  id bigint primary key,
  title text,
  description text,
  image text,
  "order" int default 0,
  created_at timestamptz default now()
);

-- 4. Gallery categories
create table if not exists cms_gallery_categories (
  id bigint primary key,
  title text,
  img text,
  link text,
  "order" int default 0,
  created_at timestamptz default now()
);

-- 5. Gallery photos
create table if not exists cms_gallery_photos (
  id bigint primary key,
  category_id bigint references cms_gallery_categories(id) on delete cascade,
  src text,
  alt text,
  "order" int default 0,
  created_at timestamptz default now()
);
-- 6. Message cards (home page)
create table if not exists cms_message_cards (
  id bigint primary key,
  title text,
  img text,
  text text,
  link text,
  "order" int default 0,
  created_at timestamptz default now()
);

-- 6. Exam portals
create table if not exists cms_exam_portals (
  id bigint primary key,
  title text,
  img text,
  link text,
  "order" int default 0,
  created_at timestamptz default now()
);

-- 7. Home page banners
create table if not exists cms_banners (
  id bigint primary key,
  src text,
  alt text,
  "order" int default 0,
  created_at timestamptz default now()
);

-- 8. Messages (one per role: principal, chairman, coordinator, vicePrincipal)
create table if not exists cms_messages (
  id uuid default gen_random_uuid() primary key,
  role text unique not null,
  title text,
  name text,
  photo text,
  message text,
  address text,
  border_color text,
  created_at timestamptz default now()
);

-- 9. About History (singleton)
create table if not exists cms_about_history (
  id int primary key default 1,
  title text,
  subtitle text,
  journey_title text,
  journey_text text,
  images jsonb default '[]'::jsonb,
  gurukul_principals jsonb default '[]'::jsonb,
  modern_principals jsonb default '[]'::jsonb,
  created_at timestamptz default now(),
  constraint cms_about_history_one_row check (id = 1)
);

-- 10. About Today (singleton)
create table if not exists cms_about_today (
  id int primary key default 1,
  title text,
  subtitle text,
  description text,
  images jsonb default '[]'::jsonb,
  principal jsonb default '{}'::jsonb,
  stats jsonb default '[]'::jsonb,
  vision text,
  mission text,
  achievements text,
  created_at timestamptz default now(),
  constraint cms_about_today_one_row check (id = 1)
);

-- 11. About Committees (singleton)
create table if not exists cms_about_committees (
  id int primary key default 1,
  committees jsonb not null default '{}'::jsonb,
  created_at timestamptz default now(),
  constraint cms_about_committees_one_row check (id = 1)
);

-- 12. Contact (singleton)
create table if not exists cms_contact (
  id int primary key default 1,
  staff_members jsonb default '[]'::jsonb,
  contact_info jsonb default '{}'::jsonb,
  locations jsonb default '[]'::jsonb,
  created_at timestamptz default now(),
  constraint cms_contact_one_row check (id = 1)
);

-- 13. Site settings (topbar, footer)
create table if not exists cms_site_settings (
  id uuid default gen_random_uuid() primary key,
  type text unique not null,
  data jsonb not null default '{}'::jsonb,
  created_at timestamptz default now()
);

-- 14. Contact form submissions (messages from visitors)
create table if not exists contact_submissions (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  phone text,
  subject text not null,
  message text not null,
  created_at timestamptz default now()
);

alter table contact_submissions enable row level security;

drop policy if exists "Anyone can insert contact_submissions" on contact_submissions;
drop policy if exists "Auth read/delete contact_submissions" on contact_submissions;

create policy "Anyone can insert contact_submissions"
  on contact_submissions for insert
  to anon, authenticated
  with check (true);

create policy "Auth read contact_submissions"
  on contact_submissions for select
  to authenticated
  using (true);

create policy "Auth delete contact_submissions"
  on contact_submissions for delete
  to authenticated
  using (true);

-- 15. Page metadata (extra info for pages like staff, facilities, gallery, exam-portal)
create table if not exists cms_page_meta (
  section text primary key,
  title text,
  subtitle text,
  extra jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);

-- Enable Realtime for all CMS tables (safe to re-run)
do $$ declare
  tbl text;
  tables text[] := array[
     'cms_news', 'cms_staff_members', 'cms_facilities',
    'cms_gallery_categories', 'cms_message_cards', 'cms_exam_portals',
    'cms_banners', 'cms_messages', 'cms_about_history',
    'cms_about_today', 'cms_about_committees', 'cms_contact',
    'cms_site_settings', 'cms_page_meta', 'cms_gallery_photos',
    'contact_submissions'
  ];
begin
  foreach tbl in array tables loop
    begin
      execute format('alter publication supabase_realtime add table %I', tbl);
    exception when others then null;
    end;
  end loop;
end $$;

-- ============================================
-- RLS Policies for CMS tables
-- Public read, authenticated write
-- ============================================
do $$ declare
  tbl text;
  tables text[] := array[
    'cms_news', 'cms_staff_members', 'cms_facilities',
    'cms_gallery_categories', 'cms_message_cards', 'cms_exam_portals',
    'cms_banners', 'cms_messages', 'cms_about_history',
    'cms_about_today', 'cms_about_committees', 'cms_contact',
    'cms_site_settings', 'cms_page_meta'
  ];
begin
  foreach tbl in array tables loop
    execute format('alter table %I enable row level security;', tbl);
    execute format('drop policy if exists "Public read %I" on %I;', tbl, tbl);
    execute format('drop policy if exists "Auth write %I" on %I;', tbl, tbl);
    execute format('
      create policy "Public read %I"
        on %I for select
        to anon, authenticated
        using (true);
    ', tbl, tbl);
    execute format('
      create policy "Auth write %I"
        on %I for all
        to authenticated
        using (true)
        with check (true);
    ', tbl, tbl);
  end loop;
end $$;
