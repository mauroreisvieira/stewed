import React from "react";
// Storybook
import type { Meta, StoryObj } from "@storybook/react";
// Packages
import { Theme, Card, Text } from "../../index";

type Story = StoryObj<typeof Card>;

const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
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
    selected: false,
    skin: "default",
    children: (
      <>
        <Card.Header>
          <Text>Card Header</Text>
        </Card.Header>
        <Card.Body skin="primary">
          <Text>
            Pellentesque elementum diam sapien, nec ultrices risus convallis eget. Nam pharetra
            dolor at dictum tempor. Quisque ut est a ligula hendrerit sodales. Curabitur ornare a
            nulla in laoreet. Maecenas semper mi egestas, dignissim nisi et, elementum neque.
          </Text>
        </Card.Body>
        <Card.Footer>
          <Text>Card Footer</Text>
        </Card.Footer>
      </>
    ),
  },
};
