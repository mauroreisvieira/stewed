import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
// UI Components
import { Theme, Drawer, Text, Separator, Button } from "../../index";
// Hooks
import { useToggle } from "@stewed/hooks";

type Story = StoryObj<typeof Drawer>;

const meta: Meta<typeof Drawer> = {
  title: "Components/Drawer",
  component: Drawer,
  subcomponents: {
    "Drawer.Header": Drawer.Header as React.FC<unknown>,
    "Drawer.Body": Drawer.Body as React.FC<unknown>,
    "Drawer.Footer": Drawer.Footer as React.FC<unknown>,
  },
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
  argTypes: {
    children: {
      control: false,
    },
  },
  render: function Render({ ...args }): React.ReactElement {
    const [open, toggleOpen] = useToggle();

    return (
      <>
        <Button onClick={toggleOpen}>Open</Button>
        <Drawer
          size="sm"
          open={open}
          {...args}
          onClose={toggleOpen}
          onEscape={toggleOpen}
          onClickOutside={toggleOpen}>
          <Drawer.Header>
            <Text as="h4">Drawer Header</Text>
          </Drawer.Header>
          <Drawer.Body>
            <Text>
              Pellentesque elementum diam sapien, nec ultrices risus convallis eget. Nam pharetra
              dolor at dictum tempor. Quisque ut est a ligula hendrerit sodales. Curabitur ornare a
              nulla in laoreet. Maecenas semper mi egestas, dignissim nisi et, elementum neque.
            </Text>
          </Drawer.Body>
        </Drawer>
      </>
    );
  },
};

export const HugeContent: Story = {
  argTypes: {
    children: {
      control: false,
    },
  },
  render: function Render({ ...args }): React.ReactElement {
    const [open, toggleOpen] = useToggle();

    return (
      <>
        <Button onClick={toggleOpen}>Open</Button>
        <Drawer
          open={open}
          {...args}
          onClose={toggleOpen}
          onEscape={toggleOpen}
          onClickOutside={toggleOpen}>
          <Drawer.Header>
            <Text as="h4">Drawer Header</Text>
          </Drawer.Header>
          <Separator />
          <Drawer.Body>
            {Array.from({ length: 100 }).map((_, index) => (
              <Text key={index}>
                Pellentesque elementum diam sapien, nec ultrices risus convallis eget. Nam pharetra
                dolor at dictum tempor. Quisque ut est a ligula hendrerit sodales. Curabitur ornare
                a nulla in laoreet. Maecenas semper mi egestas, dignissim nisi et, elementum neque.
              </Text>
            ))}
          </Drawer.Body>
          <Separator />
          <Drawer.Footer>
            <Text as="h4">Drawer Footer</Text>
          </Drawer.Footer>
        </Drawer>
      </>
    );
  },
};
