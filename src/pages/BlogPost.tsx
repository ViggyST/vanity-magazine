import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

/**
 * Blog post detail page
 * Reading-optimized width (~680px)
 * Markdown content rendered beautifully
 * Optional linked project reference
 */
export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();

  return (
    <div className="min-h-screen">
      {/* Back link */}
      <section className="pt-8 px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <Link 
            to="/blog" 
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="size-4" />
            Back to Blog
          </Link>
        </div>
      </section>

      {/* Post Content */}
      <article className="section-gap px-6 lg:px-8">
        <div className="reading-width">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center py-24"
          >
            <p className="text-muted-foreground text-body-lg">
              Sign in to view this post.
            </p>
          </motion.div>
        </div>
      </article>
    </div>
  );
}