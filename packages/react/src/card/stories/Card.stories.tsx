import React from "react";
// Storybook
import type { Meta, StoryObj } from "@storybook/react";
// Packages
import { Theme, Card, Text } from "../../index";

type Story = StoryObj<typeof Card>;

const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
  subcomponents: {
    "Card.Media": Card.Media as React.FC<unknown>,
    "Card.Header": Card.Header as React.FC<unknown>,
    "Card.Body": Card.Body as React.FC<unknown>,
    "Card.Footer": Card.Footer as React.FC<unknown>
  },
  decorators: [
    (Story) => (
      <Theme>
        <Story />
      </Theme>
    )
  ]
};

export default meta;

export const Base: Story = {
  argTypes: {
    children: {
      control: false
    }
  },
  args: {
    children: (
      <>
        <Card.Header>
          <Text>Card Header</Text>
        </Card.Header>
        <Card.Separator />
        <Card.Body>
          <Text>
            Pellentesque elementum diam sapien, nec ultrices risus convallis eget. Nam pharetra
            dolor at dictum tempor. Quisque ut est a ligula hendrerit sodales. Curabitur ornare a
            nulla in laoreet. Maecenas semper mi egestas, dignissim nisi et, elementum neque.
          </Text>
        </Card.Body>
        <Card.Separator />
        <Card.Footer>
          <Text>Card Footer</Text>
        </Card.Footer>
      </>
    )
  }
};

export const Direction: Story = {
  argTypes: {
    children: {
      control: false
    }
  },
  args: {
    direction: "row",
    children: (
      <>
        <Card.Media image={{ src: "https://placehold.co/200x200" }} />
        <Card.Body>
          <Text>
            Pellentesque elementum diam sapien, nec ultrices risus convallis eget. Nam pharetra
            dolor at dictum tempor. Quisque ut est a ligula hendrerit sodales. Curabitur ornare a
            nulla in laoreet. Maecenas semper mi egestas, dignissim nisi et, elementum neque.
          </Text>
        </Card.Body>
      </>
    )
  }
};
