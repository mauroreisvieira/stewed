import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
// Components
import { Theme, Button } from "../../index";
// Icons
import { FiSearch } from "react-icons/fi";

type Story = StoryObj<typeof Button>;

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
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
    children: "Button",
  },
};

export const Skin: Story = {
  args: {
    skin: "neutral",
    children: "Button",
  },
};

export const LeftSlot: Story = {
  argTypes: {
    leftSlot: {
      control: false,
    },
  },
  args: {
    leftSlot: <FiSearch />,
    children: "Button",
  },
};

export const Loading: Story = {
  args: {
    children: "",
    size: "md",
    loading: true,
  },
};
