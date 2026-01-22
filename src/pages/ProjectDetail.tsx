import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Github, BookOpen } from 'lucide-react';
import { getProjectBySlug, getCoverForCategory, getPostForProject } from '@/data/seedData';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const statusColors: Record<string, string> = {
  WIP: 'bg-primary/20 text-primary',
  Dream: 'bg-muted text-muted-foreground',
  Live: 'bg-emerald-500/20 text-emerald-400',
  Paused: 'bg-muted text-muted-foreground',
};

/**
 * Project detail page
 * Shows project info with cinematic cover image and structured content
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
            className="space-y-10"
          >
            {/* Overview */}
            <div className="space-y-4">
              <h2 className="text-caption text-muted-foreground">Overview</h2>
              <p className="text-body-lg text-foreground/90">
                {project.oneLiner}
              </p>
            </div>

            {/* Meta row: Status | Category | Year */}
            <div className="flex flex-wrap items-center gap-4 py-6 border-y border-border/40">
              <div className="flex items-center gap-2">
                <span className="text-caption text-muted-foreground">Status</span>
                <span className={cn(
                  "px-3 py-1 text-xs font-medium rounded-full",
                  statusColors[project.status]
                )}>
                  {project.status}
                </span>
              </div>
              <div className="w-px h-4 bg-border/60" />
              <div className="flex items-center gap-2">
                <span className="text-caption text-muted-foreground">Type</span>
                <span className="text-sm text-foreground/80">{project.category}</span>
              </div>
            </div>

            {/* Stack chips */}
            {project.tags.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-caption text-muted-foreground">Stack</h2>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span 
                      key={tag}
                      className="px-3 py-1.5 text-sm text-foreground/80 bg-white/5 border border-border/40 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Links block */}
            <div className="space-y-4">
              <h2 className="text-caption text-muted-foreground">Links</h2>
              <div className="flex flex-wrap gap-3">
                {project.primaryLink && (
                  <Button asChild variant="default" size="sm">
                    <a
                      href={project.primaryLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2"
                    >
                      <ExternalLink className="size-4" />
                      Live Site
                    </a>
                  </Button>
                )}
                <Button asChild variant="outline" size="sm">
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 opacity-50 pointer-events-none"
                  >
                    <Github className="size-4" />
                    GitHub
                  </a>
                </Button>
                <Button asChild variant="outline" size="sm">
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 opacity-50 pointer-events-none"
                  >
                    <BookOpen className="size-4" />
                    Docs
                  </a>
                </Button>
              </div>
            </div>

            {/* Related post */}
            {relatedPost && (
              <div className="pt-8 border-t border-border/40 space-y-3">
                <h2 className="text-caption text-muted-foreground">Related Post</h2>
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
