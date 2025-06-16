# PLANNING.md

## Project Overview
Official website for Sun Rot Studios - a Venice-based creative studio operating at the intersection of experimental software, live events, and independent artist amplification. The site showcases three core verticals:
- **Rotware**: Experimental software and tools
- **Heat Death Social Club**: Live events and cultural experiences  
- **Peripheral Vision**: Artist platform and curatorial arm

## Architecture
### Core Components
- **TransitionContext**: GSAP-powered corner-based page transitions
- **Navigation**: Context-aware corner positioning system
- **View Components**: Full-page components for each route (Home, About, Events, Rotware, Peripheral Vision)
- **Animation Hooks**: Custom hooks for content animations and time decay effects
- **UI Components**: Reusable elements following brutalist minimalist design

### Data Model
- Static content-driven site (no backend/database)
- Media assets stored in `src/assets/media/`
- Component-based content management
- Future: Potential headless CMS integration for events/projects

## API Endpoints
Currently static site with no API endpoints. Future considerations:
- Event management API for Heat Death Social Club
- Project submission API for Rotware showcase
- Artist platform API for Peripheral Vision releases

## Technology Stack
- **Frontend**: React 19 with TypeScript
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS 4 with custom minimalist theme
- **Animations**: GSAP 3.13 and Framer Motion 12
- **Routing**: React Router DOM 7
- **3D Graphics**: Three.js and OGL
- **UI**: Custom brutalist minimalist components

## Project Structure
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

## Testing Strategy
- Unit tests for core components
- Integration tests for navigation flow
- Visual regression testing for animations
- Cross-browser compatibility testing
- Mobile device testing
- Lighthouse audits for performance

## Development Commands
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
tsc && vite build

# Type check
npm run type-check

# Lint code
npm run lint

# Preview production build
npm run preview
```

## Environment Setup
- Node.js (latest LTS version)
- npm package manager
- Git for version control
- Development server runs on Vite
- TypeScript strict mode enabled
- ESLint flat config with React plugins

## Development Guidelines
- Follow brutalist minimalist design principles
- Use GSAP for animations (0.8s ease-out transitions)
- Maintain monochromatic palette (black, white, gray)
- All page components must include `data-page` attribute for transitions
- Use `@/` path alias for src directory imports
- Prioritize aesthetic experience and cultural resonance
- Build for specific creative communities, not mass scale

## Security Considerations
- Static site deployment (minimal attack surface)
- No sensitive data storage (client-side only)
- Secure asset delivery via CDN
- Input validation for any future form implementations
- Regular dependency security audits

## Future Considerations
- Headless CMS integration for dynamic content
- Contact form and newsletter signup
- Artist submission portal for Peripheral Vision
- Event management system for Heat Death Social Club
- Progressive Web App (PWA) features
- Multi-language support for international reach
- Audio/video content support for multimedia releases