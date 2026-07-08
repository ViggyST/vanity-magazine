import { motion } from 'framer-motion';
import { useBlogPosts } from '@/hooks/useBlogPosts';
import { PostCard } from '@/components/blog/PostCard';
import { Skeleton } from '@/components/ui/skeleton';

/**
 * Blog page - List of blog posts (docs)
 * Kino-clean: title + date + tags
 * Clean typography, generous whitespace
 * Reads from vanitymagazine.blog (Session 5) -- single source of truth, not the static seedData array.
 */
export default function Blog() {
  const { data: posts, isLoading, isError } = useBlogPosts();

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
          {isLoading ? (
            <div className="space-y-8">
              {[0, 1, 2].map((i) => (
                <div key={i} className="py-8 border-b border-border/60 space-y-3">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-8 w-2/3" />
                  <Skeleton className="h-4 w-full max-w-lg" />
                </div>
              ))}
            </div>
          ) : isError ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center py-24"
            >
              <p className="text-muted-foreground text-body-lg">
                Couldn't load posts right now. Try refreshing the page.
              </p>
            </motion.div>
          ) : posts && posts.length > 0 ? (
            <div>
              {posts.map((post, index) => (
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
