# Tech Context: Ramen Nights & Budget Bites

## Technology Stack
- **Framework / Runtime**: React 19 (`react`, `react-dom` ^19.2.3), Vite 6 (`vite` ^6.2.0, `@vitejs/plugin-react` ^5.0.0).
- **Language**: TypeScript (`typescript` ~5.8.2) targeting modern ESNext/DOM.
- **Styling**: Tailwind CSS (with arbitrary value support and custom pixel art typography classes).
- **Iconography**: Lucide React (`lucide-react` ^0.562.0) and custom SVG/Pixel canvas implementations.
- **Persistence**: Browser `localStorage` (`ramen_nights_ultimate_save`).
- **PWA Capabilities**: Standalone manifest (`manifest.json`) and service worker (`sw.js`).
- **Mobile Runtime**: Capacitor 8 (`@capacitor/core`, `@capacitor/android`, `@capacitor/cli`) targeting Android & Amazon Kindle Fire OS (minSdkVersion 24).
- **Package Manager**: `pnpm` (Node v24.20.0).

## Environment & Scripts
- `pnpm run dev`: Starts local Vite development server.
- `pnpm run build`: Executes `vite build` to generate production client bundle in `dist/`.
- `pnpm run preview`: Previews the production build locally.
- `pnpm exec tsc --noEmit`: Typecheck codebase without emitting JS artifacts.
- `pnpm run cap:sync`: Builds web assets and syncs with Android native layer (`npx cap sync android`).
- `pnpm run android:check`: Runs `scripts/check-android-env.sh` validating JDK 17+, Android SDK, and Fire OS settings.
- `pnpm run android:build`: Runs `scripts/build-android.sh` to assemble Kindle Fire OS debug APK via Gradle wrapper.

## Design System & Typography
- Header Font: `font-pixel-header` (Retro display pixel font).
- Body Font: `font-pixel-body` (Pixel monospace reading font).
- UI Primitives:
  * `PixelBox.tsx`: Dynamic double-bordered retro box container with customizable theme borders.
  * `PixelIcons.tsx`: Retro pixel icon renderer for food, UI, and character representations.
  * `DistrictMap.tsx`: Canvas/SVG-based pixel radar map visualizing Tokyo districts.

## Constraints & Rules
- Zero remote backend API reliance. All logic must run clientside.
- Keep bundle size minimal; avoid heavyweight gaming engines or large external asset dependencies.
- Ensure 60fps rendering without state lag during rapid bowl clicking.
