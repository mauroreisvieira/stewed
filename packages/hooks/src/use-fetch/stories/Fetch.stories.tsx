import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
// UI Components
import { Theme } from "@stewed/react";
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
    ),
  ],
};

export default meta;

export const Fetch: Story = {
  render: () => {
    const { data, status } = useFetch("https://620fb775ec8b2ee2834a8359.mockapi.io/product");

    return (
      <div>
        <h1>Fetch Data</h1>
        {status && <p>Status: {status}</p>}

        <pre>{JSON.stringify(data, null, 4)}</pre>
      </div>
    );
  },
};
