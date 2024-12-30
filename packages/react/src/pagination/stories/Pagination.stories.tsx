import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
// UI Components
import { Theme, Pagination } from "../../index";

type Story = StoryObj<typeof Pagination>;

const meta: Meta<typeof Pagination> = {
  title: "Components/Pagination",
  component: Pagination,
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
    total: 10,
    currentPage: 1
  }
};
