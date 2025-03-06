import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
// UI Components
import { Theme, Dialog, Text, Button } from "../../index";
// Hooks
import { useToggle } from "@stewed/hooks";

type Story = StoryObj<typeof Dialog>;

const meta: Meta<typeof Dialog> = {
  title: "Components/Dialog",
  component: Dialog,
  subcomponents: {
    "Dialog.Header": Dialog.Header as React.FC<unknown>,
    "Dialog.Body": Dialog.Body as React.FC<unknown>,
    "Dialog.Footer": Dialog.Footer as React.FC<unknown>
  },
  decorators: [
    (Story) => (
      <Theme>
        <Story />
      </Theme>
    )
  ]
};

export default meta;

export const Base: Story = {
  argTypes: {
    children: {
      control: false
    }
  },
  render: function Render({ ...args }): React.ReactElement {
    const { isOn, toggle } = useToggle(false);

    return (
      <>
        <Button onClick={toggle}>Open</Button>
        <Dialog
          size="sm"
          open={isOn}
          {...args}
          onClose={toggle}
          onEscape={toggle}
          onClickOutside={toggle}
        >
          <Dialog.Header>
            <Text as="h4">Dialog Header</Text>
          </Dialog.Header>
          <Dialog.Body>
            <Text>
              Pellentesque elementum diam sapien, nec ultrices risus convallis eget. Nam pharetra
              dolor at dictum tempor. Quisque ut est a ligula hendrerit sodales. Curabitur ornare a
              nulla in laoreet. Maecenas semper mi egestas, dignissim nisi et, elementum neque.
            </Text>
          </Dialog.Body>
        </Dialog>
      </>
    );
  }
};

export const HugeContent: Story = {
  argTypes: {
    children: {
      control: false
    }
  },
  render: function Render({ ...args }): React.ReactElement {
    const { isOn, toggle } = useToggle(false);

    return (
      <>
        <Button onClick={toggle}>Open</Button>
        <Dialog open={isOn} {...args} onClose={toggle} onEscape={toggle} onClickOutside={toggle}>
          <Dialog.Header>
            <Text as="h4">Dialog Header</Text>
          </Dialog.Header>
          <Dialog.Separator />
          <Dialog.Body>
            {Array.from({ length: 50 }).map(() => (
              <Text key={crypto.randomUUID()}>
                Pellentesque elementum diam sapien, nec ultrices risus convallis eget. Nam pharetra
                dolor at dictum tempor. Quisque ut est a ligula hendrerit sodales. Curabitur ornare
                a nulla in laoreet. Maecenas semper mi egestas, dignissim nisi et, elementum neque.
              </Text>
            ))}
          </Dialog.Body>
          <Dialog.Separator />
          <Dialog.Footer>
            <Text as="h4">Dialog Footer</Text>
          </Dialog.Footer>
        </Dialog>
      </>
    );
  }
};
