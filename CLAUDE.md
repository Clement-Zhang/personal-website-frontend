# clement-zhang personal site (Vite+React18 SPA, JSX)

No lint/test scripts; jest+RTL installed but zero tests.
tsconfig: source is JSX; ts only for @/*→src/ alias (also vite.config.js) + editor.
styling: Tailwind v4 CSS-first — tokens in @theme in src/assets/css/App.css (no tailwind.config). ALSO Bootstrap 5.3 CDN in index.html (data-bs-theme=dark) — both active. Anims: framer-motion.
naming: views/pages/*.page.jsx, configs/*.config.js, services/*.service.js. views/components/: layouts(route shells)|statics(Navbar,Sidebar)|customs(reusable: Options,Chatbot,CorrectingInput,Section)|calculators(Settings,Characters,Tooltip)|common.

routes (App.jsx), 2 trees:
1. Default layout: Navbar+centered → Home|Projects|Dating.
2. /calculators: Calculators layout = Sidebar + flex-1 relative content div (pane anchor); calc pages nested in ActiveCalculator→OptionsProvider.

Options pattern (customs/Options.jsx): calc page useEffect → useOptions().setOptions(formJSX, submitFn). Top-right icon toggles framer slide-in pane (absolute, positions vs that flex-1 relative div); submitFn called on close.
new calculator / new main-site tab → use skills new-calculator / new-website-tab (never freehand). CorrectingInput: number input, snaps to min/step/max onBlur. Characters: inputs overlaid on image via %-based arbitrary classes from config.

backend: .env VITE_GENERIC_BACKEND, VITE_DATING_BACKEND_SOCKET, VITE_DATING_BACKEND_HTTP. Mount: store.jsx (RTK, single 'generic' slice) dispatches start() → GET $VITE_GENERIC_BACKEND/wake (cold-start); LoadBackend layout blocks on loading. Dating chatbot: socket.io — socket.service stream() resolves on {type:'end'} msg; request()=emitWithAck.
deploy: Vercel; vercel.json rewrites /showcase/* + /sim/* → separate Vercel apps (not this SPA).
