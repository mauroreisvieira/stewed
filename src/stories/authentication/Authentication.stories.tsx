import React, { useState } from "react";
// UI Components
import { Checkbox, Box, Button, Card, Container, Text, TextField, Theme } from "@stewed/react";
// Icons
import { FiEye, FiEyeOff } from "react-icons/fi";

const meta = {
  title: "Examples/Authentication",
  decorators: [
    (Story) => (
      <Theme>
        <Story />
      </Theme>
    ),
  ],
};

export default meta;

export const Login = {
  render: function Example() {
    const [inputType, setInputType] = useState<"text" | "password">("password");

    return (
      <Container screen="md" alignment="center" padding={{ block: "7xl" }}>
        <Card>
          <Card.Header>
            <Text as="h2">Sign in to your account</Text>
          </Card.Header>
          <Card.Body>
            <Box direction="column" gap="2xl">
              <Box direction="column" gap="sm">
                <Text as="label" size="sm" htmlFor="email">
                  Email address
                </Text>
                <TextField id="email" type="email" placeholder="Enter your email" />
              </Box>
              <Box direction="column" gap="sm">
                <Box justify="between">
                  <Text as="label" size="sm" htmlFor="password">
                    Password
                  </Text>
                  <Text as="a" href="" size="xs">
                    Forgot password?
                  </Text>
                </Box>
                <TextField
                  id="password"
                  type={inputType}
                  placeholder="Enter your password"
                  rightSlot={
                    <Button
                      skin="neutral"
                      appearance="ghost"
                      leftSlot={inputType === "text" ? <FiEyeOff /> : <FiEye />}
                      size="xs"
                      onClick={() =>
                        setInputType((prev) => (prev === "text" ? "password" : "text"))
                      }
                      iconOnly>
                      Show password
                    </Button>
                  }
                />
              </Box>
              <Box justify="between" gap="lg" wrap="wrap">
                <Checkbox>Keep me logged in</Checkbox>
                <Box justify="end" gap="md">
                  <Button appearance="outline">Create an account</Button>
                  <Button>Sign in</Button>
                </Box>
              </Box>
            </Box>
          </Card.Body>
        </Card>
      </Container>
    );
  },
};
