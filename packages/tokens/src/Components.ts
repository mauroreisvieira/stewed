import { Shadow, type Radius } from "./tokens/index";

export const components = {
  Accordion: "accordion",
  Alert: "alert",
  AspectRatio: "aspect-ratio",
  Avatar: "avatar",
  Badge: "badge",
  Box: "box",
  Button: "button",
  Calendar: "calendar",
  Card: "card",
  Carousel: "carousel",
  Checkbox: "checkbox",
  Container: "container",
  Dialog: "dialog",
  Dropdown: "dropdown",
  FormField: "form-field",
  List: "list",
  ListBox: "list-box",
  Overlay: "overlay",
  Pagination: "pagination",
  Progress: "progress",
  Quantity: "quantity",
  Radio: "radio",
  Select: "select",
  Separator: "separator",
  Skeleton: "skeleton",
  Spinner: "spinner",
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
  [components.Alert]?: { radius?: Radius, shadow?: Shadow };
  [components.Avatar]?: { radius?: Radius };
  [components.Badge]?: { radius?: Radius };
  [components.Button]?: { radius?: Radius };
  [components.Card]?: { radius?: Radius };
  [components.Checkbox]?: { radius?: Radius };
  [components.Dialog]?: { radius?: Radius; shadow?: Shadow };
  [components.ListBox]?: { radius?: Radius };
  [components.Quantity]?: { radius?: Radius };
  [components.Select]?: { radius?: Radius };
  [components.Switch]?: { radius?: Radius };
  [components.Tabs]?: { radius?: Radius };
  [components.Tag]?: { radius?: Radius };
  [components.TextArea]?: { radius?: Radius };
  [components.TextField]?: { radius?: Radius };
  [components.Toggle]?: { radius?: Radius };
};
