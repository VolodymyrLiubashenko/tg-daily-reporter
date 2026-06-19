---
name: component-screenshot-preview
description: Lightweight frontApp component preview workflow for Vue controls/components. Use when creating or visually adjusting a single component and a quick screenshot check is enough: temporarily render it at the bottom of the Home page, inspect one default viewport screenshot, iterate, then remove the temporary preview. Do not use for full responsive audits, design comparisons across breakpoints, or user-requested visual-layout-audit work.
---

# Component Screenshot Preview

## Overview

Use this skill for fast component-level visual feedback in `frontApp/` without a full responsive audit. Keep the production diff focused on the component itself; any Home page preview code is temporary and must be removed before finishing.

## Workflow

1. Read the target component and the closest existing component or token source it should match.
2. Implement the component/styles with existing project patterns, CSS variables, and scoped SCSS.
3. Temporarily render the component at the bottom of `frontApp/src/pages/Home/Home.vue` or the nearest safe Home subcomponent.
4. Start or reuse the Vite dev server at `http://localhost:5173`.
5. Open the Home page in Chrome DevTools MCP at the current/default viewport and take one screenshot.
6. Inspect the screenshot for the requested state: spacing, typography, border contrast, focus/hover if relevant, and obvious clipping.
7. Iterate on the component until the single screenshot looks correct.
8. Remove all temporary Home page preview code.
9. Run at least `npm.cmd run typecheck` and `npm.cmd run lint` from `frontApp/` when code changed.

## Boundaries

- Do not check multiple breakpoints unless the user explicitly asks.
- Do not run `visual-layout-audit` from this workflow.
- Do not leave preview imports, mock state, sample text, or wrapper markup in `Home`.
- Do not change unrelated pages or shared tokens unless the component issue requires it.
- If a theme token is too weak, prefer improving the semantic token in `frontApp/src/styles/variables.scss` for both light and dark themes.

## Reporting

Mention:

- the component files changed;
- that the temporary Home preview was removed;
- the one screenshot route/viewport checked, if a screenshot was taken;
- the validation commands that passed or could not be run.
