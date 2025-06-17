import { FC, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
  TouchSensor,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  useDraggable,
} from '@dnd-kit/core';
import Navigation from '../ui/Navigation';

const FloatingClipArt: FC<{ src: string; className?: string }> = ({ src, className = "" }) => (
  <div 
    className={`absolute pointer-events-none ${className}`}
    style={{ 
      animation: 'float 7s ease-in-out infinite alternate',
      top: `${Math.random() * 60 + 10}%`,
      left: `${Math.random() * 60 + 10}%`,
    }}
  >
    <div className="w-8 h-8 bg-gray-300 border border-black flex items-center justify-center text-xs">
      SVG
    </div>
  </div>
);

interface TileData {
  id: string;
  position: { x: number; y: number };
  backgroundColor: string;
  sticker: string;
  caption: string;
  className?: string;
}

interface TileProps extends TileData {
  isDragging?: boolean;
}

const TileContent: FC<{ tile: TileData; isDragging?: boolean }> = ({ tile, isDragging = false }) => (
  <motion.div
    className="w-[clamp(320px,35vw,480px)] h-[clamp(320px,35vw,480px)] border-[12px] border-[var(--frame-neutral)] box-content relative overflow-hidden cursor-grab active:cursor-grabbing"
    style={{ 
      backgroundColor: tile.backgroundColor,
      opacity: isDragging ? 0.8 : 1,
      transform: isDragging ? 'rotate(5deg)' : 'rotate(0deg)'
    }}
    initial={{ scale: 1 }}
    whileHover={{ scale: isDragging ? 1 : 1.05, zIndex: 50 }}
    transition={{ type: 'spring', stiffness: 300 }}
  >
    {/* Inner neon border */}
    <div className="absolute inset-4 border-[6px] border-[var(--color-ultraviolet)] pointer-events-none" />
    
    {/* Floating SVGs */}
    <FloatingClipArt src="/svgs/placeholder1.svg" />
    <FloatingClipArt src="/svgs/placeholder2.svg" />
    <FloatingClipArt src="/svgs/placeholder3.svg" />
    
    {/* Sticker */}
    <span className="sticker absolute -right-4 -top-2 bg-white border-2 border-black px-1 py-0.5 text-[10px] font-bold leading-tight uppercase">
      {tile.sticker}
    </span>
    
    {/* Caption bar */}
    <footer className="caption absolute bottom-0 left-0 w-full h-[var(--caption-height)] bg-[var(--color-acid-lime)] border-t-2 border-black flex items-center px-3 text-black font-bold text-xs uppercase">
      {tile.caption}
    </footer>
  </motion.div>
);

const DraggableTile: FC<TileProps> = ({ id, position, backgroundColor, sticker, caption, className = "" }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging,
  } = useDraggable({
    id,
  });

  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    left: position.x,
    top: position.y,
  };

  const tileData: TileData = { id, position, backgroundColor, sticker, caption, className };

  return (
    <article 
      ref={setNodeRef} 
      className={`absolute group z-10 ${className}`} 
      style={style}
      {...listeners}
      {...attributes}
    >
      <TileContent tile={tileData} isDragging={isDragging} />
    </article>
  );
};

const Rotware: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [tiles, setTiles] = useState<TileData[]>([
    {
      id: 'rotware',
      position: { x: 60, y: 40 },
      backgroundColor: 'var(--color-electric-magenta)',
      sticker: 'FOLLOW ME ×4',
      caption: 'ROTWARE'
    },
    {
      id: 'heat-death',
      position: { x: 420, y: 120 },
      backgroundColor: 'var(--color-acid-lime)',
      sticker: 'NEW!',
      caption: 'HEAT DEATH'
    },
    {
      id: 'peripheral-vision',
      position: { x: 780, y: 80 },
      backgroundColor: 'var(--color-ultraviolet)',
      sticker: 'EXPERIMENTAL',
      caption: 'PERIPHERAL VISION'
    },
    {
      id: 'mission',
      position: { x: 200, y: 320 },
      backgroundColor: 'var(--color-electric-magenta)',
      sticker: 'LIVE NOW',
      caption: 'MISSION'
    },
    {
      id: 'upcoming-events',
      position: { x: 600, y: 400 },
      backgroundColor: 'var(--color-acid-lime)',
      sticker: 'COMING SOON',
      caption: 'UPCOMING EVENTS',
      className: 'md:hidden'
    },
    {
      id: 'contact',
      position: { x: 920, y: 360 },
      backgroundColor: 'var(--color-ultraviolet)',
      sticker: 'CONTACT',
      caption: 'GET IN TOUCH',
      className: 'md:hidden'
    }
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 200,
        tolerance: 5,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, delta } = event;
    
    if (delta) {
      setTiles(currentTiles => 
        currentTiles.map(tile => 
          tile.id === active.id 
            ? { 
                ...tile, 
                position: { 
                  x: tile.position.x + delta.x, 
                  y: tile.position.y + delta.y 
                } 
              }
            : tile
        )
      );
    }
    
    setActiveId(null);
  };

  const activeTile = activeId ? tiles.find(tile => tile.id === activeId) : null;
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const tileElements = containerRef.current.querySelectorAll('article');
    
    // Set initial state
    gsap.set(tileElements, {
      y: -50,
      opacity: 0
    });
    
    // Staggered drop animation
    gsap.to(tileElements, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power2.out",
      stagger: 0.08
    });
    
    return () => {
      gsap.killTweensOf(tileElements);
    };
  }, []);
  
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="relative overflow-hidden bg-black min-h-screen" data-page="rotware">
        <Navigation />
        
        {/* Background "SUN ROT" text */}
        <h1 className="absolute inset-0 flex items-center justify-center text-[40vw] lg:text-[40vw] md:text-[60vw] max-md:text-[60vw] leading-none font-extrabold tracking-tight text-white pointer-events-none select-none z-0">
          SUN ROT
        </h1>
        
        {/* Content tiles */}
        <div ref={containerRef} className="relative z-10">
          {tiles.map((tile) => (
            <DraggableTile
              key={tile.id}
              id={tile.id}
              position={tile.position}
              backgroundColor={tile.backgroundColor}
              sticker={tile.sticker}
              caption={tile.caption}
              className={tile.className}
            />
          ))}
          
          {/* Mobile-only tiles */}
          <div className="lg:hidden md:hidden flex flex-col items-center justify-center min-h-screen space-y-8 pt-20">
            <DraggableTile
              id="mobile-rotware"
              position={{ x: 0, y: 0 }}
              backgroundColor="var(--color-electric-magenta)"
              sticker="MOBILE"
              caption="ROTWARE"
              className="relative"
            />
            <DraggableTile
              id="mobile-heat-death"
              position={{ x: 0, y: 0 }}
              backgroundColor="var(--color-acid-lime)"
              sticker="TOUCH"
              caption="HEAT DEATH"
              className="relative"
            />
          </div>
        </div>
        
        {/* Drag overlay for smooth dragging experience */}
        <DragOverlay>
          {activeTile ? (
            <div className="z-50">
              <TileContent tile={activeTile} isDragging={true} />
            </div>
          ) : null}
        </DragOverlay>
      </div>
    </DndContext>
  );
};

export default Rotware;