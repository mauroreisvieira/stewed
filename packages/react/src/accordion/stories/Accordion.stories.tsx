import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
// UI Components
import { Theme, Accordion, Text, Separator } from "../../index";
// Icons
import { FiPlus, FiMinus } from "react-icons/fi";

type Story = StoryObj<typeof Accordion>;

const meta: Meta<typeof Accordion> = {
  title: "Components/Accordion",
  component: Accordion,
  subcomponents: {
    "Accordion.Item": Accordion.Item as React.FC<unknown>,
    "Accordion.Header": Accordion.Header as React.FC<unknown>,
    "Accordion.Body": Accordion.Body as React.FC<unknown>,
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
  args: {
    appearance: "border",
    children: (
      <>
        <Accordion.Item>
          {({ open }) => (
            <>
              <Accordion.Header rightSlot={open ? <FiMinus /> : <FiPlus />}>
                Item 1
              </Accordion.Header>
              <Accordion.Body>
                <Text>Body for Item 1</Text>
              </Accordion.Body>
            </>
          )}
        </Accordion.Item>
        <Separator />
        <Accordion.Item>
          {({ open }) => (
            <>
              <Accordion.Header rightSlot={open ? <FiMinus /> : <FiPlus />}>
                Item 2
              </Accordion.Header>
              <Accordion.Body>
                <Text>Body for Item 2</Text>
              </Accordion.Body>
            </>
          )}
        </Accordion.Item>
      </>
    ),
  },
};
