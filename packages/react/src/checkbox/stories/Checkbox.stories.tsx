import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Theme, Checkbox } from "../../index";

type Story = StoryObj<typeof Checkbox>;

const meta: Meta<typeof Checkbox> = {
  title: "Components/Checkbox",
  component: Checkbox,
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
    checked: false,
    disabled: false,
    indeterminate: false,
    size: "md",
    skin: "primary",
    children: "Label",
  },
};

export const Uncontrolled: Story = {
  args: {
    disabled: false,
    size: "md",
    skin: "primary",
    children: "Label",
  },
};
