import type { Report } from "@npxray/contracts";
import { h, type OgNode } from "../h.js";
import { colors, fonts, riskColor } from "../tokens.js";
import { ogFrame, wordmark } from "./base.js";

export function reportOgNode(report: Report): OgNode {
  const color = riskColor(report.level);
  const spec = report.request.normalizedSpec;
  const topFinding = report.findings[0]?.title ?? "No notable signals found";

  return ogFrame([
    wordmark(),
    h(
      "div",
      {
        style: {
          display: "flex",
          fontFamily: fonts.display,
          fontWeight: 700,
          fontSize: "66px",
          lineHeight: 1.05,
          color: colors.heading,
          marginTop: "52px",
          maxWidth: "1040px"
        }
      },
      spec
    ),
    h(
      "div",
      {
        style: {
          display: "flex",
          fontSize: "34px",
          lineHeight: 1.25,
          color: colors.body,
          marginTop: "20px",
          maxWidth: "980px"
        }
      },
      report.recommendation
    ),
    h(
      "div",
      { style: { display: "flex", flexDirection: "column", marginTop: "auto" } },
      h(
        "div",
        { style: { display: "flex", alignItems: "flex-end" } },
        h(
          "div",
          {
            style: {
              display: "flex",
              fontFamily: fonts.display,
              fontWeight: 700,
              fontSize: "116px",
              lineHeight: 1,
              color
            }
          },
          String(report.score)
        ),
        h(
          "div",
          {
            style: {
              display: "flex",
              fontFamily: fonts.mono,
              fontWeight: 700,
              fontSize: "34px",
              color: colors.muted,
              marginLeft: "20px",
              marginBottom: "16px"
            }
          },
          `/100 ${report.level.toUpperCase()}`
        )
      ),
      h(
        "div",
        { style: { display: "flex", alignItems: "center", marginTop: "26px" } },
        h("div", {
          style: {
            display: "flex",
            width: "16px",
            height: "16px",
            borderRadius: "9999px",
            backgroundColor: color,
            marginRight: "16px"
          }
        }),
        h(
          "div",
          { style: { display: "flex", fontSize: "30px", color: colors.finding, maxWidth: "1000px" } },
          topFinding
        )
      )
    )
  ]);
}
