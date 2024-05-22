import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
// Components
import { Theme, Toggle } from "../../index";
// Icons
import { FiStar } from "react-icons/fi";

type Story = StoryObj<typeof Toggle>;

const meta: Meta = {
  title: "Components/Toggle",
  component: Toggle,
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
    size: "md",
    skin: "neutral",
    selected: false,
    disabled: false,
    children: "Toggle",
  },
};

export const LeftSlot: Story = {
  args: {
    leftSlot: <FiStar size={18} />,
    skin: "primary",
    children: "Toggle",
  },
};
