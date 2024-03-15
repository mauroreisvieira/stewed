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
    disabled: false,
    size: "md",
    skin: "primary",
    appearance: "filled",
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

export const IconOnly: Story = {
  argTypes: {
    leftSlot: {
      control: false,
    },
  },
  args: {
    appearance: "filled",
    skin: "primary",
    size: "sm",
    iconOnly: true,
    leftSlot: <FiSearch />,
    children: "Button",
  },
};

export const Polymorphic: Story = {
  args: {
    as: "span",
    role: "button",
    children: "Button",
  },
};

export const Loading: Story = {
  args: {
    children: "",
    loading: true,
  },
};
