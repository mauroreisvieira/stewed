import React from "react";
// Storybook
import type { Meta, StoryObj } from "@storybook/react";
// Packages
import { Theme, Separator } from "../../index";

type Story = StoryObj<typeof Separator>;

const meta: Meta<typeof Separator> = {
  title: "Components/Separator",
  component: Separator,
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
    skin: "neutral-border",
  },
};

export const Spaces: Story = {
  args: {
    skin: "primary",
    space: {
      block: "2xl",
    },
  },
};
