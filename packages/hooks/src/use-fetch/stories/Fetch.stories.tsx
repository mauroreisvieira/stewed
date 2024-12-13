/* eslint-disable jsdoc/require-jsdoc */
import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
// UI Components
import { Box, Theme, Text } from "@stewed/react";
// Hooks
import { useFetch } from "../index";

type Story = StoryObj<typeof useFetch>;

const meta: Meta<typeof useFetch> = {
  title: "Hooks/useFetch",
  decorators: [
    (Story) => (
      <Theme>
        <Story />
      </Theme>
    )
  ]
};

export default meta;

export const Fetch: Story = {
  render: function Render() {
    const { data, status } = useFetch("https://620fb775ec8b2ee2834a8359.mockapi.io/product");

    return (
      <Box>
        <Text as="h1" space={{ y: "lg" }}>
          Fetch Data
        </Text>
        {status && (
          <Text skin="neutral" space={{ y: "md" }}>
            Status: {status}
          </Text>
        )}

        <Text as="pre" skin="neutral-faded">
          {JSON.stringify(data, null, 4)}
        </Text>
      </Box>
    );
  }
};
