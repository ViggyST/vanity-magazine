import { motion } from 'framer-motion';
import { seedPosts } from '@/data/seedData';
import { PostCard } from '@/components/blog/PostCard';

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

      {/* Posts List */}
      <section className="section-gap px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {seedPosts.length > 0 ? (
            <div>
              {seedPosts.map((post, index) => (
                <PostCard 
                  key={post.id} 
                  post={post} 
                  index={index}
                />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center py-24"
            >
              <p className="text-muted-foreground text-body-lg">
                No posts yet.
              </p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
