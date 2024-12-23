import React from "react";
// UI Components
import { Theme } from "@stewed/react";
// Components Patterns
import { Suggested as SG } from "./components/Suggested";
import { Team as TM } from "./components/Team";
import { CompletedProgress as CP } from "./components/CompletedProgress";
import { PaymentMethod as PM } from "./components/PaymentMethod";
import { RecentActivity as RA } from "./components/RecentActivity";
import { NewMessage as NM } from "./components/NewMessage";
import { Notification as NF } from "./components/Notification";
import { ShareSettings as SS } from "./components/ShareSettings";
import { Playlist as PL } from "./components/Playlist";

const meta = {
  title: "Examples/Widgets"
};

export default meta;

export const PaymentMethod = {
  render: function Render() {
    return (
      <Theme>
        <PM />
      </Theme>
    );
  }
};

export const NewMessage = {
  render: function Render() {
    return (
      <Theme>
        <NM />
      </Theme>
    );
  }
};

export const Notification = {
  render: function Render() {
    return (
      <Theme>
        <NF />
      </Theme>
    );
  }
};

export const ShareSettings = {
  render: function Render() {
    return (
      <Theme>
        <SS />
      </Theme>
    );
  }
};

export const RecentActivity = {
  render: function Render() {
    return (
      <Theme>
        <RA />
      </Theme>
    );
  }
};

export const Team = {
  render: function Render() {
    return (
      <Theme>
        <TM />
      </Theme>
    );
  }
};

export const Playlist = {
  render: function Render() {
    return (
      <Theme
        tokens={{
          default: {
            color: {
              "secondary-foreground": "#fff",
              "background-backdrop": "rgb(160 160 160 / 60%)"
            },
            components: {
              button: {
                radius: "full"
              }
            }
          }
        }}
      >
        <PL />
      </Theme>
    );
  }
};

export const CompletedProgress = {
  render: function Render() {
    return (
      <Theme>
        <CP />
      </Theme>
    );
  }
};

export const Suggested = {
  render: function Render() {
    return (
      <Theme>
        <SG />
      </Theme>
    );
  }
};
