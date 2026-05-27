---
title: ADR 0001 - Header As Reusable Feature
status: accepted
date: 2026-05-27
author: Project maintainers
scope: Header architecture and public API boundary
updated: When the header packaging strategy changes
---

# ADR 0001: Header As Reusable Feature

## Context

The repository currently exists to build and maintain an animated header that may be reused in other projects. The code needs to be understandable by human developers and AI agents, while staying small enough to avoid unnecessary framework around a single component.

## Decision

The header is implemented as a feature-local module under `src/components/features/header`, with a narrow public API exported through `src/index.ts`.

The feature owns its own:

- components
- hooks
- constants
- TypeScript types
- CSS module
- CSS variable tokens
- tests

The project does not introduce a global design system yet. Header-specific tokens stay inside the header feature and are exposed as CSS variables for consumer overrides.

## Consequences

Positive:

- The header can be moved or copied to another project with clear dependencies.
- Internal files can evolve without expanding the public API.
- Tokens are explicit and overrideable without requiring a full design-system package.
- Tests protect the current behavior during refactors.

Tradeoffs:

- Consumers must provide compatible assets, such as logo and background images.
- Storybook is not available yet for visual browsing.
- If more reusable UI components are added later, the project may need a shared `components/ui` layer and a broader token strategy.
