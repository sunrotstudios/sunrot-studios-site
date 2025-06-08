import { FC, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";

const Rotware: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Brutalist, jarring entrance animations
    const tl = gsap.timeline();
    
    tl.set([headerRef.current, projectsRef.current], { opacity: 0, scale: 0.95 })
      .to(headerRef.current, { 
        opacity: 1, 
        scale: 1, 
        duration: 0.25, 
        ease: "power2.out" 
      })
      .to(projectsRef.current, { 
        opacity: 1, 
        scale: 1, 
        duration: 0.3, 
        ease: "power2.out" 
      }, "-=0.1");
  }, []);

  return (
    <div 
      ref={containerRef}
      className="w-screen min-h-screen bg-white font-mondwest text-black p-8 lg:p-16"
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
        <h1 className="text-6xl lg:text-8xl font-black tracking-tight leading-none mb-4">
          ROTWARE
        </h1>
        <div className="text-lg font-bold tracking-widest opacity-80">
          EXPERIMENTAL SOFTWARE FOR CREATIVE COMMUNITIES
        </div>
      </div>

      {/* Projects Grid */}
      <div ref={projectsRef} className="max-w-6xl space-y-16">
        {/* Current Projects */}
        <section>
          <h2 className="text-2xl font-black tracking-wide mb-8 border-b-2 border-black pb-2">
            CURRENT BUILDS
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="border-2 border-black p-6">
              <h3 className="text-2xl font-black mb-4">BEESIDES</h3>
              <p className="text-sm opacity-80 mb-4">Social Platform for Creative Collaboration</p>
              <p className="leading-relaxed mb-4">
                A social network designed for artists, not advertisers. No algorithms, 
                no engagement metrics, no corporate oversight. Just humans making things together.
              </p>
              <div className="text-xs font-bold tracking-wider">
                STATUS: ALPHA • INVITE ONLY
              </div>
            </div>

            <div className="border-2 border-black p-6">
              <h3 className="text-2xl font-black mb-4">VELVET METAL</h3>
              <p className="text-sm opacity-80 mb-4">Digital Experience Platform</p>
              <p className="leading-relaxed mb-4">
                Interactive experiences that blur the line between software and art. 
                Tools for creating digital performances and immersive narratives.
              </p>
              <div className="text-xs font-bold tracking-wider">
                STATUS: PROTOTYPE • ARTIST ACCESS
              </div>
            </div>

            <div className="border-2 border-black p-6">
              <h3 className="text-2xl font-black mb-4">ARTIST PORTFOLIO TOOLS</h3>
              <p className="text-sm opacity-80 mb-4">Free Web Presence Solutions</p>
              <p className="leading-relaxed mb-4">
                No-bullshit portfolio builders for tattoo artists and visual creators. 
                Your work, your space, no subscription fees.
              </p>
              <div className="text-xs font-bold tracking-wider">
                STATUS: BETA • OPEN ACCESS
              </div>
            </div>

            <div className="border-2 border-black p-6">
              <h3 className="text-2xl font-black mb-4">UNDERGROUND UTILITIES</h3>
              <p className="text-sm opacity-80 mb-4">Niche Tools for Subcultures</p>
              <p className="leading-relaxed mb-4">
                Small, focused applications serving specific creative communities. 
                Tools that corporate platforms would never build.
              </p>
              <div className="text-xs font-bold tracking-wider">
                STATUS: ONGOING • COMMUNITY REQUEST
              </div>
            </div>
          </div>
        </section>

        {/* Philosophy */}
        <section>
          <h2 className="text-2xl font-black tracking-wide mb-8 border-b-2 border-black pb-2">
            DEVELOPMENT PHILOSOPHY
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div>
              <h3 className="font-black mb-3">POETRY + BUGS</h3>
              <p className="text-sm leading-relaxed">
                We prioritize aesthetic experience and cultural resonance alongside 
                technical functionality. Beautiful code for beautiful people.
              </p>
            </div>
            <div>
              <h3 className="font-black mb-3">COMMUNITY FIRST</h3>
              <p className="text-sm leading-relaxed">
                Every tool is built in direct collaboration with the communities 
                that will use it. No boardroom decisions about artist needs.
              </p>
            </div>
            <div>
              <h3 className="font-black mb-3">OPEN SOURCE SPIRIT</h3>
              <p className="text-sm leading-relaxed">
                Code as art, art as rebellion. When possible, our builds are 
                transparent and community-owned.
              </p>
            </div>
          </div>
        </section>

        {/* Future Builds */}
        <section>
          <h2 className="text-2xl font-black tracking-wide mb-8 border-b-2 border-black pb-2">
            FUTURE BUILDS
          </h2>
          <div className="space-y-6">
            <div className="border border-gray-400 p-6 opacity-75">
              <h3 className="text-xl font-black mb-2">NEURAL DREAMSCAPES</h3>
              <p className="text-sm leading-relaxed">
                AI-generated visual poetry tools that artists actually want to use. 
                Machine learning as creative collaborator, not replacement.
              </p>
            </div>
            <div className="border border-gray-400 p-6 opacity-75">
              <h3 className="text-xl font-black mb-2">TEMPORAL LOOPS</h3>
              <p className="text-sm leading-relaxed">
                Time-bending interactive experiences for web and installation. 
                Chronology as creative medium.
              </p>
            </div>
            <div className="border border-gray-400 p-6 opacity-75">
              <h3 className="text-xl font-black mb-2">VOID INTERFACES</h3>
              <p className="text-sm leading-relaxed">
                Post-digital interaction paradigms. What comes after the screen? 
                What comes after the click?
              </p>
            </div>
          </div>
        </section>

        {/* Access */}
        <section>
          <h2 className="text-2xl font-black tracking-wide mb-8 border-b-2 border-black pb-2">
            GET ACCESS
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div>
              <h3 className="font-black mb-2">FOR ARTISTS</h3>
              <p className="text-sm">
                collab@sunrotstudios.com<br />
                Tell us what you're building
              </p>
            </div>
            <div>
              <h3 className="font-black mb-2">FOR DEVELOPERS</h3>
              <p className="text-sm">
                github.com/sunrotstudios<br />
                Contribute to the chaos
              </p>
            </div>
            <div>
              <h3 className="font-black mb-2">FOR COMMUNITIES</h3>
              <p className="text-sm">
                We build tools you need<br />
                Not tools you're told to want
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Bottom Navigation */}
      <div className="absolute bottom-8 right-8">
        <div className="flex space-x-8 text-xs font-bold tracking-widest">
          <Link 
            to="/events" 
            className="hover:bg-black hover:text-white px-2 py-1 transition-colors duration-100"
          >
            EVENTS →
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

export default Rotware;