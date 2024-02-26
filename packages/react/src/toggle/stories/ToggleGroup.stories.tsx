import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
// Components
import { Theme, Toggle, type ToggleGroupProps } from "../../index";

type Story = StoryObj<ToggleGroupProps>;

const meta: Meta<ToggleGroupProps> = {
  title: "Components/Toggle",
  component: Toggle.Group,
  decorators: [
    (Story) => (
      <Theme>
        <Story />
      </Theme>
    ),
  ],
};

export default meta;

export const Group: Story = {
  argTypes: {
    children: {
      control: false,
    },
  },
  args: {
    children: (
      <>
        <Toggle size="lg" value="XS">
          XS
        </Toggle>
        <Toggle size="lg" value="SM" selected>
          SM
        </Toggle>
        <Toggle size="lg" value="MD">
          MD
        </Toggle>
        <Toggle size="lg" value="LG">
          LG
        </Toggle>
        <Toggle size="lg" value="XL">
          XL
        </Toggle>
      </>
    ),
  },
};
