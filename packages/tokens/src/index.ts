// Tokens
import * as tokens from "./tokens/index";
// Components
import { type Components, components } from "./Components";

// Define Tokens type that represents design tokens
export type Tokens = {
  color?: Partial<typeof tokens.color>;
  elevation?: Partial<typeof tokens.elevation>;
  fontFamily?: Partial<typeof tokens.fontFamily>;
  fontSize?: Partial<typeof tokens.fontSize>;
  fontWeight?: Partial<typeof tokens.fontWeight>;
  lineHeight?: Partial<typeof tokens.lineHeight>;
  radius?: Partial<typeof tokens.radius>;
  screens?: Partial<typeof tokens.screens>;
  spacings?: Partial<typeof tokens.spacings>;
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
export * from "./tokens/index";
