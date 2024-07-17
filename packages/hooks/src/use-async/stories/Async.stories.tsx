import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
// UI Components
import { Theme } from "@stewed/react";
// Hooks
import { useAsync } from "../index";

type Story = StoryObj<typeof useAsync>;

const meta: Meta<typeof useAsync> = {
  title: "Hooks/useAsync",
  decorators: [
    (Story) => (
      <Theme>
        <Story />
      </Theme>
    ),
  ],
};

export default meta;

const fetchData = async (): Promise<string> => {
  const response = await fetch("https://620fb775ec8b2ee2834a8359.mockapi.io/product");
  return await response.json();
};

export const Async: Story = {
  render: () => {
    const { execute, status, value, error } = useAsync(fetchData, false);

    return (
      <div>
        <h1>Async Data Fetcher</h1>

        {status === "idle" && <p>Start fetching data...</p>}
        {status === "pending" && <p>Loading...</p>}
        {status === "error" && <p>Error: {error?.message}</p>}

        <button onClick={execute} disabled={status === "pending"}>
          Fetch Data
        </button>

        {status === "success" && <pre>{JSON.stringify(value, null, 4)}</pre>}
      </div>
    );
  },
};
