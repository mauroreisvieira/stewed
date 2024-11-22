import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
// Components
import { Theme, Hue, Box, Text } from "../../index";

type Story = StoryObj<typeof Hue>;

const meta: Meta<typeof Hue> = {
  title: "Components/Hue",
  component: Hue,
  decorators: [
    (Story) => (
      <Theme>
        <Story />
      </Theme>
    ),
  ],
};

export default meta;

export const Solid: Story = {
  args: {
    skin: "indigo-500",
  },
  render: function Render({ ...args }) {
    return (
      <Hue {...args}>
        <Box padding={{ block: "9xl", inline: "9xl" }} radius="md" />
      </Hue>
    );
  },
};

export const Gradient: Story = {
  args: {
    degree: 160,
    skin: {
      from: "teal-900",
      to: "teal-700",
    },
  },
  render: function Render({ ...args }) {
    return (
      <Hue {...args}>
        <Box padding={{ block: "9xl", inline: "9xl" }} radius="md" />
      </Hue>
    );
  },
};

export const ClipText: Story = {
  args: {
    skin: {
      from: "pink-400",
      to: "red-900",
    },
  },
  render: function Render({ ...args }) {
    return (
      <Hue {...args} clipText>
        <Text as="h1" skin="transparent">
          Heading
        </Text>
      </Hue>
    );
  },
};
