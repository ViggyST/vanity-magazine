

# Add 5 New Projects to Seed Data

## Summary
Add 5 new project entries to `src/data/seedData.ts`. No new files, no new images, no structural changes.

## What Changes

**File: `src/data/seedData.ts`** — Add 5 objects to the `seedProjects` array (IDs 11-15):

| ID | Title | Status | Category | Slug |
|----|-------|--------|----------|------|
| 11 | Campaign Management Platform POC | Live | Office Demo / POC | campaign-management-platform-poc |
| 12 | RAG Project | WIP | Idea / Research | rag-project |
| 13 | Paper Trail (Expense Manager) | Live | Lovable (Major) | paper-trail |
| 14 | MCP Learning Demo | Dream | Idea / Research | mcp-learning-demo |
| 15 | Clawbot Project | Dream | AI App / Script | clawbot |

All use `featured: false` and empty `primaryLink`.

## Where They Appear Automatically

The existing page logic already handles placement:

- **Home / "Building Now"**: RAG Project (WIP) joins existing WIP section
- **Projects / WIP section**: RAG Project appears
- **Projects / Dream section**: MCP Learning Demo + Clawbot join existing Dream projects
- **Projects / Live section**: Campaign Management Platform POC + Paper Trail join existing Live projects
- **Home / "Featured Projects"**: No change (all new items are `featured: false`)

## What Does NOT Change

- No new image assets (category covers already exist for all used categories)
- No new categories
- No changes to Home structure, routing, or components
- No changes to blog posts or site config

