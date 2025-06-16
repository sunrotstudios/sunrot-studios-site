import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { clsx } from 'clsx';
import { useTransition } from '../../contexts/TransitionContext';

const Navigation: FC = () => {
  const location = useLocation();
  const { transitionToPage, isTransitioning } = useTransition();
  
  const isHome = location.pathname === '/';
  const currentPath = location.pathname;

  const handleNavClick = (e: React.MouseEvent, path: string, corner: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right') => {
    e.preventDefault();
    if (isTransitioning || location.pathname === path) return;
    transitionToPage(path, corner);
  };

  const getNavItemClasses = (path: string) => {
    const isActive = currentPath === path;
    return clsx(
      "text-sm font-medium transition-colors",
      isActive ? "text-black cursor-default" : "text-gray-400 hover:text-gray-600"
    );
  };

  return (
    <>
      {/* Top Left - EVENTS (hidden when on events page) or HOME (when on events page) */}
      {currentPath !== '/events' ? (
        <nav className="fixed top-8 left-8 z-50">
          <button
            onClick={(e) => handleNavClick(e, '/events', 'top-left')}
            className={getNavItemClasses('/events')}
            disabled={isTransitioning}
          >
            EVENTS
          </button>
        </nav>
      ) : (
        <nav className="fixed top-8 left-8 z-50">
          <button
            onClick={(e) => handleNavClick(e, '/', 'top-left')}
            className={getNavItemClasses('/')}
            disabled={isTransitioning}
          >
            HOME
          </button>
        </nav>
      )}

      {/* Top Right - ABOUT (hidden when on about page) */}
      {currentPath !== '/about' && (
        <nav className="fixed top-8 right-8 z-50">
          <button
            onClick={(e) => handleNavClick(e, '/about', 'top-right')}
            className={getNavItemClasses('/about')}
            disabled={isTransitioning}
          >
            ABOUT
          </button>
        </nav>
      )}

      {/* Bottom Left - ROTWARE (hidden when on rotware page) */}
      {currentPath !== '/rotware' && (
        <nav className="fixed bottom-8 left-8 z-50">
          <button
            onClick={(e) => handleNavClick(e, '/rotware', 'bottom-left')}
            className={getNavItemClasses('/rotware')}
            disabled={isTransitioning}
          >
            ROTWARE
          </button>
        </nav>
      )}

      {/* Bottom Right - PERIPHERAL VISION (hidden when on peripheral-vision page) */}
      {currentPath !== '/peripheral-vision' && (
        <nav className="fixed bottom-8 right-8 z-50">
          <button
            onClick={(e) => handleNavClick(e, '/peripheral-vision', 'bottom-right')}
            className={getNavItemClasses('/peripheral-vision')}
            disabled={isTransitioning}
          >
            PERIPHERAL VISION
          </button>
        </nav>
      )}
    </>
  );
};

export default Navigation;