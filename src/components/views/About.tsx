import { FC } from "react";
import { Link } from "react-router-dom";

const About: FC = () => {
  return (
    <div className="min-h-screen bg-white font-mondwest">
      {/* Horizontal lined background pattern */}
      <div 
        className="min-h-screen w-full"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 19px,
            #000 19px,
            #000 20px
          )`
        }}
      >
        {/* Header */}
        <div className="relative">
          {/* Pink section for main title */}
          <div className="bg-pink-300 text-black p-8 border-2 border-black">
            <h1 className="text-6xl lg:text-8xl font-black tracking-tight leading-none">
              ABOUT
            </h1>
          </div>
          
          {/* Blue section for subtitle */}
          <div className="bg-blue-500 text-white p-8 border-2 border-black border-t-0">
            <h2 className="text-3xl lg:text-4xl font-black tracking-tight leading-none">
              CULTURAL TECH FOR THE BEAUTIFULLY UNMARKETABLE
            </h2>
          </div>
        </div>

        {/* Navigation bar */}
        <div className="bg-black text-white py-2 border-2 border-black border-t-0">
          <div className="flex justify-between items-center px-8">
            <Link to="/" className="text-sm font-bold hover:text-gray-300">← Back to Home</Link>
            <div className="text-sm">Venice CA / Creative Studio / Est. 2024</div>
          </div>
        </div>

        {/* Content area with sidebar navigation */}
        <div className="flex">
          {/* Main content area */}
          <div className="flex-1 p-8 space-y-8">
            {/* Mission section */}
            <div className="max-w-4xl">
              <div className="bg-green-500 text-black p-4 border-2 border-black mb-4">
                <h3 className="text-2xl font-black">MISSION</h3>
              </div>
              <div className="space-y-4 text-lg leading-relaxed">
                <p>
                  Sun Rot Studios exists to build the tools and stages that the mainstream forgot. 
                  We create software, experiences, and platforms that serve independent artists—musicians, 
                  coders, designers, and cultural misfits—who operate beyond algorithmic discovery 
                  and corporate gatekeeping.
                </p>
                <p>
                  Our purpose is resonance over growth, moments over metrics, and meaningful 
                  connection over mass appeal.
                </p>
              </div>
            </div>

            {/* Philosophy section */}
            <div className="max-w-4xl">
              <div className="bg-orange-500 text-black p-4 border-2 border-black mb-4">
                <h3 className="text-2xl font-black">PHILOSOPHY</h3>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-100 p-4 border-2 border-black">
                  <h4 className="font-black mb-2">WE BUILD WITH POETRY AND BUGS</h4>
                  <p className="text-sm">
                    Our software development prioritizes aesthetic experience and cultural 
                    resonance alongside technical functionality.
                  </p>
                </div>
                <div className="bg-gray-100 p-4 border-2 border-black">
                  <h4 className="font-black mb-2">THE UNDERGROUND SHOULD BE LOUD</h4>
                  <p className="text-sm">
                    Our platform work focuses on amplifying voices that exist outside 
                    mainstream discovery mechanisms.
                  </p>
                </div>
                <div className="bg-gray-100 p-4 border-2 border-black">
                  <h4 className="font-black mb-2">WE DON'T SCALE. WE RESONATE.</h4>
                  <p className="text-sm">
                    Growth is measured by cultural impact and community depth rather 
                    than traditional metrics.
                  </p>
                </div>
                <div className="bg-gray-100 p-4 border-2 border-black">
                  <h4 className="font-black mb-2">COMMUNITY IS CREATIVE TECHNOLOGY</h4>
                  <p className="text-sm">
                    Our events and gathering spaces function as research and development 
                    labs for new forms of cultural expression.
                  </p>
                </div>
              </div>
            </div>

            {/* Values section */}
            <div className="max-w-4xl">
              <div className="bg-blue-500 text-white p-4 border-2 border-black mb-4">
                <h3 className="text-2xl font-black">VALUES</h3>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="font-black">AUTHENTICITY over optimization</div>
                  <div className="font-black">BEAUTY over efficiency</div>
                  <div className="font-black">COMMUNITY over scale</div>
                  <div className="font-black">EXPERIMENTATION over certainty</div>
                </div>
                <div className="bg-pink-300 p-4 border-2 border-black">
                  <div className="text-sm font-black mb-2">LOCATION</div>
                  <div>Venice, California</div>
                  <div>Founded 2024</div>
                  <div className="mt-2 text-xs">
                    Creative Studio / Cultural Platform / Artist Collective
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar navigation */}
          <div className="w-80 flex flex-col">
            <div className="bg-pink-300 text-black p-6 border-2 border-black border-t-0">
              <div className="text-xl font-black">About</div>
              <div className="text-sm">Current page</div>
            </div>
            <Link 
              to="/events" 
              className="bg-blue-500 text-white p-6 border-2 border-black border-t-0 hover:bg-blue-600 transition-colors"
            >
              <div className="text-xl font-black">Events</div>
              <div className="text-sm">Heat Death Social Club</div>
            </Link>
            <Link 
              to="/rotware" 
              className="bg-green-500 text-black p-6 border-2 border-black border-t-0 hover:bg-green-600 transition-colors"
            >
              <div className="text-xl font-black">Rotware</div>
              <div className="text-sm">Experimental software</div>
            </Link>
            <Link 
              to="/peripheral-vision" 
              className="bg-pink-300 text-black p-6 border-2 border-black border-t-0 hover:bg-pink-400 transition-colors"
            >
              <div className="text-xl font-black">Peripheral Vision</div>
              <div className="text-sm">Artist platform & label</div>
            </Link>
            <div className="bg-orange-500 text-black p-6 border-2 border-black border-t-0">
              <div className="text-xl font-black">Contact</div>
              <div className="text-sm">Get in touch</div>
            </div>
          </div>
        </div>

        {/* Bottom banner */}
        <div className="bg-black text-white text-center py-4 border-2 border-black border-t-0">
          <div className="text-sm">
            Mission-driven design / Community-first approach / Independent artist support
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;