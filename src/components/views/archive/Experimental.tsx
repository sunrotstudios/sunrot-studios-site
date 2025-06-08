import { FC } from "react";
import { Link } from "react-router-dom";
import { GradientBackground } from "../ui/noisy-gradient-backgrounds";
import MediaSlideshow from "../MediaSlideshow";

const Experimental: FC = () => {
  const mediaItems = [
    {
      src: "/src/assets/media/car-dancing.gif",
      type: "image" as const,
      alt: "Car dancing animation",
    },
    {
      src: "/src/assets/media/circle.gif",
      type: "image" as const,
      alt: "Circle animation",
    },
    {
      src: "/src/assets/media/color-lump.gif",
      type: "image" as const,
      alt: "Color lump animation",
    },
    {
      src: "/src/assets/media/digital-woman.gif",
      type: "image" as const,
      alt: "Digital woman animation",
    },
  ];

  return (
    <div className="w-screen h-screen font-mondwest font-bold text-black relative flex flex-col justify-between p-10 lg:px-16 overflow-hidden">
      {/* Grainy gradient background */}
      <GradientBackground
        className="z-0"
        colors={[
          { color: "rgba(255,220,180,1)", stop: "0%" },
          { color: "rgba(255,200,140,1)", stop: "20%" },
          { color: "rgba(255,180,120,1)", stop: "40%" },
          { color: "rgba(255,160,100,1)", stop: "60%" },
          { color: "rgba(255,140,80,1)", stop: "80%" },
          { color: "rgba(255,120,60,1)", stop: "100%" },
        ]}
      />

      {/* Navigation */}
      <div className="absolute top-16 left-16 text-xs font-bold tracking-wider z-10">
        <Link to="/" className="hover:opacity-70 transition-opacity">
          ← BACK
        </Link>
      </div>
      <div className="absolute top-16 right-16 text-xs font-bold tracking-wider z-10">
        <Link to="/contact" className="hover:opacity-70 transition-opacity">
          CONTACT
        </Link>
      </div>

      {/* Title */}
      <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-center">
        <h1 className="text-6xl lg:text-8xl font-black tracking-wider mb-8">
          EXPERIMENTAL
        </h1>
        <h2 className="text-4xl lg:text-6xl font-black tracking-wider">
          SOFTWARE
        </h2>
      </div>

      {/* Projects Grid */}
      <div className="absolute top-2/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-full max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
          <div className="space-y-4">
            <div className="w-32 h-32 mx-auto rounded overflow-hidden">
              <MediaSlideshow
                mediaItems={[mediaItems[0]]}
                intervalMs={1000}
                className="w-full h-full"
              />
            </div>
            <div>
              <div className="text-lg font-bold tracking-wider mb-1">
                NEURAL DREAMSCAPES
              </div>
              <div className="text-sm opacity-80 tracking-wide">
                AI-generated visual poetry
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="w-32 h-32 mx-auto rounded overflow-hidden">
              <MediaSlideshow
                mediaItems={[mediaItems[1]]}
                intervalMs={1000}
                className="w-full h-full"
              />
            </div>
            <div>
              <div className="text-lg font-bold tracking-wider mb-1">
                TEMPORAL LOOPS
              </div>
              <div className="text-sm opacity-80 tracking-wide">
                Time-bending interactive experiences
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="w-32 h-32 mx-auto rounded overflow-hidden">
              <MediaSlideshow
                mediaItems={[mediaItems[2]]}
                intervalMs={1000}
                className="w-full h-full"
              />
            </div>
            <div>
              <div className="text-lg font-bold tracking-wider mb-1">
                VOID INTERFACES
              </div>
              <div className="text-sm opacity-80 tracking-wide">
                Post-digital interaction paradigms
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="w-32 h-32 mx-auto rounded overflow-hidden">
              <MediaSlideshow
                mediaItems={[mediaItems[3]]}
                intervalMs={1000}
                className="w-full h-full"
              />
            </div>
            <div>
              <div className="text-lg font-bold tracking-wider mb-1">
                QUANTUM BEATS
              </div>
              <div className="text-sm opacity-80 tracking-wide">
                Algorithmic music composition
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="w-32 h-32 mx-auto bg-black bg-opacity-20 rounded flex items-center justify-center">
              <div className="text-6xl opacity-50">?</div>
            </div>
            <div>
              <div className="text-lg font-bold tracking-wider mb-1">
                PROJECT X
              </div>
              <div className="text-sm opacity-80 tracking-wide">
                Coming soon...
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="w-32 h-32 mx-auto bg-black bg-opacity-20 rounded flex items-center justify-center">
              <div className="text-6xl opacity-50">∞</div>
            </div>
            <div>
              <div className="text-lg font-bold tracking-wider mb-1">
                INFINITE CANVAS
              </div>
              <div className="text-sm opacity-80 tracking-wide">
                Boundless creative tools
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Corner Elements */}
      <div className="absolute bottom-16 left-16 z-10">
        <div className="text-sm font-bold tracking-wider mb-1">OPEN SOURCE</div>
        <div className="text-[10px] font-normal tracking-wide opacity-80">
          code as art · art as rebellion
        </div>
      </div>
      <div className="absolute bottom-16 right-16 text-xs font-bold tracking-wider z-10">
        <Link to="/about" className="hover:opacity-70 transition-opacity">
          ABOUT →
        </Link>
      </div>
    </div>
  );
};

export default Experimental;