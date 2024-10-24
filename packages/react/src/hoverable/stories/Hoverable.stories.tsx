import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
// Components
import { Theme, Hoverable, Text } from "../../index";
// Icons

type Story = StoryObj<typeof Hoverable>;

const meta: Meta = {
  title: "Components/Hoverable",
  component: Hoverable,
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
  render: function Render() {
    return (
      <Hoverable>
        {({ isHovering }) => <Text>{isHovering ? "Hovering" : "Not Hovering"}</Text>}
      </Hoverable>
    );
  },
};

export const Touch: Story = {
  render: function Render() {
    return (
      <Hoverable>
        {({ isTouch }) => <Text>{isTouch ? "Touch device" : "Not touch device"}</Text>}
      </Hoverable>
    );
  },
};
