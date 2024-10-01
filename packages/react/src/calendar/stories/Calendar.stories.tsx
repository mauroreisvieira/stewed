import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
// Components
import { Theme, Calendar, DateOrArrayDates } from "../../index";

type Story = StoryObj<typeof Calendar>;

const now = new Date();

const DAYS_WEEK = {
  SUNDAY: 0,
  MONDAY: 1,
  TUESDAY: 2,
  WEDNESDAY: 3,
  THURSDAY: 4,
  FRIDAY: 5,
  SATURDAY: 6,
};

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
  argTypes: {
    lang: {
      control: {
        type: "select",
        labels: {
          "en-EN": "English",
          "pt-PT": "Portuguese",
          "fr-FR": "French",
          "es-ES": "Spanish",
          "de-DE": "German",
          "it-IT": "Italian",
        },
      },
      options: ["en-EN", "pt-PT", "fr-FR", "es-ES", "de-DE", "it-IT"],
    },
    weekStart: {
      control: {
        type: "select",
        labels: {
          0: "Sunday",
          1: "Monday",
          2: "Tuesday",
          3: "Wednesday",
          4: "Thursday",
          5: "Friday",
          6: "Saturday",
        },
      },
      options: Object.values(DAYS_WEEK),
    },
    disabledDaysOfWeek: {
      control: {
        type: "check",
        labels: {
          0: "Sunday",
          1: "Monday",
          2: "Tuesday",
          3: "Wednesday",
          4: "Thursday",
          5: "Friday",
          6: "Saturday",
        },
      },
      options: Object.values(DAYS_WEEK),
    },
  },
  args: {
    multipleSelect: false,
    highlightedToday: false,
    readOnly: false,
    locked: false,
    range: false,
    rtl: false,
    disabledPastDates: false,
    siblingMonthDays: true,
    weekStart: 0,
    disabledDaysOfWeek: undefined,
    lang: undefined,
  },
};

export default meta;

const Template = (args) => {
  const [selectedDates, setSelectedDates] = useState<DateOrArrayDates>(args.selectedDates);

  return <Calendar {...args} selectedDates={selectedDates} setSelectedDates={setSelectedDates} />;
};

export const Base: Story = {
  render: Template.bind({}),
};

export const Highlighted: Story = {
  ...Base,
  args: {
    highlightedDates: [
      {
        days: [
          new Date(new Date().setDate(now.getDate() + 1)),
          new Date(new Date().setDate(now.getDate() + 2)),
          new Date(new Date().setDate(now.getDate() + 3)),
        ],
      },
    ],
  },
};

export const DisabledDates: Story = {
  ...Base,
  args: {
    disabledDates: [
      new Date(new Date().setDate(now.getDate() + 1)),
      new Date(new Date().setDate(now.getDate() + 2)),
      new Date(new Date().setDate(now.getDate() + 3)),
    ],
  },
};

export const Range: Story = {
  ...Base,
  args: {
    range: true,
    selectedDates: [
      [
        new Date(new Date().setDate(now.getDate() + 2)),
        new Date(new Date().setDate(now.getDate() + 7)),
      ],
    ],
    disabledDates: [
      [
        new Date(new Date().setDate(now.getDate() + 2)),
        new Date(new Date().setDate(now.getDate() + 7)),
      ],
    ],
  },
};

export const Boundaries: Story = {
  ...Base,
  args: {
    minDate: new Date(new Date().setDate(now.getDate() - 3)),
    maxDate: new Date(new Date().setDate(now.getDate() + 3)),
  },
};
