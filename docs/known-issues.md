---
title: Known Issues
status: accepted
date: 2026-05-27
author: Project maintainers
scope: Current limitations and cautions for maintainers and agents
updated: Whenever a known issue is added, fixed, or reclassified
---

# Known Issues

## Issue: Build And Dev Server Can Conflict On `.next`

Description: `pnpm build` and `pnpm dev` both write generated files under `.next`.

Impact: In this local environment, running build while a dev server is active can produce generated route artifact errors.

Workaround: Stop the dev server before running `pnpm build`. If needed, remove the ignored `.next` directory and rerun the build.

Status: Active.

## Issue: No Storybook Yet

Description: The header has tests and documentation, but no Storybook stories.

Impact: Visual variants are documented in Markdown rather than browsable component stories.

Workaround: Use the Next demo page and tests for now.

Status: Accepted limitation until more visual variants exist.
