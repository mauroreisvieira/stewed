import React from "react";
// UI Components
import {
  Container,
  Card,
  Stack,
  Box,
  Group,
  FormField,
  TextField,
  Button,
  Text
} from "@stewed/react";
// Hooks
import { useSelect, useInputMask } from "@stewed/hooks";
// Icons
import { FaCreditCard, FaPaypal, FaApple } from "react-icons/fa";

const items = [
  {
    name: "Card",
    icon: <FaCreditCard size={24} />
  },
  {
    name: "Paypal",
    icon: <FaPaypal size={24} />
  },
  {
    name: "Apple",
    icon: <FaApple size={24} />
  }
];

export function PaymentMethod(): React.ReactElement {
  // Using the useSelect hook to manage selection
  const { index, setIndex } = useSelect<{ name: string; icon: React.ReactNode }>(items, 0);

  const regexPatterns = {
    name: /^[a-zA-Z ]+$/,
    creditCard: /^\d{4}(\s?\d{4}){3}$/, // Matches 4 groups of 4 digits (e.g., 1234 5678 1234 5678)
    cvv: /^\d{3,4}$/, // Matches 3 or 4 digits (e.g., 123 or 1234)
    expireDate: /^(0[1-9]|1[0-2])\/\d{2}$/ // MM/YY format (e.g., 12/25)
  };

  const nameMask = useInputMask({
    defaultValue: "Benjamin Martinez",
    pattern: regexPatterns.name,
    required: true
  });

  const creditCardMask = useInputMask({
    defaultValue: "1234567812345678",
    mask: "XXXX XXXX XXXX XXXX",
    pattern: regexPatterns.creditCard,
    required: true
  });

  const cvvMask = useInputMask({
    defaultValue: "123",
    mask: "XXX",
    pattern: regexPatterns.cvv,
    required: true
  });

  const expireDateMask = useInputMask({
    defaultValue: "03/24",
    mask: "MM/YY",
    pattern: regexPatterns.expireDate,
    required: true
  });

  return (
    <Container screen="sm" alignment="center" padding={{ block: "7xl" }}>
      <Card>
        <Card.Header>
          <Stack gap="2xl">
            <Text as="h5">Payment Method</Text>
          </Stack>
          <Text size="sm" skin="neutral">
            Add a new payment method to your account.
          </Text>
        </Card.Header>
        <Card.Body>
          <Box space={{ y: "xl" }}>
            <Group gap="md" fullWidth>
              {items.map(({ name, icon }, idx) => (
                <Box
                  as="button"
                  key={name}
                  radius="md"
                  skin={idx === index ? "success-faded" : "white"}
                  borderWidth={1}
                  borderStyle="solid"
                  aria-selected={idx === index}
                  borderColor={idx === index ? "success" : "neutral-faded"}
                  padding={{ inline: "lg", block: "lg" }}
                  onClick={() => setIndex(idx)}
                  fullWidth
                >
                  <Text size="2xl" space={{ y: "sm" }} alignment="center">
                    {icon}
                  </Text>
                  <Text size="sm" weight="medium" alignment="center">
                    {name}
                  </Text>
                </Box>
              ))}
            </Group>
          </Box>
          <Stack direction="column" gap="lg">
            <FormField>
              <FormField.Label>Name</FormField.Label>
              <FormField.Control>
                <TextField
                  id="name"
                  type="name"
                  skin={nameMask.isValid ? "neutral" : "critical"}
                  value={nameMask.value}
                  onChange={nameMask.onChange}
                  onBlur={nameMask.onBlur}
                  placeholder="Card name"
                  fullWidth
                />
              </FormField.Control>
            </FormField>

            <FormField>
              <FormField.Label>Card number</FormField.Label>
              <FormField.Control>
                <TextField
                  id="card"
                  type="text"
                  skin={creditCardMask.isValid ? "neutral" : "critical"}
                  value={creditCardMask.value}
                  onChange={creditCardMask.onChange}
                  onBlur={creditCardMask.onBlur}
                  fullWidth
                />
              </FormField.Control>
            </FormField>

            <Stack gap="xl">
              <Stack size={8}>
                <FormField>
                  <FormField.Label>Expires</FormField.Label>
                  <FormField.Control>
                    <TextField
                      placeholder="Select a date"
                      skin={expireDateMask.isValid ? "neutral" : "critical"}
                      value={expireDateMask.value}
                      onChange={expireDateMask.onChange}
                      onBlur={expireDateMask.onBlur}
                      fullWidth
                    />
                  </FormField.Control>
                </FormField>
              </Stack>

              <Stack size={4}>
                <FormField>
                  <FormField.Label>CVC</FormField.Label>
                  <FormField.Control>
                    <TextField
                      id="cvc"
                      type="text"
                      skin={cvvMask.isValid ? "neutral" : "critical"}
                      value={cvvMask.value}
                      onChange={cvvMask.onChange}
                      onBlur={cvvMask.onBlur}
                    />
                  </FormField.Control>
                </FormField>
              </Stack>
            </Stack>
          </Stack>
        </Card.Body>
        <Card.Footer>
          <Button size="lg" appearance="soft" fullWidth>
            Save
          </Button>
        </Card.Footer>
      </Card>
    </Container>
  );
}
