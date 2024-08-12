import React, { useRef, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
// UI Components
import { Theme, Text, Stack, Box } from "@stewed/react";
// Hooks
import { useClickOutside } from "../index";

type Story = StoryObj<typeof useClickOutside>;

const meta: Meta<typeof useClickOutside> = {
  title: "Hooks/useClickOutside",
  decorators: [
    (Story) => (
      <Theme>
        <Story />
      </Theme>
    ),
  ],
};

export default meta;

export const Outside: Story = {
  render: () => {
    const containerRef = useRef<HTMLDivElement>(null);

    const [clicks, setClicks] = useState(0);

    // Hook to handle clicks outside the floating element.
    useClickOutside({
      enabled: true,
      ignoredElements: [containerRef.current as Element],
      onClickOutside: () => {
        setClicks((prev) => prev + 1);
      },
    });

    return (
      <>
        <Stack items="center" justify="center">
          <Box ref={containerRef} padding={{ block: "3xl", inline: "3xl" }} skin="neutral-faded">
            <Text size="md">Number of outside clicks: {clicks}</Text>
          </Box>
        </Stack>
      </>
    );
  },
};
