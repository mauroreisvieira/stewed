import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
// UI Components
import { Card, Container, FormField, Stack, TextField, Theme } from "@stewed/react";
// Hooks
import { useStateForm } from "../index";

type Story = StoryObj<typeof useStateForm>;

const meta: Meta<typeof useStateForm> = {
  title: "Hooks/useStateForm",
  decorators: [
    (Story) => (
      <Theme>
        <Story />
      </Theme>
    ),
  ],
};

export default meta;

export const Validators: Story = {
  render: function Render() {
    const {
      formData: { email, password },
      onFormChange,
    } = useStateForm({
      initialValues: {
        email: "",
        password: "",
      },
      validators: ({ email, password }) => ({
        email: {
          condition: () => {
            return email ? /[\d%+._a-z-]+@[\d.a-z-]+.[a-z]{2,}$/.exec(email) !== null : true;
          },
          description: "The email address is not valid, make sure it follows the standard format.",
        },
        password: {
          condition: () => {
            return password ? /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.exec(password) !== null : true;
          },
          description:
            "Password must contain at least one number, one uppercase letter, one lowercase letter, and be at least 8 characters.",
        },
      }),
    });

    return (
      <Theme>
        <Container screen="lg" alignment="center">
          <Card>
            <Card.Body>
              <Stack direction="column" gap="md">
                <FormField>
                  <FormField.Label htmlFor="email">Email</FormField.Label>
                  <FormField.Control>
                    <TextField
                      id="email"
                      type="email"
                      name="email"
                      value={email.value}
                      onChange={onFormChange}
                      skin={email.valid ? "neutral-faded" : "critical"}
                      placeholder="Enter your email"
                    />
                  </FormField.Control>
                  <FormField.Error hidden={email.valid}>{email.error}</FormField.Error>
                </FormField>

                <FormField>
                  <FormField.Label htmlFor="password">Password</FormField.Label>
                  <FormField.Control>
                    <TextField
                      id="password"
                      type="password"
                      name="password"
                      value={password.value}
                      onChange={onFormChange}
                      skin={password.valid ? "neutral-faded" : "critical"}
                      placeholder="Enter your password"
                    />
                  </FormField.Control>
                  <FormField.Description>
                    Use 8 or more characters with a mix of letters, numbers, and symbols.
                  </FormField.Description>
                  <FormField.Error hidden={password.valid}>{password.error}</FormField.Error>
                </FormField>
              </Stack>
            </Card.Body>
          </Card>
        </Container>
      </Theme>
    );
  },
};
