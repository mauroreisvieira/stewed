import React from "react";
// UI Components
import { Container, Card, Theme, Group, Button, TextField } from "@stewed/react";
// Hooks
import { useInput } from "../../../packages/hooks/index";
// Icons
import { HiOutlinePlusSm, HiMinusSm } from "react-icons/hi";

const meta = {
  title: "Examples/Ecommerce",
  decorators: [
    (Story) => (
      <Theme>
        <Story />
      </Theme>
    ),
  ],
};

export default meta;

export const OrderSummary = {
  render: function Example() {
    const { value, setValue, onChange } = useInput<number>(1, {
      validate: (newValue) => {
        return newValue >= 0 && newValue <= 100;
      },
    });

    return (
      <Container screen="md" alignment="center" padding={{ block: "7xl" }}>
        <Card>
          <Card.Body>
            <Group gap="sm">
              <Button leftSlot={<HiMinusSm />} onClick={() => setValue(Number(value) - 1)} iconOnly>
                Decrease
              </Button>
              <TextField value={value} onChange={onChange} maxChars={3} alignment="center" />
              <Button
                leftSlot={<HiOutlinePlusSm />}
                onClick={() => setValue(Number(value) + 1)}
                iconOnly>
                Increase
              </Button>
            </Group>
          </Card.Body>
        </Card>
      </Container>
    );
  },
};
