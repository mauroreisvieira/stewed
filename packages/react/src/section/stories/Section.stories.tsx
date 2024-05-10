import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
// Components
import { Theme, Text, Section } from "../../index";

type Story = StoryObj<typeof Section>;

const meta: Meta<typeof Section> = {
  title: "Components/Section",
  component: Section,
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
    skin: "primary-600",
    padding: {
      block: "2xl",
      inline: "2xl"
    },
    sizing: {
      width: "full",
      height: "auto",
    },
    children: (
      <>
        <Text>Section</Text>
      </>
    ),
  },
};
