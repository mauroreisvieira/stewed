import React, { useEffect, useMemo, useState } from "react";
// UI Components
import { Box, Button, Card, Checkbox, Container, TextField, Theme, Text } from "@stewed/react";
// Hooks
import { useKeyboardNavigation, useInput } from "@stewed/hooks";
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

function OTPInput({ onInputChange }) {
  const [currentValue, setCurrentValue] = useState("");

  return (
    <TextField
      alignment="center"
      value={currentValue}
      maxChars={1}
      onKeyDown={(event) => {
        if (event.code === "Backspace") {
          setCurrentValue("");
          onInputChange(-1);
        }
      }}
      onChange={(event) => {
        event.target.setSelectionRange(1, 0);

        // Ensure we only take the first character
        const value = event.currentTarget.value.slice(0, 1);
        const validNumber = /^\d$/.test(value);

        if (validNumber) {
          setCurrentValue(value);
          onInputChange(1);
        }
      }}
    />
  );
}

export const VerifyAccount = {
  render: function Example() {
    const { ref, onNavigate, setFocusedIndex } = useKeyboardNavigation<HTMLDivElement>({
      target: "input",
    });

    return (
      <Container screen="sm" alignment="center" padding={{ block: "7xl" }}>
        <Card>
          <Card.Body>
            <Text size="xl" weight="medium" alignment="center">
              Verify your account
            </Text>
            <Text skin="neutral" alignment="center" space={{ y: "2xl" }}>
              We are sending a OTP to validate you mobile number.
            </Text>

            <Box justify="center" space={{ y: "2xl" }}>
              <Box ref={ref} gap="md" onKeyDown={onNavigate} inline>
                {Array.from({ length: 6 }).map((_, idx) => (
                  <OTPInput
                    key={idx}
                    onInputChange={(direction) => {
                        setFocusedIndex(idx + direction);
                    }}
                  />
                ))}
              </Box>
            </Box>

            <Text skin="neutral" size="sm" alignment="center" space={{ y: "2xl" }}>
              A SMS has been sent to{" "}
              <Text as="span" size="sm" weight="medium">
                123-456-789
              </Text>
            </Text>
            <Box justify="center">
              <Button>Submit</Button>
            </Box>

          </Card.Body>
        </Card>
      </Container>
    );
  },
};
