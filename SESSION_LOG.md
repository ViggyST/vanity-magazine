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
