import React from "react";
// UI Components
import { Theme } from "@stewed/react";
// Components Patterns
import { QuickViews as QV } from "./components/QuickViews";
import { Collections as CL } from "./components/Collections";

const meta = {
  title: "Examples/Ecommerce",
  parameters: {
    layout: "fullscreen"
  }
};

export default meta;

export const Collections = {
  render: function Render() {
    return (
      <Theme
        tokens={{
          default: {
            color: {
              "secondary-background": "slate-100",
              "secondary-background-hovered": "slate-200",
              "secondary-background-pressed": "slate-200",
              "secondary-foreground-on-background": "slate-800"
            },
            components: {
              button: {
                radius: "full"
              }
            }
          }
        }}
      >
        <CL />
      </Theme>
    );
  }
};

export const QuickViews = {
  render: function Render() {
    return (
      <Theme
        tokens={{
          default: {
            components: {
              group: {
                radius: "full"
              },
              button: {
                radius: "full"
              }
            }
          }
        }}
      >
        <QV />
      </Theme>
    );
  }
};
