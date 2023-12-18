import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Theme, Dialog, Text, Separator } from "../../index";

type Story = StoryObj<typeof Dialog>;

const meta: Meta<typeof Dialog> = {
  title: "Components/Dialog",
  component: Dialog,
  decorators: [
    (Story) => (
      <Theme>
        <Story />
      </Theme>
    ),
  ],
};

export default meta;

export const Default: Story = {
  argTypes: {
    children: {
      control: false,
    },
  },
  args: {
    size: "sm",
    open: false,
    children: (
      <>
        <Dialog.Header>
          <Text as="h4">Dialog Header</Text>
        </Dialog.Header>
        <Separator />
        <Dialog.Body>
          Pellentesque elementum diam sapien, nec ultrices risus convallis eget. Nam pharetra dolor
          at dictum tempor. Quisque ut est a ligula hendrerit sodales. Curabitur ornare a nulla in
          laoreet. Maecenas semper mi egestas, dignissim nisi et, elementum neque.
        </Dialog.Body>
      </>
    ),
  },
};
