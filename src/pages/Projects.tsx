import { motion } from 'framer-motion';
import { 
  seedProjects, 
  getProjectsByStatus 
} from '@/data/seedData';
import { ProjectCard } from '@/components/projects/ProjectCard';
import { SectionHeader } from '@/components/ui/SectionHeader';

/**
 * Projects page - Browse all projects
 * Kino-clean: organized by status sections (WIP, Dream, Live, Paused)
 * No filters on public page - just clean sections
 */
export default function Projects() {
  const wipProjects = getProjectsByStatus('WIP');
  const dreamProjects = getProjectsByStatus('Dream');
  const liveProjects = getProjectsByStatus('Live');
  const pausedProjects = getProjectsByStatus('Paused');

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
              Projects
            </h1>
            <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
              Things I'm building, dreaming about, and shipping.
            </p>
          </motion.div>
        </div>
      </section>

      {/* WIP Section */}
      {wipProjects.length > 0 && (
        <section className="section-gap px-6 lg:px-8 border-b border-border">
          <div className="max-w-7xl mx-auto">
            <SectionHeader 
              title="Work in Progress" 
              subtitle="Actively building"
              align="left"
            />
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {wipProjects.map((project, index) => (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Dream Section */}
      {dreamProjects.length > 0 && (
        <section className="section-gap px-6 lg:px-8 border-b border-border">
          <div className="max-w-7xl mx-auto">
            <SectionHeader 
              title="Dream" 
              subtitle="Ideas waiting to be explored"
              align="left"
            />
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {dreamProjects.map((project, index) => (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Live Section */}
      {liveProjects.length > 0 && (
        <section className="section-gap px-6 lg:px-8 border-b border-border">
          <div className="max-w-7xl mx-auto">
            <SectionHeader 
              title="Live" 
              subtitle="Shipped and running"
              align="left"
            />
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {liveProjects.map((project, index) => (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Paused Section */}
      {pausedProjects.length > 0 && (
        <section className="section-gap px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <SectionHeader 
              title="Paused" 
              subtitle="On hold for now"
              align="left"
            />
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pausedProjects.map((project, index) => (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
