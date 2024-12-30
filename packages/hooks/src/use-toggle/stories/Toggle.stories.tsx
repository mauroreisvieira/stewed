import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
// UI Components
import { Theme, Button } from "@stewed/react";
// Hooks
import { useToggle } from "../index";

const meta: Meta<typeof useToggle> = {
  title: "Hooks/useToggle",
  decorators: [
    (Story) => (
      <Theme>
        <Story />
      </Theme>
    )
  ]
};

export default meta;

export const Base: StoryObj<typeof useToggle> = {
  /**
   * Render function for the Base story.
   * Demonstrates the use of the `useToggle` hook to manage the toggle state of a button.
   */
  render: function Render() {
    // Hook to handle clicks outside the floating element.
    const [isToggle, handleToggle] = useToggle(false);

    return (
      <>
        <Button skin="primary" appearance={isToggle ? "filled" : "outline"} onClick={handleToggle}>
          Button: {isToggle ? "On" : "Off"}
        </Button>
      </>
    );
  }
};
