import React from "react";
// Storybook
import type { Meta, StoryObj } from "@storybook/react";
// Packages
import { Theme, Progress } from "../../index";

type Story = StoryObj<typeof Progress>;

const meta: Meta<typeof Progress> = {
  title: "Components/Progress",
  component: Progress,
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
    skin: "primary",
    size: "md",
    value: 50,
  },
};

export const Steps: Story = {
  args: {
    skin: "neutral",
    size: "lg",
    value: 30,
    steps: 10,
  },
};
