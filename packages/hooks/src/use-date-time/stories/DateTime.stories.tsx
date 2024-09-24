import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
// UI Components
import { Theme, Text, List } from "@stewed/react";
// Hooks
import { useDateTime } from "../index";

type Story = StoryObj<typeof useDateTime>;

const meta: Meta<typeof useDateTime> = {
  title: "Hooks/useDateTime",
  decorators: [
    (Story) => (
      <Theme>
        <Story />
      </Theme>
    ),
  ],
};

export default meta;

export const Format: Story = {
  render: function Render() {
    const { createDate } = useDateTime();

    return (
      <Text>{createDate().format({ dateStyle: "medium", timeStyle: "short", hour12: true })}</Text>
    );
  },
};

export const Subtract: Story = {
  render: function Render() {
    const { createDate } = useDateTime();

    const date = createDate().subtract(1, "years").add(2, "months").format({ dateStyle: "full" });

    return <Text>{date}</Text>;
  },
};

export const Diff: Story = {
  render: function Render() {
    const { createDate } = useDateTime();

    const startDate = createDate("1990-06-01");
    const endDate = createDate("2019-07-02");

    const years = startDate.diff(endDate.currentDate(), "years");
    const months = startDate.add(years, "years").diff(endDate.currentDate(), "months");
    const days = startDate.add(months, "months").diff(endDate.currentDate(), "days");

    return (
      <List>
        <List.Item>Years: {years}</List.Item>
        <List.Item>Months: {months}</List.Item>
        <List.Item>Days: {days}</List.Item>
      </List>
    );
  },
};
