import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
// Components
import { Theme, Group, Button, TextField } from "../../index";
// Icons

type Story = StoryObj<typeof Group>;

const meta: Meta = {
  title: "Components/Group",
  component: Group,
  decorators: [
    (Story) => (
      <Theme>
        <Story />
      </Theme>
    ),
  ],
};

export default meta;

export const Buttons: Story = {
  args: {
    children: (
      <>
        <Button skin="neutral" size="xs" appearance="outline">
          Button
        </Button>
        <Button skin="neutral" size="sm" appearance="outline">
          Button
        </Button>
        <Button skin="neutral" size="md" appearance="outline" disabled>
          Button
        </Button>
        <Button skin="neutral" size="lg" appearance="outline">
          Button
        </Button>
        <Button skin="neutral" size="xl" appearance="outline">
          Button
        </Button>
      </>
    ),
  },
};

export const TextFields: Story = {
  args: {
    children: (
      <>
        <TextField appearance="outline" defaultValue={"Input field..."} />
        <TextField appearance="outline" defaultValue={"Input field..."} />
      </>
    ),
  },
};

export const Mixed: Story = {
  args: {
    children: (
      <>
        <Button skin="neutral" size="xs" appearance="outline">
          Button
        </Button>
        <TextField appearance="outline" defaultValue={"Input field..."} />
        <Button skin="neutral" size="xs" appearance="outline">
          Button
        </Button>
      </>
    ),
  },
};
