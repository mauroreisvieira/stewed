import React, { useState } from "react";
// UI Components
import {
  Avatar,
  Box,
  Button,
  Card,
  Checkbox,
  Container,
  FormField,
  Grid,
  Hue,
  Radio,
  Separator,
  Stack,
  Text,
  TextField,
  Theme
} from "@stewed/react";
// Hooks
import { useKeyboardNavigation } from "@stewed/hooks";
// Icons
import { FiEye, FiEyeOff } from "react-icons/fi";

const meta = {
  title: "Examples/Authentication",
  decorators: [
    (Story) => (
      <Theme>
        <Story />
      </Theme>
    )
  ]
};

export default meta;

export const SignUp = {
  render: function Render() {
    const [inputType, setInputType] = useState<"text" | "password">("password");

    return (
      <Container screen="lg" alignment="center" padding={{ block: "7xl" }}>
        <Card>
          <Card.Body>
            <Grid responsive={{ md: { cols: 2 } }} gap="4xl">
              <Grid.Item order={2} responsive={{ sm: { order: 1 } }}>
                <Box
                  skin="neutral-faded"
                  padding={{ block: "4xl", inline: "2xl" }}
                  radius="md"
                  fullHeight
                >
                  <Stack direction="column" gap="9xl" items="baseline" style={{ height: "100%" }}>
                    <Stack direction="column" grow>
                      <Text size="4xl" weight="bold" space={{ y: "4xl" }}>
                        Let us support you run your freelance business.
                      </Text>
                      <Text skin="neutral">
                        Our registration process is quick and easy, taking no more than 10 minutes
                        to complete.
                      </Text>
                    </Stack>

                    <Hue skin={{ from: "slate-700", to: "slate-900" }}>
                      <Card shadow="lg" padding={{ block: "4xl", inline: "lg" }}>
                        <Card.Body>
                          <Text
                            skin="white"
                            size="xl"
                            weight="light"
                            space={{ y: "2xl" }}
                            variation={"italic"}
                            family="serif"
                          >
                            {
                              "I'm impressed with the results l've seen since starting to use this product, I begin receiving clients and projects in the first week."
                            }
                          </Text>
                          <Hue skin={{ from: "slate-500", to: "slate-900" }}>
                            <Separator space={{ block: "xl" }} />
                          </Hue>
                          <Stack items="center" gap="md">
                            <Avatar
                              image={{
                                src: "https://images.unsplash.com/photo-1701615004837-40d8573b6652"
                              }}
                              name="Sophia Chang"
                            />
                            <Stack direction="column" gap="xs">
                              <Text skin="white" size="sm" weight="medium">
                                Sophia Chang
                              </Text>
                              <Text as="a" href="" size="xs" skin="white">
                                Product Designer
                              </Text>
                            </Stack>
                          </Stack>
                        </Card.Body>
                      </Card>
                    </Hue>
                  </Stack>
                </Box>
              </Grid.Item>

              <Grid.Item order={1} responsive={{ sm: { order: 2 } }}>
                <Box padding={{ block: "4xl" }}>
                  <Text size="2xl" weight="medium" space={{ y: "md" }}>
                    Get started
                  </Text>
                  <Text skin="neutral" space={{ y: "4xl" }}>
                    Create your account and start in growing your business now!
                  </Text>

                  <Stack direction="column" gap="lg">
                    <FormField>
                      <FormField.Label htmlFor="name">Looking for?</FormField.Label>
                      <FormField.Control>
                        <Radio.Group name="job" fullWidth>
                          <Radio size="lg" appearance="border" value="projects" defaultChecked>
                            Projects
                          </Radio>
                          <Radio size="lg" appearance="border" value="designs">
                            Designs
                          </Radio>
                        </Radio.Group>
                      </FormField.Control>
                    </FormField>

                    <FormField>
                      <FormField.Label htmlFor="name">Full name</FormField.Label>
                      <FormField.Control>
                        <TextField size="lg" id="name" type="name" placeholder="Enter your name" />
                      </FormField.Control>
                    </FormField>

                    <FormField>
                      <FormField.Label htmlFor="email">Email</FormField.Label>
                      <FormField.Control>
                        <TextField
                          size="lg"
                          id="email"
                          type="email"
                          placeholder="Enter your email"
                        />
                      </FormField.Control>
                    </FormField>

                    <FormField>
                      <FormField.Label htmlFor="password">Password</FormField.Label>
                      <FormField.Control>
                        <TextField
                          size="lg"
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
                              iconOnly
                            >
                              Show password
                            </Button>
                          }
                        />
                      </FormField.Control>
                    </FormField>

                    <Stack direction="column" gap="6xl">
                      <div>
                        <Checkbox>
                          I agree to the{" "}
                          <Text as="a" href="/" skin="primary" inherit>
                            Terms & Conditions
                          </Text>
                        </Checkbox>
                      </div>
                      <Button size="lg">Sign Up</Button>

                      <Text size="sm" skin="neutral" alignment="center">
                        Have an account?{" "}
                        <Text as="a" href="/" skin="primary" inherit>
                          Login
                        </Text>
                      </Text>
                    </Stack>
                  </Stack>
                </Box>
              </Grid.Item>
            </Grid>
          </Card.Body>
        </Card>
      </Container>
    );
  }
};

export const SignIn = {
  render: function Render() {
    const [inputType, setInputType] = useState<"text" | "password">("password");

    return (
      <Container screen="md" alignment="center" padding={{ block: "7xl" }}>
        <Card>
          <Card.Header>
            <Text as="h2" weight="medium">
              Sign in to your account
            </Text>
          </Card.Header>
          <Card.Body>
            <Stack direction="column" gap="2xl">
              <Stack direction="column" gap="sm">
                <Text as="label" size="sm" htmlFor="email">
                  Email address
                </Text>
                <TextField id="email" type="email" placeholder="Enter your email" />
              </Stack>
              <Stack direction="column" gap="sm">
                <Stack justify="between">
                  <Text as="label" size="sm" htmlFor="password">
                    Password
                  </Text>
                  <Text as="a" href="" size="xs">
                    Forgot password?
                  </Text>
                </Stack>
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
                      iconOnly
                    >
                      Show password
                    </Button>
                  }
                />
              </Stack>
              <Stack justify="between" gap="lg" wrap="wrap">
                <Checkbox>Keep me logged in</Checkbox>
                <Stack justify="end" gap="md">
                  <Button appearance="outline">Create an account</Button>
                  <Button>Sign in</Button>
                </Stack>
              </Stack>
            </Stack>
          </Card.Body>
        </Card>
      </Container>
    );
  }
};

function OTPInput({ onInputChange }) {
  const [currentValue, setCurrentValue] = useState("");
  const [backspacePressCount, setBackspacePressCount] = useState(0);

  return (
    <TextField
      alignment="center"
      value={currentValue}
      maxChars={1}
      fullWidth={false}
      type="text"
      pattern="\d*"
      autoComplete="off"
      onKeyDown={(event) => {
        if (event.code === "Backspace") {
          if (currentValue.length === 0) {
            onInputChange(-1, "");
            return;
          }

          if (backspacePressCount === 1) {
            setCurrentValue("");
            onInputChange(-1, "");
            setBackspacePressCount(0);
            return;
          }

          setBackspacePressCount(1);
          setCurrentValue("");
          return;
        }
      }}
      onChange={(event) => {
        event.target.setSelectionRange(1, 0);

        // Ensure we only take the first character
        const value = event.currentTarget.value.slice(0, 1);
        const validNumber = /^\d$/.test(value);

        if (validNumber) {
          setCurrentValue(value);
          onInputChange(1, value);
        }
      }}
    />
  );
}

export const VerifyAccount = {
  render: function Render() {
    const [otpValues, setOtpValues] = useState(Array.from({ length: 6 }));
    const { ref, onNavigate, setFocusedIndex } = useKeyboardNavigation<HTMLDivElement>({
      target: "input",
      loop: false,
      condition: (index) => {
        if (!otpValues[index]) {
          return false;
        }

        return true;
      }
    });

    return (
      <Container screen="sm" alignment="center" padding={{ block: "7xl" }}>
        <Card>
          <Card.Body>
            <Text size="xl" weight="medium" alignment="center" space={{ y: "sm" }}>
              Verify your account
            </Text>
            <Text skin="neutral" alignment="center" space={{ y: "2xl" }}>
              We are sending a OTP to validate you mobile number.
            </Text>

            <Box space={{ y: "2xl" }}>
              <Stack ref={ref} gap="md" items="center" justify="center" onKeyDown={onNavigate}>
                {Array.from({ length: 6 }).map((_, index) => (
                  <OTPInput
                    key={index}
                    onInputChange={(direction: number, value: string) => {
                      setFocusedIndex(index + direction);
                      const newOtpValues = [...otpValues];
                      newOtpValues[index] = value;
                      setOtpValues(newOtpValues);
                    }}
                  />
                ))}
              </Stack>
            </Box>

            <Text skin="neutral" size="sm" alignment="center" space={{ y: "2xl" }}>
              A SMS has been sent to{" "}
              <Text as="span" size="sm" weight="medium">
                123-456-789
              </Text>
            </Text>
            <Stack justify="center">
              <Button>Submit</Button>
            </Stack>
          </Card.Body>
        </Card>
      </Container>
    );
  }
};
