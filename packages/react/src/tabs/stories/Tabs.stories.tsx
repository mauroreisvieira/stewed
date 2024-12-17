import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
// UI Components
import { Theme, Tabs, Text } from "../../index";
// Icons
import { FiPackage, FiBell, FiCalendar } from "react-icons/fi";

type Story = StoryObj<typeof Tabs>;

const meta: Meta<typeof Tabs> = {
  title: "Components/Tabs",
  component: Tabs,
  subcomponents: {
    "Tabs.List": Tabs.List as React.FC<unknown>,
    "Tabs.Item": Tabs.Item as React.FC<unknown>,
    "Tabs.Panel": Tabs.Panel as React.FC<unknown>
  },
  argTypes: {
    onValueChange: {
      control: false
    },
    children: {
      control: false
    }
  },
  args: {
    onValueChange: undefined
  },
  decorators: [
    (Story) => (
      <Theme>
        <Story />
      </Theme>
    )
  ]
};

export default meta;

export const Uncontrolled: Story = {
  argTypes: {
    value: {
      control: false
    },
    direction: {
      control: false
    },
    alignment: {
      control: false
    }
  },
  args: {
    defaultValue: "2",
    onValueChange: undefined,
    keepMounted: true,
    hiddenUntilFound: false,
    children: (
      <>
        <Tabs.List>
          <Tabs.Item leftSlot={<FiPackage />} value="1">
            Orders
          </Tabs.Item>
          <Tabs.Item leftSlot={<FiBell />} value="2">
            Notifications
          </Tabs.Item>
          <Tabs.Item leftSlot={<FiBell />} value="3">
            Team
          </Tabs.Item>
          <Tabs.Item leftSlot={<FiCalendar />} value="4">
            Calendar
          </Tabs.Item>
        </Tabs.List>
        <Tabs.Panel value="1">
          <Text>Panel Orders</Text>
        </Tabs.Panel>
        <Tabs.Panel value="2">
          <Text>Panel Notifications</Text>
        </Tabs.Panel>
        <Tabs.Panel value="3">
          <Text>Panel Team</Text>
        </Tabs.Panel>
        <Tabs.Panel value="4">
          <Text>Panel Calendar</Text>
        </Tabs.Panel>
      </>
    )
  }
};

export const Controlled: Story = {
  argTypes: {
    defaultValue: {
      control: false
    },
    children: {
      control: false
    },
    direction: {
      control: false
    },
    alignment: {
      control: false
    }
  },
  args: {
    value: "1"
  },
  render: function Render({ value, ...args }): React.ReactElement {
    const [tab, setTab] = useState<string | undefined>(value);

    return (
      <Tabs {...args} value={tab} onValueChange={(checked) => setTab(checked)}>
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
        <Tabs.Panel value="1">
          <Text>Panel 1</Text>
        </Tabs.Panel>
        <Tabs.Panel value="2">
          <Text>Panel 2</Text>
        </Tabs.Panel>
        <Tabs.Panel value="3">
          <Text>Panel 3</Text>
        </Tabs.Panel>
        <Tabs.Panel value="4">
          <Text>Panel 4</Text>
        </Tabs.Panel>
      </Tabs>
    );
  }
};

export const Direction: Story = {
  argTypes: {
    children: {
      control: false
    }
  },
  args: {
    alignment: "end",
    direction: "column",
    defaultValue: "3",
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
        <Tabs.Panel value="1">
          <Text>Panel 1</Text>
        </Tabs.Panel>
        <Tabs.Panel value="2">
          <Text>Panel 2</Text>
        </Tabs.Panel>
        <Tabs.Panel value="3">
          <Text>Panel 3</Text>
        </Tabs.Panel>
        <Tabs.Panel value="4">
          <Text>Panel 4</Text>
        </Tabs.Panel>
      </>
    )
  }
};
