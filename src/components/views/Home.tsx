import { FC, useState, useEffect } from "react";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import MediaSlideshow from "../MediaSlideshow";

// Import all media files
import carDancing from "../../assets/media/car-dancing.gif";
import circle from "../../assets/media/circle.gif";
import colorLump from "../../assets/media/color-lump.gif";
import digitalWoman from "../../assets/media/digital-woman.gif";
import infiniteHallway from "../../assets/media/infinite-hallway.gif";
import leaves from "../../assets/media/leaves.gif";
import rorshack from "../../assets/media/rorshack.gif";
import whiteCircle from "../../assets/media/white-circle.gif";

const Home: FC = () => {
  const [currentProjectSet, setCurrentProjectSet] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState("");
  
  const mediaItems = [
    { src: digitalWoman, type: "image" as const },
    { src: infiniteHallway, type: "image" as const },
    { src: rorshack, type: "image" as const },
    { src: colorLump, type: "image" as const }
  ];

  // Sun Rot Studios projects adapted to From Form style
  const projects = [
    { id: 1, title: "Heat Death Social Club Venice Launch", subtitle: "2024 Campaign", category: "Events", image: carDancing },
    { id: 2, title: "Peripheral Vision Artist Platform", subtitle: "Digital Infrastructure", category: "Creative Concept", image: circle },
    { id: 3, title: "Rotware Experimental Software", subtitle: "Anti-Corporate Tools", category: "Software", image: colorLump },
    { id: 4, title: "Underground Radio Transmissions", subtitle: "Cultural Broadcasting", category: "Audio", image: digitalWoman },
    { id: 5, title: "Venice Subculture Documentation", subtitle: "Photography Series", category: "Photography", image: infiniteHallway },
    { id: 6, title: "Fever Dream Interface Design", subtitle: "Experimental UI", category: "Design", image: leaves },
    { id: 7, title: "Anti-Corporate Design Manifesto", subtitle: "Creative Rebellion", category: "Concept", image: rorshack },
    { id: 8, title: "Cultural Infrastructure Project", subtitle: "Community Building", category: "Social", image: whiteCircle }
  ];

  const filters = ["Events", "Software", "Creative Concept", "Audio", "Photography", "Design", "Social"];
  const projectsPerSet = 4;

  const filteredProjects = selectedFilter === "" 
    ? projects 
    : projects.filter(project => project.category === selectedFilter);

  const totalSets = Math.ceil(filteredProjects.length / projectsPerSet);
  
  const currentProjects = filteredProjects.slice(
    currentProjectSet * projectsPerSet,
    (currentProjectSet + 1) * projectsPerSet
  );

  useEffect(() => {
    setCurrentProjectSet(0);
  }, [selectedFilter]);

  const nextSet = () => {
    if (currentProjectSet < totalSets - 1) {
      setCurrentProjectSet(currentProjectSet + 1);
    }
  };

  const prevSet = () => {
    if (currentProjectSet > 0) {
      setCurrentProjectSet(currentProjectSet - 1);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif' }}>
      {/* Menu */}
      <div className="absolute top-6 left-6 z-50">
        <button className="bg-yellow-400 text-black px-3 py-1 text-sm font-medium uppercase tracking-wider">
          MENU
        </button>
      </div>

      {/* Brand Navigation */}
      <div className="absolute top-6 right-6 z-50">
        <div className="text-right">
          <div className="text-sm font-medium tracking-wider leading-tight">
            <span className="block">Sun Rot</span>
            <span className="block">Studios</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Full Screen Background */}
        <div className="absolute inset-0">
          <MediaSlideshow 
            mediaItems={mediaItems}
            intervalMs={4000}
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Center Text Overlay - SOLID BLACK RECTANGLE */}
        <div className="relative z-10">
          <div className="bg-black px-16 py-12 text-white">
            <div className="text-center">
              <h1 className="text-5xl md:text-7xl font-bold mb-2 tracking-wider leading-none">
                SUN ROT
              </h1>
              <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-wider leading-none">
                STUDIOS
              </h2>
              <h3 className="text-lg md:text-xl font-normal tracking-widest uppercase leading-relaxed">
                INDEPENDENT STUDIO
              </h3>
              <h3 className="text-lg md:text-xl font-normal tracking-widest uppercase leading-relaxed">
                FOR SOFTWARE, SUBCULTURE & SPECTACLE
              </h3>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
          <a href="#projects" className="block">
            <ChevronDown className="w-5 h-5 text-white opacity-70 animate-bounce" />
          </a>
        </div>
      </div>

      {/* Projects Section */}
      <div id="projects" className="px-6 py-20 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Section Title */}
          <h2 className="text-2xl font-bold mb-16 text-center tracking-wider uppercase">
            SOME SELECTED PROJECTS
          </h2>

          {/* Featured Projects Carousel - Exactly 4 projects */}
          <div className="mb-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              {currentProjects.map((project) => (
                <div key={project.id} className="group relative bg-white overflow-hidden">
                  <div className="aspect-square bg-gray-100 overflow-hidden relative">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                      <button className="opacity-0 group-hover:opacity-100 bg-white text-black px-6 py-3 text-sm font-medium uppercase tracking-wider transition-all duration-300 hover:bg-gray-100">
                        View
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center justify-center gap-4">
              <button 
                onClick={prevSet}
                disabled={currentProjectSet === 0}
                className="p-2 text-gray-400 hover:text-black disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              <span className="text-sm font-medium px-4">
                {currentProjectSet + 1} / {totalSets}
              </span>
              
              <button 
                onClick={nextSet}
                disabled={currentProjectSet >= totalSets - 1}
                className="p-2 text-gray-400 hover:text-black disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Filter Categories */}
          <div className="mb-12">
            <div className="flex flex-wrap gap-2 justify-center">
              <button
                onClick={() => setSelectedFilter("")}
                className={`px-4 py-2 text-sm font-medium uppercase tracking-wider transition-colors ${
                  selectedFilter === ""
                    ? "bg-black text-white"
                    : "text-black hover:bg-gray-100"
                }`}
              >
                All
              </button>
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  className={`px-4 py-2 text-sm font-medium uppercase tracking-wider transition-colors ${
                    selectedFilter === filter
                      ? "bg-black text-white"
                      : "text-black hover:bg-gray-100"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* All Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div key={project.id} className="group bg-white">
                <div className="aspect-video bg-gray-100 overflow-hidden mb-4 relative">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2 group-hover:underline cursor-pointer transition-all">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">{project.subtitle}</p>
                  <span className="text-xs uppercase tracking-wider text-gray-500">
                    {project.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black text-white px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <p className="text-sm leading-relaxed">
                Sun Rot Studios<br />
                Venice, CA<br />
                United States
              </p>
            </div>
            <div>
              <ul className="space-y-3 text-sm">
                <li><a href="/about" className="hover:underline transition-all">About</a></li>
                <li><a href="/events" className="hover:underline transition-all">Events</a></li>
                <li><a href="/rotware" className="hover:underline transition-all">Rotware</a></li>
              </ul>
            </div>
            <div>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="hover:underline transition-all">Instagram</a></li>
                <li><a href="#" className="hover:underline transition-all">Contact</a></li>
                <li><a href="#" className="hover:underline transition-all">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-sm text-gray-400">©2025 Sun Rot Studios, All rights reserved</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;