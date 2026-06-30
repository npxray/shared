import { describe, expect, it } from "bun:test";
import { createNpxrayClient, trimTrailingSlash } from "../src/index";

describe("createNpxrayClient", () => {
  it("normalizes trailing slashes", () => {
    expect(trimTrailingSlash("https://api.npxray.dev///")).toBe("https://api.npxray.dev");
  });

  it("creates a treaty client", () => {
    const client = createNpxrayClient("https://api.npxray.dev/");
    expect(client).toBeDefined();
  });
});
