// Tokens
import * as tokens from "./tokens/index";
// Components
import { type Components, components } from "./Components";

// Define Tokens type that represents design tokens
export type Tokens = {
  blur?: Partial<typeof tokens.blur>;
  breakpoints?: Partial<typeof tokens.breakpoints>;
  color?: Partial<typeof tokens.color>;
  duration?: Partial<typeof tokens.duration>;
  elevation?: Partial<typeof tokens.elevation>;
  fontFamily?: Partial<typeof tokens.fontFamily>;
  fontSize?: Partial<typeof tokens.fontSize>;
  fontWeight?: Partial<typeof tokens.fontWeight>;
  lineHeight?: Partial<typeof tokens.lineHeight>;
  radius?: Partial<typeof tokens.radius>;
  screens?: Partial<typeof tokens.screens>;
  shadow?: Partial<typeof tokens.shadow>;
  spacings?: Partial<typeof tokens.spacings>;
  timing?: Partial<typeof tokens.timing>;
  viewport?: Partial<typeof tokens.viewport>;
  components?: Components;
};

// Define the tokens object containing design tokens
export const defaultTokens: Tokens = {
  blur: tokens.blur,
  breakpoints: tokens.breakpoints,
  color: tokens.color,
  elevation: tokens.elevation,
  fontFamily: tokens.fontFamily,
  fontSize: tokens.fontSize,
  fontWeight: tokens.fontWeight,
  lineHeight: tokens.lineHeight,
  radius: tokens.radius,
  screens: tokens.screens,
  viewport: tokens.viewport,
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
    [components.Backdrop]: {
      blur: "sm",
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
    [components.Calendar]: {
      radius: "sm",
    },
    [components.Dialog]: {
      radius: "md",
      shadow: "2xl",
    },
    [components.Dropdown]: {
      radius: "md",
      shadow: "xl",
    },
    [components.Popover]: {
      radius: "md",
      shadow: "xl",
    },
    [components.Drawer]: {
      radius: "lg",
      shadow: "2xl",
    },
    [components.Group]: {
      radius: "sm",
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
    [components.Segmented]: {
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
