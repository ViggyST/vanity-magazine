import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';
import { getPostBySlug, getProjectBySlug } from '@/data/seedData';

/**
 * Blog post detail page
 * Reading-optimized width (~680px)
 * Markdown content rendered with prose styling
 * Optional linked project reference
 */
export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;
  const linkedProject = post?.projectId ? getProjectBySlug(post.projectId) : undefined;

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-display-md mb-4">Post Not Found</h1>
          <Link to="/blog" className="text-primary hover:text-primary/80">
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const formattedDate = format(new Date(post.publishedOn), 'MMMM d, yyyy');

  // Simple markdown-like rendering (convert headers and paragraphs)
  const renderContent = (content: string) => {
    const lines = content.split('\n');
    const elements: JSX.Element[] = [];
    let currentParagraph: string[] = [];
    
    const flushParagraph = () => {
      if (currentParagraph.length > 0) {
        const text = currentParagraph.join(' ').trim();
        if (text) {
          elements.push(
            <p key={elements.length} className="text-body-lg text-muted-foreground mb-6">
              {text}
            </p>
          );
        }
        currentParagraph = [];
      }
    };

    lines.forEach((line, i) => {
      const trimmed = line.trim();
      
      if (trimmed.startsWith('# ')) {
        flushParagraph();
        elements.push(
          <h1 key={i} className="text-display-md mb-6 mt-12 first:mt-0">
            {trimmed.slice(2)}
          </h1>
        );
      } else if (trimmed.startsWith('## ')) {
        flushParagraph();
        elements.push(
          <h2 key={i} className="text-display-md text-2xl mb-4 mt-10">
            {trimmed.slice(3)}
          </h2>
        );
      } else if (trimmed === '') {
        flushParagraph();
      } else if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        flushParagraph();
        elements.push(
          <li key={i} className="text-body-lg text-muted-foreground ml-6 mb-2 list-disc">
            {trimmed.slice(2)}
          </li>
        );
      } else if (/^\d+\./.test(trimmed)) {
        flushParagraph();
        elements.push(
          <li key={i} className="text-body-lg text-muted-foreground ml-6 mb-2 list-decimal">
            {trimmed.replace(/^\d+\.\s*/, '')}
          </li>
        );
      } else {
        currentParagraph.push(trimmed);
      }
    });
    
    flushParagraph();
    return elements;
  };

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

      {/* Post Header */}
      <section className="pt-12 pb-8 px-6 lg:px-8 border-b border-border">
        <div className="reading-width">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-4">
              <time className="text-sm text-muted-foreground">
                {formattedDate}
              </time>
              {post.tags.length > 0 && (
                <div className="flex gap-2">
                  {post.tags.map(tag => (
                    <span key={tag} className="text-xs text-muted-foreground/70">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
            
            <h1 className="text-display-lg">
              {post.title}
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Post Content */}
      <article className="section-gap px-6 lg:px-8">
        <div className="reading-width">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {renderContent(post.content)}

            {/* Linked Project */}
            {linkedProject && (
              <div className="pt-12 mt-12 border-t border-border">
                <p className="text-sm text-muted-foreground mb-2">Related Project</p>
                <Link 
                  to={`/projects/${linkedProject.slug}`}
                  className="text-lg text-foreground hover:text-primary transition-colors"
                >
                  {linkedProject.title}
                </Link>
              </div>
            )}
          </motion.div>
        </div>
      </article>
    </div>
  );
}
