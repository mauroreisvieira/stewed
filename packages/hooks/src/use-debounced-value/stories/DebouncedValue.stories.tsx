import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
// UI Components
import { Theme, TextField, Text, Separator } from "@stewed/react";
// Hooks
import { useDebouncedValue } from "../index";

type Story = StoryObj<typeof useDebouncedValue>;

const meta: Meta<typeof useDebouncedValue> = {
  title: "Hooks/useDebouncedValue",
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
    const [inputValue, setInputValue] = useState("");
    const debouncedValue = useDebouncedValue({ value: inputValue });

    const onHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setInputValue(value);
    };

    return (
      <div>
        <TextField
          type="text"
          value={inputValue}
          onChange={onHandleChange}
          placeholder="Type something..."
        />
        <Separator space={{ block: "2xl" }} />
        <Text>Input value: {inputValue}</Text>
        <Text>Debounced value: {debouncedValue}</Text>
      </div>
    );
  }
};
