# Monorepo Setup Guide

This guide covers setting up a monorepo for the Sunrot Studios site with both the frontend and Strapi CMS.

## Option 1: Using npm workspaces (Recommended for Simple Setup)

### 1. Create the monorepo structure
```bash
# Create a new directory for your monorepo
mkdir sunrot-studios-monorepo
cd sunrot-studios-monorepo

# Create packages directory
mkdir packages

# Move your current site into the packages directory
mv /path/to/sunrot-studios-site packages/frontend

# Clone or move your Strapi CMS into packages
git clone <your-strapi-repo> packages/cms
# or move existing: mv /path/to/strapi-project packages/cms
```

### 2. Create root package.json
```json
{
  "name": "sunrot-studios-monorepo",
  "private": true,
  "workspaces": [
    "packages/*"
  ],
  "scripts": {
    "dev": "npm run dev --workspaces",
    "dev:frontend": "npm run dev --workspace=packages/frontend",
    "dev:cms": "npm run develop --workspace=packages/cms",
    "build": "npm run build --workspaces",
    "build:frontend": "npm run build --workspace=packages/frontend",
    "build:cms": "npm run build --workspace=packages/cms"
  },
  "devDependencies": {
    "concurrently": "^7.6.0"
  }
}
```

### 3. Update package names
- In `packages/frontend/package.json`: change name to `@sunrot-studios/frontend`
- In `packages/cms/package.json`: change name to `@sunrot-studios/cms`

### 4. Install dependencies
```bash
# From monorepo root
npm install
```

### 5. Running your projects
```bash
# Both at once
npm run dev

# Individual projects
npm run dev:frontend
npm run dev:cms
```

---

## Option 2: Using Turborepo (Recommended for Performance & Scale)

Turborepo is excellent for monorepos, especially for JavaScript/TypeScript projects. Built by Vercel with superior caching and build optimization.

### 1. Initialize Turborepo
```bash
# Create new monorepo
npx create-turbo@latest sunrot-studios-monorepo
cd sunrot-studios-monorepo

# Or convert existing directory
npx create-turbo@latest --use-npm
```

### 2. Monorepo Structure

sunrot-studios-monorepo/
├── package.json
├── turbo.json # Turborepo config
├── apps/
│ ├── frontend/ # Your React site
│ └── cms/ # Your Strapi CMS
└── packages/ # Shared packages (optional)
├── ui/ # Shared UI components
├── config/ # Shared configs
└── types/ # Shared TypeScript types


### 3. Root package.json
```json
{
  "name": "sunrot-studios-monorepo",
  "private": true,
  "workspaces": [
    "apps/*",
    "packages/*"
  ],
  "scripts": {
    "dev": "turbo run dev",
    "build": "turbo run build",
    "lint": "turbo run lint",
    "type-check": "turbo run type-check"
  },
  "devDependencies": {
    "turbo": "^1.10.0"
  }
}
```

### 4. turbo.json Configuration
```json
{
  "$schema": "https://turbo.build/schema.json",
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", ".next/**", "build/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "lint": {
      "dependsOn": ["^lint"]
    },
    "type-check": {
      "dependsOn": ["^type-check"]
    }
  }
}
```

### 5. Migration Steps

#### Move your projects
```bash
# Move your current site
mv sunrot-studios-site apps/frontend

# Move your Strapi project  
mv your-strapi-project apps/cms
```

#### Update package names
```json
// apps/frontend/package.json
{
  "name": "@sunrot-studios/frontend"
}

// apps/cms/package.json  
{
  "name": "@sunrot-studios/cms"
}
```

#### Common commands
```bash
# Run everything in dev mode
turbo run dev

# Build everything
turbo run build

# Run specific app
turbo run dev --filter=@sunrot-studios/frontend

# Force rebuild (ignore cache)
turbo run build --force
```

---

## Key Advantages of Turborepo vs npm workspaces

### 🚀 **Performance**
- **Intelligent caching** - Skips rebuilds when nothing changed
- **Parallel execution** - Runs tasks across packages simultaneously
- **Remote caching** - Share cache across team/CI

### 🔧 **Better Developer Experience**
- **Task dependencies** - Automatically builds dependencies first
- **Incremental builds** - Only rebuilds what changed
- **Rich logging** - Clear output showing what's running

### 📊 **Monitoring**
- **Build insights** - See what's taking time
- **Cache hit rates** - Optimize your builds

---

## When to Choose Each Approach

### npm workspaces - Good for:
- Simple setup with just 2 repos
- Small teams (1-2 people)
- Getting started quickly
- Basic shared dependencies

### Turborepo - Good for:
- Teams with multiple developers
- Complex build processes
- Want faster CI/CD
- Plan to share code between frontend/CMS
- Need better caching and optimization

---

## Benefits of Monorepo Setup

1. **Shared dependencies** - Common packages are hoisted to root
2. **Unified scripts** - Run both projects with single commands
3. **Cross-package imports** - Frontend can import shared types from CMS
4. **Simplified CI/CD** - Single repo for deployment
5. **Version synchronization** - Keep everything in sync
6. **Easier code sharing** - Share utilities, types, and components

---

## Next Steps After Setup

1. **Shared packages**: Create shared UI components, utilities, and types
2. **CI/CD**: Set up GitHub Actions to build and deploy both apps
3. **Environment management**: Configure shared environment variables
4. **Testing**: Set up unified testing across the monorepo
5. **Documentation**: Update README files for the new structure