import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
// UI Components
import { Theme, Skeleton } from "../../index";

type Story = StoryObj<typeof Skeleton>;

const meta: Meta<typeof Skeleton> = {
  title: "Components/Skeleton",
  component: Skeleton,
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
  argTypes: {
    children: {
      control: false,
    },
  },
  args: {
    shape: "line",
    size: "lg",
    radius: "md",
  },
};
