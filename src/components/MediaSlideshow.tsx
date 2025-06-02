import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface MediaItem {
  src: string;
  type: "image" | "video";
  alt?: string;
}

interface MediaSlideshowProps {
  mediaItems: MediaItem[];
  intervalMs?: number;
  className?: string;
}

const MediaSlideshow: React.FC<MediaSlideshowProps> = ({
  mediaItems,
  intervalMs = 150,
  className = "",
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to get a random index different from current
  const getRandomIndex = (excludeIndex: number): number => {
    if (mediaItems.length <= 1) return 0;
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * mediaItems.length);
    } while (randomIndex === excludeIndex);
    return randomIndex;
  };

  useEffect(() => {
    if (mediaItems.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => getRandomIndex(prevIndex));
    }, intervalMs);

    return () => clearInterval(interval);
  }, [mediaItems.length, intervalMs]);

  if (mediaItems.length === 0) {
    return (
      <div
        className={`bg-gray-200 flex items-center justify-center ${className}`}
      >
        <span className="text-gray-500">No media available</span>
      </div>
    );
  }

  const currentItem = mediaItems[currentIndex];

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.05, // Extremely fast transitions for rapid-fire effect
            ease: "linear", // Sharp, immediate transitions
            type: "tween",
          }}
          className="absolute inset-0"
        >
          {currentItem.type === "image" ? (
            <img
              src={currentItem.src}
              alt={currentItem.alt || "Slideshow image"}
              className="w-full h-full object-cover"
              loading="eager"
              onLoad={(e) => {
                // Ensure smooth rendering
                const img = e.target as HTMLImageElement;
                img.style.imageRendering = "auto";
              }}
            />
          ) : (
            <video
              src={currentItem.src}
              className="w-full h-full object-cover"
              muted
              loop
              playsInline
              autoPlay
              onLoadedData={(e) => {
                // Start video playback smoothly
                const video = e.target as HTMLVideoElement;
                video.play().catch(console.error);
              }}
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Preload next images for smoother transitions */}
      <div className="sr-only">
        {mediaItems.map((item, index) => {
          if (index === currentIndex) return null;
          return item.type === "image" ? (
            <img key={index} src={item.src} alt="" loading="eager" />
          ) : null;
        })}
      </div>
    </div>
  );
};

export default MediaSlideshow;
