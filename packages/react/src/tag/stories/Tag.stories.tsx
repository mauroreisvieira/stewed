import React from "react";
// Storybook
import type { Meta, StoryObj } from "@storybook/react";
// Packages
import { Theme, Tag } from "../../index";
// Icons
import { FiGitPullRequest } from "react-icons/fi";

type Story = StoryObj<typeof Tag>;

const meta: Meta<typeof Tag> = {
  title: "Components/Tag",
  component: Tag,
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
    children: "documentation",
  },
};

export const Ghost: Story = {
  args: {
    skin: "warning",
    appearance: "ghost",
    children: "help wanted",
  },
};

export const Soft: Story = {
  args: {
    skin: "secondary",
    appearance: "soft",
    children: "good first issue",
  },
};

export const Outline: Story = {
  argTypes: {
    leftSlot: {
      control: false,
    },
  },
  args: {
    skin: "critical",
    appearance: "outline",
    children: "unresolved conflicts",
    leftSlot: <FiGitPullRequest />,
  },
};
