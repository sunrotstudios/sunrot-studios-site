import React, { FC, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface HorizontalScrollCarouselProps {
  images: string[];
  onProjectChange?: (index: number) => void;
  onFirstInteraction?: () => void;
}

export const HorizontalScrollCarousel: FC<HorizontalScrollCarouselProps> = ({ images, onProjectChange, onFirstInteraction }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Create extended array with duplicates for infinite scroll
  const extendedImages = [...images, ...images, ...images];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      
      // Trigger first interaction callback
      if (!hasInteracted && onFirstInteraction) {
        setHasInteracted(true);
        onFirstInteraction();
      }
      
      const scrollSensitivity = 0.5;
      const deltaY = e.deltaY * scrollSensitivity;
      
      setScrollPosition(prevPosition => prevPosition + deltaY);
    };

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      container.dataset.startY = touch.clientY.toString();
      container.dataset.startScrollPosition = scrollPosition.toString();
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      
      // Trigger first interaction callback
      if (!hasInteracted && onFirstInteraction) {
        setHasInteracted(true);
        onFirstInteraction();
      }
      
      const touch = e.touches[0];
      const startY = parseFloat(container.dataset.startY || '0');
      const startScrollPosition = parseFloat(container.dataset.startScrollPosition || '0');
      const deltaY = (startY - touch.clientY) * 2;
      
      setScrollPosition(startScrollPosition + deltaY);
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    container.addEventListener('touchstart', handleTouchStart, { passive: false });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
    };
  }, [scrollPosition, hasInteracted, onFirstInteraction]);

  useEffect(() => {
    if (!carouselRef.current) return;

    const carousel = carouselRef.current;
    const containerWidth = carousel.clientWidth;
    const itemWidth = containerWidth / extendedImages.length; // Each item width in the extended array
    const singleSetWidth = itemWidth * images.length;
    
    // Convert scroll position to item index
    const scrollSensitivity = 200; // pixels per item
    const rawIndex = scrollPosition / scrollSensitivity;
    
    // Normalize to create infinite loop - always show middle set as base
    const normalizedIndex = ((rawIndex % images.length) + images.length) % images.length;
    const actualIndex = normalizedIndex + images.length; // Start from middle set (index 6-11 for 6 items)
    
    const translateX = -(actualIndex * itemWidth);

    // Use gsap.set for immediate positioning without animation lag
    gsap.set(carousel, {
      x: translateX
    });
  }, [scrollPosition, images.length, extendedImages.length]);

  // Calculate current image index for indicators
  const getCurrentIndex = () => {
    const scrollSensitivity = 200; // pixels per item
    const rawIndex = scrollPosition / scrollSensitivity;
    return Math.floor(((rawIndex % images.length) + images.length) % images.length);
  };

  const currentIndex = getCurrentIndex();

  // Notify parent about project changes
  useEffect(() => {
    if (onProjectChange) {
      onProjectChange(currentIndex);
    }
  }, [currentIndex, onProjectChange]);

  return (
    <div 
      className="h-screen w-full overflow-hidden relative" 
      ref={containerRef}
      style={{ touchAction: 'none' }}
    >
      {/* Carousel Container */}
      <div className="h-full flex items-center justify-center">
        <div className="w-full h-full relative overflow-hidden">
          <div 
            ref={carouselRef}
            className="flex h-full items-center"
            style={{ width: `${extendedImages.length * 100}%` }}
          >
            {extendedImages.map((image, index) => (
              <div 
                key={`${image}-${Math.floor(index / images.length)}`}
                className="flex-shrink-0 h-full flex items-center justify-center px-8 sm:px-12 lg:px-16"
                style={{ width: `${100 / extendedImages.length}%` }}
              >
                <div className="relative border-2 border-black bg-white max-w-md w-full">
                  <div className="aspect-square relative">
                    <img
                      src={image}
                      alt={`Project ${(index % images.length) + 1}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>


    </div>
  );
};