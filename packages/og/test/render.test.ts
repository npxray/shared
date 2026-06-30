import { describe, expect, it } from "bun:test";
import type { Report } from "@npxray/contracts";
import { OG_HEIGHT, OG_WIDTH, renderMarketingOgPng, renderReportOgPng, riskColor } from "../src/index";

const PNG_MAGIC = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

function isPng(bytes: Uint8Array): boolean {
  return Buffer.from(bytes.subarray(0, 8)).equals(PNG_MAGIC);
}

// PNG IHDR stores width/height as big-endian uint32 at byte offsets 16 and 20.
function pngSize(bytes: Uint8Array): { width: number; height: number } {
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  return { width: view.getUint32(16), height: view.getUint32(20) };
}

const report = {
  request: { normalizedSpec: "left-pad@1.3.0" },
  recommendation: "Looks safe to run — no notable risk signals.",
  score: 12,
  level: "low",
  findings: [{ title: "No install scripts or network access detected" }]
} as unknown as Report;

describe("og rendering", () => {
  it("renders a marketing card as a 1200x630 PNG", async () => {
    const png = await renderMarketingOgPng({
      eyebrow: "Pricing",
      title: "Free package risk scans",
      subtitle: "Team enforcement when you need it."
    });
    expect(isPng(png)).toBe(true);
    expect(pngSize(png)).toEqual({ width: OG_WIDTH, height: OG_HEIGHT });
  });

  it("renders a report card as a 1200x630 PNG", async () => {
    const png = await renderReportOgPng(report);
    expect(isPng(png)).toBe(true);
    expect(pngSize(png)).toEqual({ width: OG_WIDTH, height: OG_HEIGHT });
  });

  it("renders without an eyebrow or subtitle", async () => {
    const png = await renderMarketingOgPng({ title: "Just a title" });
    expect(isPng(png)).toBe(true);
  });

  it("maps each risk level to a distinct color", () => {
    const levels = ["low", "watch", "high", "critical"] as const;
    const seen = new Set(levels.map((level) => riskColor(level)));
    expect(seen.size).toBe(levels.length);
  });
});
