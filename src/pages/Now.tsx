import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Hammer, BookOpen, Rocket } from 'lucide-react';
import { useNowRecord } from '@/hooks/useNowRecord';
import { Skeleton } from '@/components/ui/skeleton';

const SECTIONS = [
  { key: 'currently_building', label: 'Currently Building', icon: Hammer },
  { key: 'currently_learning', label: 'Currently Learning', icon: BookOpen },
  { key: 'recently_shipped', label: 'Recently Shipped', icon: Rocket },
] as const;

/**
 * Now page - a snapshot of what's currently being built, learned, and shipped.
 * Reads the singleton vanitymagazine.now record.
 */
export default function Now() {
  const { data: now, isLoading, isError } = useNowRecord();

  return (
    <div className="min-h-screen">
      <section className="section-gap px-6 lg:px-8 border-b border-border">
        <div className="max-w-7xl mx-auto text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-display-lg mb-4">Now</h1>
            <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
              What I'm building, learning, and shipping — right now.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section-gap px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {isError ? (
            <div className="text-center py-24">
              <p className="text-muted-foreground text-body-lg">
                Couldn't load this right now. Try refreshing the page.
              </p>
            </div>
          ) : isLoading ? (
            <div className="space-y-12">
              {SECTIONS.map((section) => (
                <div key={section.key} className="space-y-4">
                  <Skeleton className="h-5 w-40" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              ))}
            </div>
          ) : now ? (
            <div className="space-y-12">
              {SECTIONS.map((section, index) => {
                const items = now[section.key];
                return (
                  <motion.div
                    key={section.key}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="space-y-4"
                  >
                    <div className="flex items-center gap-3">
                      <section.icon className="size-5 text-primary" />
                      <h2 className="text-body font-normal tracking-wide">{section.label}</h2>
                    </div>
                    {items.length > 0 ? (
                      <ul className="space-y-2 pl-8">
                        {items.map((item, i) => (
                          <li
                            key={i}
                            className="text-body-lg text-muted-foreground list-disc marker:text-primary/50"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-muted-foreground/70 pl-8">Nothing here yet.</p>
                    )}
                  </motion.div>
                );
              })}

              <p className="text-caption text-muted-foreground/60 pt-8 border-t border-border/40">
                Last updated {format(new Date(now.last_updated), 'MMMM d, yyyy')}
              </p>
            </div>
          ) : (
            <div className="text-center py-24">
              <p className="text-muted-foreground text-body-lg">
                Nothing to show yet — check back soon.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
