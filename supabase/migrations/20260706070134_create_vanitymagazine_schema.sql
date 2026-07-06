-- Session 3: vanitymagazine schema for blog, learning_roadmap, now
-- This Supabase project is shared infrastructure (public schema hosts Odyssey's
-- exercises/workout_sessions/session_sets tables) -- Vanity Magazine gets its own
-- schema to avoid collision.
--
-- NOTE: the vanitymagazine schema is exposed to PostgREST via the Supabase
-- Dashboard (Settings -> API -> Exposed Schemas), done manually and confirmed
-- in the UI -- NOT via `alter role authenticator set pgrst.db_schemas`, which
-- would replace the entire exposed-schema list and break Data API access for
-- other projects sharing this instance (kickoff26, odyssey, st_health).

create schema if not exists vanitymagazine;

create table vanitymagazine.blog (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  date date not null,
  tags text[] not null default '{}',
  post_type text not null check (post_type in ('thought', 'learning-note', 'paper-review', 'product-find', 'essay')),
  excerpt text not null,
  content text not null,
  linked_project text, -- references seedData.ts Project.id (static roster, no FK)
  created_at timestamptz not null default now()
);

create table vanitymagazine.learning_roadmap (
  id uuid primary key default gen_random_uuid(),
  topic text not null,
  status text not null check (status in ('Learned', 'Learning', 'Planned')),
  notes text,
  linked_blog_post uuid references vanitymagazine.blog(id) on delete set null,
  created_at timestamptz not null default now()
);

create table vanitymagazine."now" (
  id integer primary key default 1 check (id = 1), -- singleton row
  currently_building text[] not null default '{}',
  currently_learning text[] not null default '{}',
  recently_shipped text[] not null default '{}',
  last_updated timestamptz not null default now()
);
-- intentionally not seeded -- Session 3's round-trip test performs the first
-- insert/delete; Session 4's admin form must upsert on id = 1, not assume a row exists.

alter table vanitymagazine.blog enable row level security;
alter table vanitymagazine.learning_roadmap enable row level security;
alter table vanitymagazine."now" enable row level security;

-- single-user private app -- RLS is a formality; the real boundary is the unlisted URL
create policy "allow all" on vanitymagazine.blog for all using (true) with check (true);
create policy "allow all" on vanitymagazine.learning_roadmap for all using (true) with check (true);
create policy "allow all" on vanitymagazine."now" for all using (true) with check (true);

grant usage on schema vanitymagazine to anon, authenticated;
grant select, insert, update, delete on all tables in schema vanitymagazine to anon, authenticated;
alter default privileges in schema vanitymagazine grant select, insert, update, delete on tables to anon, authenticated;
