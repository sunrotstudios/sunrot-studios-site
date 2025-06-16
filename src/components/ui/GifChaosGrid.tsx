import { FC, useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface GifChaosGridProps {
  className?: string;
  intensity?: 'subtle' | 'moderate' | 'intense';
  size?: 'small' | 'medium' | 'large';
}

const GifChaosGrid: FC<GifChaosGridProps> = ({ 
  className = '',
  intensity = 'moderate',
  size = 'medium'
}) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const [currentGifs, setCurrentGifs] = useState<string[]>([]);
  const intervalsRef = useRef<NodeJS.Timeout[]>([]);

  // All available GIFs
  const availableGifs = [
    '/src/assets/media/car-dancing.gif',
    '/src/assets/media/circle.gif',
    '/src/assets/media/color-lump.gif',
    '/src/assets/media/digital-woman.gif',
    '/src/assets/media/infinite-hallway.gif',
    '/src/assets/media/leaves.gif',
    '/src/assets/media/rorshack.gif',
    '/src/assets/media/white-circle.gif'
  ];

  // Professional timing based on intensity
  const getTimingConfig = () => {
    switch (intensity) {
      case 'subtle':
        return { baseDelay: 3000, variation: 1000, changeChance: 0.3 };
      case 'moderate':
        return { baseDelay: 2000, variation: 800, changeChance: 0.5 };
      case 'intense':
        return { baseDelay: 1000, variation: 500, changeChance: 0.7 };
      default:
        return { baseDelay: 2000, variation: 800, changeChance: 0.5 };
    }
  };

  // Grid size configuration
  const getGridConfig = () => {
    switch (size) {
      case 'small':
        return { cols: 2, cells: 4 };
      case 'medium':
        return { cols: 3, cells: 6 };
      case 'large':
        return { cols: 3, cells: 9 };
      default:
        return { cols: 3, cells: 6 };
    }
  };

  const gridConfig = getGridConfig();
  const timingConfig = getTimingConfig();

  // Initialize GIFs
  useEffect(() => {
    const initialGifs = Array(gridConfig.cells)
      .fill(null)
      .map(() => availableGifs[Math.floor(Math.random() * availableGifs.length)]);
    
    setCurrentGifs(initialGifs);
  }, [gridConfig.cells]);

  // Professional controlled transitions
  useEffect(() => {
    if (currentGifs.length === 0) return;

    // Clear existing intervals
    intervalsRef.current.forEach(interval => clearInterval(interval));
    intervalsRef.current = [];

    // Create controlled intervals for each cell
    for (let i = 0; i < gridConfig.cells; i++) {
      const cellDelay = timingConfig.baseDelay + (i * 200) + (Math.random() * timingConfig.variation);
      
      const interval = setInterval(() => {
        // Only change if random chance allows (controlled chaos)
        if (Math.random() < timingConfig.changeChance) {
          setCurrentGifs(prev => {
            const newGifs = [...prev];
            const newGif = availableGifs[Math.floor(Math.random() * availableGifs.length)];
            
            // Avoid repeating the same GIF immediately
            if (newGif !== prev[i]) {
              newGifs[i] = newGif;
            }
            return newGifs;
          });

          // Add smooth transition animation
          const cell = gridRef.current?.children[i] as HTMLElement;
          if (cell) {
            gsap.fromTo(cell, 
              { opacity: 0.7, scale: 0.95 },
              { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" }
            );
          }
        }
      }, cellDelay);

      intervalsRef.current.push(interval);
    }

    return () => {
      intervalsRef.current.forEach(interval => clearInterval(interval));
    };
  }, [currentGifs.length, gridConfig.cells, timingConfig]);

  return (
    <div 
      ref={gridRef} 
      className={`grid gap-2 w-full h-full ${className}`}
      style={{ gridTemplateColumns: `repeat(${gridConfig.cols}, 1fr)` }}
    >
      {currentGifs.map((gifSrc, index) => (
        <div 
          key={index} 
          className="relative overflow-hidden bg-black aspect-square"
          style={{
            transform: `rotate(${(Math.random() - 0.5) * 4}deg)`,
          }}
        >
          {gifSrc && (
            <img 
              src={gifSrc}
              alt=""
              className="w-full h-full object-cover transition-all duration-300"
              style={{
                filter: `contrast(${1.1 + Math.random() * 0.2}) saturate(${0.8 + Math.random() * 0.2})`,
              }}
              onLoad={(e) => {
                // Smooth entrance animation for newly loaded images
                gsap.fromTo(e.currentTarget, 
                  { opacity: 0, scale: 1.1 },
                  { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" }
                );
              }}
            />
          )}
          
          {/* Subtle overlay for professional look */}
          <div className="absolute inset-0 bg-black/5 mix-blend-multiply" />
          
          {/* Professional border effect */}
          <div className="absolute inset-0 border border-black/20" />
        </div>
      ))}
    </div>
  );
};

export default GifChaosGrid;