import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
// Components
import { Theme, Avatar } from "../../index";

type Story = StoryObj<typeof Avatar>;

const meta: Meta = {
  title: "Components/Avatar",
  component: Avatar,
  subcomponents: {
    "Avatar.Group": Avatar.Group as React.FC<unknown>,
  },
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
    name: "Emma Clark",
  },
};

export const Picture: Story = {
  args: {
    skin: "primary",
    size: "5xl",
    image: {
      src: "https://images.unsplash.com/photo-1469334031218-e382a71b716b",
    },
    name: "Emma Clark",
  },
};

export const Error: Story = {
  args: {
    skin: "critical",
    size: "lg",
    image: {
      src: "/example.jpeg",
    },
    name: "Mia Davis",
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
