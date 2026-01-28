import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { getProjectBySlug, getCoverForCategory, getPostForProject } from '@/data/seedData';
import { cn } from '@/lib/utils';

const statusColors: Record<string, string> = {
  WIP: 'bg-primary/20 text-primary',
  Dream: 'bg-muted text-muted-foreground',
  Live: 'bg-emerald-500/20 text-emerald-400',
  Paused: 'bg-muted text-muted-foreground',
};

/**
 * Project detail page
 * Shows project info with cinematic cover image
 */
export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;
  const relatedPost = project ? getPostForProject(project.id) : undefined;

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-display-md mb-4">Project Not Found</h1>
          <Link to="/projects" className="text-primary hover:text-primary/80">
            ← Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  const coverUrl = project.coverUrl || getCoverForCategory(project.category);

  return (
    <div className="min-h-screen">
      {/* Hero with cover image */}
      <section className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <img
          src={coverUrl}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover saturate-[0.85]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/30" />
        
        {/* Back link */}
        <div className="absolute top-8 left-6 lg:left-8 z-10">
          <Link 
            to="/projects" 
            className="inline-flex items-center gap-2 text-sm text-foreground/80 hover:text-foreground transition-colors backdrop-blur-sm bg-background/20 px-3 py-1.5 rounded-full"
          >
            <ArrowLeft className="size-4" />
            Back to Projects
          </Link>
        </div>

        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-12">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-3">
                <span className={cn(
                  "px-3 py-1 text-xs font-medium rounded-full",
                  statusColors[project.status]
                )}>
                  {project.status}
                </span>
                <span className="text-sm text-muted-foreground">
                  {project.category}
                </span>
              </div>
              
              <h1 className="text-display-lg">
                {project.title}
              </h1>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-gap px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <p className="text-body-lg text-muted-foreground">
              {project.oneLiner}
            </p>

            {/* Tags */}
            {project.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {project.tags.map(tag => (
                  <span 
                    key={tag}
                    className="px-3 py-1 text-sm text-muted-foreground bg-secondary rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Primary link */}
            {project.primaryLink && (
              <a
                href={project.primaryLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
              >
                <span>Visit Project</span>
                <ExternalLink className="size-4" />
              </a>
            )}

            {/* Related post */}
            {relatedPost && (
              <div className="pt-8 border-t border-border">
                <p className="text-sm text-muted-foreground mb-2">Related Post</p>
                <Link 
                  to={`/blog/${relatedPost.slug}`}
                  className="text-lg text-foreground hover:text-primary transition-colors"
                >
                  {relatedPost.title}
                </Link>
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
