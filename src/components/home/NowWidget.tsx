import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Hammer, BookOpen, Rocket } from 'lucide-react';
import { useNowRecord } from '@/hooks/useNowRecord';
import { Skeleton } from '@/components/ui/skeleton';

const SECTIONS = [
  { key: 'currently_building', label: 'Building', icon: Hammer },
  { key: 'currently_learning', label: 'Learning', icon: BookOpen },
  { key: 'recently_shipped', label: 'Shipped', icon: Rocket },
] as const;

/**
 * Compact "Now" widget for the homepage -- condensed version of the /now page,
 * shows up to 2 items per category with a link through for the full picture.
 */
export function NowWidget() {
  const { data: now, isLoading, isError } = useNowRecord();

  if (isError) return null;

  const hasContent =
    now && SECTIONS.some((section) => now[section.key] && now[section.key].length > 0);

  return (
    <section className="section-gap border-t border-border/40">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {isLoading ? (
          <div className="grid md:grid-cols-3 gap-6">
            {SECTIONS.map((section) => (
              <div key={section.key} className="space-y-3">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-full" />
              </div>
            ))}
          </div>
        ) : hasContent ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-sm border border-border/60 p-6 md:p-8"
          >
            <div className="flex items-baseline justify-between mb-6">
              <h2 className="text-body font-normal tracking-wide">Right Now</h2>
              <Link
                to="/now"
                className="group inline-flex items-center gap-1 text-caption text-muted-foreground hover:text-primary transition-colors"
              >
                <span>Full picture</span>
                <ArrowRight className="size-3 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {SECTIONS.map((section) => {
                const items = now[section.key] ?? [];
                return (
                  <div key={section.key} className="space-y-2">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <section.icon className="size-4" />
                      <span className="text-caption tracking-wide">{section.label}</span>
                    </div>
                    {items.length > 0 ? (
                      <ul className="space-y-1">
                        {items.slice(0, 2).map((item, i) => (
                          <li key={i} className="text-sm text-foreground/90 line-clamp-1">
                            {item}
                          </li>
                        ))}
                        {items.length > 2 && (
                          <li className="text-sm text-muted-foreground/60">
                            +{items.length - 2} more
                          </li>
                        )}
                      </ul>
                    ) : (
                      <p className="text-sm text-muted-foreground/50">Nothing here.</p>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-sm border border-dashed border-border/60 p-8 text-center"
          >
            <p className="text-sm text-muted-foreground">
              Nothing logged in the vault yet — check{' '}
              <Link to="/now" className="text-primary hover:text-primary/80 transition-colors">
                Now
              </Link>{' '}
              again soon.
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
