import { h, type OgNode } from "../h.js";
import { colors, fonts } from "../tokens.js";
import { ogFrame, wordmark } from "./base.js";

export interface MarketingOgInput {
  /** Small uppercase kicker above the title, e.g. "PRICING" or "DOCS". */
  eyebrow?: string;
  title: string;
  subtitle?: string;
}

export function marketingOgNode({ eyebrow, title, subtitle }: MarketingOgInput): OgNode {
  return ogFrame([
    wordmark(),
    h(
      "div",
      {
        style: { display: "flex", flexDirection: "column", flexGrow: 1, justifyContent: "center" }
      },
      eyebrow
        ? h(
            "div",
            {
              style: {
                display: "flex",
                fontFamily: fonts.mono,
                fontWeight: 700,
                fontSize: "24px",
                letterSpacing: "0.18em",
                color: colors.wordmark,
                marginBottom: "22px"
              }
            },
            eyebrow.toUpperCase()
          )
        : null,
      h(
        "div",
        {
          style: {
            display: "flex",
            fontFamily: fonts.display,
            fontWeight: 700,
            fontSize: "76px",
            lineHeight: 1.04,
            color: colors.heading,
            maxWidth: "1000px"
          }
        },
        title
      ),
      subtitle
        ? h(
            "div",
            {
              style: {
                display: "flex",
                fontSize: "32px",
                lineHeight: 1.3,
                color: colors.body,
                marginTop: "24px",
                maxWidth: "900px"
              }
            },
            subtitle
          )
        : null
    ),
    h(
      "div",
      {
        style: {
          display: "flex",
          fontFamily: fonts.mono,
          fontSize: "24px",
          color: colors.muted,
          letterSpacing: "0.02em"
        }
      },
      "npxray.dev — inspect npm & npx package risk before you run it"
    )
  ]);
}
