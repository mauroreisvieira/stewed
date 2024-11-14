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
  subcomponents: {
    "Tabs.List": Tabs.List as React.FC<unknown>,
    "Tabs.Item": Tabs.Item as React.FC<unknown>,
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
    direction: {
      control: false,
    },
    alignment: {
      control: "select",
      options: ["start", "center", "end"],
    },
  },
  args: {
    value: "2",
    alignment: "center",
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

export const Direction: Story = {
  argTypes: {
    children: {
      control: false,
    },
    direction: {
      control: false,
    },
    alignment: {
      control: "select",
      options: ["start", "end"],
    },
  },
  args: {
    alignment: "end",
    direction: "column",
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
