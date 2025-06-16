import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';

type Corner = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

interface TransitionContextType {
  isTransitioning: boolean;
  transitionToPage: (path: string, corner: Corner) => void;
}

const TransitionContext = createContext<TransitionContextType | undefined>(undefined);

export const useTransition = () => {
  const context = useContext(TransitionContext);
  if (!context) {
    throw new Error('useTransition must be used within TransitionProvider');
  }
  return context;
};

interface TransitionProviderProps {
  children: ReactNode;
}

export const TransitionProvider = ({ children }: TransitionProviderProps) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [pendingTransition, setPendingTransition] = useState<{ corner: Corner; isEntering: boolean } | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const getTransformOrigin = (corner: Corner): string => {
    switch (corner) {
      case 'top-left': return 'top left';
      case 'top-right': return 'top right';
      case 'bottom-left': return 'bottom left';
      case 'bottom-right': return 'bottom right';
    }
  };

  // Handle the entrance animation for new pages
  useEffect(() => {
    if (pendingTransition?.isEntering) {
      const newPage = document.querySelector('[data-page]');
      if (newPage) {
        const transformOrigin = getTransformOrigin(pendingTransition.corner);
        
        // Set initial state - scaled down from corner
        gsap.set(newPage, {
          scale: 0,
          opacity: 0,
          transformOrigin: transformOrigin,
        });

        // Animate to full scale
        gsap.to(newPage, {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          onComplete: () => {
            setIsTransitioning(false);
            setPendingTransition(null);
          }
        });
      } else {
        setIsTransitioning(false);
        setPendingTransition(null);
      }
    }
  }, [location.pathname, pendingTransition]);

  const transitionToPage = useCallback((path: string, corner: Corner) => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    const transformOrigin = getTransformOrigin(corner);
    
    // Get the current page element
    const currentPage = document.querySelector('[data-page]');
    if (!currentPage) {
      navigate(path);
      setIsTransitioning(false);
      return;
    }

    // Animate current page scaling down from corner
    gsap.to(currentPage, {
      scale: 0,
      opacity: 0,
      transformOrigin: transformOrigin,
      duration: 0.8,
      ease: "power2.inOut",
      onComplete: () => {
        // Set up the entrance animation for the new page
        setPendingTransition({ corner, isEntering: true });
        navigate(path);
      }
    });

  }, [isTransitioning, navigate]);

  return (
    <TransitionContext.Provider value={{
      isTransitioning,
      transitionToPage
    }}>
      {children}
    </TransitionContext.Provider>
  );
};