import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
// Components
import { Theme, Alert, Button } from "../../index";
// Icons
import { TiWarning } from "react-icons/ti";
import { MdClose } from "react-icons/md";

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
  args: {
    skin: "warning",
    title: "Cannot connect to the database",
    leftSlot: <TiWarning size={24} />,
    children: "We are unable to save any progress at this time.",
  },
};

export const Floating: Story = {
  args: {
    skin: "critical",
    title: "Unexpected error happened",
    children: "We have encountered an error while making a request. Please try again later.",
    floating: true,
  },
};
