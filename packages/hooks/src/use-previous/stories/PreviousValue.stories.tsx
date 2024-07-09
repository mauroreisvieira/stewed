import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
// UI Components
import { Theme, Button, Text, Separator } from "@stewed/react";
// Hooks
import { usePrevious } from "../index";

type Story = StoryObj<typeof usePrevious>;

const meta: Meta<typeof usePrevious> = {
  title: "Hooks/usePrevious",
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
  render: () => {
    const [count, setCount] = useState<number>(0);
    const previousCount = usePrevious(count);

    const increment = () => {
      setCount((prevCount) => prevCount + 1);
    };

    return (
      <div>
        <Button onClick={increment}>Increment Count</Button>
        <Separator space={{ block: "xl" }} />
        <Text>Current Count: {count}</Text>
        <Text>Previous Count: {previousCount}</Text>
      </div>
    );
  },
};
