import { useCallback, useRef, useEffect } from 'react';
import { gsap } from 'gsap';

// Pixelated easing functions that mimic old computer movements
export const pixelEasing = {
  // Choppy, stepped movement like old computer graphics
  steps: (steps: number = 8) => `steps(${steps}, end)`,
  
  // Linear movement with no smoothing - very mechanical
  linear: 'none',
  
  // Rough approximation of early computer easing
  retro: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  
  // Pop-up window style - quick snap into place
  popup: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  
  // Window minimize/maximize effect
  windowSlam: 'cubic-bezier(0.6, 0.04, 0.98, 0.335)',
  
  // Chunky bounce like old dialog boxes
  chunkyBounce: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
};

// Animation presets for common retro window actions
export const retroAnimations = {
  windowOpen: {
    from: { scale: 0, opacity: 0, rotation: 0 },
    to: { scale: 1, opacity: 1, rotation: 0 },
    duration: 0.3,
    ease: pixelEasing.popup
  },
  
  windowClose: {
    from: { scale: 1, opacity: 1, rotation: 0 },
    to: { scale: 0, opacity: 0, rotation: -5 },
    duration: 0.25,
    ease: pixelEasing.windowSlam
  },
  
  windowMinimize: {
    from: { scale: 1, opacity: 1, y: 0 },
    to: { scale: 0.1, opacity: 0, y: window.innerHeight },
    duration: 0.4,
    ease: pixelEasing.steps(6)
  },
  
  windowMaximize: {
    from: { scale: 0.1, opacity: 0, y: window.innerHeight },
    to: { scale: 1, opacity: 1, y: 0 },
    duration: 0.4,
    ease: pixelEasing.chunkyBounce
  },
  
  dragStart: {
    to: { scale: 1.02, boxShadow: '8px 8px 0px #000000' },
    duration: 0.1,
    ease: pixelEasing.linear
  },
  
  dragEnd: {
    to: { scale: 1, boxShadow: '4px 4px 0px #000000' },
    duration: 0.1,
    ease: pixelEasing.linear
  },
  
  // Snap to grid effect for pixelated movement
  snapToGrid: {
    duration: 0.2,
    ease: pixelEasing.steps(4)
  }
};

interface UsePixelatedAnimationOptions {
  gridSize?: number; // Size of grid for snapping (default: 8px)
  enableGridSnap?: boolean; // Whether to snap to grid during drag
  reducedMotion?: boolean; // Respect user's motion preferences
}

export const usePixelatedAnimation = (options: UsePixelatedAnimationOptions = {}) => {
  const {
    gridSize = 8,
    enableGridSnap = true,
    reducedMotion = false
  } = options;
  
  const animationsRef = useRef<gsap.core.Tween[]>([]);
  
  // Snap coordinates to grid for pixelated movement
  const snapToGrid = useCallback((value: number) => {
    return Math.round(value / gridSize) * gridSize;
  }, [gridSize]);
  
  // Create pixelated movement by snapping intermediate values
  const createPixelatedTween = useCallback((
    target: any,
    props: gsap.TweenVars,
    options?: { snapToGrid?: boolean }
  ) => {
    const { snapToGrid: shouldSnap = enableGridSnap, ...tweenProps } = props;
    
    // If reduced motion is enabled, simplify the animation
    if (reducedMotion) {
      return gsap.set(target, { ...tweenProps, duration: 0 });
    }
    
    let modifiedProps = { ...tweenProps };
    
    // Apply grid snapping to position properties
    if (shouldSnap && enableGridSnap) {
      if (modifiedProps.x !== undefined) {
        modifiedProps.x = snapToGrid(modifiedProps.x as number);
      }
      if (modifiedProps.y !== undefined) {
        modifiedProps.y = snapToGrid(modifiedProps.y as number);
      }
    }
    
    // Force stepped animations for pixelated feel
    if (!modifiedProps.ease) {
      modifiedProps.ease = pixelEasing.steps();
    }
    
    // Ensure hardware acceleration
    modifiedProps.force3D = true;
    
    const tween = gsap.to(target, modifiedProps);
    animationsRef.current.push(tween);
    
    return tween;
  }, [enableGridSnap, gridSize, reducedMotion, snapToGrid]);
  
  // Animate window opening with retro effect
  const animateWindowOpen = useCallback((target: any, customProps?: Partial<typeof retroAnimations.windowOpen>) => {
    const props = { ...retroAnimations.windowOpen, ...customProps };
    
    gsap.set(target, props.from);
    return createPixelatedTween(target, {
      ...props.to,
      duration: props.duration,
      ease: props.ease
    }, { snapToGrid: false });
  }, [createPixelatedTween]);
  
  // Animate window closing with retro effect
  const animateWindowClose = useCallback((target: any, customProps?: Partial<typeof retroAnimations.windowClose>) => {
    const props = { ...retroAnimations.windowClose, ...customProps };
    
    return createPixelatedTween(target, {
      ...props.to,
      duration: props.duration,
      ease: props.ease
    }, { snapToGrid: false });
  }, [createPixelatedTween]);
  
  // Animate window minimize
  const animateWindowMinimize = useCallback((target: any, customProps?: Partial<typeof retroAnimations.windowMinimize>) => {
    const props = { ...retroAnimations.windowMinimize, ...customProps };
    
    return createPixelatedTween(target, {
      ...props.to,
      duration: props.duration,
      ease: props.ease
    }, { snapToGrid: false });
  }, [createPixelatedTween]);
  
  // Animate window maximize
  const animateWindowMaximize = useCallback((target: any, customProps?: Partial<typeof retroAnimations.windowMaximize>) => {
    const props = { ...retroAnimations.windowMaximize, ...customProps };
    
    gsap.set(target, props.from);
    return createPixelatedTween(target, {
      ...props.to,
      duration: props.duration,
      ease: props.ease
    }, { snapToGrid: false });
  }, [createPixelatedTween]);
  
  // Animate drag start effect
  const animateDragStart = useCallback((target: any) => {
    return createPixelatedTween(target, retroAnimations.dragStart.to, { snapToGrid: false });
  }, [createPixelatedTween]);
  
  // Animate drag end effect
  const animateDragEnd = useCallback((target: any, finalPosition?: { x: number; y: number }) => {
    const props: any = { ...retroAnimations.dragEnd.to };
    
    if (finalPosition) {
      props.x = finalPosition.x;
      props.y = finalPosition.y;
      props.duration = retroAnimations.snapToGrid.duration;
      props.ease = retroAnimations.snapToGrid.ease;
    }
    
    return createPixelatedTween(target, props);
  }, [createPixelatedTween]);
  
  // Create a timeline with pixelated animations
  const createPixelatedTimeline = useCallback(() => {
    const timeline = gsap.timeline();
    
    // Override the timeline's to method to use pixelated animations
    const originalTo = timeline.to.bind(timeline);
    timeline.to = (target: any, vars: gsap.TweenVars, position?: gsap.Position) => {
      const pixelatedVars = {
        ...vars,
        force3D: true,
        ease: vars.ease || pixelEasing.steps()
      };
      
      return originalTo(target, pixelatedVars, position);
    };
    
    return timeline;
  }, []);
  
  // Clean up all animations
  const killAllAnimations = useCallback(() => {
    animationsRef.current.forEach(tween => tween.kill());
    animationsRef.current = [];
  }, []);
  
  // Effect to clean up on unmount
  useEffect(() => {
    return () => {
      killAllAnimations();
    };
  }, [killAllAnimations]);
  
  return {
    // Animation functions
    animateWindowOpen,
    animateWindowClose,
    animateWindowMinimize,
    animateWindowMaximize,
    animateDragStart,
    animateDragEnd,
    createPixelatedTween,
    createPixelatedTimeline,
    
    // Utility functions
    snapToGrid,
    killAllAnimations,
    
    // Constants
    pixelEasing,
    retroAnimations,
    
    // Config
    gridSize,
    enableGridSnap
  };
};

export default usePixelatedAnimation;