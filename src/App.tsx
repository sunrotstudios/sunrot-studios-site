import { FC, useRef, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link, useLocation, Outlet } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap"; // Import gsap core

import { GradientBackground } from "./components/ui/noisy-gradient-backgrounds";
import HomePage from "./components/HomePage";
import AboutPage from "./components/AboutPage";

// It's good practice to register any plugins used, though for basic transforms and opacity, it might not be strictly necessary with the core.
// If we were using SplitText or other plugins, we'd register them here:
// gsap.registerPlugin(SplitText, ScrollTrigger, etc);
gsap.registerPlugin(useGSAP); // Register the useGSAP hook itself as per GSAP docs if using @gsap/react older versions, though typically just importing is enough for newer ones. For safety, let's keep it.


const gradientColors = [
  { color: "rgba(255,220,180,1)", stop: "0%" },
  { color: "rgba(255,200,140,1)", stop: "20%" },
  { color: "rgba(255,180,120,1)", stop: "40%" },
  { color: "rgba(255,160,100,1)", stop: "60%" },
  { color: "rgba(255,140,80,1)", stop: "80%" },
  { color: "rgba(255,120,60,1)", stop: "100%" },
];

const AppContent: FC = () => {
  const location = useLocation();
  const containerRef = useRef<HTMLDivElement>(null); // Ref for the main layout div
  const outletContainerRef = useRef<HTMLDivElement>(null); // Ref for the Outlet container

  // Store the timeline in a ref
  const tl = useRef<gsap.core.Timeline | null>(null);
  const isInitialLoad = useRef(true); // Ref to track initial load

  const { contextSafe } = useGSAP({ scope: outletContainerRef }); // Scope animations to the outlet container

  useEffect(() => {
    // Initial animation for the first page load
    if (outletContainerRef.current) {
      gsap.fromTo(outletContainerRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power1.out",
          onComplete: () => {
            isInitialLoad.current = false; // Mark initial load as complete
          }
        }
      );
    }
  }, []); // Empty dependency array ensures this runs once on mount


  useEffect(() => {
    // Skip this effect on the initial load because the mount effect handles it.
    if (isInitialLoad.current) {
      return;
    }

    if (outletContainerRef.current) {
      // Create a context-safe function for the animation sequence
      const playTransition = contextSafe(() => {
        if (tl.current) {
          tl.current.kill(); // Kill any existing animations on this timeline
        }

        tl.current = gsap.timeline({
          // No specific onComplete needed for the whole timeline here
        });

        tl.current.to(outletContainerRef.current, {
          opacity: 0,
          y: 20,
          duration: 0.5, // Duration from prompt
          ease: "power1.in",
          onComplete: () => {
            // The content inside Outlet is already updated by React Router at this point
            // due to the location change that triggered this useEffect.
            // Now, animate in.
            // As per original request, animate Y from 20 to 0 for the "in" part
            gsap.set(outletContainerRef.current, { y: 20, opacity: 0 }); // Set initial state for "in" animation
            gsap.to(outletContainerRef.current, {
              opacity: 1,
              y: 0,
              duration: 0.5, // Duration from prompt
              ease: "power1.out",
            });
          }
        });
      });

      playTransition();
    }
    // This effect runs when location.pathname changes, but not on initial load.
  }, [location.pathname, contextSafe]);


  return (
    <div ref={containerRef} className="w-screen h-screen font-mondwest font-bold text-black relative flex flex-col p-10 lg:px-16 overflow-hidden">
      <GradientBackground className="z-0" colors={gradientColors} />

      <div className="absolute top-16 left-16 text-xs font-bold tracking-wider z-20">
        <Link to="/about">ABOUT STUDIO</Link>
      </div>
      <div className="absolute top-16 right-16 text-xs font-bold tracking-wider z-20">
        <a href="#">WHAT WE DO</a> {/* Placeholder */}
      </div>

      {/* This is the container that will be animated */}
      <div ref={outletContainerRef} className="flex-grow relative z-10 flex items-center justify-center">
        <Outlet /> {/* Matched route components will render here */}
      </div>

      <div className="absolute bottom-16 left-16 z-20">
        <div className="text-sm font-bold tracking-wider mb-1">
          <Link to="/">VENICE CA</Link>
        </div>
        <div className="text-[10px] font-normal tracking-wide opacity-80">
          fever dream + digital infrastructure
        </div>
      </div>
      <div className="absolute bottom-16 right-16 text-xs font-bold tracking-wider z-20">
        <a href="#">ENTER</a> {/* Placeholder */}
      </div>
    </div>
  );
};

const App: FC = () => {
  return (
    <BrowserRouter>
      {/* Routes are defined here, but Outlet in AppContent renders them */}
      <Routes>
        <Route path="/" element={<AppContent />}> {/* AppContent is now the layout component */}
          <Route index element={<HomePage />} /> {/* Render HomePage at / */}
          <Route path="about" element={<AboutPage />} /> {/* Render AboutPage at /about */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
