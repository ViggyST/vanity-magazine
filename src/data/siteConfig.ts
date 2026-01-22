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
    bio: `Add your bio here. What do you do? What are you passionate about? 
    
This site serves as a personal vault — a place to track projects, document learnings, and keep ideas alive.`,
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
  statuses: ['WIP', 'Dream', 'Live', 'Paused'] as const,
} as const;

export type ProjectCategory = typeof siteConfig.categories[number];
export type ProjectStatus = typeof siteConfig.statuses[number];