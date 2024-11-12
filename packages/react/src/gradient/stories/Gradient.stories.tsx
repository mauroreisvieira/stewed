import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
// Components
import { Theme, Gradient, Box, Text, Button, Stack, Card } from "../../index";

type Story = StoryObj<typeof Gradient>;

const meta: Meta<typeof Gradient> = {
  title: "Components/Gradient",
  component: Gradient,
  decorators: [
    (Story) => (
      <Theme>
        <Story />
      </Theme>
    ),
  ],
};

export default meta;

export const ClipText: Story = {
  args: {
    from: "pink-400",
    to: "red-900",
  },
  render: function Render({ ...args }) {
    return (
      <Gradient {...args} clipText>
        <Text as="h1" skin="transparent">
          Heading
        </Text>
      </Gradient>
    );
  },
};

export const Background: Story = {
  args: {
    from: "teal-900",
    to: "teal-700",
  },
  render: function Render({ ...args }) {
    return (
      <Gradient {...args}>
        <Card
          padding={{
            block: "xl",
            inline: "xl",
          }}
          shadow="2xl"
        >
          <Card.Header>
            <Text as="h2" skin="white">Startup</Text>
          </Card.Header>
          <Card.Body>
            <Stack direction="column" gap="2xl">
              <Text skin="white">Tailored for propelling your business to success!</Text>
              <Stack items="baseline" gap="sm">
                <Text skin="white" size="4xl" weight="bold">
                  144€
                </Text>
                <Text skin="white" size="xs" weight="medium">
                  /year
                </Text>
              </Stack>
            </Stack>
          </Card.Body>
          <Card.Footer>
            <Button skin="secondary" size="xl" fullWidth>Subscribe</Button>
          </Card.Footer>
        </Card>
      </Gradient>
    );
  },
};
