import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
// Components
import { Theme, Text, Card, Stack } from "../../index";

type Story = StoryObj<typeof Stack>;

const meta: Meta<typeof Stack> = {
  title: "Components/Stack",
  component: Stack,
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
    gap: "sm",
    wrap: "nowrap",
    direction: "column",
    children: (
      <>
        <Card padding={{ block: "xl", inline: "xl" }}>
          <Card.Body>
            <Text>Column 1</Text>
          </Card.Body>
        </Card>
        <Card padding={{ block: "xl", inline: "xl" }}>
          <Card.Body>
            <Text>Column 2</Text>
          </Card.Body>
        </Card>
        <Card padding={{ block: "xl", inline: "xl" }}>
          <Card.Body>
            <Text>Column 3</Text>
          </Card.Body>
        </Card>
        <Card padding={{ block: "xl", inline: "xl" }}>
          <Card.Body>
            <Text>Column 4</Text>
          </Card.Body>
        </Card>
      </>
    ),
  },
};
