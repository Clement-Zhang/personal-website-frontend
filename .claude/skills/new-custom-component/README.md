# new-custom-component (human-readable reference)

This is the explanatory copy of the skill for you to refer to. Claude executes `SKILL.md` (the shrunk, directives-only version); the two are kept in sync — if you change one, change the other.

## What it does

Scaffolds a new reusable UI component (input, select, picker, widget, etc.) into `src/views/components/customs/`, following the conventions this repo's customs components already use.

## Steps, with rationale

1. **File and API shape.** Creates `src/views/components/customs/<PascalName>.jsx` as a default-exported function with destructured props. Interactive components follow the controlled pattern: a `value` prop plus an `onChange` callback. `onChange` always hands back plain data — either a bare value (like ImageSelect) or a `{name, value}` object (like CorrectingInput) — never the raw DOM event. This keeps call sites like `onChange={setAttacker}` working without event-unwrapping boilerplate.

2. **Minimal styling — the core concept.** The component ships with only the classes its mechanism needs to function: positioning (`relative`, `absolute top-full left-0`), `cursor-pointer`, `outline-hidden`, transform origins. Everything cosmetic is deliberately left off unless you ask for it: no z-index, no backgrounds, no rounding, no width/height sizing, no colors, spacing, shadows, or borders. You make styling decisions yourself by iterating on the deployed result, one class at a time.

3. **Tooling conventions.** Tailwind v4 utility classes only (tokens live in `@theme` in `src/assets/css/App.css`; there's no tailwind.config). Animations use framer-motion's `AnimatePresence` + `motion.*` elements, with no explicit `transition` prop so the duration inherits from any surrounding `MotionConfig` (e.g., the one in the Calculators layout).

4. **Reuse before reinventing.** Before writing new logic, check whether an existing customs component covers it — `CorrectingInput` when (and only when) the input is a number that should auto-round to its min/step/max, `Options` as the exemplar if a pane/provider pattern is genuinely needed. State stays local (`useState`); no new contexts unless the component truly is a provider.

5. **Report.** After scaffolding, Claude reports the file it created and a bullet list of styling it deliberately omitted, so you can opt individual classes in rather than stripping unwanted ones out.
