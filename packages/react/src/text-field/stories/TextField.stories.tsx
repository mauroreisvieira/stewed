import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Theme, TextField } from "../../index";

type Story = StoryObj<typeof TextField>;

const meta: Meta<typeof TextField> = {
  title: "Components/Text Field",
  component: TextField,
  decorators: [
    (Story) => (
      <Theme>
        <Story />
      </Theme>
    ),
  ],
};

export default meta;

export const Base: Story = {
  args: {
    placeholder: "Type your value...",
    defaultValue: "",
    skin: "default",
    disabled: false,
  },
};
