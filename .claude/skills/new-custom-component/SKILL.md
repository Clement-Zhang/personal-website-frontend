---
name: new-custom-component
description: Scaffold a reusable custom component in views/components/customs with minimal styling. Use when the user asks for a new reusable/custom UI component (input, select, picker, widget). Arg: component name + behavior.
---

Scaffold custom component <Pascal> at src/views/components/customs/<Pascal>.jsx.

1. Default export function <Pascal>({...destructured props}). Controlled pattern: value + onChange; onChange receives plain data ({name,value} or value), NEVER the raw event.
2. Styling MINIMAL: only mechanism-required classes (positioning, cursor, outline-hidden, origin-*). FORBIDDEN unless user requests: z-index, bg-*, rounded-*, w-/h- sizing, colors, spacing, shadows, borders.
3. Tailwind classes only (v4, no config). Anims: framer-motion AnimatePresence + motion.*; no transition prop (MotionConfig inherits).
4. Reuse existing customs before new logic (CorrectingInput = number input ONLY when auto-rounding to min/step/max wanted; Options = pane/provider exemplar). Local useState only; no context unless provider pattern required.
5. Report: file created; bullet list of styling deliberately omitted (user opts in per class).
