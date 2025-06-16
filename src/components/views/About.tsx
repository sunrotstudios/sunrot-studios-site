import { FC } from 'react';
import Navigation from '../ui/Navigation';
import { useContentAnimations } from '../../hooks/useContentAnimations';

const About: FC = () => {
  useContentAnimations();

  return (
    <div className="min-h-screen bg-white" data-page="about">
      <Navigation />
      
      {/* Massive top spacing to push content down */}
      <div className="h-64" data-animate></div>
      
      {/* Main Content - Positioned in bottom portion */}
      <div className="px-8 pb-16" data-animate>
        <p className="text-8xl leading-tight text-black font-normal" data-animate="text">
          Founded in 2019, Sun Rot Studios is a creative studio and cultural engine based in Venice Beach, California<sup>1</sup>, providing all aspects of experimental software, surreal events, and independent artist support.
        </p>
      </div>
    </div>
  );
};

export default About;