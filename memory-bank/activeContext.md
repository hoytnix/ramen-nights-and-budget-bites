# Active Context: Ramen Nights & Budget Bites

## Current Status & Focus
- Integrated TehWiz Productions (`tehwiz.com`) Organization entity and linked publisher/creator/producer relationships in Schema.org JSON-LD structured data in `index.html`.
- Generated custom 16-bit retro pixel-art cover image (`public/cover.png`, `public/cover.jpg`) capturing the night noodle cart and Tokyo Hodai aesthetic.
- Added comprehensive Schema.org JSON-LD structured data (`Organization`, `VideoGame`, and `WebApplication` schemas) and OpenGraph / Twitter Card social metadata in `index.html`.
- Implemented `public/robots.txt` with retro ASCII banner, crawler rules, and explicit AI/LLM indexing allowances.
- Created `public/llms.txt` following the llms.txt standard with in-depth game mechanics, formulas, roster, developer/publisher info, and tech stack details.
- Added `public/sitemap.xml` for complete web discovery.

## Active Work Stream
- Added TehWiz Productions (`https://tehwiz.com`) as top-level Organization and publisher/creator in JSON-LD.
- Updated `README.md` and `public/llms.txt` with TehWiz Productions developer & publisher attribution.
- Validated JSON-LD parsing and integrity.

## Recent State Changes
- Updated `index.html` JSON-LD schema with `Organization` (`name`: "TehWiz Productions", `url`: "https://tehwiz.com", `@id`: "https://tehwiz.com/#organization").
- Linked TehWiz Productions as creator, publisher, and producer across `VideoGame` and `WebApplication` graph nodes.
- Synchronized `README.md` and `public/llms.txt`.
- Verified clean build via `pnpm run build` and typechecks via `pnpm exec tsc --noEmit`.

