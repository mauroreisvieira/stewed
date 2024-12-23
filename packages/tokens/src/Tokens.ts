// Tokens
import { blur } from "./tokens/Blur";
import { breakpoints } from "./tokens/Breakpoints";
import { color, skin, type Color, type Skin } from "./tokens/Color";
import { components, type Components } from "./Components";
import { duration, timing } from "./tokens/Transition";
import { elevation } from "./tokens/Elevation";
import { fontFamily } from "./tokens/FontFamily";
import { fontSize } from "./tokens/FontSize";
import { fontWeight } from "./tokens/FontWeight";
import { lineHeight } from "./tokens/LineHeight";
import { palette, type Palette } from "./tokens/Palette";
import { radius } from "./tokens/Radius";
import { screens } from "./tokens/Screens";
import { shadow } from "./tokens/Shadow";
import { spacings } from "./tokens/Spacings";
import { viewport } from "./tokens/Viewport";

/**
 * LooseAutoComplete is a utility type that allows either a specific set of
 * string values (`T`), or any other string value except those in `T`.
 *
 * @template T - A specific set of string values that are allowed in addition
 * to any other string.
 */
type LooseAutoComplete<T extends string> = T | Omit<string, T>;

/**
 * Colors type extends `Partial<typeof palette>`, which allows partial updates
 * to the `palette` object. Additionally, it allows dynamically adding keys
 * that come from either `Skin` or `Color` types.
 *
 * Each key can optionally map to a `LooseAutoComplete<Palette>`, meaning it
 * can accept specific values from the `Palette` type or other strings not
 * already part of the `Palette`.
 */
type Colors = Partial<typeof palette> & {
  [key in Skin | Color]?: LooseAutoComplete<Palette>;
};

/** Define Tokens type that represents design tokens */
export type Tokens = {
  /** Optional overrides for the `blur` property. */
  blur?: Partial<typeof blur>;
  /** Optional overrides for the `breakpoints` property. */
  breakpoints?: Partial<typeof breakpoints>;
  /** Optional color customizations. */
  color?: Colors;
  /** Optional overrides for the `duration` property. */
  duration?: Partial<typeof duration>;
  /** Optional overrides for the `elevation` property. */
  elevation?: Partial<typeof elevation>;
  /** Optional font family customizations. */
  fontFamily?: Partial<typeof fontFamily>;
  /** Optional font size customizations. */
  fontSize?: Partial<typeof fontSize>;
  /** Optional font weight customizations. */
  fontWeight?: Partial<typeof fontWeight>;
  /** Optional line height customizations. */
  lineHeight?: Partial<typeof lineHeight>;
  /** Optional border radius customizations. */
  radius?: Partial<typeof radius>;
  /** Optional screen size customizations. */
  screens?: Partial<typeof screens>;
  /** Optional shadow customizations. */
  shadow?: Partial<typeof shadow>;
  /** Optional spacing customizations. */
  spacings?: Partial<typeof spacings>;
  /** Optional timing function customizations. */
  timing?: Partial<typeof timing>;
  /** Optional viewport-related customizations. */
  viewport?: Partial<typeof viewport>;
  /** Optional component-specific customizations. */
  components?: Components;
};

// Define the tokens object containing design tokens
export const defaultTokens: Tokens = {
  blur: blur,
  breakpoints: breakpoints,
  color: { ...palette, ...skin, ...color } as Colors,
  elevation: elevation,
  fontFamily: fontFamily,
  fontSize: fontSize,
  fontWeight: fontWeight,
  lineHeight: lineHeight,
  radius: radius,
  screens: screens,
  viewport: viewport,
  shadow: shadow,
  spacings: spacings,
  duration: duration,
  timing: timing,
  // Define specific tokens for different components
  components: {
    [components.Alert]: {
      radius: "md",
      shadow: "xl"
    },
    [components.Avatar]: {
      radius: "sm"
    },
    [components.Badge]: {
      radius: "full"
    },
    [components.Button]: {
      radius: "sm"
    },
    [components.Card]: {
      radius: "md"
    },
    [components.Checkbox]: {
      radius: "sm"
    },
    [components.Calendar]: {
      radius: "sm"
    },
    [components.Dialog]: {
      radius: "md",
      shadow: "3xl"
    },
    [components.Dropdown]: {
      radius: "md",
      shadow: "xl"
    },
    [components.Popover]: {
      radius: "md",
      shadow: "xl"
    },
    [components.Drawer]: {
      radius: "lg",
      shadow: "2xl"
    },
    [components.Group]: {
      radius: "sm"
    },
    [components.ListBox]: {
      radius: "sm"
    },
    [components.Quantity]: {
      radius: "sm"
    },
    [components.Radio]: {
      radius: "sm"
    },
    [components.Select]: {
      radius: "sm"
    },
    [components.Switch]: {
      radius: "full"
    },
    [components.Segmented]: {
      radius: "md",
      shadow: "md"
    },
    [components.Tag]: {
      radius: "sm"
    },
    [components.TextArea]: {
      radius: "sm"
    },
    [components.TextField]: {
      radius: "sm"
    },
    [components.Toggle]: {
      radius: "sm"
    }
  }
};
