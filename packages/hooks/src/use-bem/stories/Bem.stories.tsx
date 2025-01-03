import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
// UI Components
import { Theme } from "@stewed/react";
// Hooks
import { useBem } from "../index";

const meta: Meta<typeof useBem> = {
  title: "Hooks/useBem",
  decorators: [
    (Story) => (
      <Theme>
        <Story />
      </Theme>
    )
  ]
};

export default meta;

export const Block: StoryObj<typeof useBem> = {
  /** Renders 'block' example. */
  render: function Render() {
    const { getBlock } = useBem({ block: "card" });

    const cssClasses = {
      root: getBlock({ modifiers: ["mod"], extraClasses: "extra" })
    };

    return <pre>{JSON.stringify(cssClasses, null, 4)}</pre>;
  }
};

export const Element: StoryObj<typeof useBem> = {
  /** Renders 'element' example */
  render: function Render() {
    const { getElement } = useBem({ block: "card" });

    const cssClasses = {
      body: getElement(["body"]),
      footer: getElement(["footer"])
    };

    return <pre>{JSON.stringify(cssClasses, null, 4)}</pre>;
  }
};

export const Modifiers: StoryObj<typeof useBem> = {
  /** Renders 'modifier' example .*/
  render: function Render() {
    const { getModifier } = useBem({ block: "card" });

    const cssClasses = {
      primary: getModifier(["primary"])
    };

    return <pre>{JSON.stringify(cssClasses, null, 4)}</pre>;
  }
};
