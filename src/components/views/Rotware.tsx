import { FC, useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from '../ui/Navigation';
import { useContentAnimations } from '../../hooks/useContentAnimations';
import AnimatedHeading from '../ui/AnimatedHeading';

gsap.registerPlugin(ScrollTrigger);

const Rotware: FC = () => {
  useContentAnimations();
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  
  const projects = [
    {
      id: "decay-engine",
      title: "DECAY ENGINE",
      description: "Software that intentionally breaks itself over time. A progressive degradation algorithm that corrupts pixels and content based on temporal decay patterns, making entropy a creative force.",
      status: "IN DEVELOPMENT",
      mediaUrl: "/src/assets/media/digital-woman.gif",
      details: {
        techStack: ["React", "WebGL", "GLSL Shaders", "Canvas API"],
        team: ["Visual Systems Team", "Algorithm Research"],
        timeline: "Q2 2025 Beta Release"
      }
    },
    {
      id: "anti-algorithm", 
      title: "ANTI-ALGORITHM",
      description: "Finding what the feed doesn't want you to see. An inverse discovery mechanism that surfaces artists with zero engagement scores and null algorithmic reach, revealing hidden creativity.",
      status: "BETA TESTING",
      mediaUrl: "/src/assets/media/color-lump.gif",
      details: {
        techStack: ["Node.js", "Graph Theory", "ML Inverse Models", "API Scraping"],
        team: ["Data Science Team", "Artist Relations"],
        timeline: "Live Testing Phase"
      }
    },
    {
      id: "xerox-simulator",
      title: "XEROX SIMULATOR",
      description: "Making pixels feel like analog degradation. Photocopy distortion filters that add grain, contrast, and ink bleed to simulate the warmth of analog reproduction processes.",
      status: "LIVE",
      mediaUrl: "/src/assets/media/rorshack.gif",
      details: {
        techStack: ["WebGL", "Image Processing", "CSS Filters", "SVG Patterns"],
        team: ["Visual Effects Team"],
        timeline: "Production Ready"
      }
    },
    {
      id: "temporal-glitch",
      title: "TEMPORAL GLITCH",
      description: "Time-based corruption of digital artifacts. A framework for introducing controlled chaos into stable systems, allowing entropy to become a creative force in real-time applications.",
      status: "CONCEPT",
      mediaUrl: "/src/assets/media/infinite-hallway.gif",
      details: {
        techStack: ["Time Series", "Chaos Theory", "Real-time Processing", "GPU Compute"],
        team: ["Research & Development"],
        timeline: "Conceptual Phase"
      }
    }
  ];

  useEffect(() => {
    // ScrollTrigger implementation for project panels
    projects.forEach((project, index) => {
      const panel = document.querySelector(`[data-project-panel="${project.id}"]`) as HTMLElement;
      const contentReveal = panel?.querySelector('[data-content-reveal]') as HTMLElement;
      const mediaContainer = panel?.querySelector('[data-media-container]') as HTMLElement;
      const projectTitle = panel?.querySelector('[data-project-title]') as HTMLElement;
      
      if (!panel || !contentReveal || !mediaContainer) return;

      // Set initial states
      gsap.set(contentReveal.children, {
        y: 30,
        opacity: 0
      });
      
      gsap.set(mediaContainer, {
        opacity: 0,
        scale: 0.95
      });

      // Create ScrollTrigger for each panel
      ScrollTrigger.create({
        trigger: panel,
        start: "top center",
        end: "bottom center",
        onEnter: () => {
          // Content reveal animation - slow, serene 0.8s ease-out
          const tl = gsap.timeline();
          
          // Text content slides up and fades in
          tl.to(contentReveal.children, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            stagger: 0.1
          });
          
          // Media fades in after text
          tl.to(mediaContainer, {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "power2.out"
          }, "-=0.4");
        },
        onLeave: () => {
          // Optional fade out when leaving
          gsap.to([contentReveal.children, mediaContainer], {
            opacity: 0.3,
            duration: 0.4,
            ease: "power2.out"
          });
        },
        onEnterBack: () => {
          // Re-animate when scrolling back
          gsap.to([contentReveal.children, mediaContainer], {
            opacity: 1,
            duration: 0.4,
            ease: "power2.out"
          });
        }
      });

      // Simple scroll-based background effects without pinning
      ScrollTrigger.create({
        trigger: panel,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          // Subtle background animation based on scroll progress
          const progress = self.progress;
          const rotation = progress * 180; // Reduced rotation for smoother effect
          
          // Create unique background effect per panel
          if (index === 0) {
            // Decay Engine - subtle noise pattern
            panel.style.background = `radial-gradient(circle at ${50 + Math.sin(rotation * 0.01) * 5}% ${50 + Math.cos(rotation * 0.01) * 5}%, rgba(0,0,0,0.005) 0%, transparent 50%)`;
          } else if (index === 1) {
            // Anti-Algorithm - subtle grid distortion
            panel.style.backgroundPosition = `${Math.sin(rotation * 0.02) * 1}px ${Math.cos(rotation * 0.02) * 1}px`;
          } else if (index === 2) {
            // Xerox Simulator - subtle film grain
            panel.style.filter = `contrast(${1 + Math.sin(rotation * 0.01) * 0.01})`;
          } else if (index === 3) {
            // Temporal Glitch - subtle hue shift
            panel.style.filter = `hue-rotate(${Math.sin(rotation * 0.01) * 1}deg)`;
          }
        }
      });

      // Hover effects
      if (mediaContainer) {
        mediaContainer.addEventListener('mouseenter', () => {
          gsap.to(mediaContainer, {
            scale: 1.02,
            duration: 0.3,
            ease: "power2.out"
          });
        });

        mediaContainer.addEventListener('mouseleave', () => {
          gsap.to(mediaContainer, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
          });
        });
      }

      // Title hover underline effect
      if (projectTitle) {
        const underline = document.createElement('div');
        underline.className = 'absolute bottom-0 left-0 h-0.5 bg-black origin-left transform scale-x-0';
        underline.style.width = '100%';
        projectTitle.style.position = 'relative';
        projectTitle.appendChild(underline);

        projectTitle.addEventListener('mouseenter', () => {
          gsap.to(underline, {
            scaleX: 1,
            duration: 0.3,
            ease: "power2.out"
          });
        });

        projectTitle.addEventListener('mouseleave', () => {
          gsap.to(underline, {
            scaleX: 0,
            duration: 0.3,
            ease: "power2.out"
          });
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [projects]);

  // Details expansion with ScrollTrigger refresh prevention
  useEffect(() => {
    projects.forEach((project) => {
      const detailsContainer = document.querySelector(`[data-details-container="${project.id}"]`) as HTMLElement;
      
      if (!detailsContainer) return;

      if (expandedProject === project.id) {
        // Disable ScrollTrigger refresh during expansion
        ScrollTrigger.config({ autoRefreshEvents: "none" });
        
        // Show details with simple fade-in
        detailsContainer.style.display = 'block';
        detailsContainer.style.opacity = '0';
        detailsContainer.style.transform = 'translateY(-10px)';
        detailsContainer.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        
        // Force reflow
        detailsContainer.offsetHeight;
        
        // Fade in
        detailsContainer.style.opacity = '1';
        detailsContainer.style.transform = 'translateY(0)';
        
        // Re-enable ScrollTrigger refresh after animation
        setTimeout(() => {
          ScrollTrigger.config({ autoRefreshEvents: "visibilitychange,DOMContentLoaded,load,resize" });
        }, 600);
      } else {
        // Hide details with fade-out
        if (detailsContainer.style.display !== 'none') {
          ScrollTrigger.config({ autoRefreshEvents: "none" });
          
          detailsContainer.style.transition = 'opacity 0.4s ease-out, transform 0.4s ease-out';
          detailsContainer.style.opacity = '0';
          detailsContainer.style.transform = 'translateY(-10px)';
          
          setTimeout(() => {
            detailsContainer.style.display = 'none';
            ScrollTrigger.config({ autoRefreshEvents: "visibilitychange,DOMContentLoaded,load,resize" });
          }, 400);
        }
      }
    });
  }, [expandedProject, projects]);

  // ESC key handler for closing expanded details
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && expandedProject) {
        setExpandedProject(null);
      }
    };

    if (expandedProject) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [expandedProject]);

  return (
    <div className="bg-white" data-page="rotware">
      <Navigation />
      
      {/* Initial View - Title Block */}
      <div className="min-h-screen flex items-center justify-center px-8">
        <div className="text-center space-y-8 max-w-4xl" data-animate>
          <AnimatedHeading
            text="ROTWARE"
            className="text-6xl lg:text-8xl font-black text-black leading-none tracking-tight uppercase"
            animationType="slide"
            staggerDelay={0.05}
          />
          <div className="text-xl lg:text-2xl text-gray-600 leading-relaxed font-light">
            Explorations in digital matter and interactive systems.
          </div>
        </div>
      </div>

      {/* Project Panels */}
      {projects.map((project, index) => {
        const isEven = index % 2 === 0;
        
        return (
          <div key={project.id} className="relative" style={{ zIndex: projects.length - index }}>
            {/* Main Project Panel */}
            <div 
              className="min-h-[85vh] flex items-center px-8 lg:px-16 bg-white"
              data-project-panel={project.id}
            >
              <div className="max-w-7xl mx-auto w-full">
                <div className={`grid lg:grid-cols-2 gap-16 items-center ${
                  isEven ? '' : 'lg:grid-flow-col-dense'
                }`}>
                  
                  {/* Text Content */}
                  <div className={`space-y-6 ${isEven ? '' : 'lg:col-start-2'}`}>
                    <div className="space-y-4" data-content-reveal>
                      <h2 
                        className="text-4xl lg:text-6xl font-bold text-black uppercase leading-tight hover:cursor-pointer"
                        data-project-title
                      >
                        {project.title}
                      </h2>
                      
                      <p className="text-lg lg:text-xl text-gray-700 leading-relaxed max-w-lg">
                        {project.description}
                      </p>
                      
                      <div className="inline-flex items-center px-4 py-2 bg-gray-100 rounded-full">
                        <span className="text-sm font-semibold text-gray-800 uppercase tracking-wide">
                          STATUS: {project.status}
                        </span>
                      </div>
                    </div>
                    
                    {/* Details Button */}
                    <button
                      onClick={() => setExpandedProject(expandedProject === project.id ? null : project.id)}
                      className="flex items-center space-x-2 text-gray-600 hover:text-black transition-colors"
                    >
                      <span className="text-lg font-bold">{expandedProject === project.id ? '−' : '+'}</span>
                      <span className="text-sm uppercase tracking-wide font-semibold">
                        {expandedProject === project.id ? 'CLOSE' : 'DETAILS'}
                      </span>
                    </button>
                  </div>
                  
                  {/* Media Container */}
                  <div className={`${isEven ? 'lg:col-start-2' : 'lg:col-start-1'}`}>
                    <div 
                      className="aspect-[4/3] bg-gray-50 border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:scale-[1.02] transition-transform duration-300"
                      data-media-container
                    >
                      <img 
                        src={project.mediaUrl} 
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Inline Details Section */}
                <div 
                  className="overflow-visible"
                  data-details-container={project.id}
                  style={{ display: 'none' }}
                >
                  <div className="pt-12 px-8 lg:px-16" data-details-content>
                    <div className="max-w-7xl mx-auto">
                      <div className="border-t border-gray-200 pt-8">
                        <div className="grid lg:grid-cols-3 gap-8">
                          {/* Technical Details */}
                          <div className="space-y-4">
                            <h4 className="text-lg font-bold text-black uppercase tracking-wide">
                              Tech Stack
                            </h4>
                            <div className="space-y-2">
                              {project.details.techStack.map((tech, idx) => (
                                <div 
                                  key={idx}
                                  className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded inline-block mr-2 mb-2"
                                >
                                  {tech}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Team Information */}
                          <div className="space-y-4">
                            <h4 className="text-lg font-bold text-black uppercase tracking-wide">
                              Team
                            </h4>
                            <div className="space-y-2">
                              {project.details.team.map((member, idx) => (
                                <div key={idx} className="text-gray-700 text-sm">
                                  {member}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Timeline */}
                          <div className="space-y-4">
                            <h4 className="text-lg font-bold text-black uppercase tracking-wide">
                              Timeline
                            </h4>
                            <div className="text-gray-700 text-sm">
                              {project.details.timeline}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}

    </div>
  );
};

export default Rotware;