import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
// Components
import { Theme, Gradient, Box, Text } from "../../index";

type Story = StoryObj<typeof Gradient>;

const meta: Meta<typeof Gradient> = {
  title: "Components/Gradient",
  component: Gradient,
  decorators: [
    (Story) => (
      <Theme>
        <Story />
      </Theme>
    ),
  ],
};

export default meta;

export const ClipText: Story = {
  args: {
    from: "pink-400",
    to: "red-900",
  },
  render: function Render({ ...args }) {
    return (
      <Gradient {...args} clipText>
        <Text as="h1" skin="transparent">
          Heading
        </Text>
      </Gradient>
    );
  },
};

export const Background: Story = {
  args: {
    from: "teal-900",
    to: "teal-700",
  },
  render: function Render({ ...args }) {
    return (
      <Gradient {...args}>
        <Box padding={{ block: "9xl", inline: "9xl" }} radius="md" />
      </Gradient>
    );
  },
};
