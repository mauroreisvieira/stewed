import { color } from "./Color";
import { components } from "./Components";
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
  [components.Alert]?: { radius?: Radius };
  [components.Avatar]?: { radius?: Radius };
  [components.Badge]?: { radius?: Radius };
  [components.Button]?: { radius?: Radius };
  [components.Card]?: { radius?: Radius };
  [components.Checkbox]?: { radius?: Radius };
  [components.Dialog]?: { radius?: Radius };
  [components.ListBox]?: { radius?: Radius };
  [components.Select]?: { radius?: Radius };
  [components.Switch]?: { radius?: Radius };
  [components.Tabs]?: { radius?: Radius };
  [components.Tag]?: { radius?: Radius };
  [components.TextArea]?: { radius?: Radius };
  [components.TextField]?: { radius?: Radius };
  [components.Toggle]?: { radius?: Radius };
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
    [components.Alert]: {
      radius: "md",
    },
    [components.Avatar]: {
      radius: "sm",
    },
    [components.Badge]: {
      radius: "full",
    },
    [components.Button]: {
      radius: "sm",
    },
    [components.Card]: {
      radius: "md",
    },
    [components.Checkbox]: {
      radius: "sm",
    },
    [components.Dialog]: {
      radius: "md",
    },
    [components.ListBox]: {
      radius: "sm",
    },
    [components.Select]: {
      radius: "sm",
    },
    [components.Switch]: {
      radius: "full",
    },
    [components.Tabs]: {
      radius: "md",
    },
    [components.Tag]: {
      radius: "sm",
    },
    [components.TextArea]: {
      radius: "sm",
    },
    [components.TextField]: {
      radius: "sm",
    },
    [components.Toggle]: {
      radius: "full",
    },
  },
};

export { components };
