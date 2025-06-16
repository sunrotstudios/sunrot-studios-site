import { FC } from 'react';
import Navigation from '../ui/Navigation';
import { useContentAnimations } from '../../hooks/useContentAnimations';

const Home: FC = () => {
  useContentAnimations();

  return (
    <div className="min-h-screen bg-white" data-page="home">
      <Navigation />
      
      {/* Central focal image */}
      <div className="flex items-center justify-center min-h-screen">
        <div className="relative w-96 h-96 flex items-center justify-center" data-animate>
          {/* Background GIF */}
          <img 
            src="/src/assets/media/color-lump.gif" 
            alt="Color Lump" 
            className="absolute inset-0 w-full h-full object-cover"
            data-animate
          />
          {/* Overlaid text */}
          <div className="relative z-10 text-center" data-animate="text">
            <h1 className="text-black text-9xl font-black leading-none tracking-tight whitespace-nowrap">
              SUN ROT STUDIOS
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;