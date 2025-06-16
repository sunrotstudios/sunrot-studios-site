import { FC, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { clsx } from 'clsx';
import AnimatedHeading from './AnimatedHeading';

gsap.registerPlugin(ScrollTrigger);

interface ProjectPanelProps {
  title: string;
  description: string;
  status: string;
  techStack?: string[];
  mediaUrl?: string;
  mediaType?: 'image' | 'video' | 'gif';
  layout?: 'left' | 'right' | 'center';
  backgroundColor?: string;
  textColor?: string;
  className?: string;
  onInteract?: () => void;
}

const ProjectPanel: FC<ProjectPanelProps> = ({
  title,
  description,
  status,
  techStack = [],
  mediaUrl,
  mediaType = 'image',
  layout = 'left',
  backgroundColor = 'bg-white',
  textColor = 'text-black',
  className,
  onInteract
}) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!panelRef.current || !contentRef.current) return;

    const panel = panelRef.current;
    const content = contentRef.current;
    const media = mediaRef.current;

    // Set initial state - content hidden
    gsap.set(content.children, {
      opacity: 0,
      y: 40,
      scale: 0.95
    });

    if (media) {
      gsap.set(media, {
        opacity: 0,
        x: layout === 'left' ? 40 : -40,
        scale: 0.9
      });
    }

    // Create scroll-triggered animation
    const scrollTrigger = ScrollTrigger.create({
      trigger: panel,
      start: 'top 60%',
      end: 'bottom 40%',
      onEnter: () => {
        // Animate content in
        gsap.to(content.children, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power2.out',
          stagger: 0.1
        });

        // Animate media in
        if (media) {
          gsap.to(media, {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 1,
            ease: 'power2.out',
            delay: 0.2
          });
        }
      },
      onLeave: () => {
        // Optional: fade out when leaving viewport
        gsap.to(content.children, {
          opacity: 0.3,
          duration: 0.4,
          ease: 'power2.out'
        });
      },
      onEnterBack: () => {
        // Re-animate when scrolling back up
        gsap.to(content.children, {
          opacity: 1,
          duration: 0.4,
          ease: 'power2.out'
        });
      }
    });

    return () => {
      scrollTrigger.kill();
    };
  }, [layout]);

  const getLayoutClasses = () => {
    switch (layout) {
      case 'right':
        return 'lg:flex-row-reverse';
      case 'center':
        return 'lg:flex-col lg:items-center lg:text-center';
      default: // left
        return 'lg:flex-row';
    }
  };

  const renderMedia = () => {
    if (!mediaUrl) return null;

    const mediaElement = (() => {
      switch (mediaType) {
        case 'video':
          return (
            <video 
              autoPlay 
              muted 
              loop 
              playsInline
              className="w-full h-full object-cover"
            >
              <source src={mediaUrl} type="video/mp4" />
            </video>
          );
        case 'gif':
          return (
            <img 
              src={mediaUrl} 
              alt={title}
              className="w-full h-full object-cover"
            />
          );
        default: // image
          return (
            <img 
              src={mediaUrl} 
              alt={title}
              className="w-full h-full object-cover"
            />
          );
      }
    })();

    return (
      <div 
        ref={mediaRef}
        className="lg:w-1/2 h-64 lg:h-auto"
      >
        <div className="w-full h-full border border-gray-300 overflow-hidden">
          {mediaElement}
        </div>
      </div>
    );
  };

  return (
    <div
      ref={panelRef}
      className={clsx(
        'min-h-screen flex items-center justify-center px-8 py-16',
        backgroundColor,
        className
      )}
      onClick={onInteract}
      data-animate
    >
      <div className={clsx(
        'max-w-7xl w-full flex flex-col gap-8',
        getLayoutClasses(),
        layout === 'center' ? '' : 'lg:items-center'
      )}>
        
        {/* Content Section */}
        <div 
          ref={contentRef}
          className={clsx(
            'lg:w-1/2 space-y-6',
            layout === 'center' ? 'lg:w-full' : ''
          )}
        >
          {/* Project Title */}
          <div data-animate="text">
            <AnimatedHeading
              text={title}
              className={clsx('text-6xl lg:text-8xl font-black leading-tight', textColor)}
              animationType="slide"
              staggerDelay={0.03}
              triggerOnView={false}
            />
          </div>

          {/* Status Badge */}
          <div 
            className={clsx(
              'inline-block px-4 py-2 border-2 border-black',
              'text-sm font-bold uppercase tracking-wider',
              textColor
            )}
            data-animate="text"
          >
            {status}
          </div>

          {/* Description */}
          <div 
            className={clsx('text-2xl lg:text-3xl leading-relaxed', textColor)}
            data-animate="text"
          >
            {description}
          </div>

          {/* Tech Stack */}
          {techStack.length > 0 && (
            <div className="space-y-2" data-animate="text">
              <div className={clsx('text-sm font-bold uppercase tracking-wider', textColor)}>
                Technology
              </div>
              <div className="flex flex-wrap gap-2">
                {techStack.map((tech, index) => (
                  <span
                    key={index}
                    className={clsx(
                      'px-3 py-1 border border-gray-400 text-sm',
                      'bg-transparent', textColor
                    )}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Media Section */}
        {renderMedia()}
      </div>
    </div>
  );
};

export default ProjectPanel;