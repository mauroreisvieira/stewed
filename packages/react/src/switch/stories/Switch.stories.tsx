import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Theme, Switch } from "../../index";

type Story = StoryObj<typeof Switch>;

const meta: Meta<typeof Switch> = {
  title: "Components/Switch",
  component: Switch,
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
    reversed: false,
    checked: false,
    disabled: false,
    size: "md",
    skin: "primary",
    children: "Label",
  },
};

export const Uncontrolled: Story = {
  args: {
    reversed: false,
    disabled: false,
    size: "md",
    skin: "primary",
    children: "Label",
  },
};
