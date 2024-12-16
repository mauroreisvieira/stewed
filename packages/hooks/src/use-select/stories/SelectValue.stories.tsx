import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
// UI Components
import { Theme, Button, Text, Separator, Select } from "@stewed/react";
// Hooks
import { useSelect } from "../index";

type Story = StoryObj<typeof useSelect>;

const meta: Meta<typeof useSelect> = {
  title: "Hooks/useSelect",
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
    // Example data
    const items = ["Apple", "Banana", "Cherry", "Date"];
    // Using the useSelect hook to manage selection
    const { index, item, setIndex, setItem } = useSelect<string>(items);

    // Event handler to handle selection change
    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const newIndex = Number(event.target.value);
      setIndex(newIndex);
    };

    return (
      <div>
        <Text as="h2">Select Example</Text>
        <Text>Selected Index: {index}</Text>
        <Text>Selected Item: {item}</Text>
        <Separator space={{ block: "xl" }} />
        <Select value={index} onChange={handleSelectChange}>
          {items.map((item, idx) => (
            <Select.Option key={idx} value={idx}>
              {item}
            </Select.Option>
          ))}
        </Select>
        <Separator space={{ block: "xl" }} />
        <Button onClick={() => setItem("Banana")}>Select Banana</Button>
      </div>
    );
  }
};
