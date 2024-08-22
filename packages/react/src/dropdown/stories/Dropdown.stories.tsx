import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
// Components
import { Button, Theme, Dropdown, Stack, Box, ListBox, Separator } from "../../index";

type Story = StoryObj<typeof Dropdown>;

const meta: Meta<typeof Dropdown> = {
  title: "Components/Dropdown",
  component: Dropdown,
  decorators: [
    (Story) => (
      <Theme>
        <Box padding={{ block: "7xl", inline: "7xl" }}>
          <Stack justify="center" items="center">
            <Story />
          </Stack>
        </Box>
      </Theme>
    ),
  ],
};

export default meta;

export const Base: Story = {
  args: {
    placement: "bottom-start",
  },
  argTypes: {
    renderAnchor: {
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
      <Dropdown<HTMLButtonElement>
        {...args}
        renderAnchor={({ ref, isOpen, open, close }) => (
          <Button ref={ref} onClick={isOpen ? close : open}>
            Edit
          </Button>
        )}>
        {() => {
          return (
            <ListBox>
              <ListBox.Item rightSlot="⌘C">Copy</ListBox.Item>
              <ListBox.Item rightSlot="⌘V">Past</ListBox.Item>
              <Separator space={{ block: "xs" }} />
              <ListBox.Item rightSlot="⌘Z" disabled>Undo</ListBox.Item>
              <ListBox.Item rightSlot="⌘Y">Redo</ListBox.Item>
            </ListBox>
          );
        }}
      </Dropdown>
    );
  },
};
