import React, { createContext, useContext, useState, useCallback, ReactNode, useRef, useEffect } from 'react';

interface WindowState {
  id: string;
  zIndex: number;
  isMinimized: boolean;
  isActive: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
  title: string;
}

interface WindowManagerContextType {
  windows: WindowState[];
  activeWindowId: string | null;
  maxZIndex: number;
  
  // Window management functions
  registerWindow: (window: Omit<WindowState, 'zIndex' | 'isActive'>) => void;
  unregisterWindow: (windowId: string) => void;
  bringToFront: (windowId: string) => void;
  minimizeWindow: (windowId: string) => void;
  maximizeWindow: (windowId: string) => void;
  updateWindowPosition: (windowId: string, position: { x: number; y: number }) => void;
  updateWindowSize: (windowId: string, size: { width: number; height: number }) => void;
  getWindowZIndex: (windowId: string) => number;
  isWindowActive: (windowId: string) => boolean;
  closeWindow: (windowId: string) => void;
  
  // Utility functions
  getTopMostWindow: () => WindowState | null;
  getWindowStack: () => WindowState[];
  arrangeWindows: (arrangement: 'cascade' | 'tile' | 'minimize-all') => void;
}

const WindowManagerContext = createContext<WindowManagerContextType | null>(null);

export const useWindowManager = () => {
  const context = useContext(WindowManagerContext);
  if (!context) {
    throw new Error('useWindowManager must be used within a WindowManagerProvider');
  }
  return context;
};

interface WindowManagerProviderProps {
  children: ReactNode;
  baseZIndex?: number; // Starting z-index for windows
}

export const WindowManagerProvider: React.FC<WindowManagerProviderProps> = ({
  children,
  baseZIndex = 100
}) => {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
  const maxZIndexRef = useRef(baseZIndex);
  
  // Generate next z-index value
  const getNextZIndex = useCallback(() => {
    maxZIndexRef.current += 1;
    return maxZIndexRef.current;
  }, []);
  
  // Register a new window
  const registerWindow = useCallback((windowData: Omit<WindowState, 'zIndex' | 'isActive'>) => {
    const newZIndex = getNextZIndex();
    const newWindow: WindowState = {
      ...windowData,
      zIndex: newZIndex,
      isActive: true
    };
    
    setWindows(prev => {
      // Deactivate all other windows
      const updatedWindows = prev.map(w => ({ ...w, isActive: false }));
      return [...updatedWindows, newWindow];
    });
    
    setActiveWindowId(windowData.id);
  }, [getNextZIndex]);
  
  // Unregister a window
  const unregisterWindow = useCallback((windowId: string) => {
    setWindows(prev => {
      const filtered = prev.filter(w => w.id !== windowId);
      
      // If we removed the active window, activate the topmost remaining window
      if (activeWindowId === windowId && filtered.length > 0) {
        const topWindow = filtered.reduce((max, current) => 
          current.zIndex > max.zIndex ? current : max
        );
        setActiveWindowId(topWindow.id);
        
        return filtered.map(w => ({
          ...w,
          isActive: w.id === topWindow.id
        }));
      }
      
      if (filtered.length === 0) {
        setActiveWindowId(null);
      }
      
      return filtered;
    });
  }, [activeWindowId]);
  
  // Bring window to front
  const bringToFront = useCallback((windowId: string) => {
    const newZIndex = getNextZIndex();
    
    setWindows(prev => 
      prev.map(w => ({
        ...w,
        zIndex: w.id === windowId ? newZIndex : w.zIndex,
        isActive: w.id === windowId
      }))
    );
    
    setActiveWindowId(windowId);
  }, [getNextZIndex]);
  
  // Minimize window
  const minimizeWindow = useCallback((windowId: string) => {
    setWindows(prev => {
      const updatedWindows = prev.map(w => 
        w.id === windowId ? { ...w, isMinimized: true, isActive: false } : w
      );
      
      // If we minimized the active window, find the next topmost window
      if (activeWindowId === windowId) {
        const visibleWindows = updatedWindows.filter(w => !w.isMinimized);
        if (visibleWindows.length > 0) {
          const topWindow = visibleWindows.reduce((max, current) => 
            current.zIndex > max.zIndex ? current : max
          );
          setActiveWindowId(topWindow.id);
          return updatedWindows.map(w => ({
            ...w,
            isActive: w.id === topWindow.id
          }));
        } else {
          setActiveWindowId(null);
        }
      }
      
      return updatedWindows;
    });
  }, [activeWindowId]);
  
  // Maximize/restore window
  const maximizeWindow = useCallback((windowId: string) => {
    setWindows(prev => 
      prev.map(w => 
        w.id === windowId ? { ...w, isMinimized: false } : w
      )
    );
    
    // Bring to front when maximizing
    bringToFront(windowId);
  }, [bringToFront]);
  
  // Update window position
  const updateWindowPosition = useCallback((windowId: string, position: { x: number; y: number }) => {
    setWindows(prev => 
      prev.map(w => 
        w.id === windowId ? { ...w, position } : w
      )
    );
  }, []);
  
  // Update window size
  const updateWindowSize = useCallback((windowId: string, size: { width: number; height: number }) => {
    setWindows(prev => 
      prev.map(w => 
        w.id === windowId ? { ...w, size } : w
      )
    );
  }, []);
  
  // Get window z-index
  const getWindowZIndex = useCallback((windowId: string) => {
    const window = windows.find(w => w.id === windowId);
    return window?.zIndex || baseZIndex;
  }, [windows, baseZIndex]);
  
  // Check if window is active
  const isWindowActive = useCallback((windowId: string) => {
    return activeWindowId === windowId;
  }, [activeWindowId]);
  
  // Close window (alias for unregister)
  const closeWindow = useCallback((windowId: string) => {
    unregisterWindow(windowId);
  }, [unregisterWindow]);
  
  // Get topmost window
  const getTopMostWindow = useCallback(() => {
    if (windows.length === 0) return null;
    return windows.reduce((max, current) => 
      current.zIndex > max.zIndex ? current : max
    );
  }, [windows]);
  
  // Get window stack (sorted by z-index)
  const getWindowStack = useCallback(() => {
    return [...windows].sort((a, b) => a.zIndex - b.zIndex);
  }, [windows]);
  
  // Arrange windows in different patterns
  const arrangeWindows = useCallback((arrangement: 'cascade' | 'tile' | 'minimize-all') => {
    const visibleWindows = windows.filter(w => !w.isMinimized);
    
    switch (arrangement) {
      case 'cascade':
        setWindows(prev => 
          prev.map((w, index) => {
            if (w.isMinimized) return w;
            const offset = index * 32; // 32px cascade offset
            return {
              ...w,
              position: { 
                x: 100 + offset, 
                y: 100 + offset 
              }
            };
          })
        );
        break;
        
      case 'tile':
        const cols = Math.ceil(Math.sqrt(visibleWindows.length));
        const rows = Math.ceil(visibleWindows.length / cols);
        const windowWidth = Math.floor((window.innerWidth - 100) / cols);
        const windowHeight = Math.floor((window.innerHeight - 100) / rows);
        
        setWindows(prev => {
          let visibleIndex = 0;
          return prev.map(w => {
            if (w.isMinimized) return w;
            
            const col = visibleIndex % cols;
            const row = Math.floor(visibleIndex / cols);
            visibleIndex++;
            
            return {
              ...w,
              position: {
                x: 50 + col * windowWidth,
                y: 50 + row * windowHeight
              },
              size: {
                width: windowWidth - 20,
                height: windowHeight - 20
              }
            };
          });
        });
        break;
        
      case 'minimize-all':
        setWindows(prev => 
          prev.map(w => ({ ...w, isMinimized: true, isActive: false }))
        );
        setActiveWindowId(null);
        break;
    }
  }, [windows]);
  
  // Performance optimization: prevent unnecessary re-renders
  const contextValue = React.useMemo(() => ({
    windows,
    activeWindowId,
    maxZIndex: maxZIndexRef.current,
    registerWindow,
    unregisterWindow,
    bringToFront,
    minimizeWindow,
    maximizeWindow,
    updateWindowPosition,
    updateWindowSize,
    getWindowZIndex,
    isWindowActive,
    closeWindow,
    getTopMostWindow,
    getWindowStack,
    arrangeWindows
  }), [
    windows,
    activeWindowId,
    registerWindow,
    unregisterWindow,
    bringToFront,
    minimizeWindow,
    maximizeWindow,
    updateWindowPosition,
    updateWindowSize,
    getWindowZIndex,
    isWindowActive,
    closeWindow,
    getTopMostWindow,
    getWindowStack,
    arrangeWindows
  ]);
  
  return (
    <WindowManagerContext.Provider value={contextValue}>
      {children}
    </WindowManagerContext.Provider>
  );
};

export default WindowManagerContext;