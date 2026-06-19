---
name: visual-layout-audit
description: Use only when the user explicitly asks for a full visual layout audit, responsive breakpoint check, design/mockup comparison, or visual QA across page layouts in `frontApp/`. Do not use automatically for ordinary component creation or small style fixes; use component-screenshot-preview for quick one-screenshot component checks.
---

# Visual Layout Audit

## Overview

Use Chrome DevTools MCP as the primary visual verification tool for `frontApp/`.
Use this skill only after an explicit user request for full visual audit/responsive QA. For ordinary component creation or small styling tasks, prefer the lightweight `component-screenshot-preview` workflow.

## Setup Checks

1. Confirm the frontend target URL. Default to `http://localhost:5173`.
2. If the frontend is not running, start it from `frontApp/` with `npm run dev`.
3. If backend data is needed, start the backend from the repo root with `npm run dev`.
4. Use Chrome DevTools MCP to open the page, inspect console messages, network failures, computed layout, and screenshots.
5. Avoid changing unrelated code while auditing.

## Viewports

Check at least these viewport widths unless the user gives different targets:

- Mobile: `375x812`
- Small mobile: `320x568` when dense text or navigation is involved
- Tablet: `768x1024`
- Desktop: `1440x900`
- Wide desktop: `1920x1080` for hero, dashboard, or full-width layouts

For each viewport, reload or wait for layout stability before taking conclusions.

## Design Match Rules

Compare the implemented page against the mockup, screenshot, Figma frame, or user-provided visual intent:

- Verify structure first: header, navigation, main content, repeated sections, footer, overlays, modals.
- Check spacing consistency: outer page padding, section gaps, card gaps, button padding, list rhythm.
- Check alignment: shared baselines, grid columns, centered content, icon/text alignment, image crops.
- Check typography: font family, weight, size, line-height, heading scale, text wrapping, truncation.
- Check color and contrast: backgrounds, borders, text states, hover/focus states, disabled states.
- Check imagery: correct asset, aspect ratio, object fit, crop position, load state, broken images.
- Check components against local design patterns: use existing `Button`, `Icon`, layout components, CSS variables, and SCSS mixins where appropriate.

Treat visual differences as bugs when they change hierarchy, readability, interaction clarity, or the user's requested design intent.

## Responsive Rules

At every viewport:

- No horizontal page scroll unless the feature explicitly requires it.
- No text overlaps, clipped labels, or button text escaping its container.
- Header/nav remains usable and does not cover content.
- Primary actions remain visible and tappable.
- Cards, lists, grids, and media preserve stable dimensions without layout jumps.
- Images keep intended aspect ratios and do not collapse to zero height.
- Modals/popups fit inside the viewport and can be dismissed.
- Sticky/fixed elements do not hide important content.
- Long Ukrainian/Russian/English text wraps cleanly.

For mobile specifically:

- Touch targets should be at least about 44px high/wide when practical.
- Avoid cramped two-column layouts unless content still scans naturally.
- Verify safe spacing around viewport edges.

## Chrome DevTools MCP Procedure

Use this order for a visual QA pass:

1. Open the target route.
2. Wait for the page to finish initial loading.
3. Capture a screenshot at the current viewport.
4. Read console errors and warnings.
5. Inspect failed or slow network requests that affect visible UI.
6. Check layout metrics with DOM inspection when a visual issue is suspected.
7. Repeat across the required viewport set.
8. If changes are made, rerun the affected viewport checks.

When using screenshots, compare visible pixels and layout relationships, not just DOM structure.

## Reporting

Return findings in priority order:

- `Blocker`: layout unusable or primary workflow broken.
- `High`: visible mismatch, overflow, inaccessible control, or broken responsive state.
- `Medium`: spacing, alignment, typography, or state issue that affects polish or scanability.
- `Low`: minor polish issue.

For each finding, include:

- Route and viewport.
- What is wrong.
- Expected behavior based on design or responsive rules.
- Relevant file/component to inspect when known.
- Screenshot note if captured.

If no issues are found, say which routes and viewports were checked and mention any untested assumptions.
