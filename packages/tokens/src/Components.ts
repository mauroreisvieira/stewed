import type { Blur } from "./tokens/Blur";
import type { Radius } from "./tokens/Radius";
import type { Shadow } from "./tokens/Shadow";

export const components = {
  Accordion: "accordion",
  Alert: "alert",
  AspectRatio: "aspect-ratio",
  Avatar: "avatar",
  Backdrop: "backdrop",
  Badge: "badge",
  Box: "box",
  Button: "button",
  Calendar: "calendar",
  Card: "card",
  Carousel: "carousel",
  Checkbox: "checkbox",
  Container: "container",
  Dialog: "dialog",
  Drawer: "drawer",
  Dropdown: "dropdown",
  FormField: "form-field",
  Hue: "hue",
  Grid: "grid",
  Group: "group",
  List: "list",
  ListBox: "list-box",
  Motion: "motion",
  Pagination: "pagination",
  Popover: "popover",
  Progress: "progress",
  Quantity: "quantity",
  Radio: "radio",
  Scope: "scope",
  Segmented: "segmented",
  Select: "select",
  Separator: "separator",
  Skeleton: "skeleton",
  Snackbar: "snackbar",
  Spinner: "spinner",
  Stack: "stack",
  Stepper: "stepper",
  Switch: "switch",
  Table: "table",
  Tabs: "tabs",
  Tag: "tag",
  TextArea: "text-area",
  TextField: "text-field",
  Toggle: "toggle",
  Tooltip: "tooltip",
  Typography: "typography",
} as const;

export type Components = {
  [components.Alert]?: { radius?: Radius; shadow?: Shadow };
  [components.Avatar]?: { radius?: Radius };
  [components.Backdrop]?: { blur?: Blur };
  [components.Badge]?: { radius?: Radius };
  [components.Button]?: { radius?: Radius };
  [components.Calendar]?: { radius?: Radius };
  [components.Card]?: { radius?: Radius };
  [components.Checkbox]?: { radius?: Radius };
  [components.Dialog]?: { radius?: Radius; shadow?: Shadow };
  [components.Drawer]?: { radius?: Radius; shadow?: Shadow };
  [components.Dropdown]?: { radius?: Radius; shadow?: Shadow };
  [components.Group]?: { radius?: Radius };
  [components.ListBox]?: { radius?: Radius };
  [components.Popover]?: { radius?: Radius; shadow?: Shadow };
  [components.Quantity]?: { radius?: Radius };
  [components.Radio]?: { radius?: Radius };
  [components.Segmented]?: { radius?: Radius, shadow?: Shadow };
  [components.Select]?: { radius?: Radius };
  [components.Switch]?: { radius?: Radius };
  [components.Tag]?: { radius?: Radius };
  [components.TextArea]?: { radius?: Radius };
  [components.TextField]?: { radius?: Radius };
  [components.Toggle]?: { radius?: Radius };
};
