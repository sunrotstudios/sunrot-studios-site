import { useState, useEffect, useCallback, useRef } from "react";

interface DeviceCapabilities {
  isMobile: boolean;
  isLowEnd: boolean;
  supportsWebGL: boolean;
  deviceMemory: number | null;
  hardwareConcurrency: number;
  connectionEffectiveType: string | null;
  prefersReducedMotion: boolean;
  devicePixelRatio: number;
  screenSize: "small" | "medium" | "large";
}

interface PerformanceMetrics {
  frameRate: number;
  averageFrameTime: number;
  droppedFrames: number;
  renderingLatency: number;
}

interface PerformanceSettings {
  enableComplexAnimations: boolean;
  enableBackgroundEffects: boolean;
  useHighQualityTextures: boolean;
  maxSimultaneousAnimations: number;
  preferCSSTransforms: boolean;
  enableParticleEffects: boolean;
  animationDuration: number;
  staggerDelay: number;
}

// This function is now standalone and pure
const detectDeviceCapabilities = (): DeviceCapabilities => {
  const userAgent = navigator.userAgent.toLowerCase();
  const isMobile =
    /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
      userAgent
    );

  const canvas = document.createElement("canvas");
  const webglContext =
    canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
  const supportsWebGL = !!webglContext;

  const deviceMemory = (navigator as any).deviceMemory || null;
  const hardwareConcurrency = navigator.hardwareConcurrency || 4;
  const connection =
    (navigator as any).connection ||
    (navigator as any).mozConnection ||
    (navigator as any).webkitConnection;
  const connectionEffectiveType = connection?.effectiveType || null;
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  const devicePixelRatio = window.devicePixelRatio || 1;

  const screenWidth = window.innerWidth;
  let screenSize: "small" | "medium" | "large";
  if (screenWidth < 768) {
    screenSize = "small";
  } else if (screenWidth < 1200) {
    screenSize = "medium";
  } else {
    screenSize = "large";
  }

  const isLowEnd =
    (deviceMemory !== null && deviceMemory <= 2) ||
    hardwareConcurrency <= 2 ||
    connectionEffectiveType === "slow-2g" ||
    connectionEffectiveType === "2g" ||
    (!supportsWebGL && isMobile) ||
    prefersReducedMotion;

  return {
    isMobile,
    isLowEnd,
    supportsWebGL,
    deviceMemory,
    hardwareConcurrency,
    connectionEffectiveType,
    prefersReducedMotion,
    devicePixelRatio,
    screenSize,
  };
};

const generatePerformanceSettings = (
  capabilities: DeviceCapabilities,
  metrics: PerformanceMetrics
): PerformanceSettings => {
  const isPerformant = metrics.frameRate > 45 && metrics.droppedFrames < 10;
  const isHighEnd =
    !capabilities.isLowEnd &&
    capabilities.hardwareConcurrency >= 4 &&
    isPerformant;

  if (capabilities.prefersReducedMotion) {
    return {
      enableComplexAnimations: false,
      enableBackgroundEffects: false,
      useHighQualityTextures: false,
      maxSimultaneousAnimations: 1,
      preferCSSTransforms: true,
      enableParticleEffects: false,
      animationDuration: 0.1,
      staggerDelay: 0.05,
    };
  }

  if (capabilities.isLowEnd || metrics.frameRate < 30) {
    return {
      enableComplexAnimations: false,
      enableBackgroundEffects: false,
      useHighQualityTextures: false,
      maxSimultaneousAnimations: 2,
      preferCSSTransforms: true,
      enableParticleEffects: false,
      animationDuration: 0.2,
      staggerDelay: 0.05,
    };
  }

  if (capabilities.isMobile && !isHighEnd) {
    return {
      enableComplexAnimations: true,
      enableBackgroundEffects: capabilities.screenSize !== "small",
      useHighQualityTextures: false,
      maxSimultaneousAnimations: 4,
      preferCSSTransforms: true,
      enableParticleEffects: false,
      animationDuration: 0.3,
      staggerDelay: 0.08,
    };
  }

  return {
    enableComplexAnimations: true,
    enableBackgroundEffects: true,
    useHighQualityTextures: true,
    maxSimultaneousAnimations: 8,
    preferCSSTransforms: false,
    enableParticleEffects: isHighEnd,
    animationDuration: 0.4,
    staggerDelay: 0.1,
  };
};

export const usePerformanceMonitor = () => {
  const [deviceCapabilities] = useState<DeviceCapabilities>(
    detectDeviceCapabilities
  );
  const [isMonitoring, setIsMonitoring] = useState(false);

  const [performanceMetrics, setPerformanceMetrics] =
    useState<PerformanceMetrics>({
      frameRate: 60,
      averageFrameTime: 16.67,
      droppedFrames: 0,
      renderingLatency: 0,
    });

  // Generate initial settings once, and then update based on metrics
  const [performanceSettings, setPerformanceSettings] =
    useState<PerformanceSettings>(() =>
      generatePerformanceSettings(deviceCapabilities, performanceMetrics)
    );

  const frameCountRef = useRef(0);
  const lastFrameTimeRef = useRef(performance.now());
  const frameTimesRef = useRef<number[]>([]);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isMonitoring) return;

    const newSettings = generatePerformanceSettings(
      deviceCapabilities,
      performanceMetrics
    );
    setPerformanceSettings(newSettings);
  }, [performanceMetrics, deviceCapabilities, isMonitoring]);

  useEffect(() => {
    if (!isMonitoring) return;

    let isSubscribed = true;
    const measureFrame = (currentTime: number) => {
      if (!isSubscribed) return;

      const frameTime = currentTime - lastFrameTimeRef.current;
      lastFrameTimeRef.current = currentTime;

      frameTimesRef.current.push(frameTime);
      frameCountRef.current++;

      if (frameTimesRef.current.length > 60) {
        frameTimesRef.current.shift();
      }

      if (frameCountRef.current % 60 === 0 || frameTime > 1000) {
        const averageFrameTime =
          frameTimesRef.current.reduce((sum, time) => sum + time, 0) /
          frameTimesRef.current.length;
        const frameRate = 1000 / averageFrameTime;
        const droppedFrames = frameTimesRef.current.filter(
          (time) => time > 20
        ).length;

        setPerformanceMetrics({
          frameRate,
          averageFrameTime,
          droppedFrames,
          renderingLatency: frameTime,
        });
      }

      animationFrameRef.current = requestAnimationFrame(measureFrame);
    };

    const startAnimationFrames = () => {
      animationFrameRef.current = requestAnimationFrame(measureFrame);
    };

    startAnimationFrames();

    return () => {
      isSubscribed = false;
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isMonitoring]);

  const startMonitoring = useCallback(() => {
    if (
      !deviceCapabilities.isLowEnd &&
      !deviceCapabilities.prefersReducedMotion
    ) {
      setIsMonitoring(true);
    }
  }, [deviceCapabilities]);

  const shouldEnableFeature = useCallback(
    (feature: keyof PerformanceSettings): boolean => {
      const setting = performanceSettings[feature];
      return typeof setting === "boolean" ? setting : false;
    },
    [performanceSettings]
  );

  const getRecommendedEase = useCallback(() => {
    if (performanceSettings?.enableComplexAnimations) {
      return "elastic.out(1, 0.5)";
    }
    return "power2.out";
  }, [performanceSettings]);

  return {
    performanceSettings,
    isLowEndDevice: deviceCapabilities?.isLowEnd || false,
    isMobileDevice: deviceCapabilities?.isMobile || false,
    shouldEnableFeature,
    getRecommendedEase,
    startMonitoring,
  };
};

export default usePerformanceMonitor;
