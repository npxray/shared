import { h, type OgChild, type OgNode } from "../h.js";
import { colors, fonts, OG_HEIGHT, OG_WIDTH } from "../tokens.js";

export function ogFrame(children: OgChild[]): OgNode {
  return h(
    "div",
    {
      style: {
        position: "relative",
        display: "flex",
        width: `${OG_WIDTH}px`,
        height: `${OG_HEIGHT}px`,
        backgroundColor: colors.bg,
        fontFamily: fonts.display,
        overflow: "hidden"
      }
    },
    accentBloom(),
    h(
      "div",
      {
        style: {
          position: "relative",
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          padding: "72px 80px"
        }
      },
      ...children
    )
  );
}

function accentBloom(): OgNode {
  return h("div", {
    style: {
      position: "absolute",
      top: "-240px",
      right: "-140px",
      width: "720px",
      height: "720px",
      borderRadius: "9999px",
      backgroundColor: colors.accentSoft,
      display: "flex"
    }
  });
}

export function wordmark(): OgNode {
  return h(
    "div",
    {
      style: {
        display: "flex",
        fontFamily: fonts.mono,
        fontWeight: 700,
        fontSize: "30px",
        color: colors.wordmark,
        letterSpacing: "0.04em"
      }
    },
    "npxray"
  );
}
