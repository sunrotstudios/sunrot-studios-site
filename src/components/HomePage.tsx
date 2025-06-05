import React from 'react';
import MediaSlideshow from "./MediaSlideshow"; // Assuming MediaSlideshow is in the same directory or adjust path

// Re-declare mediaItems here or pass as props if App is still master
// For simplicity here, re-declaring. Ideally, this would come from a shared source or props.
const mediaItems = [
  { src: "/src/assets/media/car-dancing.gif", type: "image" as const, alt: "Car dancing animation" },
  { src: "/src/assets/media/circle.gif", type: "image" as const, alt: "Circle animation" },
  { src: "/src/assets/media/color-lump.gif", type: "image" as const, alt: "Color lump animation" },
  { src: "/src/assets/media/digital-woman.gif", type: "image" as const, alt: "Digital woman animation" },
  { src: "/src/assets/media/infinite-hallway.gif", type: "image" as const, alt: "Infinite hallway animation" },
  { src: "/src/assets/media/leaves.gif", type: "image" as const, alt: "Leaves animation" },
  { src: "/src/assets/media/rorshack.gif", type: "image" as const, alt: "Rorschach animation" },
  { src: "/src/assets/media/white-circle.gif", type: "image" as const, alt: "White circle animation" },
];

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-between h-full pt-24 pb-24"> {/* Adjusted padding to match App.tsx's mt-24/mb-24 on rows */}
      {/* First Row */}
      <div className="flex justify-between items-center w-full px-24 relative z-10">
        <div className="text-center text-sm font-bold tracking-widest leading-tight flex-1 flex flex-col items-center justify-center">
          <div>EXPERIMENTAL</div>
          <div>SOFTWARE</div>
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
      <div className="relative text-9xl lg:text-[180px] font-black tracking-wider text-black text-center whitespace-nowrap z-10 my-8"> {/* Added my-8 for spacing if needed */}
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
      <div className="flex justify-between items-center w-full px-24 relative z-10">
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
    </div>
  );
};

export default HomePage;
