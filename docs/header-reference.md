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
  /**
   * @deprecated The default OK Gás brand now renders as an inline SVG.
   * This prop is kept for source compatibility with earlier consumers.
   */
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

- `logoHref`: `/#inicio`
- `logoImageSrc`: deprecated compatibility prop; the default brand renders the inline `OkGasLogoSvg`
- `logoAlt`: `OK Gás Engenharia`
- `backgroundImageSrc`: empty string; renders the built-in decorative square-wave canvas background. Passing a URL replaces it with a decorative image asset.
- `backgroundAlt`: empty string, treating the background as decorative
- `scrollDelayMs`: `6000`
- `navigationAriaLabel`: `Navegação principal`

Default navigation items point to real hash sections such as `/#inicio`, `/#solucoes`, and `/#orcamento`; do not use `href="#"` for reusable defaults.

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
      logoAlt="OK Gás Engenharia"
      navItems={navItems}
      scrollDelayMs={6000}
    />
  );
}
```

## Token Overrides

Consumers can override supported CSS variables through `className`:

```css
.customHeader {
  --header-color-brand: #0047ac;
  --header-color-accent: #ffcd00;
  --header-height-main-bar: 82px;
  --header-logo-width-collapsed: 85px;
  --header-logo-width-collapsed-mobile: 77px;
  --header-logo-height-collapsed: 2.75rem;
  --header-logo-height-collapsed-mobile: 2.5rem;
  --header-logo-collapsed-scale: 1;
}
```

```tsx
<Header className={styles.customHeader} />
```

Use `HEADER_CSS_VARIABLES` when code needs a typed map of supported variable names.

## Accessibility Contract

- The logo MUST have meaningful `logoAlt` text.
- The default brand is an inline SVG with a real masked shine layer, not a PNG or base64 image.
- The default square-wave canvas background is decorative and hidden from assistive technology.
- Image backgrounds SHOULD use `backgroundAlt=""` when decorative.
- Navigation MUST expose an accessible label through `navigationAriaLabel`.
- The mobile menu button controls the navigation through `aria-controls` and exposes state through `aria-expanded`.
