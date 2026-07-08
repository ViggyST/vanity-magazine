import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { siteConfig } from '@/data/siteConfig';
import {
  getFeaturedProjects,
  getProjectsByStatus,
} from '@/data/seedData';
import { useBlogPosts } from '@/hooks/useBlogPosts';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { PostCard } from '@/components/blog/PostCard';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { HeroSpotlight } from '@/components/home/HeroSpotlight';
import { NowWidget } from '@/components/home/NowWidget';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import heroImage from '@/assets/hero-home.jpg';

/**
 * Homepage with immersive hero section
 * Kino-inspired: typography-first, dark editorial, premium spacing
 * Fraunces for display headings, Inter for body
 */
export default function Home() {
  const featuredProjects = getFeaturedProjects();
  const wipProjects = getProjectsByStatus('WIP');
  const { data: posts, isLoading: postsLoading, isError: postsError } = useBlogPosts();
  const latestPosts = (posts ?? []).slice(0, 3);

  // Get first Live project for Spotlight (exclude from featured if same)
  const liveProjects = getProjectsByStatus('Live');
  const spotlightProject = liveProjects.find(
    p => !featuredProjects.slice(0, 3).some(fp => fp.id === p.id)
  ) || liveProjects[0];

  return (
    <div className="min-h-screen">
      {/* Hero Section - Full viewport with cinematic background */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Background image with overlay */}
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt=""
            className="w-full h-full object-cover saturate-[0.7]"
          />
          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
          <div className="absolute inset-0 bg-background/30" />
        </div>

        {/* Hero Content */}
        <div className="relative h-full flex flex-col items-center justify-center px-6">
          <motion.div
            className="text-center space-y-6 max-w-4xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            {/* Optional small label */}
            <motion.span
              className="text-caption text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              {siteConfig.hero.label}
            </motion.span>
            
            <motion.h1
              className="text-display-xl"
              style={{ textShadow: '0 4px 30px rgba(0,0,0,0.4)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              {siteConfig.hero.headline}
            </motion.h1>
            
            <motion.p
              className="text-body-lg text-muted-foreground max-w-xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              {siteConfig.hero.subheadline}
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <Button asChild size="lg">
                <Link to="/projects">View Projects</Link>
              </Button>
              <Link 
                to="/blog" 
                className="text-body text-muted-foreground hover:text-primary transition-colors"
              >
                Read Blog
              </Link>
            </motion.div>
          </motion.div>

          {/* Spotlight - 1 Live project */}
          {spotlightProject && (
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2">
              <HeroSpotlight project={spotlightProject} />
            </div>
          )}

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <div className="flex flex-col items-center gap-2">
              <span className="text-[10px] text-muted-foreground/60 tracking-widest uppercase">
                Scroll
              </span>
              <motion.div
                className="w-px h-6 bg-primary/30"
                animate={{ scaleY: [1, 0.5, 1] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Now Widget */}
      <NowWidget />

      {/* Featured Projects Section */}
      <section className="section-gap-lg border-t border-border/40">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeader
            title="Featured Projects"
            subtitle="A selection of what I'm working on"
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                index={index}
                variant="featured"
              />
            ))}
          </div>

          {/* View All Link */}
          <motion.div 
            className="flex justify-center mt-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Link
              to="/projects"
              className="group inline-flex items-center gap-2 text-body font-light tracking-wide text-muted-foreground hover:text-primary transition-colors"
            >
              <span>View All Projects</span>
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Building Now Section */}
      {wipProjects.length > 0 && (
        <section className="section-gap border-t border-border/40">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <SectionHeader 
              title="Building Now" 
              subtitle="Currently in progress"
            />

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wipProjects.slice(0, 3).map((project, index) => (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Latest Posts Section */}
      <section className="section-gap-lg border-t border-border/40">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <SectionHeader 
            title="Latest Posts" 
            subtitle="Notes and documentation"
          />

          <div>
            {postsLoading ? (
              <div className="space-y-4">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="flex items-baseline justify-between gap-4 py-4 border-b border-border/60">
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-3 w-16 shrink-0" />
                  </div>
                ))}
              </div>
            ) : postsError ? (
              <p className="text-muted-foreground text-body py-8 text-center">
                Couldn't load posts right now.
              </p>
            ) : latestPosts.length > 0 ? (
              latestPosts.map((post, index) => (
                <PostCard
                  key={post.id}
                  post={post}
                  index={index}
                  variant="compact"
                />
              ))
            ) : (
              <p className="text-muted-foreground text-body py-8 text-center">
                No posts yet.
              </p>
            )}
          </div>

          {/* View All Link */}
          <motion.div 
            className="flex justify-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Link
              to="/blog"
              className="group inline-flex items-center gap-2 text-body font-light tracking-wide text-muted-foreground hover:text-primary transition-colors"
            >
              <span>View All Posts</span>
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
