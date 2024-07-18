import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
// UI Components
import { Theme, Button } from "@stewed/react";
// Hooks
import { useToggle } from "../index";

type Story = StoryObj<typeof useToggle>;

const meta: Meta<typeof useToggle> = {
  title: "Hooks/useToggle",
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
  render: () => {
    // Hook to handle clicks outside the floating element.
    const [isToggle, handleToggle] = useToggle(false);

    return (
      <>
        <Button skin="primary" appearance={isToggle ? "filled" : "outline"} onClick={handleToggle}>
          Button: {isToggle ? "On" : "Off"}
        </Button>
      </>
    );
  },
};
