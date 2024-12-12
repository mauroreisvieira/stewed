import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
// UI Components
import { Theme, Stack, TextField, FormField } from "@stewed/react";
// Hooks
import { useInputMask } from "../index";

type Story = StoryObj<typeof useInputMask>;

const meta: Meta<typeof useInputMask> = {
  title: "Hooks/useInputMask",
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
  render: function Render() {
    const regexPatterns = {
      // Phone number pattern (with optional country code, area code, and various separators)
      phone: /^\(\d{3}\)\s\d{9}$/,
      // ZIP code pattern (allows 5 digits or 5 digits with a hyphen and 4 digits)
      zip: /^\d{4}(-\d{3})?$/, // e.g., 1234-678
      // Credit card pattern (matches credit card number with 4 groups of digits, optionally separated by spaces)
      creditCard: /^\d{4}(\s?\d{4}){3}$/, // Matches 4 groups of 4 digits (e.g., 1234 5678 1234 5678)
      // CVV pattern (matches 3 or 4 digits, typically used for credit card CVV)
      cvv: /^\d{3,4}$/, // Matches 3 or 4 digits (e.g., 123 or 1234)
      // Expiration date pattern for MM/YY format (months 01-12 and 2-digit year)
      expireDate: /^(0[1-9]|1[0-2])\/\d{2}$/ // MM/YY format (e.g., 12/25)
    };

    const phoneMask = useInputMask({
      mask: "(XXX) XXXXXXXXX",
      pattern: regexPatterns.phone
    });

    const zipMask = useInputMask({
      mask: "XXXX-XXX",
      pattern: regexPatterns.zip
    });

    const creditCardMask = useInputMask({
      mask: "XXXX XXXX XXXX XXXX",
      pattern: regexPatterns.creditCard
    });

    const cvvMask = useInputMask({
      pattern: regexPatterns.cvv
    });

    const expireDateMask = useInputMask({
      mask: "MM/YY",
      pattern: regexPatterns.expireDate
    });

    return (
      <Stack direction="column" gap="lg">
        <FormField>
          <FormField.Label htmlFor="phone">Phone number</FormField.Label>
          <FormField.Control>
            <TextField
              id="phone"
              type="text"
              skin={phoneMask.isValid ? "neutral" : "critical"}
              value={phoneMask.value}
              onChange={phoneMask.onChange}
              onBlur={phoneMask.onBlur}
              placeholder="(321) 991910191"
            />
          </FormField.Control>
          <FormField.Description>
            Phone number pattern (with optional country code)
          </FormField.Description>
        </FormField>

        <FormField>
          <FormField.Label htmlFor="zip">Zip code</FormField.Label>
          <FormField.Control>
            <TextField
              id="zip"
              type="text"
              skin={zipMask.isValid ? "neutral" : "critical"}
              value={zipMask.value}
              onChange={zipMask.onChange}
              onBlur={zipMask.onBlur}
              placeholder="1234-567"
            />
          </FormField.Control>
          <FormField.Description>
            ZIP code pattern (allows 4 digits with a hyphen and 3 digits)
          </FormField.Description>
        </FormField>

        <FormField>
          <FormField.Label htmlFor="creditCard">Credit card</FormField.Label>
          <FormField.Control>
            <TextField
              type="text"
              id="creditCard"
              skin={creditCardMask.isValid ? "neutral" : "critical"}
              value={creditCardMask.value}
              onChange={creditCardMask.onChange}
              onBlur={creditCardMask.onBlur}
              placeholder="1234 5678 9123 5679"
            />
          </FormField.Control>
          <FormField.Description>
            Credit card pattern (matches credit card number with 4 groups of digits, optionally
            separated by spaces)
          </FormField.Description>
        </FormField>

        <FormField>
          <FormField.Label htmlFor="cvv">CVV</FormField.Label>
          <FormField.Control>
            <TextField
              type="text"
              id="cvv"
              skin={cvvMask.isValid ? "neutral" : "critical"}
              value={cvvMask.value}
              onChange={cvvMask.onChange}
              onBlur={cvvMask.onBlur}
              placeholder="123 or 3456"
            />
          </FormField.Control>
          <FormField.Description>
            CVV pattern (matches 3 or 4 digits, typically used for credit card CVV)
          </FormField.Description>
        </FormField>

        <FormField>
          <FormField.Label htmlFor="expireDate">Expire date</FormField.Label>
          <FormField.Control>
            <TextField
              type="text"
              id="expireDate"
              skin={expireDateMask.isValid ? "neutral" : "critical"}
              value={expireDateMask.value}
              onChange={expireDateMask.onChange}
              onBlur={expireDateMask.onBlur}
              placeholder="01/12"
            />
          </FormField.Control>
          <FormField.Description>
            Expiration date pattern for MM/YY format (months 01-12 and 2-digit year)
          </FormField.Description>
        </FormField>
      </Stack>
    );
  }
};
