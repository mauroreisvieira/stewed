import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
// Components
import { Theme, Stepper } from "../../index";

type Story = StoryObj<typeof Stepper>;

const meta: Meta<typeof Stepper> = {
  title: "Components/Stepper",
  component: Stepper,
  argTypes: {
    selectedValue: {
      control: "select",
      options: ["1", "2", "3"]
    }
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
    selectedValue: "3"
  },
  render: function Render({ ...args }): React.ReactElement {
    return (
      <Stepper {...args}>
        <Stepper.Item value="1" title="Step 1" completed />
        <Stepper.Item value="2" title="Step 2" completed />
        <Stepper.Item value="3" title="Step 3" />
      </Stepper>
    );
  }
};
