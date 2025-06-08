import { FC, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";

const PeripheralVision: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Brutalist, jarring entrance animations
    const tl = gsap.timeline();
    
    tl.set([headerRef.current, contentRef.current], { opacity: 0, x: 40 })
      .to(headerRef.current, { 
        opacity: 1, 
        x: 0, 
        duration: 0.3, 
        ease: "power2.out" 
      })
      .to(contentRef.current, { 
        opacity: 1, 
        x: 0, 
        duration: 0.25, 
        ease: "power2.out" 
      }, "-=0.15");
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
          PERIPHERAL
        </h1>
        <h2 className="text-6xl lg:text-8xl font-black tracking-tight leading-none mb-4">
          VISION
        </h2>
        <div className="text-lg font-bold tracking-widest opacity-80">
          DECENTRALIZED LABEL & CURATORIAL ARM
        </div>
      </div>

      {/* Content */}
      <div ref={contentRef} className="max-w-6xl space-y-16">
        {/* Mission */}
        <section>
          <h2 className="text-2xl font-black tracking-wide mb-8 border-b-2 border-black pb-2">
            WHAT WE ARE
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <p className="text-lg leading-relaxed">
                Peripheral Vision is our artist platform and curatorial arm—a decentralized 
                label that amplifies independent voices operating outside mainstream discovery mechanisms.
              </p>
              <p className="leading-relaxed">
                We don't sign artists. We amplify them. We don't own catalogs. We build 
                ecosystems where creative work can exist and thrive on its own terms.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-black">OUR FOCUS</h3>
              <ul className="space-y-2 text-sm">
                <li>• Music compilation releases</li>
                <li>• Digital-first artist showcases</li>
                <li>• Cross-disciplinary creative collaboration</li>
                <li>• Independent artist amplification</li>
                <li>• Cultural preservation through documentation</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Current Releases */}
        <section>
          <h2 className="text-2xl font-black tracking-wide mb-8 border-b-2 border-black pb-2">
            RECENT RELEASES
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="border-2 border-black p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-black">VOID TRANSMISSIONS VOL. 1</h3>
                  <p className="text-sm opacity-80">Various Artists • 2024</p>
                </div>
                <div className="text-xs font-bold">
                  DIGITAL
                </div>
              </div>
              <p className="text-sm leading-relaxed mb-4">
                Eight tracks from artists operating in the spaces between genres. 
                Electronic music for the post-algorithm generation.
              </p>
              <div className="text-xs opacity-80">
                Features: Null_Operator, Frequency_Drift, Static_Garden, Echo_Chambers
              </div>
            </div>

            <div className="border-2 border-black p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-black">TACTILE FUTURES</h3>
                  <p className="text-sm opacity-80">Digital Exhibition • 2024</p>
                </div>
                <div className="text-xs font-bold">
                  ONGOING
                </div>
              </div>
              <p className="text-sm leading-relaxed mb-4">
                Interactive art pieces exploring haptic technology and physical sensation 
                in digital space. Five artists, infinite interpretations.
              </p>
              <div className="text-xs opacity-80">
                Features: Sarah Chen, M. Rodriguez, Alex Kim, Jade Nakamura, River Stone
              </div>
            </div>

            <div className="border-2 border-black p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-black">UNDERGROUND RADIO ARCHIVE</h3>
                  <p className="text-sm opacity-80">Live Sessions • Ongoing</p>
                </div>
                <div className="text-xs font-bold">
                  LIVE
                </div>
              </div>
              <p className="text-sm leading-relaxed mb-4">
                Monthly live recording sessions in unconventional spaces. Raw performances 
                captured without overproduction or corporate interference.
              </p>
              <div className="text-xs opacity-80">
                Recorded at: Warehouse 23, Tunnel Sessions, Rooftop Series
              </div>
            </div>

            <div className="border-2 border-black p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-black">COLLABORATIVE FUTURES</h3>
                  <p className="text-sm opacity-80">Cross-Disciplinary Project • 2025</p>
                </div>
                <div className="text-xs font-bold">
                  PLANNED
                </div>
              </div>
              <p className="text-sm leading-relaxed mb-4">
                Musicians, visual artists, and developers creating integrated experiences 
                that exist across multiple mediums simultaneously.
              </p>
              <div className="text-xs opacity-80">
                Applications open: March 2025
              </div>
            </div>
          </div>
        </section>

        {/* Artist Support */}
        <section>
          <h2 className="text-2xl font-black tracking-wide mb-8 border-b-2 border-black pb-2">
            HOW WE SUPPORT ARTISTS
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div>
              <h3 className="font-black mb-3">INTEGRATED TOOLS</h3>
              <p className="text-sm leading-relaxed">
                Our Rotware platform provides portfolio tools, collaboration spaces, 
                and distribution channels designed specifically for independent creators.
              </p>
            </div>
            <div>
              <h3 className="font-black mb-3">LIVE PLATFORM</h3>
              <p className="text-sm leading-relaxed">
                Heat Death Social Club events provide performance opportunities and 
                community connections that exist outside corporate venue systems.
              </p>
            </div>
            <div>
              <h3 className="font-black mb-3">NO EXTRACTION</h3>
              <p className="text-sm leading-relaxed">
                We don't take ownership of work, demand exclusivity, or impose creative 
                control. We amplify what already exists.
              </p>
            </div>
          </div>
        </section>

        {/* Submission Process */}
        <section>
          <h2 className="text-2xl font-black tracking-wide mb-8 border-b-2 border-black pb-2">
            WORK WITH US
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-black mb-4">FOR MUSICIANS</h3>
              <p className="leading-relaxed mb-4">
                We're interested in work that exists outside algorithmic discovery. 
                Genre-defying, community-building, culturally resonant music.
              </p>
              <div className="text-sm">
                <strong>Submit:</strong> 3-5 tracks, artist statement, live performance links<br />
                <strong>Contact:</strong> music@sunrotstudios.com
              </div>
            </div>
            <div>
              <h3 className="text-xl font-black mb-4">FOR VISUAL ARTISTS</h3>
              <p className="leading-relaxed mb-4">
                Digital-first work, interactive experiences, and projects that explore 
                technology as creative medium rather than distribution channel.
              </p>
              <div className="text-sm">
                <strong>Submit:</strong> Portfolio, project concepts, technical requirements<br />
                <strong>Contact:</strong> visual@sunrotstudios.com
              </div>
            </div>
          </div>
          
          <div className="mt-12 p-6 border border-gray-400">
            <h3 className="font-black mb-3">SELECTION CRITERIA</h3>
            <div className="text-sm leading-relaxed">
              We prioritize work that demonstrates cultural resonance over commercial viability, 
              community connection over individual branding, and artistic integrity over market optimization. 
              We're looking for voices that the mainstream forgot to listen to.
            </div>
          </div>
        </section>
      </div>

      {/* Bottom Navigation */}
      <div className="absolute bottom-8 right-8">
        <div className="flex space-x-8 text-xs font-bold tracking-widest">
          <Link 
            to="/about" 
            className="hover:bg-black hover:text-white px-2 py-1 transition-colors duration-100"
          >
            ABOUT →
          </Link>
          <Link 
            to="/events" 
            className="hover:bg-black hover:text-white px-2 py-1 transition-colors duration-100"
          >
            EVENTS →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PeripheralVision;