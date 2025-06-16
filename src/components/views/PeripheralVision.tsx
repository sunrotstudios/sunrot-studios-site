import { FC, useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from '../ui/Navigation';
import { useContentAnimations } from '../../hooks/useContentAnimations';
import AnimatedHeading from '../ui/AnimatedHeading';

gsap.registerPlugin(ScrollTrigger);

const PeripheralVision: FC = () => {
  useContentAnimations();
  const containerRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Floating orb animation
  const orbRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current || !backgroundRef.current) return;

    // Background color transition on scroll
    const backgroundScrollTrigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;
        const hue = Math.round(progress * 10); // Very subtle hue shift
        const lightness = 100 - (progress * 2); // Subtle lightness change
        if (backgroundRef.current) {
          backgroundRef.current.style.backgroundColor = `hsl(${hue}, 5%, ${lightness}%)`;
        }
      },
    });

    // Floating orb animation
    if (orbRef.current) {
      gsap.to(orbRef.current, {
        y: 20,
        x: 10,
        duration: 4,
        ease: 'power1.inOut',
        yoyo: true,
        repeat: -1
      });
    }

    return () => {
      backgroundScrollTrigger.kill();
    };
  }, []);

  // Track mouse position for peripheral reveals
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    mouseX.set(mousePosition.x);
    mouseY.set(mousePosition.y);
  }, [mousePosition, mouseX, mouseY]);

  // Peripheral elements reveal based on mouse proximity
  const leftReveal = useTransform(mouseX, [0, 200], [1, 0]);
  const rightReveal = useTransform(mouseX, [window.innerWidth - 200, window.innerWidth], [0, 1]);

  return (
    <div 
      ref={containerRef}
      className="min-h-screen relative overflow-hidden" 
      data-page="peripheral-vision"
    >
      {/* Dynamic background */}
      <div 
        ref={backgroundRef}
        className="absolute inset-0 transition-colors duration-1000"
        style={{ backgroundColor: 'hsl(0, 5%, 100%)' }}
      />
      
      <Navigation />

      {/* Floating orb - subtle background element */}
      <div 
        ref={orbRef}
        className="absolute top-1/3 right-1/4 w-32 h-32 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 opacity-30 pointer-events-none z-0"
      />

      {/* Peripheral hover reveals */}
      <motion.div 
        className="fixed left-0 top-1/2 transform -translate-y-1/2 -translate-x-16 text-8xl font-light text-gray-200 pointer-events-none z-10"
        style={{ opacity: leftReveal }}
      >
        ◦
      </motion.div>
      
      <motion.div 
        className="fixed right-0 top-1/3 transform -translate-y-1/2 translate-x-16 text-6xl font-light text-gray-200 pointer-events-none z-10"
        style={{ opacity: rightReveal }}
      >
        ●
      </motion.div>

      {/* Section 1: Introductory Vision */}
      <div className="min-h-screen flex items-center justify-center px-8 relative z-20">
        <div className="text-center max-w-6xl mx-auto space-y-12" data-animate>
          <AnimatedHeading
            text="EXPANDING THE EDGES OF REALITY"
            className="text-6xl lg:text-8xl font-black text-black leading-tight"
            animationType="reveal"
            staggerDelay={0.03}
          />
          <div className="text-2xl lg:text-3xl text-gray-600 leading-relaxed max-w-4xl mx-auto" data-animate="text">
            A collaboration hub for those who see what others cannot.
            Where the peripheral becomes central.
          </div>
        </div>
      </div>

      {/* Section 2: Philosophy/Concept */}
      <div className="min-h-screen flex items-center px-8 relative z-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left column - Keywords/Quotes */}
          <div className="lg:col-span-4 space-y-8" data-animate>
            <div className="text-4xl lg:text-6xl font-black text-black leading-tight" data-animate="text">
              UNSEEN<br />
              UNHEARD<br />
              UNDISCOVERED
            </div>
            <div className="text-xl text-gray-500 italic leading-relaxed" data-animate="text">
              "The most important art happens<br />
              in the margins, away from metrics<br />
              and engagement rates."
            </div>
          </div>
          
          {/* Right column - Main content */}
          <div className="lg:col-span-8 space-y-8" data-animate>
            <div className="text-2xl lg:text-3xl text-black leading-relaxed" data-animate="text">
              Peripheral Vision represents our approach to experimental collaboration—
              seeking out the creators who exist outside algorithmic discovery, 
              the projects that refuse categorization, the ideas that challenge 
              the very frameworks designed to contain them.
            </div>
            <div className="text-xl lg:text-2xl text-gray-700 leading-relaxed" data-animate="text">
              We are gathering explorers who understand that the most radical act 
              in our current moment is to create without consideration for 
              virality, engagement, or algorithmic approval. To make work that 
              exists purely because it must exist.
            </div>
            <div className="text-lg lg:text-xl text-gray-600 leading-relaxed" data-animate="text">
              This is not about rejection of technology, but about reclaiming 
              it for human purposes. Building tools and creating experiences 
              that serve genuine expression rather than extraction.
            </div>
          </div>
        </div>
      </div>

      {/* Section 3: Collaboration Call-to-Action */}
      <div className="min-h-screen flex items-center justify-center px-8 bg-black text-white relative z-20">
        <div className="text-center max-w-5xl mx-auto space-y-16" data-animate>
          <AnimatedHeading
            text="JOIN THE VISION"
            className="text-6xl lg:text-8xl font-black leading-tight"
            animationType="split"
            staggerDelay={0.05}
          />
          
          <div className="space-y-8 text-2xl lg:text-3xl leading-relaxed" data-animate="text">
            <p>If you see the unseen with us, reach out—we're gathering explorers.</p>
            <p className="text-gray-400 text-xl lg:text-2xl">
              Artists who create without algorithmic consideration.<br />
              Technologists who build for human expression.<br />
              Thinkers who question the systems they inhabit.
            </p>
          </div>

          {/* Contact button with interaction */}
          <motion.div 
            className="pt-8"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            data-animate="text"
          >
            <a 
              href="mailto:collaborate@sunrotstudios.com"
              className="inline-block px-12 py-6 border-2 border-white text-white text-2xl font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-all duration-300"
            >
              Initiate Contact
            </a>
          </motion.div>

          <div className="text-lg text-gray-500 max-w-3xl mx-auto leading-relaxed" data-animate="text">
            We respond to genuine inquiries within 72 hours. 
            Tell us what you see in the periphery that others miss. 
            Show us work that refuses easy categorization.
          </div>
        </div>
      </div>

      {/* Subtle line element that spans the page height */}
      <div className="absolute right-16 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gray-200 to-transparent opacity-50 pointer-events-none z-10" />
    </div>
  );
};

export default PeripheralVision;