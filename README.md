# npxray shared packages

Public TypeScript packages shared across npxray clients and services.

## Packages

- `@npxray/contracts`: generated report contracts, report JSON Schema, and signal catalog exports.
- `@npxray/sdk`: browser/server client helper for the public npxray API plus re-exported report contracts.
- `@npxray/og`: Satori/resvg Open Graph image rendering helpers.

## Development

```bash
bun install
bun run typecheck
bun run build
bun test
```

The generated files in `packages/contracts/src/` are committed. Their source of truth is the private npxray engine
repository. To regenerate them from a local checkout of that private repository, set `NPXRAY_ENGINE_REPO`:

```bash
NPXRAY_ENGINE_REPO=/path/to/npx-ray bun run generate:contracts
```

Without `NPXRAY_ENGINE_REPO`, contract generation exits with an explanatory error.

## License

Apache-2.0.
