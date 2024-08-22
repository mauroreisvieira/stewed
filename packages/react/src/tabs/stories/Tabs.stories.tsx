import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
// UI Components
import { Theme, Tabs } from "../../index";
// Icons
import { FiPackage, FiBell, FiCalendar } from "react-icons/fi";

type Story = StoryObj<typeof Tabs>;

const meta: Meta<typeof Tabs> = {
  title: "Components/Tabs",
  component: Tabs,
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
    alignment: "start",
    direction: "row",
    value: "2",
    children: (
      <>
        <Tabs.List>
          <Tabs.Item leftSlot={<FiPackage />} value="1">
            Orders
          </Tabs.Item>
          <Tabs.Item leftSlot={<FiBell />} value="2">
            Notifications
          </Tabs.Item>
          <Tabs.Item leftSlot={<FiBell />} value="3" disabled>
            Team
          </Tabs.Item>
          <Tabs.Item leftSlot={<FiCalendar />} value="4">
            Calendar
          </Tabs.Item>
        </Tabs.List>
      </>
    ),
  },
};
