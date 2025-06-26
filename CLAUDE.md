# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with the Sun Rot Studios website codebase.

## Project Overview

**Sun Rot Studios** is a Venice-based creative studio operating at the intersection of experimental software, live events, and independent artist amplification. The official website showcases three core verticals:

- **🔧 Rotware**: Experimental software and custom-built tools for creative communities
- **🎪 Heat Death Social Club**: Curated cultural experiences and underground showcases  
- **👁️ Peripheral Vision**: Decentralized label and curatorial arm for independent creators

**Cultural Mission**: "Cultural tech for the beautifully unmarketable" - building tools and stages for independent artists who operate beyond algorithmic discovery and corporate gatekeeping.

## Development Commands

### Essential Commands
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
tsc && vite build

# Type check without emitting
npm run type-check

# Lint code
npm run lint

# Preview production build
npm run preview
```

### Development Warnings
- Don't ever start the dev server on your own. I already have it running in another tab.
- Always run lint and type-check commands after making changes to ensure code quality

## Technology Stack

- **Frontend**: React 19 with TypeScript (strict mode)
- **Build Tool**: Vite 6 with hot module replacement
- **Styling**: Tailwind CSS 4 with custom brutalist minimalist theme
- **Animations**: GSAP 3.13 and Framer Motion 12
- **Routing**: React Router DOM 7 with flat route structure
- **3D Graphics**: Three.js and OGL (for future enhancements)
- **UI**: Custom components following brutalist minimalist design principles
- **Typography**: inkct (primary brutalist) and BootzyTM (body text) custom fonts

## Project Architecture

### Project Structure
```
src/
├── components/
│   ├── views/           # Page-level components (Home, About, Events, Rotware, Peripheral Vision)
│   ├── ui/             # Reusable UI components (Navigation, GifChaosGrid, EventCard, etc.)
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

### Routing Architecture
The app uses React Router DOM 7 with a simple flat route structure:
- `/` - Home view (landing experience with animated navigation)
- `/about` - About view (studio mission and philosophy)
- `/events` - Events view (Heat Death Social Club event listings)
- `/rotware` - Rotware view (experimental software showcase with scroll-driven gallery)
- `/peripheral-vision` - Peripheral Vision view (artist platform and music releases)

All routes are defined in `src/App.tsx` and render full-page view components wrapped in `TransitionProvider` for seamless page transitions.

## Design Philosophy

This project follows a **pure brutalist minimalist aesthetic** embodying the "Cultural tech for the beautifully unmarketable" philosophy:

### Visual Design System
- **Colors**: Stark black text on pure white backgrounds - no grays, no gradients, absolute contrast
- **Typography**: Massive, bold typefaces (`inkct` primary, `BootzyTM` body) with dramatic scaling and generous spacing
- **Layout**: Ultra-minimal centered content with vast white space and singular focal elements
- **UI Elements**: Corner-positioned navigation, clean geometric shapes, zero ornamentation
- **Interactivity**: Purposeful hover states and smooth transitions that enhance focus
- **Philosophy**: Extreme simplicity meets maximum impact - every element serves a purpose

### Animation Principles
- **Performance**: Smooth and beautiful GSAP transitions prioritizing fluid motion
- **Timing**: Slow, serene transitions (0.8s ease-out) reinforcing calm, focused experience
- **Easing**: `power2.out/inOut` easing for page transitions, `ease-out` for content animations
- **Philosophy**: Prioritize aesthetic experience and emotional resonance over pure efficiency

## Core Components & Patterns

### TransitionContext
`src/contexts/TransitionContext.tsx` - Core transition system for page navigation:
- Corner-based page scaling animations using GSAP
- Manages `isTransitioning` state to prevent navigation conflicts
- `transitionToPage(path, corner)` function for programmatic navigation
- Uses `data-page` attribute to target page elements for animations

### Navigation Component
`src/components/ui/Navigation.tsx` - Ultra-minimal corner navigation system:
- **Clean Positioning**: Fixed corners with small, uppercase text labels
- **Context Awareness**: Current page button is hidden, maintains visual balance
- **Corner Layout**: EVENTS/HOME (top-left), ABOUT (top-right), ROTWARE (bottom-left), PERIPHERAL VISION (bottom-right)
- **Subtle Interactions**: Gray-to-black hover states, minimal touch feedback
- **Seamless Integration**: Works with TransitionContext for smooth page changes

### Animation Hooks
- `useContentAnimations` - Staggered element reveal animations
- `useTimeDecay` - Progressive visual degradation effects
- All hooks use GSAP timelines with proper cleanup on unmount

### UI Components
- **GifChaosGrid** - Dynamic media display grid
- **EventCard** - Event information display for Heat Death Social Club
- **ProjectPanel** - Software project showcase panels for Rotware
- **CircularGallery** - Feature-specific gallery component

## Animation Guidelines

### GSAP Implementation
- Use **GSAP with ScrollTrigger** for scroll-driven experiences and page transitions
- All page components must include `data-page` attribute for transition targeting
- Use timeline-based animations with proper cleanup on component unmount
- Corner-based page scaling with `power2.out/inOut` easing

### Animation Standards
- **Timing**: 0.8s ease-out curves (brutalist minimalist principle)
- **Movement**: Prefer smooth, graceful movements that reinforce calm experience
- **Reveals**: Content slides up 30px and fades in
- **Hovers**: Subtle scale transforms (1.02) and animated underlines
- **Staggering**: Use staggered animations for multiple elements

### Text Animations
Available in `src/TextAnimations/`:
- **GlitchText** - Digital glitch effects
- **DecryptedText** - Matrix-style character reveals
- **Scrambled Text** - Random character scrambling

### Background Effects
Available in `src/Backgrounds/`:
- **Waves** - Fluid wave animations
- **Noise** - Texture overlay effects

## ROTWARE Page Specifications

ROTWARE is a **scroll-driven gallery** showcasing experimental software projects:

### Layout Structure
- **Initial View**: Clean white page with centered title block
  - Title: "ROTWARE" in heavy uppercase font
  - Subtitle: Single sentence in lighter weight font
  - Ample whitespace surrounding the block
- **Project Panels**: Stacked vertical panels, each consuming 80-90% of viewport height
- **Two-Column Grid**: Alternating layout for visual rhythm:
  - Panel 1: Text content left, media right
  - Panel 2: Media left, text content right
  - Panel 3: Text left, media right (pattern repeats)

### Project Panel Components
- **Project Title**: Large, bold, black, uppercase text (most dominant element)
- **Description**: Short paragraph (2-3 lines) in standard sans-serif font
- **Status Tag**: Small pill-shaped tag (e.g., "STATUS: IN DEVELOPMENT")
- **Media Container**: Clean rectangle with 1px black border or subtle shadow
- **"More Info" Expander**: Small clickable element with + icon and "DETAILS" text

### GSAP ScrollTrigger Implementation
- **Panel Pinning**: Each panel pins to viewport when it becomes focus
- **Smooth Transitions**: After scrolling viewport height, panel unpins and next slides up
- **Content Reveal**: Title/description slide up 30px and fade in (0.8s ease-out)
- **Media Animation**: Media container fades in after text content
- **Hover Effects**: Media scale(1.02), title gets animated underline left-to-right
- **Background Animations**: Unique looping animations per panel when pinned

### Responsive Behavior
- **Desktop**: Two-column alternating layout is prominent
- **Mobile**: Single-column stack (title → description → status → media)

## Development Guidelines

### Code Standards
- **TypeScript**: Strict mode enabled with proper type definitions
- **Path Aliasing**: Use `@/` alias for src directory imports (configured in `vite.config.ts`)
- **ESLint**: Flat config with React hooks and refresh plugins
- **Component Structure**: Follow React 19 patterns with proper hooks usage

### Cultural Development Philosophy
- **Absolute Minimalism** - Remove everything non-essential, keep only what serves the message
- **Bold Simplicity** - Use massive typography and stark contrast to create immediate impact
- **Cultural Resonance** - Build for the "beautifully unmarketable" - those who reject mainstream algorithms
- **Purposeful Restraint** - Every element must earn its place through necessity, not decoration

### Important Conventions
- All page view components must include `data-page` attribute for transitions
- Use `useTransition()` hook for programmatic navigation with corner-based animations  
- Navigation state management through TransitionContext prevents conflicting animations
- Media assets should be optimized and lazy-loaded for performance
- Follow brutalist minimalist design principles in all new components

## Testing & Quality Assurance

### Testing Strategy
- Unit tests for core components
- Integration tests for navigation flow
- Visual regression testing for animations
- Cross-browser compatibility testing
- Mobile device testing
- Lighthouse audits for performance

### Quality Checks
Always run these commands before committing:
```bash
npm run type-check  # TypeScript compilation check
npm run lint        # ESLint code quality check
```

## Important Files & References

### Core System Files
- `src/contexts/TransitionContext.tsx` - Core page transition system
- `src/components/ui/Navigation.tsx` - Context-aware navigation component
- `src/hooks/` - Custom animation and effect hooks
- `src/App.tsx` - Main routing and app structure

### Documentation
- `README.md` - Project overview and getting started guide
- `PLANNING.md` - Architecture and development planning
- `TASK.md` - Current tasks and completed work tracking
- `srs-docs/STYLE_GUIDE.MD` - Design system and aesthetic guidelines
- `srs-docs/BUSINESS_DOC.MD` - Company profile and business philosophy

### Media & Assets
- `src/assets/gifs/` - GIF and image assets for visual content
- `public/fonts/inkct.ttf` - Primary brutalist typography
- `public/fonts/BootzyTM.ttf/.woff/.woff2` - Body text typography

## Security & Performance

### Static Site Security
- Client-side only application (minimal attack surface)
- No sensitive data storage or backend dependencies
- Regular dependency security audits required
- Secure asset delivery via CDN for production

### Performance Considerations
- Bundle size optimization through tree shaking
- Image/GIF optimization pipeline
- Lazy loading for media assets
- Animation performance testing
- Progressive Web App (PWA) features for future enhancement

---

When working on this project, embody the "Cultural tech for the beautifully unmarketable" philosophy through extreme minimalism, bold typography, and purposeful restraint. Every design decision should serve the cultural mission of amplifying independent creators who operate beyond mainstream algorithmic discovery.