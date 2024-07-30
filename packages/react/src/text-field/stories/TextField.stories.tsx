import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
// Components
import { Theme, TextField } from "../../index";
// Icons
import { FiSearch } from "react-icons/fi";

type Story = StoryObj<typeof TextField>;

const meta: Meta<typeof TextField> = {
  title: "Components/Text Field",
  component: TextField,
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
    placeholder: "Type your value...",
    appearance: "outline",
    skin: "neutral-faded",
    disabled: false,
  },
};

export const Critical: Story = {
  args: {
    placeholder: "Type your value...",
    value: "mail@mail",
    skin: "critical",
  },
};

export const Small: Story = {
  args: {
    placeholder: "Type your value...",
    size: "sm",
    appearance: "outline",
    skin: "neutral-faded",
    disabled: false,
  },
};

export const LeftSlot: Story = {
  argTypes: {
    leftSlot: {
      control: false,
    },
  },
  args: {
    placeholder: "Type your value...",
    appearance: "outline",
    leftSlot: <FiSearch />,
    disabled: false,
  },
};
