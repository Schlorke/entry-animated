---
title: Development Workflow
status: accepted
date: 2026-05-27
author: Project maintainers
scope: Local setup, quality commands, and change process
updated: When scripts, tooling, or development workflow changes
---

# Development Workflow

## Setup

Use pnpm through the version declared in `package.json`:

```sh
pnpm install
```

Run the demo app:

```sh
pnpm dev
```

If port `3000` is occupied, run Next directly on another port:

```sh
pnpm exec next dev --hostname 127.0.0.1 --port 3001
```

## Quality Gates

Run these before handing work back:

```sh
pnpm format:check
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

If formatting fails, run:

```sh
pnpm format
```

## Refactoring Rules

- Preserve public exports from `src/index.ts`.
- Add or update tests before changing observable header behavior.
- Keep feature internals inside `src/components/features/header`.
- Do not introduce global design-system files unless the header is no longer the only reusable UI.
- Do not mix redesign work with architecture cleanup unless explicitly requested.

## Testing Strategy

- `Header.test.tsx` covers behavior: render, collapsed state, mobile menu, and body scroll lock.
- `src/index.test.ts` covers public entry-point exports.
- New behavior SHOULD be tested at the public component level first.

## Build Caution

Next writes generated files to `.next`. Avoid running `pnpm build` at the same time as a dev server that is actively writing to `.next`. If build fails with generated route artifacts, stop the dev server and rerun.
