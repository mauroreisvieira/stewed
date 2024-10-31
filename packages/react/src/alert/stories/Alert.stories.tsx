import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
// Components
import { Theme, Alert, Text } from "../../index";
// Icons
import { TiWarning } from "react-icons/ti";

type Story = StoryObj<typeof Alert>;

const meta: Meta<typeof Alert> = {
  title: "Components/Alert",
  component: Alert,
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
    skin: "info",
    title: "Are you absolutely sure?",
    children:
      "This action cannot be undone. This will permanently delete your account and remove your data from our servers.",
  },
};

export const LeftSlot: Story = {
  argTypes: {
    leftSlot: {
      control: false,
    },
  },
  args: {
    skin: "warning",
    title: "Cannot connect to the database",
    leftSlot: <TiWarning size={24} />,
    children: "We are unable to save any progress at this time.",
  },
};

export const Small: Story = {
  args: {
    size: "xs",
    skin: "success",
    children: <Text size="sm">Here is a gentle confirmation that your action was successful.</Text>,
  },
};

