Velvet Metal Product Requirements Document (v1)

1. Executive Summary

Velvet Metal is a platform-agnostic music aggregator that unifies users’ streaming accounts into one seamless interface. Designed to eliminate fragmentation, it allows listeners to explore, manage, and sync their music libraries—regardless of source. Think of it as mission control for your music universe: clean, cohesive, and made for people who value both simplicity and power. 2. Problem Statement
Today’s music ecosystem is splintered:
Multiple apps, fractured libraries: Listeners use Spotify, Apple Music, and YouTube Music, but switching between them is painful.
Playlists don’t transfer well: Existing tools like Soundiiz are clunky, slow, or incomplete.
Discovery is siloed: Each service builds echo chambers; cross-platform discovery is rare.
Syncing lacks memory: Most tools don’t keep a reliable history of what was transferred, when, or why.
Velvet Metal solves this by giving users a unified experience for managing, syncing, and exploring music across services—no family therapy required. 3. Target Users
Collectors
People who maintain large playlists across multiple services
Power Users
Listeners who switch services often or manage music for others
Cross-platform DJs
Need to maintain synced libraries for different playback contexts
Music Switchers
Users migrating between services or trialing new ones
Curators
People who want to create and share playlists across ecosystems 4. User Experience Goals
Deliver a frictionless way to manage music across services.
Preserve playlist integrity (metadata, order, availability).
Maintain a personal music “source of truth” that transcends platforms.
Make the app feel elegant, fast, and invisible when it should be. 5. Core Features (MVP)
5.1. Authentication & Connections
OAuth-based login (Google, Spotify, Apple)
Connect multiple music services
View connection status and manage accounts
5.2. Playlist Import & Export
Import playlists from Spotify/Apple Music
Export to any connected service
Conflict resolution for missing tracks
Retain order, metadata, and artwork where possible

5.3. Unified Library

One view of all playlists across services
Filter by service, genre, mood (Phase 2)
Tag and favorite playlists
5.4. Sync History

Timeline of transfers
Track sync success/failure
Re-sync or revert changes

5.5. Smart Search

Search across all connected libraries
View availability by platform
Add to playlists or libraries from anywhere

6. Secondary Features

6.1. Auto Sync (Phase 2)

Scheduled sync (e.g., weekly)
Change tracking with alerts

6.2. Platform-Agnostic Playlists

Create playlists within Velvet Metal
Add songs regardless of service
Export to multiple platforms in one click

6.3. Metadata Fixer

Auto-fix mismatched tracks using fuzzy matching
Highlight problematic entries

6.4. Transfer Templates

Save sync settings (e.g., “Spotify → Apple Music with tag X”)
Batch transfers with rules

7. Technical Requirements

7.1. Frontend

Framework: React 18+ with Vite
Language: TypeScript
Styling: TailwindCSS
State: Zustand
Routing: React Router
Animation: Framer Motion
Deployment: PWA, static export capable

7.2. Backend

Platform: Node.js (Express or Appwrite)
Database: PostgreSQL (or Appwrite collections)
Object Storage: Album/playlist art
Service Integrations:

Spotify API
Apple Music API
YouTube Music (planned)

Authentication:

OAuth2 for each music service
Firebase/Auth0 for login (or Appwrite)

7.3. Sync Engine

Track mapping logic
Rate limiting and retry logic
Queue-based background jobs (e.g., Bull or Cloud Task queues)

8. User Flows

8.1. Sign Up & Connect

Sign in with Google
Connect Spotify and/or Apple Music
Grant permissions
Land on Unified Library view

8.2. Import Playlist

Select source service → Playlist
Choose destination(s)
Review transfer preview
Sync → View transfer log

8.3. Smart Search

Search for song or artist
View results across services
Add to existing or new playlist
Optionally export to one or more platforms

8.4. History Log

Navigate to Transfer History
See timestamped logs
Re-run or rollback a sync

9. Success Metrics

Metric
Target
MAUs
10,000 within 6 months
Avg. Sync Success Rate
95%+
Playlist Transfer Volume
100K+ in first 3 months
User Retention (Monthly)
50%+
Platform-Agnostic Playlists
30% of active users using

10. Rollout Plan

🛠 Phase 1: MVP (Month 1–3)

Core auth & service connections
Import/export playlists
Sync history & transfer log
Unified library view

🌐 Phase 2: Power Features (Month 4–6)

Auto sync
Playlist creation inside Velvet Metal
Metadata fixer
Smart search with fuzzy matching

🚀 Phase 3: Network Effects (Month 7–12)

Collaborative playlist sharing
Music graph / taste mapping
Mobile app
Expansion to YouTube Music, Tidal, Plex

11. Risks & Mitigations

Risk
Mitigation
API limitations
Caching + fallback logic; partner with services early
Failed track matches
Improve matching engine; allow user intervention
Low engagement post-transfer
Add social and notification features early
Data security concerns
End-to-end encryption of tokens, scoped permissions

12. Future Expansion

Profile-based music graphs
Taste matching: “Who vibes with you?”
Browser extension: import from anywhere
API for developers
Sync rules for DJs and power users

13. Strategic Positioning

Velvet Metal isn’t just a transfer tool—it’s:

A music command center that works across your entire ecosystem
Cleaner and more intuitive than Soundiiz
Focused on preservation and sync memory, not just one-off tasks
Service-agnostic: lets you stay loyal to your music, not a platform

Let me know if you want this exported to Markdown or structured for Linear import with subtasks and estimates.
