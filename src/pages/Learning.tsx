import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabaseClient';
import { Skeleton } from '@/components/ui/skeleton';
import type { LearningStatus } from '@/types/supabase';

const COLUMNS: { status: LearningStatus; label: string; description: string }[] = [
  { status: 'Learned', label: 'Learned', description: 'Locked in' },
  { status: 'Learning', label: 'Learning', description: 'In progress' },
  { status: 'Planned', label: 'Planned', description: 'Queued up' },
];

interface LearningItem {
  id: string;
  topic: string;
  status: LearningStatus;
  notes: string | null;
  linked_post: { title: string; slug: string } | null;
}

/**
 * Learning roadmap page - Kanban-style board (Learned / Learning / Planned)
 * Reads from vanitymagazine.learning_roadmap, grouped by status client-side.
 */
export default function LearningPage() {
  const { data: items, isLoading, isError } = useQuery({
    queryKey: ['learning-roadmap'],
    queryFn: async (): Promise<LearningItem[]> => {
      const { data, error } = await supabase
        .from('learning_roadmap')
        .select('id, topic, status, notes, linked_post:blog(title, slug)')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data as unknown as LearningItem[];
    },
  });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section-gap px-6 lg:px-8 border-b border-border">
        <div className="max-w-7xl mx-auto text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-display-lg mb-4">Learning</h1>
            <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
              What I've learned, what I'm learning, and what's next.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Kanban Board */}
      <section className="section-gap px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {isError ? (
            <div className="text-center py-24">
              <p className="text-muted-foreground text-body-lg">
                Couldn't load the roadmap right now. Try refreshing the page.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {COLUMNS.map((column, columnIndex) => {
                const columnItems = items?.filter((item) => item.status === column.status) ?? [];

                return (
                  <motion.div
                    key={column.status}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: columnIndex * 0.1 }}
                    className="space-y-4"
                  >
                    <div className="flex items-baseline justify-between pb-3 border-b border-border">
                      <h2 className="text-body font-normal tracking-wide">{column.label}</h2>
                      <span className="text-caption text-muted-foreground">
                        {column.description}
                      </span>
                    </div>

                    <div className="space-y-3">
                      {isLoading ? (
                        [0, 1].map((i) => (
                          <div key={i} className="rounded-sm border border-border/60 p-4 space-y-2">
                            <Skeleton className="h-4 w-2/3" />
                            <Skeleton className="h-3 w-full" />
                          </div>
                        ))
                      ) : columnItems.length > 0 ? (
                        columnItems.map((item) => (
                          <div
                            key={item.id}
                            className="rounded-sm border border-border/60 p-4 space-y-2 hover:border-primary/30 transition-colors"
                          >
                            <h3 className="text-body font-normal text-foreground">
                              {item.topic}
                            </h3>
                            {item.notes && (
                              <p className="text-sm text-muted-foreground">{item.notes}</p>
                            )}
                            {item.linked_post && (
                              <Link
                                to={`/blog/${item.linked_post.slug}`}
                                className="inline-block text-xs text-primary hover:text-primary/80 transition-colors"
                              >
                                {item.linked_post.title} →
                              </Link>
                            )}
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-muted-foreground/70 py-6 text-center">
                          Nothing here yet.
                        </p>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
