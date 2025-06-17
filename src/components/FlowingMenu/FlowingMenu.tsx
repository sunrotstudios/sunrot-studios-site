/*
	Installed from https://reactbits.dev/ts/tailwind/
*/

import React from "react";
import { gsap } from "gsap";

interface MenuItemProps {
  link: string;
  text: string;
  image: string;
}

interface FlowingMenuProps {
  items?: MenuItemProps[];
}

const FlowingMenu: React.FC<FlowingMenuProps> = ({ items = [] }) => {
  return (
    <div className="w-full h-full overflow-hidden">
      <nav className="flex flex-col h-full m-0 p-0">
        {items.map((item, idx) => (
          <MenuItem key={idx} {...item} />
        ))}
      </nav>
    </div>
  );
};

const MenuItem: React.FC<MenuItemProps> = ({ link, text, image }) => {
  const itemRef = React.useRef<HTMLDivElement>(null);
  const marqueeRef = React.useRef<HTMLDivElement>(null);
  const marqueeInnerRef = React.useRef<HTMLDivElement>(null);

  const animationDefaults = { duration: 0.6, ease: "expo" };

  const findClosestEdge = (
    mouseX: number,
    mouseY: number,
    width: number,
    height: number,
  ): "left" | "right" => {
    const leftEdgeDist = Math.pow(mouseX, 2) + Math.pow(mouseY - height / 2, 2);
    const rightEdgeDist =
      Math.pow(mouseX - width, 2) + Math.pow(mouseY - height / 2, 2);
    return leftEdgeDist < rightEdgeDist ? "left" : "right";
  };

  const handleMouseEnter = (ev: React.MouseEvent<HTMLAnchorElement>) => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current)
      return;
    const rect = itemRef.current.getBoundingClientRect();
    const edge = findClosestEdge(
      ev.clientX - rect.left,
      ev.clientY - rect.top,
      rect.width,
      rect.height,
    );

    const tl = gsap.timeline({ defaults: animationDefaults });
    tl.set(marqueeRef.current, { x: edge === "left" ? "-101%" : "101%" })
      .set(marqueeInnerRef.current, { x: edge === "left" ? "101%" : "-101%" })
      .to([marqueeRef.current, marqueeInnerRef.current], { x: "0%" });
  };

  const handleMouseLeave = (ev: React.MouseEvent<HTMLAnchorElement>) => {
    if (!itemRef.current || !marqueeRef.current || !marqueeInnerRef.current)
      return;
    const rect = itemRef.current.getBoundingClientRect();
    const edge = findClosestEdge(
      ev.clientX - rect.left,
      ev.clientY - rect.top,
      rect.width,
      rect.height,
    );

    const tl = gsap.timeline({ defaults: animationDefaults }) as TimelineMax;
    tl.to(marqueeRef.current, { x: edge === "left" ? "-101%" : "101%" }).to(
      marqueeInnerRef.current,
      { x: edge === "left" ? "101%" : "-101%" },
    );
  };

  const repeatedMarqueeContent = React.useMemo(() => {
    const singleContent = (
      <div className="flex flex-col items-center justify-center py-[2vh] px-[2vw]">
        <span className="text-black uppercase font-normal text-[4vh] leading-[1.2] mb-[1vh] text-center">
          {text}
        </span>
        <div
          className="w-[12vh] h-[12vh] rounded-[50px] bg-cover bg-center border-2 border-black"
          style={{ backgroundImage: `url(${image})` }}
        />
      </div>
    );
    
    // Create seamless loop by duplicating content multiple times
    return Array.from({ length: 8 }).map((_, idx) => (
      <React.Fragment key={idx}>
        {singleContent}
      </React.Fragment>
    ));
  }, [text, image]);

  return (
    <div
      className="flex-1 relative overflow-hidden text-center shadow-[0_-1px_0_0_#000]"
      ref={itemRef}
    >
      <a
        className="flex items-center justify-center h-full relative cursor-pointer uppercase no-underline font-semibold text-black text-[4vh] hover:text-black focus:text-black focus-visible:text-black"
        href={link}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {text}
      </a>
      <div
        className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none bg-white translate-y-[101%]"
        ref={marqueeRef}
      >
        <div className="w-full h-[400%] flex flex-col" ref={marqueeInnerRef}>
          <div className="flex flex-col items-center relative w-full h-[400%] will-change-transform animate-marquee">
            {repeatedMarqueeContent}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlowingMenu;

// Note: this is also needed
// /** @type {import('tailwindcss').Config} */
// export default {
//   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
//   theme: {
//     extend: {
//       translate: {
//         '101': '101%',
//       },
//       keyframes: {
//         marquee: {
//           'from': { transform: 'translateX(0%)' },
//           'to': { transform: 'translateX(-50%)' }
//         }
//       },
//       animation: {
//         marquee: 'marquee 15s linear infinite'
//       }
//     }
//   },
//   plugins: [],
// };
