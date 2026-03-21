/**
 * Seed data for Vanity Magazine MVP
 * Static data until Supabase is connected
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

// Category to cover image mapping
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

// Project type
export interface Project {
  id: string;
  title: string;
  slug: string;
  oneLiner: string;
  status: 'WIP' | 'Dream' | 'Live' | 'Paused' | 'POC';
  category: string;
  tags: string[];
  featured: boolean;
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

// Seed projects
export const seedProjects: Project[] = [
  // WIP
  {
    id: '1',
    title: 'Vanity Magazine',
    slug: 'vanity-magazine',
    oneLiner: 'Personal vault for projects, ideas, and explorations.',
    status: 'WIP',
    category: 'Lovable (Major)',
    tags: ['portfolio', 'vault', 'personal'],
    featured: false,
  },
  {
    id: '2',
    title: 'Prompt Refiner',
    slug: 'prompt-refiner',
    oneLiner: 'UI/UX tool for iterating on AI prompts.',
    status: 'WIP',
    category: 'Lovable (Minor)',
    tags: ['ai', 'prompts', 'tool'],
    featured: false,
  },
  {
    id: '3',
    title: 'Approval Mock MCP Server',
    slug: 'approval-mock-mcp',
    oneLiner: 'Custom GPT for simulating approval workflows.',
    status: 'POC',
    category: 'Custom GPT',
    tags: ['gpt', 'workflow', 'automation'],
    featured: false,
  },

  // Dream
  {
    id: '4',
    title: 'Dream11 Website Rebuild',
    slug: 'dream11-rebuild',
    oneLiner: 'Modern redesign concept for Dream11.',
    status: 'Dream',
    category: 'Idea / Research',
    tags: ['sports', 'fantasy', 'redesign'],
    featured: false,
  },
  {
    id: '5',
    title: 'Online Board Game',
    slug: 'online-board-game',
    oneLiner: 'Digital version of a custom board game design.',
    status: 'Dream',
    category: 'Board Game / Design',
    tags: ['game', 'multiplayer', 'design'],
    featured: false,
  },

  // Live
  {
    id: '6',
    title: 'Game Archive',
    slug: 'game-archive',
    oneLiner: 'Personal archive of games played and reviewed.',
    status: 'Live',
    category: 'Lovable (Major)',
    tags: ['games', 'archive', 'collection'],
    featured: true,
  },
  {
    id: '7',
    title: 'Time Capsule',
    slug: 'time-capsule',
    oneLiner: 'Digital time capsule for memories and notes.',
    status: 'Live',
    category: 'Lovable (Major)',
    tags: ['memories', 'journal', 'personal'],
    featured: true,
  },
  {
    id: '8',
    title: 'KQL Streaming Demo',
    slug: 'kql-streaming-demo',
    oneLiner: 'Real-time KQL query visualization demo.',
    status: 'POC',
    category: 'Office Demo / POC',
    tags: ['kusto', 'streaming', 'demo'],
    featured: false,
  },
  {
    id: '9',
    title: 'Temple Landing Page',
    slug: 'temple-landing-page',
    oneLiner: 'Landing page for a local temple.',
    status: 'Live',
    category: 'Lovable (Minor)',
    tags: ['landing', 'community', 'web'],
    featured: false,
  },
  },
  {
    id: '11',
    title: 'Campaign Management Platform POC',
    slug: 'campaign-management-platform-poc',
    oneLiner: 'Proof-of-concept campaign management workflow for segmentation, creative generation, approvals, and execution.',
    status: 'Live',
    category: 'Office Demo / POC',
    tags: ['campaigns', 'automation', 'segmentation', 'poc', 'agentic'],
    featured: false,
    primaryLink: '',
  },
  {
    id: '12',
    title: 'RAG Project',
    slug: 'rag-project',
    oneLiner: 'A local-first RAG demo to learn ingestion → embeddings → retrieval → citations end-to-end.',
    status: 'WIP',
    category: 'Idea / Research',
    tags: ['rag', 'retrieval', 'embeddings', 'chunking', 'citations'],
    featured: false,
    primaryLink: '',
  },
  {
    id: '13',
    title: 'Paper Trail (Expense Manager)',
    slug: 'paper-trail',
    oneLiner: 'Expense manager app for fast logging, clean analytics, and habit-friendly tracking.',
    status: 'Live',
    category: 'Lovable (Major)',
    tags: ['expenses', 'finance', 'pwa', 'analytics', 'tracking'],
    featured: false,
    primaryLink: '',
  },
  {
    id: '14',
    title: 'MCP Learning Demo',
    slug: 'mcp-learning-demo',
    oneLiner: 'Experiments and notes to understand MCP patterns, tools, and agent workflows.',
    status: 'Dream',
    category: 'Idea / Research',
    tags: ['mcp', 'agents', 'tools', 'learning', 'demo'],
    featured: false,
    primaryLink: '',
  },
  {
    id: '15',
    title: 'Clawbot Project',
    slug: 'clawbot',
    oneLiner: 'A small bot prototype for automated actions and workflow experiments.',
    status: 'Dream',
    category: 'AI App / Script',
    tags: ['bot', 'automation', 'prototype', 'scripts', 'workflow'],
    featured: false,
    primaryLink: '',
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
