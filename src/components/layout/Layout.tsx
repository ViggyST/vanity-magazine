import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';

interface LayoutProps {
  children: ReactNode;
}

/**
 * Main layout wrapper component
 * Provides consistent header and footer across all pages
 * Homepage removes top padding to allow header overlay on hero
 * Admin pages get no header/footer (full control in admin layout)
 */
export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const isHomepage = location.pathname === '/';
  const isAdminPage = location.pathname.startsWith('/admin');
  const isLoginPage = location.pathname === '/login';

  // Admin and login pages render without header/footer
  if (isAdminPage || isLoginPage) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-1">
          {children}
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main 
        id="main-content" 
        className={`flex-1 ${isHomepage ? '' : 'pt-16'}`}
        tabIndex={-1}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
}