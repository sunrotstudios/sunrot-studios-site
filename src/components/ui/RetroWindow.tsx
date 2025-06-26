import { FC, ReactNode, useRef, useEffect } from "react";
import { gsap } from "gsap";
import "./RetroWindow.css";
import React from "react";

interface RetroWindowProps {
  children: ReactNode;
  title: string;
  isActive?: boolean;
  onClose?: () => void;
  onMinimize?: () => void;
  onBringToFront?: () => void;
  className?: string;
  width?: number;
  height?: number;
  isDragging?: boolean;
  useHighQuality?: boolean;
}

const RetroWindow: FC<RetroWindowProps> = ({
  children,
  title,
  isActive = false,
  onClose,
  onMinimize,
  onBringToFront,
  className = "",
  width = 320,
  height = 320,
  isDragging = false,
  useHighQuality = false,
}) => {
  const windowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!windowRef.current) return;

    // Add hardware acceleration
    gsap.set(windowRef.current, {
      force3D: true,
      willChange: isDragging ? "transform" : "auto",
    });

    return () => {
      if (windowRef.current) {
        gsap.set(windowRef.current, { willChange: "auto" });
      }
    };
  }, [isDragging]);

  const handleWindowClick = () => {
    if (onBringToFront && !isActive) {
      onBringToFront();
    }
  };

  return (
    <div
      ref={windowRef}
      className={`retro-window ${
        isActive ? "retro-window--active" : ""
      } ${className}`}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        contain: "layout style paint",
      }}
      onClick={handleWindowClick}
    >
      {/* Window Frame */}
      <div className="retro-window__frame">
        {/* Title Bar */}
        <div className="retro-window__title-bar">
          <div className="retro-window__title">{title}</div>

          <div className="retro-window__controls">
            {onMinimize && (
              <button
                className="retro-window__control retro-window__control--minimize"
                onClick={(e) => {
                  e.stopPropagation();
                  onMinimize();
                }}
                aria-label="Minimize"
              >
                ━
              </button>
            )}

            {onClose && (
              <button
                className="retro-window__control retro-window__control--close"
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
                aria-label="Close"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Content Area */}
        <div className="retro-window__content">{children}</div>
      </div>
    </div>
  );
};

export default RetroWindow;
