import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
// Components
import { Theme, Hoverable } from "../../index";
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
        {({ isHovering }) => <div>{isHovering ? "Hovering" : "Not Hovering"}</div>}
      </Hoverable>
    );
  },
};

export const Touch: Story = {
  render: function Render() {
    return (
      <Hoverable>
        {({ isTouch }) => <div>{isTouch ? "Touch device" : "Not touch device"}</div>}
      </Hoverable>
    );
  },
};
