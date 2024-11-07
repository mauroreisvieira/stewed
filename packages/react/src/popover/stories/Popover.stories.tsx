import React, { useState } from "react";
// Storybook
import type { Meta, StoryObj } from "@storybook/react";
// Components
import {
  Button,
  Theme,
  Popover,
  Stack,
  Box,
  Text,
  FormField,
  TextField,
  Card,
  Separator,
} from "../../index";

type Story = StoryObj<typeof Popover>;

const meta: Meta<typeof Popover> = {
  title: "Components/Popover",
  component: Popover,
  decorators: [
    (Story) => (
      <Theme>
        <Box padding={{ block: "7xl", inline: "7xl" }}>
          <Stack justify="center" items="center">
            <Story />
          </Stack>
        </Box>
      </Theme>
    ),
  ],
};

export default meta;

const placements = [
  "top",
  "top-start",
  "top-end",
  "right",
  "right-start",
  "right-end",
  "bottom",
  "bottom-start",
  "bottom-end",
  "left",
  "left-start",
  "left-end",
];

export const Base: Story = {
  args: {
    placement: "bottom",
    offset: 10,
  },
  argTypes: {
    renderAnchor: {
      control: false,
    },
    placement: {
      options: placements,
    },
  },
  render: (args) => {
    return (
      <Popover<HTMLButtonElement>
        {...args}
        renderAnchor={({ ref, isOpen, open, close }) => (
          <Button ref={ref} onClick={isOpen ? close : open}>
            Open popover
          </Button>
        )}
      >
        {() => {
          return (
            <Card shadow="none">
              <Card.Header>
                <Text weight="semi-bold">Dimensions</Text>
                <Text size="sm" skin="neutral">
                  Set the dimensions for the layer.
                </Text>
              </Card.Header>
              <Separator />
              <Card.Body>
                <Stack direction="column" gap="md">
                  {[
                    { label: "Width", defaultValue: "100%" },
                    { label: "Max width", defaultValue: "300px" },
                    { label: "Height", defaultValue: "25px" },
                    { label: "Max height", defaultValue: "auto" },
                  ].map(({ label, defaultValue }) => (
                    <FormField key={label}>
                      <Stack items="center">
                        <Stack size={4}>
                          <FormField.Label>{label}</FormField.Label>
                        </Stack>
                        <Stack size={8}>
                          <FormField.Control>
                            <TextField defaultValue={defaultValue} size="sm" />
                          </FormField.Control>
                        </Stack>
                      </Stack>
                    </FormField>
                  ))}
                </Stack>
              </Card.Body>
            </Card>
          );
        }}
      </Popover>
    );
  },
};

/**
 * This story demonstrates the usage of the `Popover` component with a boundary element.
 * The `boundary` prop is set to reference a `Stack` element, ensuring that the popover
 * will be constrained within that boundary.
 *
 * Note: For this example to work correctly, it should be run outside of an iframe.
 * Running it inside an iframe may cause clipping issues with the popover due to iframe boundaries.
 */
export const Boundary: Story = {
  args: {
    placement: "bottom",
    offset: 10,
  },
  argTypes: {
    renderAnchor: {
      control: false,
    },
    placement: {
      options: placements,
    },
  },
  render: function Render(args) {
    const [ref, setRef] = useState<HTMLDivElement | null>(null);

    return (
      <Card padding={{ inline: "9xl", block: "9xl" }}>
        <Card.Body>
          <Stack ref={(el) => setRef(el)} style={{ height: 200 }}>
            <Popover<HTMLButtonElement>
              {...args}
              boundary={ref}
              renderAnchor={({ ref, isOpen, open, close }) => (
                <Button ref={ref} onClick={isOpen ? close : open}>
                  Open popover
                </Button>
              )}
            >
              {() => {
                return (
                  <Box skin="neutral">
                    <div style={{ width: 100, height: 100 }} />
                  </Box>
                );
              }}
            </Popover>
          </Stack>
        </Card.Body>
      </Card>
    );
  },
};
