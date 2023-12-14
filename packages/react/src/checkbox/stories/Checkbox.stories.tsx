import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Theme, Checkbox } from "../../index";

type Story = StoryObj<typeof Checkbox>;

const meta: Meta<typeof Checkbox> = {
  title: "Components/Checkbox",
  component: Checkbox,
  decorators: [
    (Story) => (
      <Theme>
        <Story />
      </Theme>
    ),
  ],
};

export default meta;

export const Uncontrolled: Story = {
  args: {
    disabled: false,
    indeterminate: false,
    size: "md",
    skin: "primary",
    children: "Label",
  },
};
