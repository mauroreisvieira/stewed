import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
// UI Components
import { Theme, ListBox } from "../../index";
// Icons
import { FiPenTool, FiFile, FiFilePlus, FiMap, FiTrash, FiLock, FiMapPin } from "react-icons/fi";

type Story = StoryObj<typeof ListBox>;

const meta: Meta<typeof ListBox> = {
  title: "Components/List Box",
  component: ListBox,
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
            <span>Daily notes</span>
          </ListBox.Item>
          <ListBox.Item leftSlot={<FiFile />}>All notes</ListBox.Item>
          <ListBox.Item leftSlot={<FiFilePlus />} disabled>
            <span>Tasks</span>
          </ListBox.Item>
          <ListBox.Item leftSlot={<FiMap />}>
            <span>Map</span>
          </ListBox.Item>
          <ListBox.Item skin="critical" leftSlot={<FiTrash />} rightSlot={<FiLock />}>
            <span>Trash</span>
          </ListBox.Item>
        </ListBox.Group>
        <ListBox.Group title="Pinned messages">
          <ListBox.Item rightSlot={<FiMapPin />}>Lee Evans new tour</ListBox.Item>
          <ListBox.Item>Individual errors coast</ListBox.Item>
          <ListBox.Item>Re-skin signs</ListBox.Item>
          <ListBox.Item>Reflect roadmap</ListBox.Item>
          <ListBox.Item>Top of mind</ListBox.Item>
        </ListBox.Group>
      </>
    ),
  },
};
