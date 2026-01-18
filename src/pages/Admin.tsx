import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, FolderKanban, FileText, Plus } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { siteConfig } from '@/data/siteConfig';

/**
 * Admin console page
 * All dense UI lives here only
 * Tabs: Projects / Posts / Quick Add
 * Protected route (requires auth)
 */
export default function Admin() {
  // TODO: Add auth check and redirect to /login if not authenticated

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
          <Tabs defaultValue="projects" className="space-y-6">
            <TabsList>
              <TabsTrigger value="projects" className="gap-2">
                <FolderKanban className="size-4" />
                Projects
              </TabsTrigger>
              <TabsTrigger value="posts" className="gap-2">
                <FileText className="size-4" />
                Posts
              </TabsTrigger>
              <TabsTrigger value="quick-add" className="gap-2">
                <Plus className="size-4" />
                Quick Add
              </TabsTrigger>
            </TabsList>

            <TabsContent value="projects" className="space-y-6">
              <div className="text-center py-24 border border-dashed border-border rounded-lg">
                <p className="text-muted-foreground">
                  Projects management coming soon.<br />
                  Enable Lovable Cloud to get started.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="posts" className="space-y-6">
              <div className="text-center py-24 border border-dashed border-border rounded-lg">
                <p className="text-muted-foreground">
                  Posts management coming soon.<br />
                  Enable Lovable Cloud to get started.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="quick-add" className="space-y-6">
              <div className="text-center py-24 border border-dashed border-border rounded-lg">
                <p className="text-muted-foreground">
                  Quick add coming soon.<br />
                  Enable Lovable Cloud to get started.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </main>
    </div>
  );
}