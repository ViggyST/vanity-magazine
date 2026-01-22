import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Project, getCoverForCategory } from '@/data/seedData';
import { cn } from '@/lib/utils';

interface HeroSpotlightProps {
  project: Project;
  /** IDs of projects to exclude (e.g., featured projects) */
  excludeIds?: string[];
}

/**
 * Compact spotlight module for hero section
 * Shows 1 Live project in a minimal, text-forward style
 */
export function HeroSpotlight({ project }: HeroSpotlightProps) {
  const coverUrl = project.coverUrl || getCoverForCategory(project.category);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6 }}
      className="w-full max-w-md"
    >
      <Link
        to={`/projects/${project.slug}`}
        className="group flex items-center gap-4 p-4 rounded-2xl border border-border/40 bg-background/30 backdrop-blur-sm hover:border-primary/30 transition-all duration-300"
      >
        {/* Small cover image */}
        <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0">
          <img
            src={coverUrl}
            alt={project.title}
            className="absolute inset-0 w-full h-full object-cover saturate-[0.85]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
        </div>
        
        {/* Text content */}
        <div className="flex-1 min-w-0 space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-caption text-emerald-400">Live</span>
          </div>
          <h4 className="text-sm font-display text-foreground group-hover:text-primary transition-colors line-clamp-1">
            {project.title}
          </h4>
        </div>
        
        {/* Arrow */}
        <ArrowUpRight className="size-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
      </Link>
    </motion.div>
  );
}
