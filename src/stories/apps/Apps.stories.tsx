import type { Meta } from "@storybook/react";
// Examples
import { Music } from "./examples/music/Music";
import { ChatAI } from "./examples/Chat";
import { Mail } from "./examples/mail/Mail";

const meta: Meta = {
  title: "Examples/Applications",
  parameters: {
    layout: "fullscreen"
  }
};

export default meta;

export { Music, ChatAI, Mail };
