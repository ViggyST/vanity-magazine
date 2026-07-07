import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { format } from 'date-fns';

/** Fields PostCard actually renders -- any post-like source (static seedData or Supabase) can supply these. */
export interface PostSummary {
  id: string;
  title: string;
  slug: string;
  publishedOn: string;
  tags: string[];
  excerpt: string;
}

interface PostCardProps {
  post: PostSummary;
  index?: number;
  variant?: 'default' | 'compact';
}

export function PostCard({ post, index = 0, variant = 'default' }: PostCardProps) {
  const formattedDate = format(new Date(post.publishedOn), 'MMM d, yyyy');
  
  if (variant === 'compact') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
      >
        <Link
          to={`/blog/${post.slug}`}
          className="group flex items-baseline justify-between gap-4 py-4 border-b border-border/60 hover:border-primary/30 transition-colors"
        >
          <h3 className="text-body font-normal text-foreground group-hover:text-primary transition-colors line-clamp-1">
            {post.title}
          </h3>
          <time className="text-caption text-muted-foreground shrink-0">
            {formattedDate}
          </time>
        </Link>
      </motion.div>
    );
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link
        to={`/blog/${post.slug}`}
        className="group block py-8 border-b border-border/60 hover:border-primary/30 transition-colors"
      >
        <article className="space-y-3">
          <div className="flex items-center gap-4">
            <time className="text-sm text-muted-foreground">
              {formattedDate}
            </time>
            {post.tags.length > 0 && (
              <div className="flex gap-2">
                {post.tags.slice(0, 2).map(tag => (
                  <span key={tag} className="text-xs text-muted-foreground/70">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
          
          <h2 className="text-display-md text-foreground group-hover:text-primary transition-colors">
            {post.title}
          </h2>
          
          <p className="text-body text-muted-foreground max-w-2xl">
            {post.excerpt}
          </p>
        </article>
      </Link>
    </motion.div>
  );
}
