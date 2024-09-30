import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
// Components
import { Theme, Calendar } from "../../index";

type Story<T> = StoryObj<typeof Calendar<T>>;

const meta: Meta<typeof Calendar> = {
  title: "Components/Calendar",
  component: Calendar,
  decorators: [
    (Story) => (
      <Theme>
        <Story />
      </Theme>
    ),
  ],
};

export default meta;

export const Base: Story<unknown> = {
  args: {},
};

export const WeekStart: Story<unknown> = {
  args: {
    weekStart: 1,
  },
};

export const Locked: Story<unknown> = {
  args: {
    locked: true,
  },
};

export const DisabledWeekend: Story<unknown> = {
  args: {
    disabledDaysOfWeek: [0, 6],
  },
};

export const DisabledPastDates: Story<unknown> = {
  args: {
    disabledPastDates: true,
  },
};

export const DisabledDates: Story<unknown> = {
  args: {
    disabledDates: [new Date()],
  },
};

export const Range: Story<unknown> = {
  args: {
    range: true,
    selectedDates: [[ new Date("2024-10-08"), new Date("2024-10-10") ]]
  },
};

export const Boundaries: Story<unknown> = {
  args: {
    minDate: new Date("2024-09-10"),
    maxDate: new Date("2024-09-20"),
  },
};

export const SiblingMonthDays: Story<unknown> = {
  args: {
    siblingMonthDays: true,
  },
};

export const Language: Story<unknown> = {
  args: {
    lang: "pt-PT",
  },
};

export const RTL: Story<unknown> = {
  args: {
    rtl: true,
  },
};
