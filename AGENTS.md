# Repository Guidelines

## Project Structure & Module Organization

This is the public shared Bun/TypeScript workspace for npxray. Workspace packages live under `packages/`:
`contracts` contains generated report contracts and schemas, `sdk` exposes the public client helper, and `og`
contains Open Graph rendering utilities and font assets.

## Build, Test, and Development Commands

- `bun install`: install workspace dependencies.
- `bun run generate:contracts`: regenerate tracked contract artifacts from the private engine repo when
  `NPXRAY_ENGINE_REPO` points at that checkout.
- `bun run build`: build all workspaces.
- `bun run fmt` / `bun run fmt:check`: apply or verify Biome formatting.
- `bun run lint`, `bun run typecheck`, `bun test`: run the standard quality gates.
- `bun run pack:dry-run`: preview npm package contents.

## Coding Style & Naming Conventions

TypeScript is ESM and formatted by Biome: 2-space indentation, 120-column line width, double quotes, semicolons,
and no trailing commas. Use PascalCase for exported classes/components, camelCase for functions and variables, and
descriptive package-local filenames. Do not hand-edit generated contract files in `packages/contracts/src/`; run
`bun run generate:contracts` against the private engine repo instead.

## Testing Guidelines

Keep tests close to the packages they cover, usually under `packages/*/test/`. Prefer deterministic fixtures and do
not execute untrusted package code. Before publishing, run typecheck, build, tests, and dry-run packing.

## Commit & Pull Request Guidelines

Keep commits focused and use short imperative subjects. PRs should describe the change, list verification commands,
link relevant issues, and call out generated contract updates or package publishing impacts.
