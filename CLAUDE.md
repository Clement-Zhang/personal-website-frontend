# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm start` — Vite dev server
- `npm run build` — production build (outputs to `build/`, not `dist/`)
- `npm run serve` — preview the production build
- `npm run tsc` — TypeScript check (source is plain JSX; tsconfig exists mainly for the `@/*` path alias and editor support)

There is no lint script and no test script. Jest/testing-library packages are installed but no tests exist in `src/`.

## Stack

React 18 + Vite SPA. Styling is Tailwind CSS v4 (CSS-first config: theme tokens like `--color-text-background` live in `@theme` in `src/assets/css/App.css`, not a tailwind.config file). Bootstrap 5.3 is *also* loaded via CDN in `index.html` (`data-bs-theme="dark"`), so both style systems are in play. Animations use framer-motion. `@/` resolves to `src/` (vite.config.js + tsconfig paths).

## Architecture

`src/App.jsx` defines two independent route trees:

1. **Main site** under the `Default` layout (`views/components/layouts/Default.jsx`): Navbar + centered content — Home, Projects, Dating pages.
2. **Calculators** under the `Calculators` layout (`views/components/layouts/Calculators.jsx`): collapsible `Sidebar` + a `relative` content area. Calculator pages are nested inside `ActiveCalculator`, which wraps them in `OptionsProvider`.

Naming conventions: pages are `*.page.jsx` (`views/pages/`), configs `*.config.js` (`configs/`), services `*.service.js` (`services/`). Components are grouped in `views/components/` as `layouts/` (route shells), `statics/` (Navbar, Sidebar), `customs/` (reusable widgets: Options, Chatbot, CorrectingInput, Section), `calculators/` (calculator-specific: Settings, Characters, Tooltip), and `common/`.

### Options pane pattern (calculators)

`views/components/customs/Options.jsx` provides an `OptionsContext`. A calculator page calls `useOptions().setOptions(<form JSX>, submitFn)` in a `useEffect`; the provider renders a top-right icon that toggles a framer-motion slide-in pane containing that form, calling `submitFn` on close. The pane is `absolute` and positions against the `flex-1 relative` div in `Calculators.jsx`.

### Adding a calculator

Follow the `hackers` example: page in `views/pages/calculators/`, data/settings factory in `configs/calculators/`, sidebar tab entry in `configs/tabs/calculators.config.js`, route in `App.jsx` nested under `ActiveCalculator`. Calculator inputs use `CorrectingInput`, which snaps the value to `min`/`step`/`max` on blur. `Characters` overlays inputs on an image using percentage-based Tailwind arbitrary classes stored in the config.

### Backend integration

- Env vars (`.env`, Vite-style): `VITE_GENERIC_BACKEND`, `VITE_DATING_BACKEND_SOCKET`, `VITE_DATING_BACKEND_HTTP`.
- On mount, `globals/store.jsx` (Redux Toolkit, single `generic` slice) dispatches a `start()` thunk that hits `VITE_GENERIC_BACKEND/wake` to wake a cold-started backend; `views/components/layouts/LoadBackend.jsx` shows a loading screen until it resolves.
- The Dating page chatbot streams over socket.io (`services/socket.service.js`: `stream` resolves when a `{type: 'end'}` message arrives; `request` uses `emitWithAck`).

### Deployment

Vercel. `vercel.json` rewrites `/showcase/*` and `/sim/*` to separate Vercel apps, so those paths are not handled by this SPA.
