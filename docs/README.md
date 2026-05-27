---
title: Documentation Index
status: accepted
date: 2026-05-27
author: Project maintainers
scope: Documentation map for the Entry Animated Header repository
updated: Whenever documentation structure changes
---

# Documentation Index

This folder documents the project as a reusable animated header component. Keep documentation close to code and update it in the same change whenever behavior, public API, tokens, or architecture changes.

## Start Here

- [Architecture](./architecture.md): how the project is organized and how the header works.
- [Header Reference](./header-reference.md): props, public exports, CSS variables, and usage examples.
- [Development](./development.md): commands, quality gates, and change workflow.
- [Known Issues](./known-issues.md): current limitations and cautions.
- [ADRs](./adr/): accepted architecture decisions.

## Documentation Rules

- `AGENTS.md` is the entry point for AI agents.
- `README.md` is the short human-facing entry point.
- `docs/` contains deeper explanations and references.
- Architecture decisions with long-term impact SHOULD be recorded in `docs/adr/`.
- Documentation MUST be updated when the public API, animation contract, token names, or project workflow changes.
