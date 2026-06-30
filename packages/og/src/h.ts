// Minimal element helper for Satori templates without JSX.

export type Style = Record<string, string | number>;

export interface OgNode {
  type: string;
  props: { children?: OgChild | OgChild[]; style?: Style } & Record<string, unknown>;
}

export type OgChild = OgNode | string | number | false | null | undefined;

interface Props {
  style?: Style;
  [key: string]: unknown;
}

export function h(type: string, props: Props | null, ...children: OgChild[]): OgNode {
  const flat = children.flat(Number.POSITIVE_INFINITY) as OgChild[];
  const kept = flat.filter((child) => child !== null && child !== undefined && child !== false);
  return { type, props: { ...(props ?? {}), children: kept.length === 1 ? kept[0] : kept } };
}
