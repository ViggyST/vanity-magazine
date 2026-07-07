-- Session 5: one-time data migration of the 3 static posts (src/data/seedData.ts's
-- seedPosts array) into vanitymagazine.blog, so /blog has a single source of truth
-- going forward. seedData.ts's Post type/exports are left untouched -- ProjectDetail.tsx
-- still reads getPostForProject() from the static array for its "related post" display.
--
-- post_type wasn't part of the old static Post shape, so values below are inferred from
-- each post's content/tags (a judgment call, editable via the admin form afterward).
-- ON CONFLICT (slug) DO NOTHING makes this safe to re-run.

insert into vanitymagazine.blog (title, slug, date, tags, post_type, excerpt, content, linked_project)
values
  (
    'Building a Personal Vault with Lovable',
    'building-personal-vault',
    '2025-01-15',
    array['lovable', 'development', 'journal'],
    'thought',
    'Notes on creating Vanity Magazine — a Kino-inspired personal vault.',
    E'# Building a Personal Vault with Lovable\n\nThis is the story of building Vanity Magazine, a personal vault for projects and ideas.\n\n## The Vision\n\nThe goal was simple: create a dark, editorial-style portfolio that feels premium without being pretentious. Inspired by Kino''s aesthetic — typography-first, minimal borders, generous whitespace.\n\n## Tech Stack\n\n- React + TypeScript + Vite\n- Tailwind CSS with semantic tokens\n- Framer Motion for subtle animations\n- Supabase (Lovable Cloud) for backend\n\n## Key Design Decisions\n\n1. **Inter + Fraunces** — Sans for body, serif for display\n2. **Muted gold accent** — #D6C7A1, used sparingly\n3. **Big whitespace** — Sections breathe with 80-120px gaps\n4. **Restrained motion** — Subtle fades, no circus effects\n\nMore to come as the project evolves.',
    '1'
  ),
  (
    'On Project Statuses',
    'on-project-statuses',
    '2025-01-10',
    array['process', 'organization'],
    'thought',
    'Why I categorize projects as WIP, Dream, Live, or Paused.',
    E'# On Project Statuses\n\nEvery project in my vault has one of four statuses:\n\n## WIP (Work in Progress)\nActively being built. These get the most attention.\n\n## Dream\nIdeas I want to explore but haven''t started. Keeping them visible keeps them alive.\n\n## Live\nShipped and running. Might still get updates, but core is done.\n\n## Paused\nStarted but on hold. Not abandoned — just waiting for the right time.\n\nThis simple taxonomy helps me stay organized without overcomplicating things.',
    null
  ),
  (
    'The Kino Aesthetic',
    'the-kino-aesthetic',
    '2025-01-05',
    array['design', 'inspiration'],
    'essay',
    'What makes the Kino visual style so compelling.',
    E'# The Kino Aesthetic\n\nKino''s design philosophy centers on a few key principles:\n\n## Typography First\nThe text is the hero. Display fonts are carefully chosen, sizing is generous, and hierarchy is crystal clear.\n\n## Darkness as Canvas\nNear-black backgrounds make content pop. The darkness isn''t absence — it''s intentional negative space.\n\n## Restrained Motion\nAnimations are subtle and purposeful. No gratuitous effects, no scroll-jacking, no parallax overload.\n\n## Premium Spacing\nGenerous gaps between sections. Each element has room to breathe.\n\nThis approach creates a sense of calm and focus that''s rare in web design.',
    null
  )
on conflict (slug) do nothing;
