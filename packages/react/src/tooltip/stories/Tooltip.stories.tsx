import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
// Components
import { Button, Theme, Text, Tooltip, Box } from "../../index";

type Story = StoryObj<typeof Tooltip>;

const meta: Meta<typeof Tooltip> = {
  title: "Components/Tooltip",
  component: Tooltip,
  decorators: [
    (Story) => (
      <Theme>
        <Box justify="center" items="center" screen="vh" grow>
          <Story />
        </Box>
      </Theme>
    ),
  ],
};

export default meta;

export const Base: Story = {
  render: () => {
    return (
      <Tooltip<HTMLButtonElement>
        placement="top"
        content={
          <Text size="xs" skin="inherit">
            This order has shipping labels.
          </Text>
        }
      >
        {(props) => {
          return <Button {...props}>Order #1001</Button>;
        }}
      </Tooltip>
    );
  },
};
