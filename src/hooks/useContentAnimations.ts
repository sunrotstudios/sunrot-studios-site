import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useLocation } from 'react-router-dom';

interface ContentAnimationOptions {
  enabled?: boolean;
  delay?: number;
  staggerDelay?: number;
  duration?: number;
}

export const useContentAnimations = (options: ContentAnimationOptions = {}) => {
  const {
    enabled = true,
    delay = 0.8, // Start after page transition completes
    staggerDelay = 0.1,
    duration = 0.6
  } = options;

  const location = useLocation();
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!enabled) return;

    // Clear previous animations
    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    // Create new timeline for content animations
    const timeline = gsap.timeline({ delay });

    // Animate elements with data-animate attribute
    const animateElements = document.querySelectorAll('[data-animate]');
    
    if (animateElements.length > 0) {
      // Set initial state - all elements invisible and slightly transformed
      gsap.set(animateElements, {
        opacity: 0,
        y: 20,
        scale: 0.95
      });

      // Animate elements in staggered sequence
      timeline.to(animateElements, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: duration,
        ease: "power2.out",
        stagger: staggerDelay
      });
    }

    // Animate navigation buttons with special stagger
    const navButtons = document.querySelectorAll('[data-animate="nav-button"]');
    if (navButtons.length > 0) {
      gsap.set(navButtons, {
        opacity: 0,
        scale: 0,
        transformOrigin: 'center center'
      });

      timeline.to(navButtons, {
        opacity: 1,
        scale: 1,
        duration: duration * 0.8,
        ease: "power2.out",
        stagger: staggerDelay * 1.5
      }, `-=${duration * 0.5}`); // Overlap with previous animation
    }

    // Animate text content with line reveals
    const textElements = document.querySelectorAll('[data-animate="text"]');
    if (textElements.length > 0) {
      gsap.set(textElements, {
        opacity: 0,
        y: 10
      });

      timeline.to(textElements, {
        opacity: 1,
        y: 0,
        duration: duration * 0.7,
        ease: "power2.out",
        stagger: staggerDelay * 0.8
      }, `-=${duration * 0.3}`);
    }

    timelineRef.current = timeline;

    // Cleanup on unmount or location change
    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, [location.pathname, enabled, delay, staggerDelay, duration]);

  // Manual trigger function for custom animations
  const animateElement = (element: Element | string, animationProps: gsap.TweenVars = {}) => {
    const target = typeof element === 'string' ? document.querySelector(element) : element;
    if (!target) return;

    return gsap.to(target, {
      duration: duration,
      ease: "power2.out",
      ...animationProps
    });
  };

  return { animateElement };
};