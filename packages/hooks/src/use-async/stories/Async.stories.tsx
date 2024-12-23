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
  // Wait for 2 seconds before making the request
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const response = await fetch("https://620fb775ec8b2ee2834a8359.mockapi.io/product");

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return response.json();
};

export const Async: StoryObj<typeof useAsync> = {
  /**
   * Render function for the Async story.
   * Demonstrates the use of the `useAsync` hook.
   */
  render: function Render() {
    const { execute, status, value, error } = useAsync({ queryFn: fetchData });

    return (
      <Stack direction="column" gap="md">
        <Text as="h1" space={{ y: "lg" }}>
          Async Data Fetcher
        </Text>

        <Box>
          <Button onClick={execute} disabled={value !== null}>
            Fetch Data
          </Button>
        </Box>

        <Text skin="neutral-faded">
          Status:{" "}
          <Text as="span" weight="medium">
            {status}
          </Text>
        </Text>

        {status === "error" && <Text skin="critical">Error: {error?.message}</Text>}

        {value && (
          <Text as="pre" skin="neutral-faded">
            {JSON.stringify(value, null, 4)}
          </Text>
        )}
      </Stack>
    );
  }
};
