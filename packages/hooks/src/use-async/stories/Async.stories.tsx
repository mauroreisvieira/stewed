import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
// UI Components
import { Theme, Box, Text, Button, Stack } from "@stewed/react";
// Hooks
import { useAsync } from "../index";

const meta: Meta<typeof useAsync> = {
  title: "Hooks/useAsync",
  decorators: [
    (Story) => (
      <Theme>
        <Story />
      </Theme>
    )
  ]
};

export default meta;

/** Fetch function to get dump products */
const fetchData = async (): Promise<string> => {
  const response = await fetch("https://620fb775ec8b2ee2834a8359.mockapi.io/product");

  return await response.json();
};

export const Async: StoryObj<typeof useAsync> = {
  /**
   * Render function for the Async story.
   * Demonstrates the use of the `useAsync` hook.
   */
  render: function Render() {
    const { execute, status, value, error } = useAsync(fetchData, false);

    return (
      <Stack direction="column" gap="md">
        <Text as="h1" space={{ y: "lg" }}>
          Async Data Fetcher
        </Text>

        <Box>
          <Button onClick={execute} disabled={status === "success" || status === "pending"}>
            Fetch Data
          </Button>
        </Box>

        {status === "idle" && <Text skin="neutral-faded">Start fetching data...</Text>}
        {status === "pending" && <Text skin="primary">Loading...</Text>}
        {status === "error" && <Text skin="critical">Error: {error?.message}</Text>}

        {status === "success" && (
          <Text as="pre" skin="neutral-faded">
            {JSON.stringify(value, null, 4)}
          </Text>
        )}
      </Stack>
    );
  }
};
