import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
// UI Components
import { Theme, Text, Separator, Grid, TextField } from "@stewed/react";
// Hooks
import { useKeyboardNavigation } from "../index";

type Story = StoryObj<typeof useKeyboardNavigation>;

const meta: Meta<typeof useKeyboardNavigation> = {
  title: "Hooks/useKeyboardNavigation",
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
    const { ref, currentIndex, setFocusedIndex, onNavigate } =
      useKeyboardNavigation<HTMLDivElement>({
        target: "input",
      });

    return (
      <>
        <Text as="h2">Keyboard Navigation Example</Text>
        <Text>Current Index: {currentIndex}</Text>

        <Separator space={{ block: "xl" }} />

        <Grid as="div" ref={ref} cols={4} gap="md" onKeyDown={onNavigate}>
          {Array.from({ length: 4 }).map((_, idx) => (
            <TextField
              type="number"
              key={idx}
              onChange={() => {
                setFocusedIndex(idx + 1);
              }}
            />
          ))}
        </Grid>
      </>
    );
  },
};
