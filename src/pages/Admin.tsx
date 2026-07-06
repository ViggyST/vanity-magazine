import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText, ListChecks, Sparkles, LogOut } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/data/siteConfig';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabaseClient';
import { LoadingFallback } from '@/components/ui/LoadingFallback';
import { BlogPostForm } from '@/components/admin/BlogPostForm';
import { LearningRoadmapForm } from '@/components/admin/LearningRoadmapForm';
import { NowForm } from '@/components/admin/NowForm';

/**
 * Admin console page — protected route, requires an authenticated session.
 * Tabs: Blog Post / Learning Roadmap / Now
 *
 * Redirects use a hard `window.location.href` rather than react-router's `navigate()` --
 * a client-side navigate() between two lazy-loaded routes here gets stuck indefinitely on
 * the Suspense fallback (AnimatePresence's mode="wait" + a single shared Suspense boundary
 * around all lazy routes in App.tsx interact badly when the incoming route is also lazy).
 * A hard redirect sidesteps it entirely and is arguably more correct for an auth boundary.
 */
export default function Admin() {
  const { session, loading, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      window.location.href = '/login';
    }
  }, [loading, isAuthenticated]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = '/login';
  };

  if (loading || !session) {
    return <LoadingFallback />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Admin Header */}
      <header className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                to="/"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="size-5" />
              </Link>
              <h1 className="font-display text-xl">{siteConfig.name} Admin</h1>
            </div>
            <Button variant="ghost" size="sm" onClick={handleSignOut} className="gap-2">
              <LogOut className="size-4" />
              Sign out
            </Button>
          </div>
        </div>
      </header>

      {/* Admin Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Tabs defaultValue="blog" className="space-y-6">
            <TabsList>
              <TabsTrigger value="blog" className="gap-2">
                <FileText className="size-4" />
                Blog Post
              </TabsTrigger>
              <TabsTrigger value="learning" className="gap-2">
                <ListChecks className="size-4" />
                Learning Roadmap
              </TabsTrigger>
              <TabsTrigger value="now" className="gap-2">
                <Sparkles className="size-4" />
                Now
              </TabsTrigger>
            </TabsList>

            <TabsContent value="blog" className="max-w-2xl">
              <BlogPostForm />
            </TabsContent>

            <TabsContent value="learning" className="max-w-2xl">
              <LearningRoadmapForm />
            </TabsContent>

            <TabsContent value="now" className="max-w-2xl">
              <NowForm />
            </TabsContent>
          </Tabs>
        </motion.div>
      </main>
    </div>
  );
}
