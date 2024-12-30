import React from "react";
// Storybook
import type { Meta, StoryObj } from "@storybook/react";
// Components
import { Theme, Group, Button, TextField } from "../../index";

type Story = StoryObj<typeof Group>;

const meta: Meta = {
  title: "Components/Group",
  component: Group,
  decorators: [
    (Story) => (
      <Theme>
        <Story />
      </Theme>
    )
  ]
};

export default meta;

export const Buttons: Story = {
  args: {
    focusOnSelected: true,
    children: (
      <>
        <Button skin="neutral" disabled>
          Button
        </Button>
        <Button skin="neutral">Button</Button>
        <Button skin="neutral">Button</Button>
        <Button skin="neutral" pressed={true}>
          Button
        </Button>
        <Button skin="neutral">Button</Button>
      </>
    )
  }
};

export const TextFields: Story = {
  args: {
    children: (
      <>
        <TextField appearance="outline" defaultValue={"Input field..."} />
        <TextField appearance="outline" defaultValue={"Input field..."} />
      </>
    )
  }
};

export const Mixed: Story = {
  args: {
    children: (
      <>
        <Button skin="primary" appearance="soft">
          Button
        </Button>
        <TextField appearance="outline" defaultValue={"Input field..."} />
        <Button skin="primary" appearance="soft">
          Button
        </Button>
      </>
    )
  }
};
