import { useState, useEffect } from 'react';

interface TimeDecayOptions {
  maxDecayTime?: number; // Time in milliseconds until full decay
  decayRate?: number;    // How fast decay progresses (0-1)
  stages?: DecayStage[]; // Different decay stages
}

interface DecayStage {
  threshold: number;     // Decay level (0-1) when this stage activates
  effects: {
    corruption?: number;
    glitch?: number;
    inversion?: number;
    blur?: number;
  };
}

export const useTimeDecay = (options: TimeDecayOptions = {}) => {
  const {
    maxDecayTime = 300000, // 5 minutes default
    decayRate = 0.001,
    stages = [
      { threshold: 0.2, effects: { corruption: 0.1 } },
      { threshold: 0.4, effects: { corruption: 0.2, glitch: 0.1 } },
      { threshold: 0.6, effects: { corruption: 0.3, glitch: 0.2, inversion: 0.1 } },
      { threshold: 0.8, effects: { corruption: 0.5, glitch: 0.3, inversion: 0.2, blur: 0.1 } },
      { threshold: 1.0, effects: { corruption: 1.0, glitch: 0.5, inversion: 0.3, blur: 0.2 } }
    ]
  } = options;

  const [decayLevel, setDecayLevel] = useState(0);
  const [currentStage, setCurrentStage] = useState<DecayStage | null>(null);
  const [startTime] = useState(Date.now());

  useEffect(() => {
    const updateDecay = () => {
      const elapsed = Date.now() - startTime;
      const newDecayLevel = Math.min(elapsed / maxDecayTime, 1);
      setDecayLevel(newDecayLevel);

      // Find current stage
      const activeStage = stages
        .filter(stage => newDecayLevel >= stage.threshold)
        .pop();
      
      setCurrentStage(activeStage || null);
    };

    const interval = setInterval(updateDecay, 100);
    return () => clearInterval(interval);
  }, [startTime, maxDecayTime, stages]);

  // Get CSS filter string based on current decay
  const getDecayFilter = () => {
    if (!currentStage) return '';
    
    const { effects } = currentStage;
    const filters = [];
    
    if (effects.blur) {
      filters.push(`blur(${effects.blur * 5}px)`);
    }
    if (effects.inversion) {
      filters.push(`invert(${effects.inversion})`);
    }
    if (effects.corruption) {
      filters.push(`contrast(${100 + effects.corruption * 50}%)`);
      filters.push(`saturate(${100 + effects.corruption * 100}%)`);
    }
    
    return filters.join(' ');
  };

  // Get style object for decay effects
  const getDecayStyle = () => ({
    filter: getDecayFilter(),
    transition: 'filter 0.5s ease-out'
  });

  // Reset decay (for testing or user interaction)
  const resetDecay = () => {
    setDecayLevel(0);
    setCurrentStage(null);
  };

  return {
    decayLevel,
    currentStage,
    getDecayFilter,
    getDecayStyle,
    resetDecay,
    isDecaying: decayLevel > 0,
    isFullyDecayed: decayLevel >= 1
  };
};