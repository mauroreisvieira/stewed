import { color } from "./Color";
import { fontSize } from "./FontSize";
import { fontWeight } from "./FontWeight";
import { lineHeight } from "./LineHeight";
import { radius } from "./Radius";
import { spacings } from "./Spacings";
import { screens } from "./Screens";

export type Color = keyof typeof color;
export type FontWeight = keyof typeof fontWeight;
export type FontSize = keyof typeof fontSize;
export type LineHeight = keyof typeof lineHeight;
export type Radius = keyof typeof radius;
export type Spacings = keyof typeof spacings;
export type Screens = keyof typeof spacings;

export type Components =
  | "alert"
  | "avatar"
  | "badge"
  | "button"
  | "card"
  | "checkbox"
  | "dialog"
  | "list-box"
  | "switch"
  | "tabs"
  | "tag"
  | "text-area"
  | "text-field"
  | "toggle";

export type Tokens = {
  color?: Partial<typeof color>;
  fontSize?: Partial<typeof fontSize>;
  fontWeight?: Partial<typeof fontWeight>;
  lineHeight?: Partial<typeof lineHeight>;
  radius?: Partial<typeof radius>;
  spacings?: Partial<typeof spacings>;
  screens?: Partial<typeof screens>;
  components?: Partial<
    Record<
      Components,
      {
        radius?: Radius;
      }
    >
  >;
};

export const tokens: Tokens = {
  color,
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
