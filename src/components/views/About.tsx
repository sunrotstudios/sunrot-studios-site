import { FC } from 'react';
import Navigation from '../ui/Navigation';
import { useContentAnimations } from '../../hooks/useContentAnimations';

const About: FC = () => {
  useContentAnimations();

  return (
    <div className="min-h-screen bg-white" data-page="about">
      <Navigation />
      
      {/* Central focal content */}
      <div className="flex items-center justify-center min-h-screen px-4 sm:px-8">
        <div className="text-center max-w-6xl" data-animate>
          <p className="text-3xl sm:text-5xl lg:text-7xl xl:text-8xl leading-tight text-black font-black" data-animate="text">
            Cultural tech for the beautifully unmarketable.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;