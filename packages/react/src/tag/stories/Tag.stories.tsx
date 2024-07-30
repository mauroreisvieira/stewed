import React from "react";
// Storybook
import type { Meta, StoryObj } from "@storybook/react";
// Packages
import { Theme, Tag } from "../../index";
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

export const Base: Story = {
  args: {
    children: "Base",
  },
};export

const Outline: Story = {
  args: {
    skin: "primary",
    appearance: "outline",
    children: "Premium",
  },
};

export const LeftSlot: Story = {
  argTypes: {
    leftSlot: {
      control: false,
    },
  },
  args: {
    skin: "primary",
    size: "lg",
    appearance: "soft",
    children: "Premium",
    leftSlot: <FiStar />,
  },
};
