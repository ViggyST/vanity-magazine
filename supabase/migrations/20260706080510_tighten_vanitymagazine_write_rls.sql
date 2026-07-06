-- Session 4: tighten RLS on vanitymagazine tables.
-- Requirement confirmed with the user directly after the PRD locked (auth wasn't in the
-- original CLAUDE.md §6 scope) -- see CLAUDE.md §6 note.
--
-- Previously: single "allow all" policy per table, USING (true) WITH CHECK (true) for ALL
-- operations, granted to both anon and authenticated (Session 3).
-- Now: SELECT stays open to anon + authenticated (public browsing needs no login);
-- INSERT/UPDATE/DELETE restricted to authenticated only.

drop policy "allow all" on vanitymagazine.blog;
drop policy "allow all" on vanitymagazine.learning_roadmap;
drop policy "allow all" on vanitymagazine."now";

-- blog
create policy "public read" on vanitymagazine.blog for select using (true);
create policy "authenticated write" on vanitymagazine.blog for insert to authenticated with check (true);
create policy "authenticated update" on vanitymagazine.blog for update to authenticated using (true) with check (true);
create policy "authenticated delete" on vanitymagazine.blog for delete to authenticated using (true);

-- learning_roadmap
create policy "public read" on vanitymagazine.learning_roadmap for select using (true);
create policy "authenticated write" on vanitymagazine.learning_roadmap for insert to authenticated with check (true);
create policy "authenticated update" on vanitymagazine.learning_roadmap for update to authenticated using (true) with check (true);
create policy "authenticated delete" on vanitymagazine.learning_roadmap for delete to authenticated using (true);

-- now
create policy "public read" on vanitymagazine."now" for select using (true);
create policy "authenticated write" on vanitymagazine."now" for insert to authenticated with check (true);
create policy "authenticated update" on vanitymagazine."now" for update to authenticated using (true) with check (true);
create policy "authenticated delete" on vanitymagazine."now" for delete to authenticated using (true);

-- revoke write grants from anon (SELECT-only for anon going forward); authenticated keeps all
revoke insert, update, delete on vanitymagazine.blog from anon;
revoke insert, update, delete on vanitymagazine.learning_roadmap from anon;
revoke insert, update, delete on vanitymagazine."now" from anon;

-- default privileges for future tables in this schema: anon gets SELECT only,
-- authenticated keeps full CRUD
alter default privileges in schema vanitymagazine revoke insert, update, delete on tables from anon;
