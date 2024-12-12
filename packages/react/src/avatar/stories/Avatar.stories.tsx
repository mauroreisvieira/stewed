import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
// Components
import { Theme, Avatar } from "../../index";

type Story = StoryObj<typeof Avatar>;

const meta: Meta = {
  title: "Components/Avatar",
  component: Avatar,
  subcomponents: {
    "Avatar.Group": Avatar.Group as React.FC<unknown>
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
  args: {
    skin: "primary",
    name: "Emma Clark"
  }
};

export const Picture: Story = {
  args: {
    skin: "primary",
    size: "5xl",
    image: {
      src: "https://images.unsplash.com/photo-1469334031218-e382a71b716b"
    },
    name: "Emma Clark"
  }
};

export const SVGIcon: Story = {
  args: {
    skin: "neutral-faded",
    appearance: "outline",
    size: "5xl",
    svgIcon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        width={48}
        viewBox="0 0 24 24"
        strokeWidth={1}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
        />
      </svg>
    ),
    name: "Emma Clark"
  }
};

export const Error: Story = {
  args: {
    skin: "critical",
    size: "lg",
    image: {
      src: "/example.jpeg"
    },
    name: "Mia Davis"
  }
};

export const Square: Story = {
  args: {
    skin: "neutral",
    size: "6xl",
    name: "Company Acme",
    shape: "square",
    appearance: "outline"
  }
};

export const Button: Story = {
  args: {
    as: "button",
    skin: "neutral",
    size: "6xl",
    name: "Company Acme",
    shape: "square",
    appearance: "outline"
  }
};

export const Group: StoryObj<typeof Avatar.Group> = {
  render: function Render() {
    return (
      <Avatar.Group>
        <Avatar appearance="outline" skin="neutral" name="Sophia Chang" />
        <Avatar skin="primary" name="Noah Andersen" />
        <Avatar skin="neutral" name="Olivia Patel" />
        <Avatar skin="secondary" name="Benjamin Martinez" />
      </Avatar.Group>
    );
  }
};
