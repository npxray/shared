import { treaty, type Treaty } from "@elysiajs/eden";

export * from "@npxray/contracts";

// biome-ignore lint/suspicious/noExplicitAny: Public SDK intentionally avoids importing the private API contract.
export type AnyNpxrayApiContract = any;
export type NpxrayClient = Treaty.Create<AnyNpxrayApiContract>;
export type CreateNpxrayClientOptions = Parameters<typeof treaty<AnyNpxrayApiContract>>[1];

export function trimTrailingSlash(value: string | URL): string {
  return String(value).replace(/\/+$/, "");
}

export function createNpxrayClient(baseUrl: string | URL, options?: CreateNpxrayClientOptions): NpxrayClient {
  return treaty<AnyNpxrayApiContract>(trimTrailingSlash(baseUrl), options);
}
