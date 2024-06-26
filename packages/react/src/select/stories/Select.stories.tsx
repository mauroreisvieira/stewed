import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
// Components
import { Theme, Select } from "../../index";
// Icons
import { FiSearch } from "react-icons/fi";

type Story = StoryObj<typeof Select>;

const meta: Meta<typeof Select> = {
  title: "Components/Select",
  component: Select,
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
    disabled: false,
    skin: "default",
    children: (
      <>
        <Select.Option value={1}>Option 1</Select.Option>
        <Select.Option value={2}>Option 2</Select.Option>
        <Select.Option value={3}>Option 3</Select.Option>
        <Select.Option value={4}>Option 4</Select.Option>
      </>
    ),
  },
};

export const LeftSlot: Story = {
  argTypes: {
    leftSlot: {
      control: false,
    },
    children: {
      control: false,
    },
  },
  args: {
    disabled: false,
    skin: "default",
    leftSlot: <FiSearch />,
    children: (
      <>
        <Select.Option value={1}>Option 1</Select.Option>
        <Select.Option value={2}>Option 2</Select.Option>
        <Select.Option value={3}>Option 3</Select.Option>
        <Select.Option value={4}>Option 4</Select.Option>
      </>
    ),
  },
};
