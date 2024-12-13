/* eslint-disable jsdoc/require-jsdoc */
import React, { useRef } from "react";
import type { Meta, StoryObj } from "@storybook/react";
// UI Components
import { Box, Text, Theme } from "@stewed/react";
// Hooks
import { useIntersectionObserver } from "../index";

type Story = StoryObj<typeof useIntersectionObserver>;

const meta: Meta<typeof useIntersectionObserver> = {
  title: "Hooks/useIntersectionObserver",
  decorators: [
    (Story) => (
      <Theme>
        <Story />
      </Theme>
    )
  ]
};

export default meta;

export const IntersectionObserver: Story = {
  render: function Render() {
    const elementRef = useRef<HTMLDivElement>(null);

    // Using the useIntersectionObserver hook
    const { entries } = useIntersectionObserver({
      elementRef,
      enabled: true, // IntersectionObserver is enabled
      threshold: 1 // trigger when 100% of the element is visible
    });

    return (
      <Box>
        <Box fullScreen>
          <Text skin="neutral">
            Scroll down to observe the target element when 100% of the element is visible
          </Text>
        </Box>
        <Box
          ref={elementRef}
          skin={entries?.isIntersecting ? "primary-faded" : "neutral-faded"}
          padding={{ block: "9xl", inline: "9xl" }}
          radius="md"
        >
          <Text size="xl" alignment="center">
            {entries?.isIntersecting ? "100% on view!" : "Keep scrolling..."}
          </Text>
        </Box>
      </Box>
    );
  }
};
