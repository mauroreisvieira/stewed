import { type Color, color } from "./Color";
import { type FontSize, fontSize } from "./FontSize";
import { type FontWeight, fontWeight } from "./FontWeight";
import { type LineHeight, lineHeight } from "./LineHeight";
import { type Radius, radius } from "./Radius";
import { type Spacings, spacings } from "./Spacings";

export type Tokens = {
  color?: Partial<Color>;
  fontSize?: Partial<FontSize>;
  fontWeight?: Partial<FontWeight>;
  lineHeight?: Partial<LineHeight>;
  radius?: Partial<Radius>;
  spacings?: Partial<Spacings>;
};

export const tokens: Tokens = {
  color,
  fontSize,
  fontWeight,
  lineHeight,
  radius,
  spacings,
};

