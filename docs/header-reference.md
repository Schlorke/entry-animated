---
title: Header Reference
status: accepted
date: 2026-05-27
author: Project maintainers
scope: Public API, props, tokens, and examples for the Header component
updated: When Header props, exports, or tokens change
---

# Header Reference

## Public Entry Point

Use the root entry point for reusable consumption:

```ts
import { Header, HEADER_CSS_VARIABLES } from "@/index";
import type { HeaderNavItem, HeaderProps } from "@/index";
```

The root public API exports:

```ts
export { Header, HEADER_CSS_VARIABLES };
export type { HeaderCssVariable, HeaderNavItem, HeaderProps };
```

## Props

```ts
export type HeaderNavItem = {
  label: string;
  href: string;
};

export type HeaderProps = {
  logoHref?: string;
  logoImageSrc?: string;
  logoAlt?: string;
  backgroundImageSrc?: string;
  backgroundAlt?: string;
  navItems?: readonly HeaderNavItem[];
  scrollDelayMs?: number;
  className?: string;
  navigationAriaLabel?: string;
};
```

## Defaults

- `logoHref`: `/`
- `logoImageSrc`: `/img/Logo.png`
- `logoAlt`: `Logo`
- `backgroundImageSrc`: `/img/law.jpg`
- `backgroundAlt`: empty string, treating the background as decorative
- `scrollDelayMs`: `1500`
- `navigationAriaLabel`: `Navegação principal`

Default navigation items point to real hash sections such as `/#inicio`; do not use `href="#"` for reusable defaults.

## Basic Usage

```tsx
import { Header } from "@/index";

const navItems = [
  { label: "Início", href: "/#inicio" },
  { label: "Sobre", href: "/#sobre" },
  { label: "Contato", href: "/#contato" },
] as const;

export default function Page() {
  return (
    <Header
      logoAlt="Di Primio Advocacia"
      navItems={navItems}
      scrollDelayMs={1500}
    />
  );
}
```

## Token Overrides

Consumers can override supported CSS variables through `className`:

```css
.customHeader {
  --header-height-collapsed: 96px;
  --header-color-surface: #050505;
  --header-logo-width-collapsed: 160px;
}
```

```tsx
<Header className={styles.customHeader} />
```

Use `HEADER_CSS_VARIABLES` when code needs a typed map of supported variable names.

## Accessibility Contract

- The logo MUST have meaningful `logoAlt` text.
- The background SHOULD use `backgroundAlt=""` when decorative.
- Navigation MUST expose an accessible label through `navigationAriaLabel`.
- The mobile menu button controls the navigation through `aria-controls` and exposes state through `aria-expanded`.
