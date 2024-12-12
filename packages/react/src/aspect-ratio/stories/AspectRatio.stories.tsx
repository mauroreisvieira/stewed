import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
// Components
import { Theme, AspectRatio } from "../../index";

type Story = StoryObj<typeof AspectRatio>;

const meta: Meta<typeof AspectRatio> = {
  title: "Components/Aspect Ratio",
  component: AspectRatio,
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
  argTypes: {
    children: {
      control: false
    }
  },
  args: {
    ratio: "4:3",
    children: (
      <img
        style={{ width: 300 }}
        src="https://images.unsplash.com/photo-1535025183041-0991a977e25b?w=300&dpr=2&q=80"
        alt="Landscape photograph by Tobias Tullius"
      />
    )
  }
};
