# 🚀 Environment Setup - Sun Rot Studios Site

## 📝 Summary
- React 19 + TypeScript + Vite creative studio website
- Framer Motion animations, Tailwind CSS styling
- Venice-based creative studio: software, subculture, spectacle

## 💻 Tech Stack
- **Language**: TypeScript 5.8.3
- **Framework**: React 19.1.0 + Vite 6.3.5
- **Routing**: React Router DOM 7.6.2
- **Styling**: Tailwind CSS 4.1.8
- **Animation**: Framer Motion 12.15.0
- **Icons**: Lucide React 0.511.0
- **Utilities**: clsx, tailwind-merge, class-variance-authority
- **Fonts**: PPMondwest-Regular.otf (custom font)

## 📋 Prerequisites
- Node.js (v18 or higher recommended)
- npm (comes with Node.js)
- Git (for version control)

## ⚙️ Setup Instructions

### 1. Navigate to Project Directory
```bash
cd "/Users/brennanpollock/Projects/Sun Rot Studios/sunrot-studios-site"
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Verify Installation
```bash
npm run type-check
```

## 🏃‍♂️ How to Run

### Development
```bash
npm run dev
```
- Starts Vite development server
- Hot reload enabled
- Typically runs on http://localhost:5173

### Testing
```bash
npm run lint
npm run type-check
```

### Production Build
```bash
npm run build
```
- Runs TypeScript compilation first
- Then builds optimized production bundle

### Preview Production Build
```bash
npm run preview
```

## 📁 Project Structure
```
src/
├── components/
│   ├── MediaSlideshow.tsx      # Rapid-fire media cycling
│   ├── sections/               # Layout sections
│   ├── transitions/            # Animation components
│   ├── ui/                     # Reusable UI components
│   └── views/                  # Page components (Home, About, Contact, Experimental)
├── assets/media/               # GIFs, images, videos
├── hooks/                      # Custom React hooks
├── lib/                        # Utilities (utils.ts)
└── styles/                     # Additional CSS
```

## 🎨 Design System
- **Font**: PPMondwest-Regular.otf (custom font in public/fonts/)
- **Colors**: Black, white, gray palette (anti-corporate aesthetic)
- **Animations**: Rapid, glitchy transitions (fever dream aesthetic)
- **Media**: Dynamic slideshow with random rapid cycling

## 🌐 Environment Variables
Currently no environment variables required for development.

## 🔧 Troubleshooting

### Common Issues
- **Port conflicts**: Vite usually runs on 5173, change if needed
- **TypeScript errors**: Run `npm run type-check` to identify issues
- **Missing dependencies**: Re-run `npm install`

### Development Tips
- Use `npm run dev` for hot reload during development
- Check browser console for runtime errors
- MediaSlideshow component handles rapid media cycling
- Custom font may take time to load on first visit

## 📦 Key Dependencies Explained
- **Framer Motion**: Smooth animations and transitions
- **Tailwind CSS v4**: Utility-first styling with latest features
- **React Router DOM v7**: Client-side routing
- **Lucide React**: Icon system
- **clsx + tailwind-merge**: Dynamic class management

---

_Last updated: 2025-06-05_
_Project Status: Active Development_