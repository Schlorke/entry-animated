---
title: Architecture Overview
status: accepted
date: 2026-05-27
author: Project maintainers
scope: Component architecture and runtime behavior
updated: When feature boundaries or animation behavior change
---

# Architecture Overview

Entry Animated is intentionally small. Its architecture is optimized for making the animated header portable to other Next.js projects without dragging along unrelated application code.

## System Shape

```text
Next.js app shell
└── Home page demo
    └── Header feature
        ├── Composition component
        ├── Internal presentational components
        ├── Feature hooks
        ├── Feature constants
        ├── Feature types
        ├── Feature CSS tokens
        └── Feature CSS module
```

The `app/` folder exists mainly to render and validate the component locally. The reusable surface is the header export, not the landing page as a product.

## Header Feature Boundary

The header feature lives in `src/components/features/header`.

```text
header/
├── components/   Header composition and internal parts
├── constants/    Defaults and stable DOM IDs
├── hooks/        Scroll-delay and mobile-menu behavior
├── styles/       CSS module for layout, animation, and responsive states
├── tokens/       Header-scoped CSS variables and exported variable names
├── types/        Public TypeScript contracts
└── index.ts      Feature-level public API
```

Only `Header`, `HeaderProps`, `HeaderNavItem`, `HEADER_CSS_VARIABLES`, and `HeaderCssVariable` should be exported outside the feature.

## Animation Behavior

The header has two states:

- `expanded`: full viewport intro, background image visible, brand centered in the viewport.
- `collapsed`: fixed top bar, background faded out, brand positioned at the top-left, navigation visible, mobile menu button enabled on small screens.

The brand animation depends on a stable layout model:

- The brand anchor MUST remain `position: absolute` in both states.
- The intro center uses `top: 50%`, `left: 50%`, and `transform: translate(-50%, -50%)`.
- The collapsed state uses `top: 0`, `left: var(--header-brand-collapsed-inline-start)`, and `transform: none`.

Do not switch the brand to `position: relative` during the transition. That causes a non-animated layout jump.

## Data Flow

```text
HeaderProps
  ↓
Header.tsx applies defaults and composes children
  ↓
useHeaderScroll(scrollDelayMs) controls expanded/collapsed state
  ↓
useMobileMenu(scrolled) controls mobile menu state and body scroll lock
  ↓
HeaderBackground, HeaderBrand, HeaderMenuButton, HeaderNavigation render UI
```

## Styling Model

Header styling uses CSS Modules plus CSS variables:

- Primitive tokens: raw colors, spacing, sizes, and transitions.
- Semantic tokens: surface, text, focus, and transition roles.
- Component tokens: header height, logo widths, menu bar dimensions, and navigation offsets.

Consumers can override supported variables by passing `className` to `Header`.
