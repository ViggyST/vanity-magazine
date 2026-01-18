import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Project, getCoverForCategory } from '@/data/seedData';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
  project: Project;
  index?: number;
  variant?: 'default' | 'featured';
}

const statusColors: Record<string, string> = {
  WIP: 'bg-primary/20 text-primary',
  Dream: 'bg-muted text-muted-foreground',
  Live: 'bg-emerald-500/20 text-emerald-400',
  Paused: 'bg-muted text-muted-foreground',
};

export function ProjectCard({ project, index = 0, variant = 'default' }: ProjectCardProps) {
  const coverUrl = project.coverUrl || getCoverForCategory(project.category);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link
        to={`/projects/${project.slug}`}
        className="group block"
      >
        <article className="space-y-4">
          {/* Cover Image with overlay */}
          <div className={cn(
            "relative overflow-hidden rounded-lg",
            variant === 'featured' ? 'aspect-[16/10]' : 'aspect-[4/3]'
          )}>
            {/* Image */}
            <img
              src={coverUrl}
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 saturate-[0.85]"
            />
            
            {/* Dark gradient overlay for readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent" />
            
            {/* Status pill */}
            <div className="absolute top-4 left-4">
              <span className={cn(
                "px-3 py-1 text-xs font-medium rounded-full backdrop-blur-sm",
                statusColors[project.status]
              )}>
                {project.status}
              </span>
            </div>
            
            {/* Title overlay at bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <h3 className="text-xl font-display font-normal text-foreground group-hover:text-primary transition-colors">
                {project.title}
              </h3>
            </div>
          </div>
          
          {/* Meta below image */}
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground line-clamp-2">
              {project.oneLiner}
            </p>
            <p className="text-xs text-muted-foreground/70">
              {project.category}
            </p>
          </div>
        </article>
      </Link>
    </motion.div>
  );
}
