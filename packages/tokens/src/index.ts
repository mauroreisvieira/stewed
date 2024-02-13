// Tokens
import * as tokens from "./tokens/index";
import type {
  Color,
  Elevation,
  FontFamily,
  FontSize,
  FontWeight,
  LineHeight,
  Radius,
  Screens,
  Spacings,
} from "./tokens/index";
// Components
import { type Components, components } from "./Components";

// Define Tokens type that represents design tokens
export type Tokens = {
  color?: Partial<{ [K in Color]: string }>;
  elevation?: Partial<{ [K in Elevation]: string }>;
  fontFamily?: Partial<{ [K in FontFamily]: string }>;
  fontSize?: Partial<{ [K in FontSize]?: string }>;
  fontWeight?: Partial<{ [K in FontWeight]: string }>;
  lineHeight?: Partial<{ [K in LineHeight]: string }>;
  radius?: Partial<{ [K in Radius]: string }>;
  screens?: Partial<{ [K in Screens]: string }>;
  spacings?: Partial<{ [K in Spacings]: string }>;
  components?: Components;
};

// Define the tokens object containing design tokens
export const defaultTokens: Tokens = {
  color: tokens.color,
  elevation: tokens.elevation,
  fontFamily: tokens.fontFamily,
  fontSize: tokens.fontSize,
  fontWeight: tokens.fontWeight,
  lineHeight: tokens.lineHeight,
  radius: tokens.radius,
  screens: tokens.screens,
  spacings: tokens.spacings,
  // Define specific tokens for different components
  components: {
    [components.Alert]: {
      radius: "md",
      elevation: "xl",
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
      elevation: "3xl",
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
      radius: "sm",
    },
  },
};

// Export components and Components type
export { components, type Components };
// Export tokens
export type {
  Color,
  Elevation,
  FontFamily,
  FontSize,
  FontWeight,
  LineHeight,
  Radius,
  Screens,
  Spacings,
};
