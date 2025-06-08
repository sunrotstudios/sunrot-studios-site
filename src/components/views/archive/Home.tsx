import { FC } from "react";
import { Link } from "react-router-dom";
import { GradientBackground } from "../ui/noisy-gradient-backgrounds";
import MediaSlideshow from "../MediaSlideshow";

const Home: FC = () => {
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
    {
      src: "/src/assets/media/infinite-hallway.gif",
      type: "image" as const,
      alt: "Infinite hallway animation",
    },
    {
      src: "/src/assets/media/leaves.gif",
      type: "image" as const,
      alt: "Leaves animation",
    },
    {
      src: "/src/assets/media/rorshack.gif",
      type: "image" as const,
      alt: "Rorschach animation",
    },
    {
      src: "/src/assets/media/white-circle.gif",
      type: "image" as const,
      alt: "White circle animation",
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
      {/* Top Corner Elements */}
      <div className="absolute top-16 left-16 text-xs font-bold tracking-wider z-10">
        <Link to="/about" className="hover:opacity-70 transition-opacity">
          ABOUT STUDIO
        </Link>
      </div>
      <div className="absolute top-16 right-16 text-xs font-bold tracking-wider z-10">
        <Link to="/contact" className="hover:opacity-70 transition-opacity">
          WHAT WE DO
        </Link>
      </div>

      {/* First Row */}
      <div className="flex justify-between items-center w-full px-24 relative mt-24 z-10">
        <div className="text-center text-sm font-bold tracking-widest leading-tight flex-1 flex flex-col items-center justify-center">
          <Link to="/experimental" className="hover:opacity-70 transition-opacity">
            <div>EXPERIMENTAL</div>
            <div>SOFTWARE</div>
          </Link>
        </div>
        <div className="text-center text-sm font-bold tracking-widest leading-tight flex-1 flex flex-col items-center justify-center">
          <div>SURREAL</div>
          <div>EVENTS</div>
        </div>
        <div className="text-center text-sm font-bold tracking-widest leading-tight flex-1 flex flex-col items-center justify-center">
          <div>UNDERGROUND</div>
          <div>LABEL</div>
        </div>
      </div>

      {/* Center Logo */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-9xl lg:text-[180px] font-black tracking-wider text-black text-center whitespace-nowrap z-10">
        <div className="relative z-10">sun rot studios</div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-52 overflow-hidden rounded z-0">
          <MediaSlideshow
            mediaItems={mediaItems}
            intervalMs={300}
            className="w-full h-full"
          />
        </div>
      </div>

      {/* Second Row */}
      <div className="flex justify-between items-center w-full px-24 relative mb-24 z-10">
        <div className="text-center text-sm font-bold tracking-widest leading-tight flex-1 flex flex-col items-center justify-center">
          <div>ARTISTS</div>
          <div>HACKERS</div>
        </div>
        <div className="text-center text-sm font-bold tracking-widest leading-tight flex-1 flex flex-col items-center justify-center">
          <div>DANCERS</div>
          <div>PROPHETS</div>
        </div>
        <div className="text-center text-sm font-bold tracking-widest leading-tight flex-1 flex flex-col items-center justify-center">
          <div>BEAUTIFUL</div>
          <div>MISFITS</div>
        </div>
      </div>

      {/* Bottom Corner Elements */}
      <div className="absolute bottom-16 left-16 z-10">
        <div className="text-sm font-bold tracking-wider mb-1">VENICE CA</div>
        <div className="text-[10px] font-normal tracking-wide opacity-80">
          fever dream + digital infrastructure
        </div>
      </div>
      <div className="absolute bottom-16 right-16 text-xs font-bold tracking-wider z-10">
        <Link to="/about" className="hover:opacity-70 transition-opacity">
          ENTER
        </Link>
      </div>
    </div>
  );
};

export default Home;