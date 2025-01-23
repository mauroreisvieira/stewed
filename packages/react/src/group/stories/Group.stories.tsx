import React from "react";
// Storybook
import type { Meta, StoryObj } from "@storybook/react";
// Components
import { Theme, Group, Box, Button, TextField, Text, Icon } from "../../index";

type Story = StoryObj<typeof Group>;

const meta: Meta = {
  title: "Components/Group",
  component: Group,
  decorators: [
    (Story) => (
      <Theme>
        <Story />
      </Theme>
    )
  ]
};

export default meta;

export const Buttons: Story = {
  args: {
    gap: "sm",
    focusOnSelected: true,
    children: (
      <>
        <Button appearance="soft">Button</Button>
        <Button appearance="soft">Button</Button>
        <Button appearance="soft">Button</Button>
        <Button appearance="soft" pressed>
          Button
        </Button>
        <Button appearance="soft">Button</Button>
      </>
    )
  }
};

export const TextFields: Story = {
  args: {
    children: (
      <>
        <TextField appearance="outline" defaultValue={"Input field..."} />
        <TextField appearance="outline" defaultValue={"Input field..."} />
        <TextField appearance="outline" defaultValue={"Input field..."} />
        <TextField appearance="outline" defaultValue={"Input field..."} />
      </>
    )
  }
};

export const Mixed: Story = {
  args: {
    gap: "md"
  },
  render: function Render(args): React.ReactElement {
    return (
      <Box
        inline
        radius="md"
        borderColor="neutral-faded"
        borderStyle="solid"
        borderWidth={1}
        padding={{ block: "xs", inline: "xs" }}
      >
        <Group {...args}>
          <Button
            size="sm"
            skin="neutral"
            appearance="ghost"
            leftSlot={<Icon.Minus size={12} />}
            iconOnly
          >
            Decrease
          </Button>
          <Text size="sm">10</Text>
          <Button
            size="sm"
            skin="neutral"
            appearance="ghost"
            leftSlot={<Icon.Plus size={14} />}
            iconOnly
          >
            Increase
          </Button>
        </Group>
      </Box>
    );
  }
};
