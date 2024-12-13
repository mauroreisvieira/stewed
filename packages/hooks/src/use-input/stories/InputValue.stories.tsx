/* eslint-disable jsdoc/require-jsdoc */
import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
// UI Components
import { Theme, Text, Separator, TextField } from "@stewed/react";
// Hooks
import { useInput } from "../index";

type Story = StoryObj<typeof useInput>;

const meta: Meta<typeof useInput> = {
  title: "Hooks/useInput",
  decorators: [
    (Story) => (
      <Theme>
        <Story />
      </Theme>
    )
  ]
};

export default meta;

export const Base: Story = {
  render: function Render() {
    // Use the custom hook with initial value and validation function
    const { value, onChange } = useInput<string>("", {
      validate: (newValue: string) => {
        return newValue.length <= 9;
      }
    });

    return (
      <div>
        <TextField
          type="text"
          value={value}
          onChange={onChange}
          placeholder="Enter text (max 9 chars)"
        />
        <Separator space={{ block: "xl" }} />
        <Text>Current Value: {value}</Text>
      </div>
    );
  }
};
