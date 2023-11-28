import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Tabs } from "../";
import { FiSearch } from "react-icons/fi";

type Story = StoryObj<typeof Tabs>;

const meta: Meta<typeof Tabs> = {
  title: "Components/Tabs",
  component: Tabs,
  subcomponents: {},
};

export default meta;

export const Base: Story = {
  args: {
    value: "1",
    alignment: "left",
    direction: "row",
    children: (
      <>
        <Tabs.List>
          <Tabs.Item leftSlot={<FiSearch />} value="1">
            Item
          </Tabs.Item>
          <Tabs.Item leftSlot={<FiSearch />} value="2">
            Item Long
          </Tabs.Item>
          <Tabs.Item leftSlot={<FiSearch />} value="3">
            Item Very Long
          </Tabs.Item>
        </Tabs.List>
      </>
    ),
  },
  argTypes: {
    children: { table: { disable: true } },
  },
};
