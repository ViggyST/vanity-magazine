/**
 * Seed data for Vanity Magazine v2
 * Static data until Supabase is connected (Sprint 3)
 *
 * NOTE on category vs typeBucket:
 * - `category` is kept ONLY for existing projects to preserve their real cover
 *   images via getCoverForCategory() (old taxonomy: Lovable Major/Minor, etc.)
 * - `typeBucket` is the NEW taxonomy from the v2 PRD (App / AI-ML / Tool / etc.)
 * - New projects (ids 17-22) have `category` set to their typeBucket string,
 *   which intentionally does NOT match categoryCoverMap, so they fall back to
 *   coverFallback until real/generated thumbnails are added in Sprint 6.
 */

// Import category cover images
import catLovableMajor from '@/assets/cat-lovable-major.jpg';
import catLovableMinor from '@/assets/cat-lovable-minor.jpg';
import catCustomGpt from '@/assets/cat-custom-gpt.jpg';
import catOfficeDemoPoc from '@/assets/cat-office-demo-poc.jpg';
import catAiAppScript from '@/assets/cat-ai-app-script.jpg';
import catBoardGameDesign from '@/assets/cat-board-game-design.jpg';
import catIdeaResearch from '@/assets/cat-idea-research.jpg';
import coverFallback from '@/assets/cover-fallback.jpg';

// Category to cover image mapping (legacy, kept for existing projects only)
export const categoryCoverMap: Record<string, string> = {
  'Lovable (Major)': catLovableMajor,
  'Lovable (Minor)': catLovableMinor,
  'Custom GPT': catCustomGpt,
  'Office Demo / POC': catOfficeDemoPoc,
  'AI App / Script': catAiAppScript,
  'Board Game / Design': catBoardGameDesign,
  'Idea / Research': catIdeaResearch,
};

export const fallbackCover = coverFallback;

// Get cover for a project based on its category
export function getCoverForCategory(category: string): string {
  return categoryCoverMap[category] || fallbackCover;
}

// Type Bucket taxonomy (v2 PRD, section 5)
export type TypeBucket =
  | 'App'
  | 'AI/ML'
  | 'Tool'
  | 'Work Demo'
  | 'Concept'
  | 'Full-Stack / Custom Build';

// Project type
export interface Project {
  id: string;
  title: string;
  slug: string;
  oneLiner: string;
  status: 'WIP' | 'Dream' | 'Live' | 'Paused' | 'POC';
  category: string; // legacy field, drives cover image fallback only
  typeBucket: TypeBucket; // v2 taxonomy, primary classification going forward
  tags: string[];
  featured: boolean;
  thumbnail?: string; // NEW in v2 — real screenshot or generated thumbnail URL, filled in Sprint 6
  coverUrl?: string;
  primaryLink?: string;
}

// Post type
export interface Post {
  id: string;
  title: string;
  slug: string;
  publishedOn: string;
  tags: string[];
  projectId?: string;
  content: string;
  excerpt: string;
}

// Seed projects — locked roster, confirmed July 2026
export const seedProjects: Project[] = [
  // Live
  {
    id: '17',
    title: 'EMI Card Fantasy IPL 2026',
    slug: 'emi-card-fantasy-ipl-2026',
    oneLiner: 'Custom-built fantasy cricket predictor for IPL 2026, live and used by a real friend group.',
    status: 'Live',
    category: 'Full-Stack / Custom Build',
    typeBucket: 'Full-Stack / Custom Build',
    tags: ['cricket', 'ipl', 'fintech', 'fantasy'],
    featured: true,
    primaryLink: '',
  },
  {
    id: '7',
    title: 'Time Capsule',
    slug: 'time-capsule',
    oneLiner: 'Digital time capsule for memories and notes.',
    status: 'Live',
    category: 'Lovable (Major)',
    typeBucket: 'App',
    tags: ['memories', 'journal', 'personal'],
    featured: true,
  },
  {
    id: '13',
    title: 'Paper Trail (Expense Manager)',
    slug: 'paper-trail',
    oneLiner: 'Expense manager app for fast logging, clean analytics, and habit-friendly tracking.',
    status: 'Live',
    category: 'Lovable (Major)',
    typeBucket: 'App',
    tags: ['expenses', 'finance', 'pwa', 'analytics', 'tracking'],
    featured: true,
    primaryLink: '',
  },
  {
    id: '6',
    title: 'Game Archive',
    slug: 'game-archive',
    oneLiner: 'Personal archive of games played and reviewed.',
    status: 'Live',
    category: 'Lovable (Major)',
    typeBucket: 'App',
    tags: ['games', 'archive', 'collection'],
    featured: false,
  },
  {
    id: '16',
    title: 'Sambhar Logistic Regression',
    slug: 'sambhar-logistic-regression',
    oneLiner: 'Logistic regression classifier project — functionally complete and self-hosted locally, not yet deployed to Vercel.',
    status: 'Live',
    category: 'Idea / Research',
    typeBucket: 'AI/ML',
    tags: ['ml', 'logistic-regression', 'python', 'scikit-learn', 'self-hosted'],
    featured: false,
    primaryLink: '',
  },
  {
    id: '12',
    title: 'RAG Project',
    slug: 'rag-project',
    oneLiner: 'A local-first RAG demo to learn ingestion → embeddings → retrieval → citations end-to-end. Functionally done, hosting TBD.',
    status: 'Live',
    category: 'Idea / Research',
    typeBucket: 'AI/ML',
    tags: ['rag', 'retrieval', 'embeddings', 'chunking', 'citations', 'self-hosted'],
    featured: false,
    primaryLink: '',
  },
  {
    id: '20',
    title: 'Kickoff 26',
    slug: 'kickoff-26',
    oneLiner: 'FIFA World Cup 2026 prediction site for a ~20-person friend group, with shareable prediction cards.',
    status: 'Live',
    category: 'Full-Stack / Custom Build',
    typeBucket: 'Full-Stack / Custom Build',
    tags: ['nextjs', 'supabase', 'sports', 'worldcup'],
    featured: false,
    primaryLink: '',
  },
  {
    id: '21',
    title: 'Odyssey',
    slug: 'odyssey',
    oneLiner: '[TBD — confirm stack/details] PWA gym workout tracker and guide.',
    status: 'Live',
    category: 'App',
    typeBucket: 'App',
    tags: ['fitness', 'pwa', 'tools'],
    featured: false,
    primaryLink: '',
  },

  // WIP
  {
    id: '1',
    title: 'Vanity Magazine',
    slug: 'vanity-magazine',
    oneLiner: 'Personal AI/build diary — projects, blog, learning roadmap, and current focus.',
    status: 'WIP',
    category: 'Lovable (Major)',
    typeBucket: 'App',
    tags: ['portfolio', 'vault', 'personal'],
    featured: false,
  },

  // POC
  {
    id: '11',
    title: 'Campaign Management Platform POC',
    slug: 'campaign-management-platform-poc',
    oneLiner: 'Proof-of-concept campaign management workflow for segmentation, creative generation, approvals, and execution.',
    status: 'POC',
    category: 'Office Demo / POC',
    typeBucket: 'Work Demo',
    tags: ['campaigns', 'automation', 'segmentation', 'poc', 'agentic'],
    featured: false,
    primaryLink: '',
  },
  {
    id: '8',
    title: 'KQL Streaming Demo',
    slug: 'kql-streaming-demo',
    oneLiner: 'Real-time KQL query visualization demo.',
    status: 'POC',
    category: 'Office Demo / POC',
    typeBucket: 'Work Demo',
    tags: ['kusto', 'streaming', 'demo'],
    featured: false,
  },
  {
    id: '18',
    title: 'GitHub MCP Server',
    slug: 'github-mcp-server',
    oneLiner: 'MCP server connecting Claude to GitHub — list repos, browse files, read file contents, and search code directly from chat, no manual copy-paste.',
    status: 'POC',
    category: 'Tool',
    typeBucket: 'Tool',
    tags: ['mcp', 'tools', 'github', 'automation'],
    featured: false,
    primaryLink: '',
  },
  {
    id: '19',
    title: 'Claude Skills System',
    slug: 'claude-skills-system',
    oneLiner: '[Confirm/edit] A library of custom Claude skills (BLUEPRINT, CRAFT, FOE+, MBB, PHD, SHIP, etc.) for structured product and dev workflows.',
    status: 'POC',
    category: 'Tool',
    typeBucket: 'Tool',
    tags: ['mcp', 'tools', 'learning'],
    featured: false,
    primaryLink: '',
  },
  {
    id: '3',
    title: 'Approval Mock MCP Server',
    slug: 'approval-mock-mcp',
    oneLiner: 'Custom GPT for simulating approval workflows.',
    status: 'POC',
    category: 'Custom GPT',
    typeBucket: 'Work Demo',
    tags: ['gpt', 'workflow', 'automation'],
    featured: false,
  },

  // Dream
  {
    id: '22',
    title: 'Game Project',
    slug: 'game-project',
    oneLiner: 'Concept-stage board/artifact game — not yet built.',
    status: 'Dream',
    category: 'Concept',
    typeBucket: 'Concept',
    tags: ['game', 'design', 'concept'],
    featured: false,
  },
];

// Seed posts
export const seedPosts: Post[] = [
  {
    id: '1',
    title: 'Building a Personal Vault with Lovable',
    slug: 'building-personal-vault',
    publishedOn: '2025-01-15',
    tags: ['lovable', 'development', 'journal'],
    projectId: '1',
    excerpt: 'Notes on creating Vanity Magazine — a Kino-inspired personal vault.',
    content: `# Building a Personal Vault with Lovable

This is the story of building Vanity Magazine, a personal vault for projects and ideas.

## The Vision

The goal was simple: create a dark, editorial-style portfolio that feels premium without being pretentious. Inspired by Kino's aesthetic — typography-first, minimal borders, generous whitespace.

## Tech Stack

- React + TypeScript + Vite
- Tailwind CSS with semantic tokens
- Framer Motion for subtle animations
- Supabase (Lovable Cloud) for backend

## Key Design Decisions

1. **Inter + Fraunces** — Sans for body, serif for display
2. **Muted gold accent** — #D6C7A1, used sparingly
3. **Big whitespace** — Sections breathe with 80-120px gaps
4. **Restrained motion** — Subtle fades, no circus effects

More to come as the project evolves.`,
  },
  {
    id: '2',
    title: 'On Project Statuses',
    slug: 'on-project-statuses',
    publishedOn: '2025-01-10',
    tags: ['process', 'organization'],
    excerpt: 'Why I categorize projects as WIP, Dream, Live, or Paused.',
    content: `# On Project Statuses

Every project in my vault has one of four statuses:

## WIP (Work in Progress)
Actively being built. These get the most attention.

## Dream
Ideas I want to explore but haven't started. Keeping them visible keeps them alive.

## Live
Shipped and running. Might still get updates, but core is done.

## Paused
Started but on hold. Not abandoned — just waiting for the right time.

This simple taxonomy helps me stay organized without overcomplicating things.`,
  },
  {
    id: '3',
    title: 'The Kino Aesthetic',
    slug: 'the-kino-aesthetic',
    publishedOn: '2025-01-05',
    tags: ['design', 'inspiration'],
    excerpt: 'What makes the Kino visual style so compelling.',
    content: `# The Kino Aesthetic

Kino's design philosophy centers on a few key principles:

## Typography First
The text is the hero. Display fonts are carefully chosen, sizing is generous, and hierarchy is crystal clear.

## Darkness as Canvas
Near-black backgrounds make content pop. The darkness isn't absence — it's intentional negative space.

## Restrained Motion
Animations are subtle and purposeful. No gratuitous effects, no scroll-jacking, no parallax overload.

## Premium Spacing
Generous gaps between sections. Each element has room to breathe.

This approach creates a sense of calm and focus that's rare in web design.`,
  },
];

// Helper functions
export function getProjectsByStatus(status: Project['status']): Project[] {
  return seedProjects.filter(p => p.status === status);
}

export function getFeaturedProjects(): Project[] {
  return seedProjects.filter(p => p.featured);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return seedProjects.find(p => p.slug === slug);
}

export function getPostBySlug(slug: string): Post | undefined {
  return seedPosts.find(p => p.slug === slug);
}

export function getLatestPosts(count: number = 3): Post[] {
  return [...seedPosts]
    .sort((a, b) => new Date(b.publishedOn).getTime() - new Date(a.publishedOn).getTime())
    .slice(0, count);
}

export function getPostForProject(projectId: string): Post | undefined {
  return seedPosts.find(p => p.projectId === projectId);
}
