import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
// Components
import { Theme, Calendar } from "../../index";

type Story = StoryObj<typeof Calendar>;

const meta: Meta<typeof Calendar> = {
  title: "Components/Calendar",
  component: Calendar,
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
    defaultDate: new Date(),
  },
};
