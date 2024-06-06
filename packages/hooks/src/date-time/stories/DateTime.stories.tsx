import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
// UI Components
import { Theme, Text } from "@stewed/react";
// Hooks
import { useDateTime } from "../index";

type Story = StoryObj<typeof useDateTime>;

const meta: Meta<typeof useDateTime> = {
  title: "Hooks/useDateTime",
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
  render: () => {
    const { createDate } = useDateTime();

    return (
      <Text>{createDate().format({ dateStyle: "medium", timeStyle: "short", hour12: true })}</Text>
    );
  },
};
