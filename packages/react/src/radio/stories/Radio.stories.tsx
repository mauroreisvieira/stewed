import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Theme, Radio } from "../../index";

type Story = StoryObj<typeof Radio>;

const meta: Meta<typeof Radio> = {
  title: "Components/Radio",
  component: Radio,
  argTypes: {
    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
    },
    skin: {
      control: "radio",
      options: ["primary", "error"],
    },
  },
  decorators: [
    (Story) => (
      <Theme>
        <Story />
      </Theme>
    ),
  ],
};

export default meta;

export const Controlled: Story = {
  argTypes: {
    onChange: { action: "change" },
  },
  args: {
    checked: true,
    disabled: false,
    size: "md",
    skin: "primary",
    children: "Label",
  },
};
