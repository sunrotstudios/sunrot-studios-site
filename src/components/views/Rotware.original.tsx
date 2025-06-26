import { FC, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
  TouchSensor,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  useDraggable,
} from "@dnd-kit/core";
import Navigation from "../ui/Navigation";
import Noise from "../../Animations/Noise/Noise";
import Dither from "../../Backgrounds/Dither/Dither";
import React from "react";

interface FloatingLabelData {
  id: string;
  text: string;
  position: { x: number; y: number };
  className?: string;
  interactive?: boolean;
  onClick?: (event: React.MouseEvent) => void;
}

interface FloatingLabelProps extends FloatingLabelData {
  isDragging?: boolean;
}

const FloatingLabelContent: FC<{
  label: FloatingLabelData;
  isDragging?: boolean;
  cleanMode?: boolean;
}> = ({ label, isDragging = false, cleanMode = false }) => {
  // In clean mode, render as simple circular buttons
  if (cleanMode && label.interactive) {
    const getIcon = (id: string) => {
      switch (id) {
        case "what-is-rotware":
          return "?";
        case "play-music":
          return "♪";
        case "clean-mess":
          return "↻";
        default:
          return "•";
      }
    };

    return (
      <div
        className={`w-12 h-12 bg-black text-white rounded-full flex items-center justify-center text-lg font-black cursor-pointer transition-all duration-200 hover:scale-105 ${
          label.className || ""
        }`}
        style={{
          opacity: isDragging ? 0.9 : 1,
          zIndex: isDragging ? 1000 : "auto",
          boxShadow: isDragging
            ? "0 8px 16px rgba(0, 0, 0, 0.4)"
            : "0 4px 8px rgba(0, 0, 0, 0.3)",
        }}
        onClick={label.interactive ? (e) => label.onClick?.(e) : undefined}
        title={label.text}
      >
        {getIcon(label.id)}
      </div>
    );
  }

  // Simple rectangular label style
  return (
    <div
      className={`bg-white border-2 border-black px-6 py-3 text-[12px] font-black leading-none uppercase ${
        label.interactive
          ? "cursor-pointer hover:bg-gray-50"
          : "cursor-grab active:cursor-grabbing"
      } ${label.className || ""} transition-all duration-200`}
      style={{
        opacity: isDragging ? 0.9 : 1,
        zIndex: isDragging ? 1000 : "auto",
        boxShadow: isDragging
          ? "0 8px 16px rgba(0, 0, 0, 0.3)"
          : "0 4px 8px rgba(0, 0, 0, 0.2)",
        transform: isDragging
          ? "rotate(2deg)"
          : `rotate(${Math.random() * 4 - 2}deg)`,
      }}
      onClick={label.interactive ? (e) => label.onClick?.(e) : undefined}
    >
      {label.text}
    </div>
  );
};

const DraggableFloatingLabel: FC<
  FloatingLabelProps & { cleanMode?: boolean }
> = ({
  id,
  text,
  position,
  className = "",
  interactive = false,
  onClick,
  cleanMode = false,
}) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: `label-${id}`,
    });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    left: position.x,
    top: position.y,
  };

  const labelData: FloatingLabelData = {
    id,
    text,
    position,
    className,
    interactive,
    onClick,
  };

  return (
    <div
      ref={setNodeRef}
      className={`absolute ${className}`}
      style={{
        ...style,
        zIndex: isDragging ? 1000 : 20, // Bring entire label to front when dragging
      }}
      data-draggable-label
      data-label-id={id}
      {...listeners}
      {...attributes}
    >
      <FloatingLabelContent
        label={labelData}
        isDragging={isDragging}
        cleanMode={cleanMode}
      />
    </div>
  );
};

interface TileData {
  id: string;
  position: { x: number; y: number };
  backgroundColor: string;
  caption: string;
  gif: string;
  className?: string;
  effect?: "noise" | "dither" | "none";
}

interface TileProps extends TileData {
  isDragging?: boolean;
}

const TileContent: FC<{
  tile: TileData;
  isDragging?: boolean;
  cleanMode?: boolean;
}> = ({ tile, isDragging = false, cleanMode = false }) => (
  <motion.div
    className={
      cleanMode
        ? "w-[180px] h-[180px] relative overflow-hidden cursor-grab active:cursor-grabbing"
        : "w-[clamp(320px,35vw,480px)] h-[clamp(320px,35vw,480px)] relative overflow-hidden cursor-grab active:cursor-grabbing"
    }
    style={{
      backgroundColor: tile.backgroundColor,
      opacity: isDragging ? 0.9 : 1,
      zIndex: isDragging ? 1000 : "auto",
    }}
  >
    {/* Simple texture overlay based on effect */}
    {tile.effect === "noise" && (
      <div className="absolute inset-0 z-5 pointer-events-none">
        <Noise patternSize={150} patternAlpha={25} patternRefreshInterval={4} />
      </div>
    )}

    {tile.effect === "dither" && (
      <div className="absolute inset-0 z-5 pointer-events-none">
        <Dither
          waveSpeed={0.02}
          waveFrequency={2}
          waveAmplitude={0.2}
          waveColor={[0.3, 0.3, 0.3]}
          colorNum={3}
          pixelSize={3}
          disableAnimation={false}
          enableMouseInteraction={false}
          mouseRadius={0.5}
        />
      </div>
    )}

    {/* GIF fills entire square */}
    <div className="absolute inset-0 z-10">
      <img
        src={tile.gif}
        alt={tile.caption}
        className="w-full h-full object-cover"
      />
    </div>

    {/* Simple caption bar */}
    <footer className="absolute bottom-0 left-0 w-full h-[40px] bg-[var(--color-acid-lime)] border-t-2 border-black flex items-center px-3 text-black font-bold text-xs uppercase z-20">
      {tile.caption}
    </footer>
  </motion.div>
);

const DraggableTile: FC<
  TileProps & {
    frontTileId?: string | null;
    onTileClick?: (id: string) => void;
    cleanMode?: boolean;
  }
> = ({
  id,
  position,
  backgroundColor,
  caption,
  gif,
  className = "",
  effect = "none",
  frontTileId,
  onTileClick,
  cleanMode = false,
}) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id,
    });

  const isFront = frontTileId === id;
  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    left: position.x,
    top: position.y,
  };

  const tileData: TileData = {
    id,
    position,
    backgroundColor,
    caption,
    gif,
    className,
    effect,
  };

  const handleClick = () => {
    if (onTileClick) {
      onTileClick(id);
    }
  };

  return (
    <article
      ref={setNodeRef}
      className={`absolute group ${className}`}
      style={{
        ...style,
        zIndex: isDragging ? 1000 : isFront ? 100 : 10, // Front tile gets higher z-index
      }}
      onClick={handleClick}
      data-tile-id={id}
      {...listeners}
      {...attributes}
    >
      <TileContent
        tile={tileData}
        isDragging={isDragging}
        cleanMode={cleanMode}
      />
    </article>
  );
};

const Rotware: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [frontTileId, setFrontTileId] = useState<string | null>(null);
  const [cleanMode, setCleanMode] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Generate random positions within viewport bounds - tiles are 400px, so account for that
  const [tiles, setTiles] = useState<TileData[]>(() => [
    {
      id: "rotware",
      position: {
        x: Math.random() * (window.innerWidth - 450) + 50,
        y: Math.random() * (window.innerHeight - 450) + 50,
      },
      backgroundColor: "#8a8a8a", // weathered concrete
      caption: "ROTWARE",
      gif: "/src/assets/gifs/infinite-hallway.gif",
      effect: "dither",
    },
    {
      id: "heat-death",
      position: {
        x: Math.random() * (window.innerWidth - 450) + 50,
        y: Math.random() * (window.innerHeight - 450) + 50,
      },
      backgroundColor: "#9c6b4a", // rust orange
      caption: "HEAT DEATH",
      gif: "/src/assets/gifs/blooming.gif",
      effect: "noise",
    },
    {
      id: "peripheral-vision",
      position: {
        x: Math.random() * (window.innerWidth - 450) + 50,
        y: Math.random() * (window.innerHeight - 450) + 50,
      },
      backgroundColor: "#5a6b73", // steel blue
      caption: "PERIPHERAL VISION",
      gif: "/src/assets/gifs/circle-swirl.gif",
      effect: "dither",
    },
    {
      id: "mission",
      position: {
        x: Math.random() * (window.innerWidth - 450) + 50,
        y: Math.random() * (window.innerHeight - 450) + 50,
      },
      backgroundColor: "#4a4a4a", // charcoal
      caption: "MISSION",
      gif: "/src/assets/gifs/eyes.webp",
      effect: "noise",
    },
    {
      id: "upcoming-events",
      position: {
        x: Math.random() * (window.innerWidth - 450) + 50,
        y: Math.random() * (window.innerHeight - 450) + 50,
      },
      backgroundColor: "#b5a590", // raw beige
      caption: "UPCOMING EVENTS",
      gif: "/src/assets/gifs/leaves.gif",
      effect: "none",
    },
    {
      id: "contact",
      position: {
        x: Math.random() * (window.innerWidth - 450) + 50,
        y: Math.random() * (window.innerHeight - 450) + 50,
      },
      backgroundColor: "#d4d4d4", // weathered white
      caption: "GET IN TOUCH",
      gif: "/src/assets/gifs/flashing-circle.gif",
      effect: "noise",
    },
  ]);

  const [floatingLabels, setFloatingLabels] = useState<FloatingLabelData[]>(
    () => [
      {
        id: "what-is-rotware",
        text: "WHAT IS ROTWARE?",
        position: {
          x: Math.random() * (window.innerWidth - 300) + 50,
          y: Math.random() * (window.innerHeight - 100) + 50,
        },
        interactive: true,
      },
      {
        id: "play-music",
        text: "PLAY SOMETHING WITH A BEAT",
        position: {
          x: Math.random() * (window.innerWidth - 400) + 50,
          y: Math.random() * (window.innerHeight - 100) + 50,
        },
        interactive: true,
      },
      {
        id: "clean-mess",
        text: "CLEAN THIS MESS UP",
        position: {
          x: Math.random() * (window.innerWidth - 300) + 50,
          y: Math.random() * (window.innerHeight - 100) + 50,
        },
        interactive: true,
      },
    ]
  );

  const handleCleanClick = () => {
    if (!cleanMode) {
      // FIRST: Kill all existing animations to prevent conflicts
      if (containerRef.current) {
        const allElements = containerRef.current.querySelectorAll(
          "article, [data-draggable-label]"
        );
        gsap.killTweensOf(allElements);
        gsap.set(allElements, { clearProps: "x,y,rotation,scale" });
      }
      // Simple centered grid with smaller tiles
      const gridCols = 3;
      const gridRows = 2;
      const actualTileSize = 180; // Much smaller size
      const gap = 30; // Tighter gap

      const gridWidth = gridCols * actualTileSize + (gridCols - 1) * gap;
      const gridHeight = gridRows * actualTileSize + (gridRows - 1) * gap;

      const startX = (window.innerWidth - gridWidth) / 2;
      const startY = (window.innerHeight - gridHeight) / 2;

      const gridPositions = [];
      for (let row = 0; row < gridRows; row++) {
        for (let col = 0; col < gridCols; col++) {
          gridPositions.push({
            x: startX + col * (actualTileSize + gap),
            y: startY + row * (actualTileSize + gap),
          });
        }
      }

      // Simplified, reliable tile animations
      const masterTimeline = gsap.timeline();

      tiles.forEach((tile, index) => {
        if (index < gridPositions.length) {
          const tileElement = `[data-tile-id="${tile.id}"]`;
          const targetX = gridPositions[index].x - tile.position.x;
          const targetY = gridPositions[index].y - tile.position.y;

          // Simple, reliable animation
          masterTimeline.to(
            tileElement,
            {
              duration: 0.8,
              ease: "power2.out",
              x: targetX,
              y: targetY,
              force3D: true,
            },
            index * 0.1
          );
        }
      });

      // Update positions in state after all animations complete
      masterTimeline.call(
        () => {
          setTiles((currentTiles) =>
            currentTiles.map((t, index) =>
              index < gridPositions.length
                ? {
                    ...t,
                    position: {
                      x: gridPositions[index].x,
                      y: gridPositions[index].y,
                    },
                  }
                : t
            )
          );
          // Clear GSAP transforms
          if (containerRef.current) {
            const tileElements =
              containerRef.current.querySelectorAll("article");
            gsap.set(tileElements, { clearProps: "x,y,rotation,scale" });
          }
        },
        null,
        1.2
      );

      // Simplified label animations
      const keepLabels = ["what-is-rotware", "play-music", "clean-mess"];

      floatingLabels.forEach((label, index) => {
        const labelElement = `[data-label-id="${label.id}"]`;

        if (keepLabels.includes(label.id)) {
          // Position buttons to the right of the grid, closer and more compact
          const gridEndX = startX + gridWidth;
          const gridCenterY = startY + gridHeight / 2;

          const buttonSpacing = 60; // Closer together
          const circularPositions = [
            { x: gridEndX + 40, y: gridCenterY - buttonSpacing },
            { x: gridEndX + 40, y: gridCenterY },
            { x: gridEndX + 40, y: gridCenterY + buttonSpacing },
          ];
          const targetIndex = keepLabels.indexOf(label.id);

          // Simple, reliable animation
          masterTimeline.to(
            labelElement,
            {
              duration: 0.6,
              ease: "power2.out",
              x: circularPositions[targetIndex].x - label.position.x,
              y: circularPositions[targetIndex].y - label.position.y,
              force3D: true,
            },
            0.4 + index * 0.1
          );
        } else {
          // Simple fade out
          masterTimeline.to(
            labelElement,
            {
              duration: 0.4,
              ease: "power2.in",
              opacity: 0,
              scale: 0,
              force3D: true,
            },
            0.1 + index * 0.05
          );
        }
      });

      // Update label positions in state after animations complete
      masterTimeline.call(
        () => {
          const gridEndX = startX + gridWidth;
          const gridCenterY = startY + gridHeight / 2;
          const buttonSpacing = 60;
          const circularPositions = [
            { x: gridEndX + 40, y: gridCenterY - buttonSpacing },
            { x: gridEndX + 40, y: gridCenterY },
            { x: gridEndX + 40, y: gridCenterY + buttonSpacing },
          ];

          setFloatingLabels((currentLabels) =>
            currentLabels.map((l) => {
              if (keepLabels.includes(l.id)) {
                const targetIndex = keepLabels.indexOf(l.id);
                return {
                  ...l,
                  position: {
                    x: circularPositions[targetIndex].x,
                    y: circularPositions[targetIndex].y,
                  },
                };
              }
              return l;
            })
          );

          // Clear GSAP transforms
          if (containerRef.current) {
            const labelElements = containerRef.current.querySelectorAll(
              "[data-draggable-label]"
            );
            gsap.set(labelElements, {
              clearProps: "x,y,rotation,scale,opacity",
            });
          }
        },
        null,
        1.2
      );

      setCleanMode(true);
    } else {
      // FIRST: Kill all existing animations to prevent conflicts
      if (containerRef.current) {
        const allElements = containerRef.current.querySelectorAll(
          "article, [data-draggable-label]"
        );
        gsap.killTweensOf(allElements);
        gsap.set(allElements, { clearProps: "x,y,rotation,scale" });
      }

      // Simple return to messy state
      const explosiveTimeline = gsap.timeline();

      // Tiles return to original positions
      tiles.forEach((tile, index) => {
        const tileElement = `[data-tile-id="${tile.id}"]`;

        explosiveTimeline.to(
          tileElement,
          {
            duration: 0.8,
            ease: "power2.out",
            x: 0,
            y: 0,
            force3D: true,
          },
          index * 0.1
        );
      });

      // Labels return to original positions
      floatingLabels.forEach((label, index) => {
        const labelElement = `[data-label-id="${label.id}"]`;

        explosiveTimeline.to(
          labelElement,
          {
            duration: 0.8,
            ease: "power2.out",
            x: 0,
            y: 0,
            opacity: 1,
            scale: 1,
            force3D: true,
          },
          0.3 + index * 0.05
        );
      });

      // Clear all GSAP transforms after animation completes
      explosiveTimeline.call(
        () => {
          if (containerRef.current) {
            const allElements = containerRef.current.querySelectorAll(
              "article, [data-draggable-label]"
            );
            gsap.set(allElements, { clearProps: "x,y,rotation,scale,opacity" });
          }
        },
        null,
        1.5
      );

      setCleanMode(false);
    }
  };

  const handleMusicClick = () => {
    if (!audioRef.current) {
      // Create audio element on first click
      audioRef.current = new Audio("/beat.mp3"); // We'll add this file to public folder
      audioRef.current.loop = true;
    }

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  // Update label text based on state changes
  useEffect(() => {
    setFloatingLabels((prev) =>
      prev.map((label) => {
        if (label.id === "play-music") {
          return {
            ...label,
            text: isPlaying ? "PLAYING..." : "PLAY SOMETHING WITH A BEAT",
          };
        }
        if (label.id === "clean-mess") {
          return {
            ...label,
            text: cleanMode ? "MESS IT UP AGAIN" : "CLEAN THIS MESS UP",
          };
        }
        return label;
      })
    );
  }, [isPlaying, cleanMode]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 200,
        tolerance: 5,
      },
    })
  );

  const handleTileClick = (tileId: string) => {
    setFrontTileId(tileId);
  };

  const handleDragStart = (event: DragStartEvent) => {
    const activeIdStr = event.active.id as string;
    setActiveId(activeIdStr);

    // Bring dragged tile to front if it's a tile (not a label)
    if (!activeIdStr.startsWith("label-")) {
      setFrontTileId(activeIdStr);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, delta } = event;

    if (delta) {
      const activeIdStr = active.id as string;

      // Check if it's a floating label (starts with "label-")
      if (activeIdStr.startsWith("label-")) {
        const labelId = activeIdStr.replace("label-", "");
        setFloatingLabels((currentLabels) =>
          currentLabels.map((label) =>
            label.id === labelId
              ? {
                  ...label,
                  position: {
                    x: label.position.x + delta.x,
                    y: label.position.y + delta.y,
                  },
                }
              : label
          )
        );
      } else {
        // Handle regular tiles
        setTiles((currentTiles) =>
          currentTiles.map((tile) =>
            tile.id === activeIdStr
              ? {
                  ...tile,
                  position: {
                    x: tile.position.x + delta.x,
                    y: tile.position.y + delta.y,
                  },
                }
              : tile
          )
        );
      }
    }

    setActiveId(null);
  };

  const activeTile = activeId
    ? tiles.find((tile) => tile.id === activeId)
    : null;
  const activeLabel =
    activeId && typeof activeId === "string" && activeId.startsWith("label-")
      ? floatingLabels.find(
          (label) => label.id === activeId.replace("label-", "")
        )
      : null;

  useEffect(() => {
    if (!containerRef.current) return;

    const tileElements = containerRef.current.querySelectorAll("article");
    const labelElements = containerRef.current.querySelectorAll(
      "[data-draggable-label]"
    );
    const allElements = [...tileElements, ...labelElements];

    // Simple drop-in animation
    gsap.set(allElements, {
      y: -100,
      opacity: 0,
    });

    gsap.to(allElements, {
      y: 0,
      opacity: 1,
      duration: 0.6,
      ease: "back.out(1.7)",
      stagger: {
        amount: 0.4,
        from: "random",
      },
    });

    return () => {
      gsap.killTweensOf(allElements);
    };
  }, []);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div
        className="relative overflow-hidden bg-white min-h-screen"
        data-page="rotware"
      >
        <Navigation />

        {/* Content tiles */}
        <div ref={containerRef} className="relative z-10">
          {tiles.map((tile) => (
            <DraggableTile
              key={tile.id}
              id={tile.id}
              position={tile.position}
              backgroundColor={tile.backgroundColor}
              caption={tile.caption}
              gif={tile.gif}
              className={tile.className}
              effect={tile.effect}
              frontTileId={frontTileId}
              onTileClick={handleTileClick}
              cleanMode={cleanMode}
            />
          ))}

          {/* Floating labels */}
          {floatingLabels.map((label) => (
            <DraggableFloatingLabel
              key={`label-${label.id}`}
              id={label.id}
              text={label.text}
              position={label.position}
              className={label.className}
              interactive={label.interactive}
              onClick={
                label.id === "what-is-rotware"
                  ? () =>
                      alert(
                        "ROTWARE is experimental software for creative communities. Tools that exist outside traditional markets."
                      )
                  : label.id === "play-music"
                  ? handleMusicClick
                  : label.id === "clean-mess"
                  ? handleCleanClick
                  : undefined
              }
              cleanMode={cleanMode}
            />
          ))}

          {/* Mobile-only tiles */}
          <div className="lg:hidden md:hidden flex flex-col items-center justify-center min-h-screen space-y-8 pt-20">
            <div className="relative">
              <DraggableTile
                id="mobile-rotware"
                position={{ x: 0, y: 0 }}
                backgroundColor="#8a8a8a"
                caption="ROTWARE"
                gif="/src/assets/gifs/swirls.gif"
                className="relative"
                effect="dither"
                frontTileId={frontTileId}
                onTileClick={handleTileClick}
                cleanMode={cleanMode}
              />
              <DraggableFloatingLabel
                id="mobile-label-1"
                text="MOBILE"
                position={{ x: -20, y: -30 }}
                cleanMode={cleanMode}
              />
            </div>
            <div className="relative">
              <DraggableTile
                id="mobile-heat-death"
                position={{ x: 0, y: 0 }}
                backgroundColor="#9c6b4a"
                caption="HEAT DEATH"
                gif="/src/assets/gifs/color-lump.gif"
                className="relative"
                effect="noise"
                frontTileId={frontTileId}
                onTileClick={handleTileClick}
                cleanMode={cleanMode}
              />
              <DraggableFloatingLabel
                id="mobile-label-2"
                text="TOUCH"
                position={{ x: -20, y: -30 }}
                cleanMode={cleanMode}
              />
            </div>
          </div>
        </div>

        {/* Drag overlay for smooth dragging experience */}
        <DragOverlay>
          {activeTile ? (
            <div className="z-50">
              <TileContent
                tile={activeTile}
                isDragging={true}
                cleanMode={cleanMode}
              />
            </div>
          ) : activeLabel ? (
            <div className="z-50">
              <FloatingLabelContent
                label={activeLabel}
                isDragging={true}
                cleanMode={cleanMode}
              />
            </div>
          ) : null}
        </DragOverlay>
      </div>
    </DndContext>
  );
};

export default Rotware;
