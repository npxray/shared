import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { initWasm, Resvg } from "@resvg/resvg-wasm";
import satori from "satori";
import { loadFonts } from "./fonts.js";
import type { OgNode } from "./h.js";
import { OG_HEIGHT, OG_WIDTH } from "./tokens.js";

let wasmReady: Promise<void> | undefined;

function ensureWasm(): Promise<void> {
  if (!wasmReady) {
    const require = createRequire(import.meta.url);
    const wasmPath = require.resolve("@resvg/resvg-wasm/index_bg.wasm");
    wasmReady = readFile(wasmPath).then((bytes) => initWasm(bytes));
  }
  return wasmReady;
}

// Avoid a React type dependency in the template helpers.
type SatoriElement = Parameters<typeof satori>[0];

export async function renderSvg(node: OgNode, width = OG_WIDTH, height = OG_HEIGHT): Promise<string> {
  const fonts = await loadFonts();
  return satori(node as unknown as SatoriElement, { width, height, fonts });
}

export async function renderPng(node: OgNode, width = OG_WIDTH, height = OG_HEIGHT): Promise<Uint8Array<ArrayBuffer>> {
  const svg = await renderSvg(node, width, height);
  await ensureWasm();
  const resvg = new Resvg(svg, {
    fitTo: { mode: "width", value: width },
    font: { loadSystemFonts: false }
  });
  // Return a plain ArrayBuffer-backed view for BodyInit callers.
  return new Uint8Array(resvg.render().asPng());
}
