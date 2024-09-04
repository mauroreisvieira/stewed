import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
// UI Components
import { Theme, Badge, Button } from "../../index";
// Icons
import { IoIosNotificationsOutline } from "react-icons/io";

type Story = StoryObj<typeof Badge>;

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
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
  argTypes: {
    children: {
      control: false,
    },
  },
  args: {
    position: "top-right",
    skin: "primary",
    value: "+999",
  },
};

export const Size: Story = {
  argTypes: {
    children: {
      control: false,
    },
  },
  args: {
    size: "lg",
    skin: "info",
    value: "9",
  },
};

export const Outline: Story = {
  argTypes: {
    children: {
      control: false,
    },
  },
  args: {
    position: "top-right",
    appearance: "outline",
    skin: "primary",
    value: "+999",
  },
};

export const Children: Story = {
  argTypes: {
    children: {
      control: false,
    },
  },
  args: {
    position: "top-right",
    skin: "critical",
    value: "7",
    size: "lg",
    children: (
      <Button skin="neutral" leftSlot={<IoIosNotificationsOutline />} iconOnly>
        Notifications
      </Button>
    ),
  },
};
