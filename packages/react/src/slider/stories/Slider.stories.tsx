import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
// Components
import { Theme, Slider } from "../../index";

type Story = StoryObj<typeof Slider>;

const meta: Meta<typeof Slider> = {
  title: "Components/Slider",
  component: Slider,
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
    max: 100,
    min: 0,
    defaultValue: 50
  }
};

export const Multiple: Story = {
  args: {
    max: 100,
    min: 0,
    skin: "critical",
    defaultValue: [25, 50, 75]
  }
};
