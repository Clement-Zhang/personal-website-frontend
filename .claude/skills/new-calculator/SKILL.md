---
name: new-calculator
description: Scaffold a new calculator page for this site (page, empty config, sidebar tab, route). Use when the user asks to add/create a new calculator. Arg: calculator name.
---

Scaffold calculator <name> (lowercase route seg; PascalCase component). Template = hackers minus all setOptions/useOptions wiring.

1. src/views/pages/calculators/<Pascal>.page.jsx: export default fn <Pascal>() → <h1 className="text-8xl!"><Pascal></h1>. NO setOptions.
2. src/configs/calculators/<name>.config.js: create EMPTY.
3. src/configs/tabs/calculators.config.js: append {path: url('<name>'), icon, iconAlt, alt} importing src/assets/images/calculators/<name>/icon.jpg + iconAlt.jpg. NEVER import placeholder icons; if files absent, list exact missing paths in report.
4. src/App.jsx: import page; add <Route path="<name>" element={<Pascal />} /> inside ActiveCalculator-wrapped group.
5. Report: files created, missing icon paths, left to user: config contents, options content, icons.
