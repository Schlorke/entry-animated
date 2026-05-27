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
      logoHref="/"
      logoImageSrc="/img/Logo.png"
      logoAlt="Di Primio Advocacia"
      backgroundImageSrc="/img/law.jpg"
      navItems={[
        { label: "Início", href: "/#inicio" },
        { label: "Sobre", href: "/#sobre" },
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
  --header-height-collapsed: 96px;
  --header-color-surface: #050505;
  --header-logo-width-collapsed: 160px;
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
