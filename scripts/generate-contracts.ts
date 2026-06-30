import { existsSync } from "node:fs";
import { join, resolve } from "node:path";
import { $ } from "bun";

const engineRepo = process.env.NPXRAY_ENGINE_REPO?.trim();

if (!engineRepo) {
  console.error("NPXRAY_ENGINE_REPO is required to regenerate public contracts from the private engine repo.");
  console.error("Example: NPXRAY_ENGINE_REPO=/path/to/npx-ray bun run generate:contracts");
  process.exit(1);
}

const resolvedEngineRepo = resolve(engineRepo);
const generatorDir = join(resolvedEngineRepo, "cmd", "npxray-schema");

if (!existsSync(generatorDir)) {
  console.error(`Could not find schema generator at ${generatorDir}`);
  process.exit(1);
}

const sharedRepo = process.cwd();

await $`go run ./cmd/npxray-schema \
  --schema ${join(sharedRepo, "packages/contracts/src/report.schema.json")} \
  --types ${join(sharedRepo, "packages/contracts/src/generated.ts")} \
  --signal-catalog ${join(sharedRepo, "packages/contracts/src/signal-catalog.generated.ts")} \
  --signal-catalog-json ${join(sharedRepo, "packages/contracts/src/signal-catalog.json")}`.cwd(resolvedEngineRepo);
