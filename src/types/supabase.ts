/**
 * Hand-written types for the `vanitymagazine` schema (Supabase).
 * Mirrors supabase/migrations/20260706070134_create_vanitymagazine_schema.sql exactly.
 * `generate_typescript_types` only covers the `public` schema on this shared project
 * (Odyssey's tables), so these are maintained by hand until that changes.
 */

export type PostType = 'thought' | 'learning-note' | 'paper-review' | 'product-find' | 'essay';
export type LearningStatus = 'Learned' | 'Learning' | 'Planned';

export interface BlogRow {
  id: string;
  title: string;
  slug: string;
  date: string;
  tags: string[];
  post_type: PostType;
  excerpt: string;
  content: string;
  linked_project: string | null;
  created_at: string;
}

export interface LearningRoadmapRow {
  id: string;
  topic: string;
  status: LearningStatus;
  notes: string | null;
  linked_blog_post: string | null;
  created_at: string;
}

export interface NowRow {
  id: number;
  currently_building: string[];
  currently_learning: string[];
  recently_shipped: string[];
  last_updated: string;
}

export interface VanityMagazineSchema {
  blog: {
    Row: BlogRow;
    Insert: Omit<BlogRow, 'id' | 'created_at'> & { id?: string; created_at?: string };
    Update: Partial<BlogRow>;
  };
  learning_roadmap: {
    Row: LearningRoadmapRow;
    Insert: Omit<LearningRoadmapRow, 'id' | 'created_at'> & { id?: string; created_at?: string };
    Update: Partial<LearningRoadmapRow>;
  };
  now: {
    Row: NowRow;
    Insert: Partial<NowRow>;
    Update: Partial<NowRow>;
  };
}
