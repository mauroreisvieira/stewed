import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
// Components
import { Theme, Avatar } from "../../index";

type Story = StoryObj<typeof Avatar>;

const meta: Meta = {
  title: "Components/Avatar",
  component: Avatar,
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
    skin: "primary",
    name: "Lourenço Vieira",
  },
};

export const Picture: Story = {
  args: {
    skin: "primary",
    size: "xl",
    src: "https://placehold.co/120x120",
    name: "Lourenço Vieira",
  },
};

export const Square: Story = {
  args: {
    skin: "primary",
    size: "3xl",
    name: "Company Acme",
    appearance: "square",
  },
};
