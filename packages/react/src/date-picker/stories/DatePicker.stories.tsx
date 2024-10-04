import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
// Components
import { Theme, DatePicker } from "../../index";
// Icons
import { MdOutlineCalendarToday } from "react-icons/md";

type Story = StoryObj<typeof DatePicker>;

const meta: Meta<typeof DatePicker> = {
  title: "Components/Date Picker",
  component: DatePicker,
  decorators: [
    (Story) => (
      <Theme
        tokens={{
          default: {
            components: {
              calendar: {
                radius: "full",
              },
            },
          },
        }}>
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
    leftSlot: {
      control: false,
    },
    rightSlot: {
      control: false,
    },
  },
  args: {
    leftSlot: <MdOutlineCalendarToday />,
    placeholder: "Select a date",
    lang: undefined,
    disabledPastDates: false,
  },
};

export default meta;

const Template = (args) => {
  const [selectedDates, setSelectedDates] = useState();

  return <DatePicker {...args} value={selectedDates} onChange={setSelectedDates} />;
};

export const Base: Story = {
  render: Template.bind({}),
};
