import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
// UI Components
import { Theme, Segmented } from "../../index";
// Icons
import { FiPackage, FiBell, FiCalendar } from "react-icons/fi";

type Story = StoryObj<typeof Segmented>;

const meta: Meta<typeof Segmented> = {
  title: "Components/Segmented",
  component: Segmented,
  subcomponents: {
    "Segmented.Item": Segmented.Item as React.FC<unknown>,
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
    value: "2",
    size: "md",
    children: (
      <>
        <Segmented.Item leftSlot={<FiPackage />} value="1">
          Orders
        </Segmented.Item>
        <Segmented.Item leftSlot={<FiBell />} value="2">
          Notifications
        </Segmented.Item>
        <Segmented.Item leftSlot={<FiBell />} value="3" disabled>
          Team
        </Segmented.Item>
        <Segmented.Item leftSlot={<FiCalendar />} value="4">
          Calendar
        </Segmented.Item>
      </>
    ),
  },
};
