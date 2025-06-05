import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <h1 className="text-7xl font-bold text-white z-20">About Us</h1>
      <p className="text-xl text-white/80 mt-4 z-20">
        This is the About Page for Sun Rot Studios.
      </p>
      <p className="text-lg text-white/70 mt-2 z-20">
        We are about experimental software, surreal events, and an underground label.
      </p>
    </div>
  );
};

export default AboutPage;
