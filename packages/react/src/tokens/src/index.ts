import { color } from "./Color";
import { fontFamily } from "./FontFamily";
import { fontSize } from "./FontSize";
import { fontWeight } from "./FontWeight";
import { lineHeight } from "./LineHeight";
import { radius } from "./Radius";
import { spacings } from "./Spacings";
import { screens } from "./Screens";

export type Color = keyof typeof color;
export type FontFamily = keyof typeof fontFamily;
export type FontSize = keyof typeof fontSize;
export type FontWeight = keyof typeof fontWeight;
export type LineHeight = keyof typeof lineHeight;
export type Radius = keyof typeof radius;
export type Spacings = keyof typeof spacings;
export type Screens = keyof typeof spacings;

export type Components = {
  "alert"?: { radius?: Radius };
  "avatar"?: { radius?: Radius };
  "badge"?: { radius?: Radius };
  "button"?: { radius?: Radius };
  "card"?: { radius?: Radius };
  "checkbox"?: { radius?: Radius };
  "dialog"?: { radius?: Radius };
  "list-box"?: { radius?: Radius };
  "switch"?: { radius?: Radius };
  "tabs"?: { radius?: Radius };
  "tag"?: { radius?: Radius };
  "text-area"?: { radius?: Radius };
  "text-field"?: { radius?: Radius };
  "toggle"?: { radius?: Radius };
};

export type Tokens = {
  color?: Partial<typeof color>;
  fontFamily?: Partial<typeof fontFamily>;
  fontSize?: Partial<typeof fontSize>;
  fontWeight?: Partial<typeof fontWeight>;
  lineHeight?: Partial<typeof lineHeight>;
  radius?: Partial<typeof radius>;
  spacings?: Partial<typeof spacings>;
  screens?: Partial<typeof screens>;
  components?: Components;
};

export const tokens: Tokens = {
  color,
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  radius,
  spacings,
  screens,
  components: {
    "alert": {
      radius: "md",
    },
    "avatar": {
      radius: "sm",
    },
    "badge": {
      radius: "full",
    },
    "button": {
      radius: "sm",
    },
    "card": {
      radius: "md",
    },
    "dialog": {
      radius: "md",
    },
    "list-box": {
      radius: "sm",
    },
    "switch": {
      radius: "full",
    },
    "tabs": {
      radius: "md",
    },
    "tag": {
      radius: "sm",
    },
    "text-area": {
      radius: "sm",
    },
    "text-field": {
      radius: "sm",
    },
    "toggle": {
      radius: "full",
    },
  },
};
