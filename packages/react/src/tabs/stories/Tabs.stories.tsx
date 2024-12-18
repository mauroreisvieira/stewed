import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
// UI Components
import { Theme, Tabs, Text } from "../../index";
// Icons
import { FiPackage, FiBell, FiCalendar, FiUsers } from "react-icons/fi";

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

const tabs = [
  {
    title: "Orders",
    icon: <FiPackage />,
    value: "orders",
    content: "Panel Orders"
  },
  {
    title: "Notifications",
    icon: <FiBell />,
    value: "notifications",
    content: "Panel Notifications"
  },
  {
    title: "Team",
    icon: <FiUsers />,
    value: "team",
    content: "Panel Team"
  },
  {
    title: "Calendar",
    icon: <FiCalendar />,
    value: "calendar",
    content: "Panel Calendar"
  }
];

type TabValue = "orders" | "notifications" | "team" | "calendar";

export const Uncontrolled: StoryObj<typeof Tabs<TabValue>> = {
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
    defaultValue: "orders",
    onValueChange: undefined,
    keepMounted: true,
    children: (
      <>
        <Tabs.List>
          {tabs.map(({ value, icon, title }) => (
            <Tabs.Item key={value} leftSlot={icon} value={value}>
              {title}
            </Tabs.Item>
          ))}
        </Tabs.List>

        {tabs.map(({ value, content }) => (
          <Tabs.Panel key={value} value={value}>
            <Text>{content}</Text>
          </Tabs.Panel>
        ))}
      </>
    )
  }
};

export const Controlled: StoryObj<typeof Tabs<TabValue>> = {
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
    value: "notifications"
  },
  render: function Render({ value, ...args }): React.ReactElement {
    const [tab, setTab] = useState<TabValue | undefined>(value);

    return (
      <Tabs {...args} value={tab} onValueChange={(checked) => setTab(checked)}>
        <Tabs.List>
          {tabs.map(({ value, icon, title }) => (
            <Tabs.Item key={value} leftSlot={icon} value={value}>
              {title}
            </Tabs.Item>
          ))}
        </Tabs.List>

        {tabs.map(({ value, content }) => (
          <Tabs.Panel key={value} value={value}>
            <Text>{content}</Text>
          </Tabs.Panel>
        ))}
      </Tabs>
    );
  }
};

export const Direction: StoryObj<typeof Tabs<TabValue>> = {
  argTypes: {
    children: {
      control: false
    }
  },
  args: {
    alignment: "end",
    direction: "column",
    defaultValue: "team",
    children: (
      <>
        <Tabs.List>
          {tabs.map(({ value, icon, title }) => (
            <Tabs.Item key={value} leftSlot={icon} value={value}>
              {title}
            </Tabs.Item>
          ))}
        </Tabs.List>

        {tabs.map(({ value, content }) => (
          <Tabs.Panel key={value} value={value}>
            <Text>{content}</Text>
          </Tabs.Panel>
        ))}
      </>
    )
  }
};
