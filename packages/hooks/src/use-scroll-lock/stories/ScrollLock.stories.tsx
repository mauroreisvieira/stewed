import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
// UI Components
import { Theme, Box, Button } from "@stewed/react";
// Hooks
import { useScrollLock } from "../index";

type Story = StoryObj<typeof useScrollLock>;

const meta: Meta<typeof useScrollLock> = {
  title: "Hooks/useScrollLock",
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
  render: function Render() {
    const [locked, setLocked] = useState(false);

    useScrollLock({ enabled: locked });

    return (
      <Box fullScreen>
        <Button onClick={() => setLocked(!locked)}>{locked ? "Unlock" : "Lock"} Scroll</Button>
      </Box>
    );
  },
};
