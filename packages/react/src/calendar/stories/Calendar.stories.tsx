import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
// Components
import { Theme, Calendar, Badge } from "../../index";

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
  args: {
    defaultDate: new Date(),
  },
};

export const WeekStart: Story<unknown> = {
  args: {
    defaultDate: new Date(),
    weekStart: 1,
  },
};

export const Locked: Story<unknown> = {
  args: {
    defaultDate: new Date(),
    locked: true,
  },
};

export const DisabledDaysOfWeek: Story<unknown> = {
  args: {
    defaultDate: new Date(),
    disabledDaysOfWeek: [0, 6],
  },
};

export const Range: Story<unknown> = {
  args: {
    defaultDate: new Date(),
    range: true,
  },
};

export const Highlighted: Story<{ title: string }> = {
  args: {
    defaultDate: new Date(),
    renderDay: (day) => {
      if (day.details) {
        return <Badge aria-label={day.details?.title} skin="info" />;
      }
    },
    highlightedToday: true,
    highlightedDates: [
      {
        days: [new Date("2024-09-04")],
        data: {
          title: "Business Travel",
        },
      },
      {
        days: [[new Date("2024-09-14"), new Date("2024-09-16")]],
        data: {
          title: "Family Vacations",
        },
      },
    ],
  },
};

export const Boundaries: Story<unknown> = {
  args: {
    defaultDate: new Date(),
    minDate: new Date("2024-09-10"),
    maxDate: new Date("2024-09-20"),
  },
};
