import { Tokens } from "./Types";
// Tokens
import { color } from "./Color";
import { components } from "./Components";
import { fontFamily } from "./FontFamily";
import { fontSize } from "./FontSize";
import { fontWeight } from "./FontWeight";
import { lineHeight } from "./LineHeight";
import { radius } from "./Radius";
import { spacings } from "./Spacings";
import { screens } from "./Screens";

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
      radius: "sm",
    },
  },
};
