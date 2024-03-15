// Tokens
import * as tokens from "./tokens/index";
// Components
import { type Components, components } from "./Components";

// Define Tokens type that represents design tokens
export type Tokens = {
  breakpoints?: Partial<typeof tokens.breakpoints>;
  color?: Partial<typeof tokens.color>;
  elevation?: Partial<typeof tokens.elevation>;
  fontFamily?: Partial<typeof tokens.fontFamily>;
  fontSize?: Partial<typeof tokens.fontSize>;
  fontWeight?: Partial<typeof tokens.fontWeight>;
  lineHeight?: Partial<typeof tokens.lineHeight>;
  radius?: Partial<typeof tokens.radius>;
  screens?: Partial<typeof tokens.screens>;
  shadow?: Partial<typeof tokens.shadow>;
  spacings?: Partial<typeof tokens.spacings>;
  duration?: Partial<typeof tokens.duration>;
  timing?: Partial<typeof tokens.timing>;
  components?: Components;
};

// Define the tokens object containing design tokens
export const defaultTokens: Tokens = {
  breakpoints: tokens.breakpoints,
  color: tokens.color,
  elevation: tokens.elevation,
  fontFamily: tokens.fontFamily,
  fontSize: tokens.fontSize,
  fontWeight: tokens.fontWeight,
  lineHeight: tokens.lineHeight,
  radius: tokens.radius,
  screens: tokens.screens,
  shadow: tokens.shadow,
  spacings: tokens.spacings,
  duration: tokens.duration,
  timing: tokens.timing,
  // Define specific tokens for different components
  components: {
    [components.Alert]: {
      radius: "md",
      shadow: "xl",
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
      shadow: "3xl",
    },
    [components.ListBox]: {
      radius: "sm",
    },
    [components.Quantity]: {
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
export * from "./tokens/index";
