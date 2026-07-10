/**
 * Site configuration for Vanity Magazine
 * Central place for site-wide content and settings
 */

export const siteConfig = {
  // Site identity
  name: 'Vanity Magazine',
  tagline: 'A Personal Vault',
  description: 'Projects, ideas, and explorations in one place.',
  
  // Owner info (used for auth + display)
  owner: {
    displayName: 'Your Name', // Replace with your name
    email: 'vigneswaran235@gmail.com', // Hardcoded for auth
    linkedIn: 'https://linkedin.com/in/yourprofile', // Replace with your LinkedIn
  },
  
  // Hero content
  hero: {
    label: 'Personal Vault',
    headline: 'What I build. What I learn. What ships.',
    subheadline: 'A private archive of projects, ideas, and documentation.',
    introduction: 'Building, exploring, and documenting the journey.',
  },
  
  // About page content
  about: {
    bio: `Product Manager in fintech. I spend my day job on specs, funnels, and metrics — and my off-hours building things: fantasy sports tools, AI agents, personal automation, the occasional dive into ML I have no business doing on a weeknight.

This site is a private vault — a place to track what I'm building, document what I'm learning, and keep half-finished ideas from disappearing into a notes app graveyard.`,
  },
  
  // Project categories (locked for MVP)
  categories: [
    'Lovable (Major)',
    'Lovable (Minor)',
    'Custom GPT',
    'Office Demo / POC',
    'AI App / Script',
    'Board Game / Design',
    'Idea / Research',
  ] as const,
  
  // Project statuses
  statuses: ['WIP', 'Dream', 'Live', 'Paused', 'POC'] as const,
} as const;

export type ProjectCategory = typeof siteConfig.categories[number];
export type ProjectStatus = typeof siteConfig.statuses[number];