import React from "react";
// Examples
import { Music as MC } from "./examples/music/Music";
import { Chat as CT } from "./examples/chat/Chat";
import { Mail as ML } from "./examples/mail/Mail";
// Types
import type { Meta } from "@storybook/react";

const meta: Meta = {
  title: "Examples/Applications",
  parameters: {
    layout: "fullscreen"
  }
};

export default meta;

export const ChatAI = {
  render: function Render() {
    return <CT />;
  }
};

export const Music = {
  render: function Render() {
    return <MC />;
  }
};

export const Mail = {
  render: function Render() {
    return <ML />;
  }
};
