import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
// Components
import { Button, Theme, Stack, Tooltip, Box } from "../../index";

type Story = StoryObj<typeof Tooltip>;

const meta: Meta<typeof Tooltip> = {
  title: "Components/Tooltip",
  component: Tooltip,
  decorators: [
    (Story) => (
      <Theme>
        <Box padding={{ block: "7xl", inline: "7xl" }}>
          <Stack justify="center" items="center">
            <Story />
          </Stack>
        </Box>
      </Theme>
    )
  ]
};

export default meta;

export const Base: Story = {
  args: {
    skin: "default",
    placement: "top"
  },
  argTypes: {
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
        "left-end"
      ]
    }
  },
  render: (args) => {
    return (
      <Tooltip<HTMLButtonElement>
        {...args}
        renderAnchor={(props) => <Button {...props}>Order #1001</Button>}
      >
        This order has shipping labels
      </Tooltip>
    );
  }
};
