import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
// Components
import { Theme, Text, Card, Container } from "../../index";

type Story = StoryObj<typeof Container>;

const meta: Meta<typeof Container> = {
  title: "Components/Container",
  component: Container,
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
    as: {
      control: false,
    },
    children: {
      control: false,
    },
  },
  args: {
    screen: "xl",
    alignment: "center",
    children: (
      <>
        <Card padding={{ block: "xl", inline: "xl" }}>
          <Card.Body>
            <Text>Container</Text>
          </Card.Body>
        </Card>
      </>
    ),
  },
};
