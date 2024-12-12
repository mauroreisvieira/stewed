import React from "react";
// Storybook
import type { Meta, StoryObj } from "@storybook/react";
// Packages
import { Theme, Spinner } from "../../index";

type Story = StoryObj<typeof Spinner>;

const meta: Meta<typeof Spinner> = {
  title: "Components/Spinner",
  component: Spinner,
  decorators: [
    (Story) => (
      <Theme>
        <Story />
      </Theme>
    )
  ]
};

export default meta;

export const Base: Story = {
  args: {
    skin: "primary",
    size: "5xl"
  }
};
