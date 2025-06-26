import { FC } from 'react';
import Navigation from '../ui/Navigation';
import { useContentAnimations } from '../../hooks/useContentAnimations';

const PeripheralVision: FC = () => {
  useContentAnimations();

  return (
    <div className="min-h-screen bg-white" data-page="peripheral-vision">
      <Navigation />
      
      {/* Central focal content */}
      <div className="flex items-center justify-center min-h-screen px-4 sm:px-8">
        <div className="text-center max-w-4xl" data-animate>
          <h1 className="text-4xl sm:text-6xl lg:text-8xl xl:text-9xl leading-tight text-black font-black mb-8" data-animate="text">
            PERIPHERAL VISION
          </h1>
          <p className="text-xl sm:text-2xl lg:text-3xl leading-relaxed text-black font-normal" data-animate="text">
            A decentralized label and curatorial arm for independent creators who exist beyond algorithmic discovery.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PeripheralVision;