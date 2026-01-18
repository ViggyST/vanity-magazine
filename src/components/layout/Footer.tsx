import { Linkedin } from 'lucide-react';
import { siteConfig } from '@/data/siteConfig';

/**
 * Minimal footer component
 * Clean, Kino-style with just essentials
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Copyright */}
          <p className="text-sm text-muted-foreground font-light tracking-wide">
            © {currentYear} {siteConfig.name}
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-6">
            {siteConfig.owner.linkedIn && (
              <a
                href={siteConfig.owner.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="size-5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}