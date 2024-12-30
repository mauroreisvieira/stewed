import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
// UI Components
import { Theme, List } from "../../index";

type Story = StoryObj<typeof List>;

const meta: Meta<typeof List> = {
  title: "Components/List",
  component: List,
  subcomponents: {
    "List.Item": List.Item as React.FC<unknown>
  },
  decorators: [
    (Story) => (
      <Theme>
        <Story />
      </Theme>
    )
  ]
};

export default meta;

export const Base: Story = {
  argTypes: {
    children: {
      control: false
    }
  },
  args: {
    type: "decimal",
    children: (
      <>
        <List.Item>Lee Evans new tour</List.Item>
        <List.Item>Individual errors coast</List.Item>
        <List.Item>Re-skin signs</List.Item>
        <List.Item>Reflect roadmap</List.Item>
        <List.Item>Top of mind</List.Item>
      </>
    )
  }
};
