# Entry Animated Header

Reusable animated header component built with Next.js, React, TypeScript, CSS Modules, and local design tokens.

## Documentation

- [AI agent instructions](./AGENTS.md)
- [Documentation index](./docs/README.md)
- [Architecture overview](./docs/architecture.md)
- [Header API and tokens](./docs/header-reference.md)
- [Development workflow](./docs/development.md)

## Usage

```tsx
import { Header } from "@/index";

export default function Page() {
  return (
    <Header
      logoHref="/#inicio"
      logoImageSrc="/img/okgas-logo-abreviado.png"
      logoAlt="Ok Gás"
      backgroundImageSrc="/img/okgas-header-background.jpg"
      navItems={[
        { label: "Início", href: "/#inicio" },
        { label: "Soluções", href: "/#solucoes" },
        { label: "Sobre", href: "/#sobre" },
        { label: "Solicitar orçamento", href: "/#orcamento" },
        { label: "Contato", href: "/#contato" },
      ]}
    />
  );
}
```

## Public API

The stable public entry point is `src/index.ts`.

```ts
export { Header, HEADER_CSS_VARIABLES };
export type { HeaderCssVariable, HeaderNavItem, HeaderProps };
```

`HeaderProps` supports:

- `logoHref`
- `logoImageSrc`
- `logoAlt`
- `backgroundImageSrc`
- `backgroundAlt`
- `navItems`
- `scrollDelayMs`
- `className`
- `navigationAriaLabel`

## Styling

Header-specific tokens live inside `src/components/features/header/tokens`.
Consumers can override CSS variables through `className`:

```css
.customHeader {
  --header-color-brand: #0047ac;
  --header-color-accent: #ffcd00;
  --header-height-main-bar: 82px;
  --header-logo-width-collapsed: 132px;
  --header-logo-collapsed-scale: 1;
}
```

```tsx
<Header className={styles.customHeader} />
```

## Quality Commands

```sh
pnpm lint
pnpm format:check
pnpm typecheck
pnpm test
pnpm build
```
