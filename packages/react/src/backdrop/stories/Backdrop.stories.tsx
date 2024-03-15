import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
// Components
import { Theme, Backdrop } from "../../index";

type Story = StoryObj<typeof Backdrop>;

const meta: Meta<typeof Backdrop> = {
  title: "Components/Backdrop",
  component: Backdrop,
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
  args: {},
};
