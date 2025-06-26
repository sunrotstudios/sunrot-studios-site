import { FC, useState } from "react";
import Navigation from "../ui/Navigation";

interface Project {
  id: string;
  title: string;
  description: string;
  status: string;
  details: string;
  techStack: string[];
  category: string;
}

const projects: Project[] = [
  {
    id: "1",
    title: "FLUX",
    description: "Decentralized event discovery platform",
    status: "IN DEVELOPMENT",
    details: "A peer-to-peer event discovery system that connects underground communities without algorithmic interference. Built for venues and artists who operate outside mainstream discovery channels.",
    techStack: ["React", "Web3", "IPFS", "TypeScript"],
    category: "PLATFORM"
  },
  {
    id: "2", 
    title: "MESH",
    description: "Collaborative creative toolkit",
    status: "PROTOTYPE",
    details: "Real-time collaborative workspace for interdisciplinary creative projects. Enables seamless handoffs between designers, developers, and artists working on experimental media.",
    techStack: ["WebRTC", "Canvas API", "Node.js", "Socket.io"],
    category: "TOOL"
  },
  {
    id: "3",
    title: "DRIFT",
    description: "Ambient data visualization engine",
    status: "LIVE",
    details: "Generative visualization system that transforms live data feeds into ambient, non-intrusive visual experiences. Used for installation work and live performance backgrounds.",
    techStack: ["Three.js", "WebGL", "Python", "OSC"],
    category: "ENGINE"
  },
  {
    id: "4",
    title: "VOID",
    description: "Minimal social broadcasting tool",
    status: "CONCEPT",
    details: "Anti-social media platform focused on temporary, location-based anonymous broadcasts. Messages decay over time and distance, promoting ephemeral communication.",
    techStack: ["Rust", "WebAssembly", "Geolocation API"],
    category: "EXPERIMENT"
  }
];

const Rotware: FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <div className="relative bg-white h-screen overflow-hidden" data-page="rotware">
      <Navigation />
      
      {/* Main content container */}
      <div className="h-screen flex flex-col lg:flex-row px-4 lg:px-16 py-8 lg:py-16 gap-8 lg:gap-16">
        
        {/* Left Column - Title and Vision */}
        <div className="flex-1 flex flex-col justify-center items-center mb-8 lg:mb-0">
          <div className="w-full max-w-xl">
            <h1 className="text-[clamp(2.5rem,8vw,6rem)] font-black text-black leading-[0.85] tracking-tight mb-6 lg:mb-8">
              ROTWARE
            </h1>
            <p className="text-lg lg:text-xl text-black mb-4 lg:mb-6 leading-relaxed">
              Experimental software for the beautifully unmarketable
            </p>
            <p className="text-base lg:text-lg text-black leading-relaxed opacity-80">
              Building tools and platforms for creative communities that operate beyond algorithmic discovery. 
              Custom software solutions for artists, venues, and collectives who resist mainstream gatekeeping.
            </p>
          </div>
        </div>

        {/* Right Column - Projects Grid */}
        <div className="flex-1 flex items-center justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
            {projects.map((project) => (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="border-2 border-black bg-white p-6 cursor-pointer hover:bg-black hover:text-white transition-all duration-200 h-56 lg:h-64 flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-medium mb-2 opacity-60">
                    {project.category}
                  </div>
                  <h3 className="text-base lg:text-lg font-black mb-2 leading-tight">
                    {project.title}
                  </h3>
                  <p className="text-xs leading-relaxed mb-3">
                    {project.description}
                  </p>
                </div>
                <div className="text-xs font-medium">
                  {project.status}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Project Details Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-8 z-50">
          <div className="bg-white border-4 border-black max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="text-xs font-medium mb-2 opacity-60">
                    {selectedProject.category}
                  </div>
                  <h2 className="text-3xl font-black mb-2">
                    {selectedProject.title}
                  </h2>
                  <div className="text-sm font-medium">
                    STATUS: {selectedProject.status}
                  </div>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-2xl font-black hover:opacity-70"
                >
                  ×
                </button>
              </div>
              
              <p className="text-lg leading-relaxed mb-6">
                {selectedProject.details}
              </p>
              
              <div>
                <h3 className="text-sm font-black mb-3">TECH STACK</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 border border-black text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Rotware;
