# Sun Rot Studios - Official Website

> **Cultural tech for the beautifully unmarketable.**

The official website for Sun Rot Studios, a Venice-based creative studio and cultural platform operating at the intersection of experimental software, live events, and independent artist amplification.

## 🎯 About Sun Rot Studios

Sun Rot Studios exists to build the tools and stages that the mainstream forgot. We create software, experiences, and platforms that serve independent artists—musicians, coders, designers, and cultural misfits—who operate beyond algorithmic discovery and corporate gatekeeping.

### Core Verticals

- **🔧 Experimental Software (Rotware)** - Custom-built applications and tools for creative communities
- **🎪 Live Events (Heat Death Social Club)** - Curated cultural experiences and underground showcases  
- **👁️ Artist Platform (Peripheral Vision)** - Decentralized label and curatorial arm for independent creators

## 🛠️ Technical Stack

- **Frontend**: React 19 with TypeScript
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS 4 with custom minimalist theme
- **Animations**: GSAP 3.13 and Framer Motion 12
- **Routing**: React Router DOM 7
- **3D Graphics**: Three.js and OGL
- **UI**: Custom components following brutalist minimalist design principles

## 🎨 Design Philosophy

The site embodies a **brutalist, minimalist, punk-inspired aesthetic** with:

- **Monochromatic palette**: Exclusively black, white, and gray
- **Typography**: Bold, aggressive typefaces conveying underground feel
- **Layout**: Sparse layouts with substantial negative space
- **Animations**: Smooth and beautiful GSAP transitions prioritizing fluid motion
- **Interactivity**: Clean, impactful hover and click interactions

## 🚀 Getting Started

### Prerequisites
- Node.js (latest LTS version)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/sunrotstudios/sunrot-studios-site.git

# Navigate to project directory
cd sunrot-studios-site

# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Type check
npm run type-check

# Lint code
npm run lint

# Preview production build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/
│   ├── views/           # Page components (Home, About, Events, Rotware, Peripheral Vision)
│   ├── ui/             # Reusable UI components (Navigation, GifChaosGrid, etc.)
│   └── CircularGallery/ # Feature-specific gallery component
├── contexts/           # React Context providers (TransitionContext)
├── hooks/              # Custom React hooks (useContentAnimations, useTimeDecay)
├── assets/media/       # Static media files (GIFs, images)
├── Backgrounds/        # Background animation components (Waves)
├── TextAnimations/     # Text effect components (GlitchText, DecryptedText, etc.)
├── Animations/         # General animation components (Noise)
├── lib/                # Utility functions
└── styles/             # Global styles and CSS modules
```

## 🎬 Features

### Core Pages
- **Home** - Landing experience with animated navigation
- **About** - Studio mission and philosophy
- **Events** - Heat Death Social Club event listings
- **Rotware** - Experimental software showcase with scroll-driven gallery
- **Peripheral Vision** - Artist platform and music releases

### Animation System
- **TransitionContext** - Corner-based page scaling transitions using GSAP
- **Custom Hooks** - `useContentAnimations` for staggered reveals, `useTimeDecay` for visual degradation
- **Text Effects** - Glitch, scrambled, decrypted, and ASCII text animations
- **Background Effects** - Wave animations and noise overlays

### UI Components
- **Navigation** - Context-aware positioning (corners on home, back arrow on subpages)
- **GifChaosGrid** - Dynamic media display grid
- **EventCard** - Event information display
- **ProjectPanel** - Software project showcase panels

## 🎯 Routing

The app uses React Router with flat route structure:
- `/` - Home view
- `/about` - About view  
- `/events` - Events view
- `/rotware` - Rotware view
- `/peripheral-vision` - Peripheral Vision view

All routes render full-page view components wrapped in `TransitionProvider` for seamless transitions.

## 📖 Documentation

- `srs-docs/STYLE_GUIDE.MD` - Design system and aesthetic guidelines
- `srs-docs/BUSINESS_DOC.MD` - Company profile and business philosophy
- `CLAUDE.md` - Development guidelines and architecture overview

## 🤝 Contributing

We build with poetry and bugs. Our development prioritizes aesthetic experience and cultural resonance alongside technical functionality.

### Development Philosophy
- **Authenticity over optimization** - Build genuinely useful and culturally relevant features
- **Beauty over efficiency** - Prioritize aesthetic experience and emotional resonance
- **Community over scale** - Serve specific creative communities deeply
- **Experimentation over certainty** - Ship imperfect, evolving projects

## 📜 License

This project represents the creative and technical output of Sun Rot Studios. All rights reserved.

## 🌐 Connect

- **Website**: [sunrotstudios.com](https://sunrotstudios.com)
- **Location**: Venice, California
- **Founded**: 2024

---

*Sun Rot Studios: Cultural tech for the beautifully unmarketable.*