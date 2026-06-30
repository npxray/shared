import type { Report } from "@npxray/contracts";
import { renderPng } from "./render.js";
import { type MarketingOgInput, marketingOgNode } from "./templates/marketing.js";
import { reportOgNode } from "./templates/report.js";

export type { OgNode } from "./h.js";
export { renderPng, renderSvg } from "./render.js";
export { type MarketingOgInput, marketingOgNode } from "./templates/marketing.js";
export { reportOgNode } from "./templates/report.js";
export { OG_HEIGHT, OG_WIDTH, riskColor } from "./tokens.js";

export function renderReportOgPng(report: Report): Promise<Uint8Array<ArrayBuffer>> {
  return renderPng(reportOgNode(report));
}

export function renderMarketingOgPng(input: MarketingOgInput): Promise<Uint8Array<ArrayBuffer>> {
  return renderPng(marketingOgNode(input));
}
