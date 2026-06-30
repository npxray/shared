import type { Report } from "@npxray/contracts";

// 1.91:1 `summary_large_image` dimensions.
export const OG_WIDTH = 1200;
export const OG_HEIGHT = 630;

export const colors = {
  bg: "#0B1120",
  accentSoft: "rgba(44, 70, 224, 0.22)",
  wordmark: "#8AA0FF",
  heading: "#EAF0FF",
  body: "#B7C2E0",
  muted: "#6E7CA3",
  finding: "#C3CDEA"
} as const;

export const fonts = {
  display: "Space Grotesk",
  mono: "JetBrains Mono"
} as const;

export function riskColor(level: Report["level"]): string {
  if (level === "low") return "#1E9E6A";
  if (level === "watch") return "#C5870E";
  if (level === "high") return "#E0611F";
  return "#D32B2B";
}
