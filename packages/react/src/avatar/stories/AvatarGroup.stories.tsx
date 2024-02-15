import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
// Components
import { Theme, Avatar, type AvatarGroupProps } from "../../index";

type Story = StoryObj<AvatarGroupProps>;

const meta: Meta<AvatarGroupProps> = {
  title: "Components/Avatar",
  component: Avatar.Group,
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
        <Avatar skin="primary" name="Mauro Vieira" />
        <Avatar skin="primary" name="Bruna Santos" />
        <Avatar skin="primary" name="Lourenço Vieira" />
      </>
    ),
  },
};
