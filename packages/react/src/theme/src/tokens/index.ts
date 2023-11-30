import { type FontWeight, defaultFontWeight } from "./FontWeight";
import { type Radius, defaultRadius } from "./Radius";

export type Tokens = {
  fontWeight?: Partial<FontWeight>;
  radius?: Partial<Radius>;
};

export const defaultTokens: Tokens = {
  fontWeight: defaultFontWeight,
  radius: defaultRadius,
};
