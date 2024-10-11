import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Theme, Drawer, Text, Separator } from "../../index";

type Story = StoryObj<typeof Drawer>;

const meta: Meta<typeof Drawer> = {
  title: "Components/Drawer",
  component: Drawer,
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
    size: "sm",
    open: false,
    placement: "left",
    children: (
      <>
        <Drawer.Header>
          <Text as="h6">Drawer Header</Text>
        </Drawer.Header>
        <Separator />
        <Drawer.Body>
          <Text>
            Pellentesque elementum diam sapien, nec ultrices risus convallis eget. Nam pharetra
            dolor at dictum tempor. Quisque ut est a ligula hendrerit sodales. Curabitur ornare a
            nulla in laoreet. Maecenas semper mi egestas, dignissim nisi et, elementum neque.
          </Text>
        </Drawer.Body>
      </>
    ),
  },
};

export const HugeContent: Story = {
  argTypes: {
    children: {
      control: false,
    },
  },
  args: {
    open: false,
    children: (
      <>
        <Drawer.Header>
          <Text as="h4">Drawer Header</Text>
        </Drawer.Header>
        <Separator />
        <Drawer.Body>
          {Array.from({ length: 100 }).map((_, index) => (
            <Text key={index}>
              Pellentesque elementum diam sapien, nec ultrices risus convallis eget. Nam pharetra
              dolor at dictum tempor. Quisque ut est a ligula hendrerit sodales. Curabitur ornare a
              nulla in laoreet. Maecenas semper mi egestas, dignissim nisi et, elementum neque.
            </Text>
          ))}
        </Drawer.Body>
        <Separator />
        <Drawer.Footer>
          <Text as="h4">Drawer Footer</Text>
        </Drawer.Footer>
      </>
    ),
  },
};
