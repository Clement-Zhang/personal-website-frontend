# AGENTS.md

- **Tech Stack:** React 18, Vite 8, TypeScript / JavaScript, Tailwind CSS v4 (`@tailwindcss/postcss`), Redux Toolkit, React Router v6, Socket.io client.
- **Path Alias:** `@/*` maps to `./src/*` (configured in `vite.config.js` and `tsconfig.json`).
- **Build Output:** `build` directory (configured in `vite.config.js`).

## Developer Commands

- **Start Dev Server:** `npm run start` (`vite`)
- **Build for Production:** `npm run build` (`vite build`)
- **Preview Build:** `npm run serve` (`vite preview`)
- **Typecheck:** `npm run tsc` (`tsc`)
- **Tests:** `npm test` (Note: test framework configured via `react-scripts`, but no unit tests are currently implemented in the repo).

## Directory Structure

- `src/views/pages/`: Page views (`Home`, `Projects`, `Dating`, `Nothing`, `calculators/`)
- `src/views/components/`: Reusable UI components (`common`, `customs`, `layouts`, `statics`, `calculators`)
- `src/configs/`: App configurations (`tabs`, `chatbots`, `calculators`, `animations`)
- `src/services/`: Service integrations (`socket.service.js`, `generic.service.js`, `dating.service.js`)
- `src/globals/`: Global Redux store (`store.jsx`) and utilities (`generic.js`)
- `src/data/`: Static data files (`projects.js`)

## Code Conventions & Gotchas

- JSX files are used across views and components (`.jsx`).
- Tailwind v4 is integrated with PostCSS (`@tailwindcss/postcss`).
- Ensure absolute imports use `@/...`.
