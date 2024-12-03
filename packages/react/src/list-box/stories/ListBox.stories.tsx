import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
// UI Components
import { Theme, ListBox, Button, Text, Avatar, Box } from "../../index";
// Icons
import { FiPenTool, FiFile, FiFilePlus, FiMap, FiTrash, FiLock } from "react-icons/fi";
import { FaMapPin } from "react-icons/fa";

type Story = StoryObj<typeof ListBox>;

const meta: Meta<typeof ListBox> = {
  title: "Components/List Box",
  component: ListBox,
  subcomponents: {
    "ListBox.Group": ListBox.Group as React.FC<unknown>,
    "ListBox.Item": ListBox.Item as React.FC<unknown>,
  },
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
    children: {
      control: false,
    },
  },
  args: {
    children: (
      <>
        <ListBox.Group>
          <ListBox.Item leftSlot={<FiPenTool />} selected>
            Daily notes
          </ListBox.Item>
          <ListBox.Item leftSlot={<FiFile />}>All notes</ListBox.Item>
          <ListBox.Item leftSlot={<FiFilePlus />} disabled>
            Tasks
          </ListBox.Item>
          <ListBox.Item leftSlot={<FiMap />}>Map</ListBox.Item>
          <ListBox.Item
            skin="critical"
            disabled
            leftSlot={<FiTrash />}
            rightSlot={
              <Button leftSlot={<FiLock />} size="xs" appearance="ghost" skin="critical" iconOnly>
                Remove
              </Button>
            }
          >
            Trash
          </ListBox.Item>
        </ListBox.Group>
        <ListBox.Separator />
        <ListBox.Group title="Pinned messages">
          <ListBox.Item
            rightSlot={
              <Button leftSlot={<FaMapPin />} size="xs" appearance="ghost" skin="neutral" iconOnly>
                Remove
              </Button>
            }
          >
            Lee Evans new tour
          </ListBox.Item>
          <ListBox.Item>Individual errors coast</ListBox.Item>
          <ListBox.Item>Re-skin signs</ListBox.Item>
          <ListBox.Item>Reflect roadmap</ListBox.Item>
          <ListBox.Item>Top of mind</ListBox.Item>
        </ListBox.Group>
      </>
    ),
  },
};

export const MultiLine: Story = {
  argTypes: {
    children: {
      control: false,
    },
  },
  args: {
    children: (
      <>
        <ListBox.Group>
          <ListBox.Item leftSlot={<Avatar name="A" />}>
            <Box padding={{ block: "lg" }}>
              <Text size="sm">Headline</Text>
              <Text skin="neutral" size="xs">
                Supporting text that is long enough to fill up multiline lines
              </Text>
            </Box>
          </ListBox.Item>
        </ListBox.Group>
      </>
    ),
  },
};
