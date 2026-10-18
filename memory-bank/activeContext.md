# Active Context: Ramen Nights & Budget Bites

## Current Status & Focus
- Configured relative paths for PWA Manifest, icons, and Service Worker registration (`./manifest.json`, `./sw.js`) for seamless GitHub Pages subpath deployment.
- Cleaned up legacy root `manifest.json` and `sw.js` in favor of canonical `public/` assets.
- Core game foundation is active with complete gameplay loop across web and mobile packaging.

## Active Work Stream
- Verified and ensured relative paths (`./manifest.json`, `./icon-192.png`, `./sw.js`) in `index.html` preventing GitHub Pages subpath 404s.
- Removed legacy root `manifest.json` and `sw.js` so Vite builds cleanly output `public/manifest.json` without asset duplication.
- Maintained Service Worker iframe guard (`window.self === window.top`) for sandbox environments (Itch.io).

## Recent State Changes
- Updated `index.html` manifest and icon link tags to use explicit `./` relative paths.
- Removed root `manifest.json` and root `sw.js`.
- Verified production build and GitHub Pages deployment workflow compatibility.

