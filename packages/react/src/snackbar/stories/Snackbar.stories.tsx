import React, { useCallback } from "react";
import type { Meta, StoryObj } from "@storybook/react";
// Components
import { Theme, Snackbar, Button, Icon, useSnackbar } from "../../index";

type Story = StoryObj<typeof Snackbar>;

const meta: Meta<typeof Snackbar> = {
  title: "Components/Snackbar",
  component: Snackbar,
  decorators: [
    (Story) => (
      <Theme>
        <Story />
      </Theme>
    )
  ]
};

export default meta;

function Example({ autoDismiss }: { autoDismiss?: number }) {
  const { add, remove } = useSnackbar();

  const onHandleClick = useCallback(() => {
    const idx = new Date().getTime().toString();

    add({
      id: idx,
      title: "You're watching this issue",
      skin: "neutral",
      content: "We'll notify you when there's activity on it.",
      autoDismiss,
      rightSlot: (
        <Button
          leftSlot={<Icon.Cross size={16} />}
          appearance="ghost"
          skin="neutral"
          size="xs"
          iconOnly
          onClick={() => remove(idx)}
        >
          UNDO
        </Button>
      )
    });
  }, [add, autoDismiss, remove]);

  return <Button onClick={onHandleClick}>Show Snackbar</Button>;
}

export const Base: Story = {
  args: {},
  render: function Render(args) {
    return (
      <Snackbar {...args}>
        <Example />
      </Snackbar>
    );
  }
};

/** Use the `autoDismiss` prop to automatically hide the notification after a set period of time (in milliseconds). */
export const AutomaticDismiss: Story = {
  args: {
    max: 5,
    screen: "sm",
    placement: "bottom-start"
  },
  render: function Render(args) {
    return (
      <Snackbar {...args}>
        <Example autoDismiss={5000} />
      </Snackbar>
    );
  }
};
