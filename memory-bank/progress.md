# Progress: Ramen Nights & Budget Bites

## What Works
- **Core Game Loop**:
  - Manual bowl clicking with particle bursts and sound/visual feedback hooks.
  - Heartbeat tick system running at 1000ms intervals, incrementing IGT by 10 minutes per tick.
  - Net income calculation (passive earnings minus daily staff salaries & district rent).
- **Districts & Ascension**:
  - 4 Districts: Hongo Area, Shibuya Cross, Shinjuku Nights, Ginza Palace.
  - District unlock requirements (Yen and Academic Reputation).
  - Ascension soft-reset mechanism with permanent trophy perks (+50% YPS each).
- **Economy & Progression**:
  - 10 Classmate staff tiers with exponential scaling.
  - 9 Kitchen machinery upgrades with exponential multipliers.
  - 20 Ramen recipes with distinct base values and situational bonuses.
  - 8 Decor themes (Classic, seasonal variants, Cyberpunk, Matcha, Royal Ginza).
  - Consumable items with active buff durations.
- **Narrative & Dynamic Systems**:
  - 15 Weather conditions with day/night and seasonal availability gates.
  - Cutscene dialog modal system with branching options and state callbacks.
  - Procedural and milestone quest system rewarding Academic Reputation.
- **Documentation & Architecture**:
  - `GEMINI.md` system laws, architecture invariants, and operational workflows.
  - Core `/memory-bank/` files fully synchronized.
  - Comprehensive `README.md` with ASCII art, lore, mechanics tables, and setup instructions.
- **Mobile Platform & Fire OS Support**:
  - Capacitor 8 core and android integration (`@capacitor/core`, `@capacitor/android`, `@capacitor/cli`).
  - Native `android/` directory initialized with Gradle wrapper (`android/gradlew`) with executable permissions.
  - Fire OS compatibility verified (`minSdkVersion: 24`, zero hard Google Play Services dependencies).
  - Diagnostic environment validator (`scripts/check-android-env.sh`) for JDK 17+ and Android SDK.
  - One-touch APK build script (`scripts/build-android.sh`) and npm run scripts (`cap:sync`, `android:check`, `android:build`).
- **Web, GitHub Pages & Itch.io Deployment**:
  - Configured Vite `base: './'` for relative asset resolution inside subpaths (GitHub Pages) and iframes (Itch.io).
  - Configured `public/` directory hosting `sw.js`, `manifest.json`, and icons (`icon-192.png`, `icon-512.png`).
  - Set explicit relative paths (`./manifest.json`, `./sw.js`, `./icon-192.png`) in `index.html` preventing 404s on subpath root lookup.
  - Removed deprecated root-level duplicate `manifest.json` and `sw.js`.
  - Added iframe guard to Service Worker registration to eliminate sandboxed iframe errors.
  - Added `pnpm run package:itch` script to generate a ready-to-upload `itch-deploy.zip`.

## Current Roadmap & Potential Improvements
- [ ] Sound & Music system (retro 8-bit chiptune audio/SFX for bowl clicks, level ups, cash registers).
- [ ] Additional storyline cutscenes exploring classmate backstories and district boss encounters.
- [ ] Minigames for broth seasoning or noodle straining.
- [ ] Export/Import save game data functionality for cross-device support.

## Known Issues / Backlog
- None identified in base engine; build and typecheck pass cleanly.
