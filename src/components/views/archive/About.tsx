import { FC } from "react";
import { Link } from "react-router-dom";
import { GradientBackground } from "../ui/noisy-gradient-backgrounds";

const About: FC = () => {
  return (
    <div className="w-screen h-screen font-mondwest font-bold text-black relative flex flex-col justify-between p-10 lg:px-16 overflow-hidden">
      {/* Grainy gradient background */}
      <GradientBackground
        className="z-0"
        colors={[
          { color: "rgba(255,220,180,1)", stop: "0%" },
          { color: "rgba(255,200,140,1)", stop: "20%" },
          { color: "rgba(255,180,120,1)", stop: "40%" },
          { color: "rgba(255,160,100,1)", stop: "60%" },
          { color: "rgba(255,140,80,1)", stop: "80%" },
          { color: "rgba(255,120,60,1)", stop: "100%" },
        ]}
      />

      {/* Navigation */}
      <div className="absolute top-16 left-16 text-xs font-bold tracking-wider z-10">
        <Link to="/" className="hover:opacity-70 transition-opacity">
          ← BACK
        </Link>
      </div>
      <div className="absolute top-16 right-16 text-xs font-bold tracking-wider z-10">
        <Link to="/contact" className="hover:opacity-70 transition-opacity">
          CONTACT
        </Link>
      </div>

      {/* Center Content */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-center max-w-4xl">
        <h1 className="text-6xl lg:text-8xl font-black tracking-wider mb-12">
          ABOUT STUDIO
        </h1>
        
        <div className="space-y-8 text-lg lg:text-xl leading-relaxed max-w-3xl mx-auto">
          <p className="tracking-wide">
            Sun Rot Studios exists at the intersection of art, technology, and the unconscious. 
            We are a collective of digital natives who refuse to accept the sanitized future 
            sold to us by Big Tech.
          </p>
          
          <p className="tracking-wide">
            Founded in Venice, California, we create experimental software that challenges 
            conventional interfaces and explores new forms of human-computer interaction. 
            Our work spans generative art, underground music, immersive experiences, 
            and tools for creative rebellion.
          </p>
          
          <p className="tracking-wide">
            We believe technology should be weird, beautiful, and deeply human. 
            Every pixel we push is an act of resistance against algorithmic oppression 
            and digital homogenization.
          </p>
        </div>
      </div>

      {/* Bottom Corner Elements */}
      <div className="absolute bottom-16 left-16 z-10">
        <div className="text-sm font-bold tracking-wider mb-1">EST. 2024</div>
        <div className="text-[10px] font-normal tracking-wide opacity-80">
          artists · hackers · dancers · prophets
        </div>
      </div>
      <div className="absolute bottom-16 right-16 text-xs font-bold tracking-wider z-10">
        <Link to="/experimental" className="hover:opacity-70 transition-opacity">
          SOFTWARE →
        </Link>
      </div>
    </div>
  );
};

export default About;