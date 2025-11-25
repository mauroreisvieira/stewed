import React, { useState } from "react";
// Storybook
import type { Meta, StoryObj } from "@storybook/react";
// UI Component
import { Button, Card, Collapse, type CollapseProps, Theme } from "../../index";

const meta: Meta<typeof Collapse> = {
  title: "Components/Collapse",
  component: Collapse,
  decorators: [
    (Story) => (
      <Theme>
        <Story />
      </Theme>
    )
  ]
};

export default meta;

type Story = StoryObj<Meta<CollapseProps>>;

/** Expanded state with a longer transition duration. */
export const Base: Story = {
  args: {
    isOpened: true,
    children: "This content expands over transition"
  },
  render: function Render(args): React.ReactElement {
    const [isOpened, setOpened] = useState(args.isOpened);

    return (
      <>
        <Button onClick={() => setOpened(!isOpened)}>Toggle Collapse</Button>
        <Collapse {...args} isOpened={isOpened}>
          <Card>
            <Card.Body>{args.children}</Card.Body>
          </Card>
        </Collapse>
      </>
    );
  }
};

/** Collapsed state with no transition. */
export const NoTransition: Story = {
  args: {
    isOpened: false,
    transitionDuration: 0,
    children: "This content collapses quickly"
  },
  render: function Render(args): React.ReactElement {
    const [isOpened, setOpened] = useState(args.isOpened);

    return (
      <>
        <Button onClick={() => setOpened(!isOpened)}>Toggle Collapse</Button>
        <Collapse {...args} isOpened={isOpened}>
          <Card>
            <Card.Body>{args.children}</Card.Body>
          </Card>
        </Collapse>
      </>
    );
  }
};

/** Example with event handlers for expand and collapse callbacks. */
export const Callbacks: Story = {
  args: {
    isOpened: false,
    transitionDuration: 700,
    children: "This content has callbacks on expand/collapse"
  },
  render: function Render(args): React.ReactElement {
    const [isOpened, setOpened] = useState(args.isOpened);

    return (
      <>
        <Button onClick={() => setOpened(!isOpened)}>Toggle Collapse</Button>
        <Collapse {...args} isOpened={isOpened}>
          <Card>
            <Card.Body>{args.children}</Card.Body>
          </Card>
        </Collapse>
      </>
    );
  }
};
