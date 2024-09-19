import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
// Components
import { Theme, Text, Box } from "../../index";

type Story = StoryObj<typeof Box>;

const meta: Meta<typeof Box> = {
  title: "Components/Box",
  component: Box,
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
    as: {
      control: false,
    },
    children: {
      control: false,
    },
  },
  args: {
    borderColor: "neutral-faded",
    radius: "md",
    padding: {
      block: "9xl",
      inline: "9xl"
    },
    borderWidth: 2,
    borderStyle: "dashed",
    children: <Text alignment="center">Box</Text>,
  },
};
