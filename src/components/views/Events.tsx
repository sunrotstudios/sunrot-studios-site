import { FC, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";

const Events: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Brutalist, abrupt entrance animations
    const tl = gsap.timeline();
    
    tl.set([headerRef.current, contentRef.current], { opacity: 0, y: 30 })
      .to(headerRef.current, { 
        opacity: 1, 
        y: 0, 
        duration: 0.2, 
        ease: "power2.out" 
      })
      .to(contentRef.current, { 
        opacity: 1, 
        y: 0, 
        duration: 0.3, 
        ease: "power2.out" 
      }, "-=0.05");
  }, []);

  return (
    <div 
      ref={containerRef}
      className="w-screen min-h-screen bg-orange-500 font-mondwest text-black p-8 lg:p-16"
    >
      {/* Navigation */}
      <div className="absolute top-8 left-8">
        <Link 
          to="/" 
          className="text-xs font-bold tracking-widest hover:bg-black hover:text-white px-2 py-1 transition-colors duration-100"
        >
          ← BACK
        </Link>
      </div>

      {/* Header */}
      <div ref={headerRef} className="mt-16 mb-16">
        <h1 className="text-8xl lg:text-[140px] font-black tracking-tighter leading-none mb-4 transform -skew-y-2">
          HEAT DEATH
        </h1>
        <h2 className="text-8xl lg:text-[140px] font-black tracking-tighter leading-none mb-4 transform skew-y-2">
          SOCIAL CLUB
        </h2>
        <div className="text-lg font-bold tracking-widest opacity-80">
          CURATED EXPERIENCES AS CULTURAL RITUALS
        </div>
      </div>

      {/* Content */}
      <div ref={contentRef} className="max-w-6xl space-y-16">
        {/* What We Do */}
        <section>
          <h2 className="text-2xl font-black tracking-wide mb-8 border-b-2 border-black pb-2">
            WHAT WE DO
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-black mb-3">UNDERGROUND MUSIC</h3>
                <p className="leading-relaxed">
                  Showcases and raves featuring artists who exist outside 
                  algorithmic discovery. Raw sound for raw spaces.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-black mb-3">VISUAL ART EXHIBITIONS</h3>
                <p className="leading-relaxed">
                  Film screenings and art installations that challenge 
                  conventional gallery spaces and digital consumption.
                </p>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-black mb-3">CREATIVE SALONS</h3>
                <p className="leading-relaxed">
                  Weekly gatherings for discourse, collaboration, and 
                  the cross-pollination of ideas between disciplines.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-black mb-3">AUTONOMOUS ZONES</h3>
                <p className="leading-relaxed">
                  Temporary spaces designed for authentic artistic connection 
                  and community building outside corporate frameworks.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Upcoming Events */}
        <section>
          <h2 className="text-2xl font-black tracking-wide mb-8 border-b-2 border-black pb-2">
            UPCOMING
          </h2>
          <div className="space-y-8">
            <div className="border-2 border-black p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-black">FREQUENCY DRIFT</h3>
                  <p className="text-sm opacity-80">Underground Electronic Showcase</p>
                </div>
                <div className="text-right text-sm">
                  <div className="font-black">FEB 15</div>
                  <div>8PM - LATE</div>
                </div>
              </div>
              <p className="leading-relaxed">
                Four acts pushing the boundaries of electronic music. No algorithms, 
                no playlists, no compromise. Location announced 24 hours prior.
              </p>
            </div>

            <div className="border-2 border-black p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-black">SALON: DIGITAL RESISTANCE</h3>
                  <p className="text-sm opacity-80">Creative Discussion Series</p>
                </div>
                <div className="text-right text-sm">
                  <div className="font-black">FEB 22</div>
                  <div>7PM - 10PM</div>
                </div>
              </div>
              <p className="leading-relaxed">
                How do we build creative technology that serves artists instead of 
                extracting from them? Featuring builders, breakers, and dreamers.
              </p>
            </div>

            <div className="border-2 border-black p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-black">VOID SCREENING</h3>
                  <p className="text-sm opacity-80">Experimental Film Night</p>
                </div>
                <div className="text-right text-sm">
                  <div className="font-black">MAR 01</div>
                  <div>9PM - 12AM</div>
                </div>
              </div>
              <p className="leading-relaxed">
                Three experimental films that exist outside festival circuits. 
                Stories told by voices the industry forgot to listen to.
              </p>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section>
          <h2 className="text-2xl font-black tracking-wide mb-8 border-b-2 border-black pb-2">
            GET INVOLVED
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div>
              <h3 className="font-black mb-2">BOOKING</h3>
              <p className="text-sm">events@sunrotstudios.com</p>
            </div>
            <div>
              <h3 className="font-black mb-2">VENUE PARTNERSHIPS</h3>
              <p className="text-sm">We work with spaces that prioritize community over profit</p>
            </div>
            <div>
              <h3 className="font-black mb-2">MAILING LIST</h3>
              <p className="text-sm">Updates sent to the void when something matters</p>
            </div>
          </div>
        </section>
      </div>

      {/* Bottom Navigation */}
      <div className="absolute bottom-8 right-8">
        <div className="flex space-x-8 text-xs font-bold tracking-widest">
          <Link 
            to="/rotware" 
            className="hover:bg-black hover:text-white px-2 py-1 transition-colors duration-100"
          >
            ROTWARE →
          </Link>
          <Link 
            to="/peripheral-vision" 
            className="hover:bg-black hover:text-white px-2 py-1 transition-colors duration-100"
          >
            PERIPHERAL VISION →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Events;