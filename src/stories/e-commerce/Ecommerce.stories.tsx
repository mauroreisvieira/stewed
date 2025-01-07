import React from "react";
// UI Components
import { Theme } from "@stewed/react";
// Components Patterns
import { QuickView as QV } from "./examples/collections/QuickView";
import { Collections as CL } from "./examples/collections/Collections";
import { Details as DT } from "./examples/collections/Details";

const meta = {
  title: "Examples/Ecommerce",
  parameters: {
    layout: "fullscreen"
  },
  decorators: [
    (Story) => (
      <Theme
        tokens={{
          default: {
            color: {
              "primary-foreground-on-background": "#fff",
              "primary-background": "slate-900",
              "primary-background-hovered": "slate-800",
              "primary-background-pressed": "slate-800",
              "primary-border": "slate-900",
              "primary-border-hovered": "slate-800",
              "secondary-background": "slate-100",
              "secondary-background-hovered": "slate-200",
              "secondary-background-pressed": "slate-200",
              "secondary-foreground-on-background": "slate-800",
              focus: "slate-900"
            },
            components: {
              button: {
                radius: "md"
              }
            }
          }
        }}
      >
        <Story />
      </Theme>
    )
  ]
};

export default meta;

export const Collections = {
  render: function Render() {
    return <CL />;
  }
};

export const QuickViews = {
  render: function Render() {
    return <QV />;
  }
};

export const Details = {
  render: function Render() {
    return <DT />;
  }
};
