import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabaseClient';
import type { PostSummary } from '@/components/blog/PostCard';

export function useBlogPosts() {
  return useQuery({
    queryKey: ['blog-posts'],
    queryFn: async (): Promise<PostSummary[]> => {
      const { data, error } = await supabase
        .from('blog')
        .select('id, title, slug, date, tags, excerpt')
        .order('date', { ascending: false });
      if (error) throw error;
      return data.map((row) => ({
        id: row.id,
        title: row.title,
        slug: row.slug,
        publishedOn: row.date,
        tags: row.tags,
        excerpt: row.excerpt,
      }));
    },
  });
}
