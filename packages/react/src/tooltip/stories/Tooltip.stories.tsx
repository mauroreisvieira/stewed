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
        <Box justify="center" items="center" padding={{ block: "7xl", inline: "7xl" }} grow>
          <Story />
        </Box>
      </Theme>
    ),
  ],
};

export default meta;

export const Base: Story = {
  args: {
    skin: "default",
    placement: "top",
  },
  argTypes: {
    content: {
      control: false,
    },
    placement: {
      options: [
        "top",
        "top-start",
        "top-end",
        "right",
        "right-start",
        "right-end",
        "bottom",
        "bottom-start",
        "bottom-end",
        "left",
        "left-start",
        "left-end",
      ],
    },
  },
  render: (args) => {
    return (
      <Tooltip<HTMLButtonElement>
        {...args}
        content={
          <Text size="xs" skin="inherit">
            This order has shipping labels
          </Text>
        }>
        {(props) => {
          return <Button {...props}>Order #1001</Button>;
        }}
      </Tooltip>
    );
  },
};
