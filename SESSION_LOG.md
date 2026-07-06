# SESSION_LOG.md — Vanity Magazine

Full history of Claude Code build sessions. CLAUDE.md §7 always reflects only the latest entry
here — read this file when you need past detail, not every session.

---

## Session 1 — 2026-07-04

**Scope:** Replace `src/data/seedData.ts` with the final 15-project locked roster (typeBucket
taxonomy, new projects, dropped projects), per CLAUDE.md §6.

**What changed:**
- Swapped in the locked roster: 15 projects total (WIP 1, Dream 1, Live 8, POC 5).
- Dropped: Prompt Refiner, Dream11 Website Rebuild, Online Board Game, Temple Landing Page.
- Added: EMI Card Fantasy IPL 2026, Kickoff 26, Odyssey, GitHub MCP Server, Claude Skills System,
  Game Project.
- Added `typeBucket` field (App | AI/ML | Tool | Work Demo | Concept | Full-Stack/Custom Build) to
  the `Project` interface and every project. Legacy `category` field kept untouched for existing
  projects (drives `getCoverForCategory()` fallback); new projects (ids 17-22) have `category` set
  to their typeBucket string, which intentionally doesn't match `categoryCoverMap`, so they fall
  back to `coverFallback` until real thumbnails land in Session 6.
- Added `thumbnail?` field to `Project` interface (unused until Session 6).

**Verification:**
- `npm run build` — 0 errors.
- Dev server checked in browser: `/projects` renders all 15 projects grouped by status
  (Work in Progress 1, Dream 1, Live 8, POCs & Demos 5); `/` (home) also loads clean.
- No console errors on either page.

**Note:** Two project one-liners in the source data are still flagged `[TBD — confirm...]`
(Odyssey stack/details, Claude Skills System description) — carried over as-is, not resolved this
session.

**Next:** Session 2 — connect repo to Vercel, confirm unlisted URL, verify auto-deploy from GitHub
pushes.

---

## Session 2 — 2026-07-04

**Scope:** Verify the repo is Vercel-deploy-ready and confirm the live deployment matches the
local Session 1 build. Vercel was already connected and deployed once manually via the dashboard
before this session started. Live URL: https://vanity-magazine.vercel.app/

**What I found (both were real gaps, not just checks that passed):**

1. **Stale deployment.** The live site was serving the *pre-Session-1* roster — verified by
   pulling the deployed `seedData-*.js` chunk directly and finding `Prompt Refiner`,
   `Dream11 Website Rebuild`, `Temple Landing Page` (all dropped in Session 1) still present, and
   zero occurrences of `typeBucket`. Root cause: the Session 1 commit (`e472c13`) and the CLAUDE.md
   contract commit (`ce95dc7`) were sitting local-only — `git status` showed local `main` 2 commits
   ahead of `origin/main` (last pushed commit was `fe29e5b`, pre-dating both). The manual Vercel
   deploy had built from whatever GitHub had, which was the old roster.
2. **Missing SPA rewrite.** No `vercel.json` existed. Root (`/`) returned 200, but every other
   route — `/projects`, `/blog`, `/learning`, `/now`, `/admin` — returned a raw Vercel 404 on
   direct fetch (confirmed via `curl`). In-app client-side navigation would have masked this
   (React Router intercepts clicks with no full page load), but a hard refresh or a direct/shared
   link to any non-root route would 404.

**What changed:**
- Added `vercel.json` with a catch-all rewrite (`"/(.*)" → "/index.html"`) so Vercel serves the SPA
  shell for every route and React Router handles routing client-side.
- Pushed all 3 pending commits to `origin/main`: `ce95dc7` (CLAUDE.md contract), `e472c13`
  (Session 1 roster), `d9d713c` (this rewrite fix) — triggering a fresh Vercel auto-deploy.

**Verification (after redeploy):**
- `curl` status codes: `/`, `/projects`, `/blog`, `/learning`, `/now`, `/admin` all return `200`.
- Deployed main JS bundle hash (`index-CYvGe2px.js`) matches a fresh local `npm run build` exactly
  — proves the deployed code is bit-for-bit the current commit, not a stale build.
- Deployed `seedData-mb6Swq41.js` chunk (hash also matches local) confirmed directly: all 6 new
  Session 1 projects present (EMI Card Fantasy IPL 2026, Kickoff 26, Odyssey, GitHub MCP Server,
  Claude Skills System, Game Project), all 4 dropped projects absent, `typeBucket` occurs exactly
  15 times (once per project).
- Build/output settings: `package.json`'s `"build": "vite build"` + Vite's default `dist` output
  matches what Vercel auto-detected (confirmed indirectly — deployed asset paths follow Vite's
  standard `/assets/<name>-<hash>.{js,css}` structure with no custom `outDir`). No mismatch found.
- Env vars: no code currently reads `import.meta.env.VITE_SUPABASE_*` (only
  `import.meta.env.DEV` in `ErrorBoundary.tsx`), so no env vars are required yet, as expected —
  Session 3 will wire up `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY`.

**Next:** Session 3 — add Supabase: create `blog`, `learning_roadmap`, `now` tables + client
setup.

---

## Session 3 — 2026-07-06

**Scope:** Connect Supabase. Install `@supabase/supabase-js`, create a `vanitymagazine`-scoped
client, create `blog`/`learning_roadmap`/`now` tables in a dedicated `vanitymagazine` schema (not
`public`), enable RLS with a permissive policy, add explicit grants, write the migration as a
`.sql` file, and prove it all works with a round-trip test.

**Plan approved with one change:** originally proposed handling PostgREST schema exposure via
`ALTER ROLE authenticator SET pgrst.db_schemas = 'public, vanitymagazine'` inside the migration for
full automation. Rejected — that command *replaces* the entire exposed-schema list rather than
appending to it, which would have broken Data API access for `kickoff26`, `odyssey`, and
`st_health`, other apps sharing this Supabase instance. Did the exposure via Dashboard (Settings →
API → Exposed Schemas) instead, done manually by the user.

**Pre-existing issues found during recon (before writing any code):**
- `.env`'s `VITE_SUPABASE_URL` was set to a Dashboard link
  (`https://supabase.com/dashboard/project/lbbnvjkuueeeqfgtwzmu`) instead of the actual API
  endpoint (`https://lbbnvjkuueeeqfgtwzmu.supabase.co`) — the client would have failed to connect.
  Fixed.
- `.env` was untracked but not gitignored — a stray `git add -A` could have leaked credentials.
  Added `.env` to `.gitignore`.
- This Supabase project is shared infrastructure, not Vanity-Magazine-only: `public` schema hosts
  Odyssey's tables (`exercises`, `workout_sessions`, `session_sets`), confirming schema isolation
  via `vanitymagazine` was the right call. Those Odyssey tables have RLS fully disabled — flagged
  per Supabase's own security advisor, left untouched (out of scope, risk of breaking Odyssey).

**What changed:**
- Migration: `supabase/migrations/20260706070134_create_vanitymagazine_schema.sql` — creates the
  `vanitymagazine` schema and 3 tables (see CLAUDE.md §5 for finalized column-level detail).
  Column names are `snake_case` (Postgres convention) vs. CLAUDE.md's original camelCase field
  names — naming-convention translation only, not a scope change.
  - `now` is intentionally left unseeded (singleton enforced via `CHECK (id = 1)`) so the
    round-trip test's insert/delete doesn't collide with a pre-existing row. Session 4's admin
    form must `upsert` on `id = 1`, not assume a row exists.
  - RLS enabled on all 3 tables with one permissive `"allow all"` policy each
    (`USING (true) WITH CHECK (true)`) — intentional per spec (single-user app, unlisted URL is
    the real boundary). Supabase's advisor correctly flags this as `rls_policy_always_true`;
    expected, not a bug.
  - Explicit grants: `GRANT USAGE ON SCHEMA vanitymagazine` + `SELECT, INSERT, UPDATE, DELETE` on
    all tables to `anon`/`authenticated`, plus `ALTER DEFAULT PRIVILEGES` so future tables in this
    schema inherit the same grants automatically.
- `src/lib/supabaseClient.ts` — schema-scoped client via `createClient(url, key, { db: { schema:
  'vanitymagazine' } })`, so call sites never need to repeat `.schema('vanitymagazine')`.
- `src/types/supabase.ts` — hand-written types mirroring the migration exactly. Supabase MCP's
  `generate_typescript_types` tool only covers the `public` schema on this shared project (no
  schema parameter available), and the Supabase CLI's `--schema` flag needs an access token/login
  this session didn't set up — hand-writing was simpler and just as accurate since the migration
  SQL is the source of truth either way.
- `.env`: fixed `VITE_SUPABASE_URL`; added to `.gitignore`.

**Verification:**
- `npm run build` — 0 errors.
- Round-trip test (temporary script, not committed): insert into `now` → select it back → delete
  → confirm table empty again. Passed end-to-end against the live project, proving the client,
  schema routing, RLS, and grants all work together — not just that the SQL ran.
- Hit a real blocker mid-verification: even after the Dashboard exposure change, PostgREST
  returned `PGRST106: Invalid schema: vanitymagazine` — the change hadn't taken effect yet. After
  the user confirmed via direct SQL that `pgrst.db_schemas` now included `vanitymagazine` (along
  with `odyssey` and `st_health`, added in the same pass), retrying hit a second error,
  `PGRST205: Could not find the table 'vanitymagazine.now' in the schema cache` — the schema was
  now recognized but PostgREST's schema cache hadn't picked up its tables. Running
  `NOTIFY pgrst, 'reload schema'` (a safe, non-destructive cache refresh — distinct from the
  rejected `ALTER ROLE` approach) resolved it; the round-trip test then passed cleanly.
- Confirmed `ipl2026` still works after the exposure change (`HTTP 200` on `ipl2026.matches`).
  `kickoff26` returns `permission denied for schema kickoff26` — verified via direct SQL
  (`has_schema_privilege`) that `anon`/`authenticated` have never had `USAGE` on that schema at
  all, independent of anything changed today. Pre-existing gap in `kickoff26`'s own setup, not
  caused by this session, not fixed here.

**Next:** Session 4 — build `/admin` entry form (add Blog post, edit Learning items, edit Now
widget) using react-hook-form + zod against Supabase.
