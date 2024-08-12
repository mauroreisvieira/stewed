import React, { useRef, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
// UI Components
import { Theme, Text, Scope, Button, Box, Stack } from "@stewed/react";
// Hooks
import { useFloating } from "../index";

type Story = StoryObj<typeof useFloating>;

const meta: Meta<typeof useFloating> = {
  title: "Hooks/useFloating",
  decorators: [
    (Story) => (
      <Theme>
        <Story />
      </Theme>
    ),
  ],
};

export default meta;

export const Floating: Story = {
  render: function Render() {
    const btnRef = useRef<HTMLButtonElement>(null);

    const [isOpen, setOpen] = useState(false);

    const { floating, x, y, isPositioned } = useFloating<HTMLButtonElement, HTMLDivElement>({
      open: isOpen,
      placement: "bottom-start",
      reference: btnRef.current,
      offset: 2,
    });

    return (
      <>
        <Button ref={btnRef} onClick={() => setOpen(!isOpen)}>
          Click Me
        </Button>
        {isOpen && (
          <Scope elevation="navigation">
            <Box
              ref={floating}
              padding={{ block: "3xl", inline: "3xl" }}
              skin="neutral-faded"
              style={{
                position: "absolute",
                visibility: isPositioned ? "visible" : "hidden",
                left: `${x}px`,
                top: `${y}px`,
              }}>
              <Stack items="center" justify="center">
                <Text size="md">Text Floating...</Text>
              </Stack>
            </Box>
          </Scope>
        )}
      </>
    );
  },
};
