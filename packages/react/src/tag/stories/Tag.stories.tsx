import React from "react";
// Storybook
import type { Meta, StoryObj } from "@storybook/react";
// Packages
import { Theme, Tag,  } from "../../index";
// Icons
import { FiStar } from "react-icons/fi";

type Story = StoryObj<typeof Tag>;

const meta: Meta<typeof Tag> = {
  title: "Components/Tag",
  component: Tag,
  decorators: [
    (Story) => (
      <Theme>
        <Story />
      </Theme>
    ),
  ],
};

export default meta;

export const Default: Story = {
  args: {
    skin: "primary",
    size: "md",
    appearance: "filled",
    children: "Premium",
  },
};

export const Slots: Story = {
  argTypes: {
    leftSlot: {
      control: false,
    },
  },
  args: {
    skin: "primary",
    size: "md",
    appearance: "outline",
    children: "Premium",
    leftSlot: <FiStar />,
  },
};
