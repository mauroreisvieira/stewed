import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
// UI Components
import { Box, Text, Theme } from "@stewed/react";
// Hooks
import { useMediaQuery } from "../index";

type Story = StoryObj<typeof useMediaQuery>;

const meta: Meta<typeof useMediaQuery> = {
  title: "Hooks/useMediaQuery",
  decorators: [
    (Story) => (
      <Theme>
        <Story />
      </Theme>
    )
  ]
};

export default meta;

export const MediaQuery: Story = {
  render: function Render() {
    // Check if the viewport width is at least 768px (for desktop screens)
    const isDesktop = useMediaQuery({ query: "(min-width: 768px)" });

    return (
      <Box>
        <Text skin="neutral" space={{ y: "lg" }}>
          Resize the page to trigger the media query and see the result.
        </Text>
        <Box>
          {isDesktop ? (
            <Text skin="success">Desktop View: You are all set!</Text>
          ) : (
            <Text skin="critical">Mobile View: Try resizing the window!</Text>
          )}
        </Box>
      </Box>
    );
  }
};
