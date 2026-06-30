import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

export interface LoadedFont {
  name: string;
  data: Buffer;
  weight: 400 | 500 | 700;
  style: "normal";
}

interface FontSpec {
  file: string;
  name: string;
  weight: 400 | 500 | 700;
}

const FONT_SPECS: FontSpec[] = [
  { file: "SpaceGrotesk-Regular.ttf", name: "Space Grotesk", weight: 400 },
  { file: "SpaceGrotesk-Medium.ttf", name: "Space Grotesk", weight: 500 },
  { file: "SpaceGrotesk-Bold.ttf", name: "Space Grotesk", weight: 700 },
  { file: "JetBrainsMono-Bold.ttf", name: "JetBrains Mono", weight: 700 }
];

// `../fonts` resolves from both src/ and dist/.
const fontsDir = new URL("../fonts/", import.meta.url);

let cached: Promise<LoadedFont[]> | undefined;

export function loadFonts(): Promise<LoadedFont[]> {
  if (!cached) {
    cached = Promise.all(
      FONT_SPECS.map(async (spec) => ({
        name: spec.name,
        weight: spec.weight,
        style: "normal" as const,
        data: await readFile(fileURLToPath(new URL(spec.file, fontsDir)))
      }))
    );
  }
  return cached;
}
