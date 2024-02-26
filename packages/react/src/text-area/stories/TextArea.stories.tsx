import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Theme, TextArea } from "../../index";

type Story = StoryObj<typeof TextArea>;

const meta: Meta<typeof TextArea> = {
  title: "Components/Text Area",
  component: TextArea,
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
    skin: "default",
    disabled: false,
  },
};
