/* eslint-disable jsdoc/require-jsdoc */
import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
// UI Components
import { Theme, Box, Text } from "@stewed/react";
// Hooks
import { useKey } from "../index";

type Story = StoryObj<typeof useKey>;

const meta: Meta<typeof useKey> = {
  title: "Hooks/useKey",
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
    const [key, setKey] = useState<string | null>(null);

    // Define the callback function for key presses
    const handleKeyPress = (event: KeyboardEvent) => {
      setKey(event.code.toString());
    };

    useKey({
      keys: ["Enter", "Escape"],
      handler: handleKeyPress
    });

    return (
      <Box>
        <Text weight="medium" space={{ y: "lg" }}>
          Press <kbd>Enter</kbd> or <kbd>Escape</kbd> to see a message:
        </Text>
        {key && <Text skin="neutral">{key} key was pressed!</Text>}
      </Box>
    );
  }
};

export const Combine: Story = {
  render: function Render() {
    const [key, setKey] = useState<string | null>(null);

    // Define the callback function for key presses
    const handleKeyPress = (event: KeyboardEvent) => {
      setKey(event.code.toString());
    };

    useKey({
      keys: ["cmd+b"],
      handler: handleKeyPress
    });

    return (
      <Box>
        <Text weight="medium" space={{ y: "lg" }}>
          Press <kbd>Cmd/Win</kbd> + <kbd>B</kbd> to see a message:
        </Text>
        {key && <Text skin="neutral">Congratulations, you press the bomb button!</Text>}
      </Box>
    );
  }
};
