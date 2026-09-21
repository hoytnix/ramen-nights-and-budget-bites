# Active Context: Ramen Nights & Budget Bites

## Current Status & Focus
- Fixed Itch.io HTML5 deployment 404s and sandbox Service Worker issues.
- Configured Capacitor 8 native Android layer targeting Amazon Kindle Fire OS.
- Core game foundation is active with complete gameplay loop across web and mobile packaging.

## Active Work Stream
- Added `base: './'` to [vite.config.ts](file:///home/oloty/Dev/ramen-nights-and-budget-bites/vite.config.ts) for nested subpath and iframe compatibility on Itch.io.
- Removed nonexistent `/index.css` reference in [index.html](file:///home/oloty/Dev/ramen-nights-and-budget-bites/index.html).
- Established [public/](file:///home/oloty/Dev/ramen-nights-and-budget-bites/public) directory populated with `sw.js`, `manifest.json`, and app icons (`icon-192.png`, `icon-512.png`).
- Guarded Service Worker registration in [index.html](file:///home/oloty/Dev/ramen-nights-and-budget-bites/index.html) (`window.self === window.top`) to avoid sandboxed iframe errors in Itch.io.
- Added `package:itch` npm script in [package.json](file:///home/oloty/Dev/ramen-nights-and-budget-bites/package.json) to generate ready-to-upload `itch-deploy.zip`.

## Recent State Changes
- Resolved Itch.io deployment failure (404 on assets, manifest, and service worker registration failure).
- Added `*.zip` to [.gitignore](file:///home/oloty/Dev/ramen-nights-and-budget-bites/.gitignore).
- Validated build via `pnpm run package:itch` and typechecks via `pnpm exec tsc --noEmit`.
- Updated Memory Bank and synchronized documentation.
