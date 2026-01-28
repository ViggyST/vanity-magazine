import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

/**
 * Project detail page
 * Shows individual project with cover image and details
 * Will be populated with real data from Supabase
 */
export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();

  return (
    <div className="min-h-screen">
      {/* Back link */}
      <section className="pt-8 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Link 
            to="/projects" 
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="size-4" />
            Back to Projects
          </Link>
        </div>
      </section>

      {/* Project Content */}
      <section className="section-gap px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center py-24"
          >
            <p className="text-muted-foreground text-body-lg">
              Sign in to view this project.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}