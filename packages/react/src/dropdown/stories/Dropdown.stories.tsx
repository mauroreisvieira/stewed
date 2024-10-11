import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
// Components
import { Button, Theme, Dropdown, Stack, Box, ListBox, Separator, Text } from "../../index";
// Icons
import { GoChevronRight } from "react-icons/go";

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
              <ListBox.Item
                rightSlot={
                  <Text size="xs" skin="neutral">
                    ⌘+T
                  </Text>
                }>
                New Tab
              </ListBox.Item>
              <ListBox.Item
                rightSlot={
                  <Text size="xs" skin="neutral">
                    ⌘+N
                  </Text>
                }>
                New Window
              </ListBox.Item>
              <Dropdown<HTMLDivElement>
                placement="right-start"
                renderAnchor={({
                  ref: listRef,
                  open: openMoreTools,
                  close: closeMoreTools,
                  isOpen: isOpenMoreTools,
                }) => (
                  <ListBox.Item
                    ref={listRef}
                    rightSlot={
                      <Text skin="neutral">
                        <GoChevronRight />
                      </Text>
                    }
                    onClick={() => (isOpenMoreTools ? closeMoreTools() : openMoreTools())}>
                    More Tools
                  </ListBox.Item>
                )}>
                <ListBox>
                  <ListBox.Item
                    rightSlot={
                      <Text size="xs" skin="neutral">
                        ⌘+S
                      </Text>
                    }>
                    Save Page As
                  </ListBox.Item>
                </ListBox>
              </Dropdown>
              <Separator space={{ block: "xs" }} />
              <ListBox.Item
                rightSlot={
                  <Text size="xs" skin="neutral">
                    ⌘+B
                  </Text>
                }>
                Show Bookmarks
              </ListBox.Item>
              <ListBox.Item>Show Full URLs</ListBox.Item>
            </ListBox>
          );
        }}
      </Dropdown>
    );
  },
};
