import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
// UI Components
import { Theme, Text } from "../../index";

type Story = StoryObj<typeof Text>;

const meta: Meta<typeof Text> = {
  title: "Components/Text",
  component: Text,
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
    children: "Lorem ipsum, dolor sit amet consectetur adipisicing elit",
  },
};

export const Heading: Story = {
  args: {
    as: "h1",
    children: "Heading",
  },
};

export const Anchor: Story = {
  args: {
    as: "a",
    children: "Lorem ipsum, dolor sit amet consectetur adipisicing elit",
  },
};
