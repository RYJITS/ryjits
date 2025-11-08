import React, { useState, useEffect, useRef } from 'react';
import { Page } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import RoomsPage from './pages/RoomsPage';
import ExcursionsPage from './pages/ExcursionsPage';
import TransfersPage from './pages/TransfersPage';
import PackagesPage from './pages/PackagesPage';
import ContactPage from './pages/ContactPage';
import { logEvent } from './services/chichiLog';
import { useDebugMode } from './hooks/useDebugMode';
import DebugOverlay from './components/DebugOverlay';
import BottomNav from './components/BottomNav';
import { LocalizationProvider, useTranslation } from './contexts/LocalizationContext';

const sections: { page: Page; component: React.FC }[] = [
    { page: Page.Home, component: HomePage },
    { page: Page.Rooms, component: RoomsPage },
    { page: Page.Excursions, component: ExcursionsPage },
    { page: Page.Transfers, component: TransfersPage },
    { page: Page.Packages, component: PackagesPage },
    { page: Page.Contact, component: ContactPage },
];

const AppContent: React.FC = () => {
  const [activePage, setActivePage] = useState<Page>(Page.Home);
  const isDebug = useDebugMode();
  const observer = useRef<IntersectionObserver | null>(null);
  const isNavigating = useRef(false);
  const navigationTimeoutRef = useRef<number | null>(null);
  const { isLoaded } = useTranslation();

  useEffect(() => {
    logEvent('page-load', { url: window.location.href });

    const handleImageError = (event: Event) => {
      const target = event.target as HTMLImageElement;
      if (target && target.tagName === 'IMG') {
          logEvent('img-404', { src: target.src });
      }
    };

    window.addEventListener('error', handleImageError, true);

    return () => {
      window.removeEventListener('error', handleImageError, true);
    };
  }, []);
  
  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    if (isNavigating.current) return;

    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const pageId = entry.target.id.toUpperCase();
        if (Object.values(Page).includes(pageId as Page)) {
          logEvent('section-enter', { page: pageId });
          setActivePage(pageId as Page);
        }
      }
    });
  };

  useEffect(() => {
    if (!isLoaded) return; // Wait for translations to load

    observer.current = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: '0px',
      threshold: 0.4, 
    });

    const sectionElements = document.querySelectorAll('section[id]');
    sectionElements.forEach(sec => observer.current?.observe(sec));

    return () => {
      sectionElements.forEach(sec => observer.current?.unobserve(sec));
      if (navigationTimeoutRef.current) {
        clearTimeout(navigationTimeoutRef.current);
      }
    };
  }, [isLoaded]);

  const handleNavClick = (page: Page) => {
    isNavigating.current = true;
    setActivePage(page);
    logEvent('nav-click', { page });
    
    const element = document.getElementById(page.toLowerCase());
    if (element) {
        const headerOffset = 80; // Account for sticky header
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }

    if (navigationTimeoutRef.current) {
        clearTimeout(navigationTimeoutRef.current);
    }

    navigationTimeoutRef.current = window.setTimeout(() => {
        isNavigating.current = false;
    }, 1000); // Re-enable observer logic after 1s, assuming scroll completes
  };

  if (!isLoaded) {
    return <div className="fixed inset-0 bg-stone-50 flex items-center justify-center"><p>Loading...</p></div>;
  }

  return (
    <div className="bg-stone-50 min-h-screen font-sans text-stone-800">
      <Header activePage={activePage} onNavClick={handleNavClick} />
      <main className="pb-20 md:pb-0">
        {sections.map(({ page, component: Component }) => (
          <section key={page} id={page.toLowerCase()}>
            <Component />
          </section>
        ))}
      </main>
      <Footer />
      <BottomNav activePage={activePage} onNavClick={handleNavClick} />
      {isDebug && <DebugOverlay />}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <LocalizationProvider>
      <AppContent />
    </LocalizationProvider>
  )
}

export default App;