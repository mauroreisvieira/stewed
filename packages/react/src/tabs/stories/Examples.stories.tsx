import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Theme, Tabs } from "../../";
import { FiPackage, FiBell, FiCalendar } from "react-icons/fi";

type Story = StoryObj<typeof Tabs>;

const meta: Meta<typeof Tabs> = {
  title: "Components/Tabs",
  component: Tabs,
};

export default meta;

export const Base: Story = {
  args: {
    value: "1",
    alignment: "left",
    direction: "row",
    children: (
      <Theme>
        <Tabs value="1">
          <Tabs.List>
            <Tabs.Item leftSlot={<FiPackage />} value="1">
              Orders
            </Tabs.Item>
            <Tabs.Item leftSlot={<FiBell />} value="2">
              Notifications
            </Tabs.Item>
            <Tabs.Item leftSlot={<FiCalendar />} value="3">
              Calendar
            </Tabs.Item>
          </Tabs.List>
        </Tabs>
      </Theme>
    ),
  },
  argTypes: {
    children: { table: { disable: true } },
  },
};
