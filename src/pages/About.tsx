import { motion } from 'framer-motion';
import { Linkedin } from 'lucide-react';
import { siteConfig } from '@/data/siteConfig';
import coverFallback from '@/assets/cover-fallback.jpg';

/**
 * About page - Two-column layout
 * Left: visual (star night image)
 * Right: bio + LinkedIn link
 * Kino-clean aesthetic
 */
export default function About() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section-gap px-6 lg:px-8 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-display-lg mb-4">
              About
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Content Section - Two Column */}
      <section className="section-gap-lg px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            {/* Left: Visual */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-lg">
                <img
                  src={coverFallback}
                  alt="Night sky"
                  className="absolute inset-0 w-full h-full object-cover saturate-[0.85]"
                />
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
              </div>
            </motion.div>

            {/* Right: Content */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="space-y-8"
            >
              <div className="space-y-6">
                <h2 className="text-display-md">
                  {siteConfig.owner.displayName}
                </h2>
                
                <div className="space-y-4">
                  <p className="text-body-lg text-muted-foreground whitespace-pre-line">
                    {siteConfig.about.bio}
                  </p>
                </div>
              </div>

              {/* LinkedIn Link */}
              {siteConfig.owner.linkedIn && (
                <a
                  href={siteConfig.owner.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                >
                  <Linkedin className="size-5" />
                  <span className="text-body">Connect on LinkedIn</span>
                </a>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
