import { motion } from 'framer-motion';

/**
 * Blog page - List of blog posts (docs)
 * Kino-clean: title + date + tags
 * Clean typography, generous whitespace
 */
export default function Blog() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section-gap px-6 lg:px-8 border-b border-border">
        <div className="max-w-7xl mx-auto text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-display-lg mb-4">
              Blog
            </h1>
            <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
              Notes, learnings, and documentation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Empty State */}
      <section className="section-gap px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center py-24"
          >
            <p className="text-muted-foreground text-body-lg">
              Sign in to view your vault.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}