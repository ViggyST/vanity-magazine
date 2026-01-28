import { motion } from 'framer-motion';
import { siteConfig } from '@/data/siteConfig';
import { ScrollIndicator } from '@/components/ui/ScrollIndicator';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * Homepage with immersive hero section
 * Kino-inspired: typography-first, dark editorial, premium spacing
 * Fraunces for display headings, Inter for body
 */
export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section - Full viewport with dark gradient */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Dark gradient background - placeholder for cinematic image */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
        
        {/* Subtle texture overlay */}
        <div className="absolute inset-0 opacity-[0.02]" 
          style={{ 
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
          }} 
        />

        {/* Hero Content */}
        <div className="relative h-full flex flex-col items-center justify-center px-6">
          <motion.div
            className="text-center space-y-8 max-w-4xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <motion.h1
              className="text-display-xl"
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
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <ScrollIndicator />
          </motion.div>
        </div>
      </section>

      {/* Featured Projects Section - Placeholder */}
      <section className="section-gap-lg border-t border-border">
        <ScrollReveal>
          <div className="text-center mb-16 px-6">
            <h2 className="text-display-md mb-4">
              Featured Projects
            </h2>
            <p className="text-body-lg text-muted-foreground">
              A selection of what I'm working on
            </p>
          </div>
        </ScrollReveal>

        {/* Empty State */}
        <ScrollReveal delay={0.2}>
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center py-16">
              <p className="text-muted-foreground text-body-lg">
                Sign in to view your vault.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* View All Link */}
        <ScrollReveal delay={0.4}>
          <div className="flex justify-center mt-12 px-6">
            <Link
              to="/projects"
              className="group inline-flex items-center gap-2 text-body font-light tracking-wide text-muted-foreground hover:text-primary transition-colors"
            >
              <span>View All Projects</span>
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </ScrollReveal>
      </section>

      {/* Latest Posts Section - Placeholder */}
      <section className="section-gap-lg border-t border-border">
        <ScrollReveal>
          <div className="text-center mb-16 px-6">
            <h2 className="text-display-md mb-4">
              Latest Posts
            </h2>
            <p className="text-body-lg text-muted-foreground">
              Notes and documentation
            </p>
          </div>
        </ScrollReveal>

        {/* Empty State */}
        <ScrollReveal delay={0.2}>
          <div className="max-w-3xl mx-auto px-6">
            <div className="text-center py-16">
              <p className="text-muted-foreground text-body-lg">
                Sign in to view your vault.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* View All Link */}
        <ScrollReveal delay={0.4}>
          <div className="flex justify-center mt-12 px-6">
            <Link
              to="/blog"
              className="group inline-flex items-center gap-2 text-body font-light tracking-wide text-muted-foreground hover:text-primary transition-colors"
            >
              <span>View All Posts</span>
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}