import { FC } from "react";
import { Link } from "react-router-dom";
import { GradientBackground } from "../ui/noisy-gradient-backgrounds";

const Contact: FC = () => {
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
        <Link to="/about" className="hover:opacity-70 transition-opacity">
          ABOUT
        </Link>
      </div>

      {/* Center Content */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-center max-w-4xl">
        <h1 className="text-6xl lg:text-8xl font-black tracking-wider mb-12">
          CONTACT
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 text-lg lg:text-xl leading-relaxed">
          <div className="space-y-6">
            <div>
              <div className="text-sm font-bold tracking-widest mb-2 opacity-80">
                GENERAL INQUIRIES
              </div>
              <div className="tracking-wide">
                hello@sunrotstudios.com
              </div>
            </div>
            
            <div>
              <div className="text-sm font-bold tracking-widest mb-2 opacity-80">
                COLLABORATIONS
              </div>
              <div className="tracking-wide">
                collab@sunrotstudios.com
              </div>
            </div>
            
            <div>
              <div className="text-sm font-bold tracking-widest mb-2 opacity-80">
                BOOKING
              </div>
              <div className="tracking-wide">
                events@sunrotstudios.com
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div>
              <div className="text-sm font-bold tracking-widest mb-2 opacity-80">
                LOCATION
              </div>
              <div className="tracking-wide">
                Venice, California<br />
                Pacific Standard Time
              </div>
            </div>
            
            <div>
              <div className="text-sm font-bold tracking-widest mb-2 opacity-80">
                SOCIAL CHANNELS
              </div>
              <div className="tracking-wide space-y-1">
                <div>@sunrotstudios</div>
                <div>everywhere digital</div>
              </div>
            </div>
            
            <div>
              <div className="text-sm font-bold tracking-widest mb-2 opacity-80">
                EMERGENCY LINE
              </div>
              <div className="tracking-wide">
                Use only for temporal anomalies<br />
                and reality glitches
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Corner Elements */}
      <div className="absolute bottom-16 left-16 z-10">
        <div className="text-sm font-bold tracking-wider mb-1">ALWAYS OPEN</div>
        <div className="text-[10px] font-normal tracking-wide opacity-80">
          messages sent into the void
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

export default Contact;