import React, { useRef, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
// UI Components
import { Box, Stack, Text, Theme } from "@stewed/react";
// Hooks
import { useResizeObserver } from "../index";

type Story = StoryObj<typeof useResizeObserver>;

const meta: Meta<typeof useResizeObserver> = {
  title: "Hooks/useResizeObserver",
  decorators: [
    (Story) => (
      <Theme>
        <Story />
      </Theme>
    ),
  ],
};

export default meta;

export const ResizeObserver: Story = {
  render: function Render() {
    const elementRef = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    // Use the hook, passing in the ref, enabled flag, and onChange callback
    useResizeObserver({
      elementRef,
      handler: (entries: ResizeObserverEntry[]) => {
        const entry = entries[0];
        if (entry) {
          setDimensions({
            width: entry.contentRect.width,
            height: entry.contentRect.height,
          });
        }
      },
    });

    return (
      <Stack direction="column" gap="xl">
        <Text skin="neutral" alignment="center">
          Resize this box
        </Text>
        <Box
          ref={elementRef}
          radius="md"
          borderColor="neutral-faded"
          borderStyle="solid"
          style={{
            boxSizing: "border-box",
            minHeight: 100,
            resize: "both",
            overflow: "auto",
          }}
        />
        <Box>
          <Text>Width: {dimensions.width}px</Text>
          <Text>Height: {dimensions.height}px</Text>
        </Box>
      </Stack>
    );
  },
};
