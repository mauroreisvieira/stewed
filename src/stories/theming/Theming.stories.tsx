import React, { useState } from "react";
// Storybook
import type { Meta } from "@storybook/react";
// Packages
import {
  Text,
  Card,
  Theme,
  TextField,
  Button,
  Tabs,
  Switch,
  Separator,
  FormField,
  Dialog,
  Select,
  Container,
  Stack,
  useTheme
} from "@stewed/react";
// Hooks
import { useStateForm } from "@stewed/hooks";

const meta: Meta = {
  title: "Examples/Theming",
  parameters: {
    layout: "fullscreen"
  }
};

export default meta;

function Elements(): React.ReactElement {
  const { theme, setTheme } = useTheme<"metro" | "elegant">();
  const [isOpen, setOpen] = useState(false);

  const {
    formData: { username, gender, email, password },
    onFormChange,
    onFormReset
  } = useStateForm({
    initialValues: {
      username: "",
      email: "",
      gender: "Prefer not to respond",
      password: ""
    },
    validators: ({ username, email, password }) => ({
      username: {
        condition: () => {
          return username ? /^[a-zA-Z0-9]+$/.exec(username) !== null : true;
        },
        description: "Username can only contain letters or digits."
      },
      email: {
        condition: () => {
          return email ? /[\d%+._a-z-]+@[\d.a-z-]+.[a-z]{2,}$/.exec(email) !== null : true;
        },
        description: "The email address is not valid, make sure it follows the standard format."
      },
      password: {
        condition: () => {
          return password ? /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.exec(password) !== null : true;
        },
        description:
          "Password must contain at least one number, one uppercase letter, one lowercase letter, and be at least 8 characters."
      }
    })
  });

  return (
    <>
      <Stack direction="column" gap="2xl" grow>
        <Tabs
          value={theme}
          alignment="center"
          onValueChange={(value) => {
            setTheme(value as "metro" | "elegant");
          }}
        >
          <Tabs.List>
            <Tabs.Item value="default">Default</Tabs.Item>
            <Tabs.Item value="metro">Metro</Tabs.Item>
            <Tabs.Item value="elegant">Elegant</Tabs.Item>
          </Tabs.List>
        </Tabs>
        <Card>
          <Card.Header>
            <Text as="h2">Create your account</Text>
          </Card.Header>

          <Card.Body>
            <Stack direction="column" gap="2xl">
              <Stack direction="column" gap="md">
                <FormField>
                  <FormField.Label htmlFor="username">Username</FormField.Label>
                  <FormField.Control>
                    <TextField
                      id="username"
                      type="text"
                      name="username"
                      value={username.value}
                      onChange={onFormChange}
                      skin={username.valid ? "neutral" : "critical"}
                      placeholder="Enter your username"
                      fullWidth
                    />
                  </FormField.Control>
                  <FormField.Description>
                    You can use letters, numbers, and periods.
                  </FormField.Description>
                  <FormField.Error hidden={username.valid}>{username.error}</FormField.Error>
                </FormField>

                <FormField>
                  <FormField.Label htmlFor="gender">Gender</FormField.Label>
                  <FormField.Control>
                    <Select
                      id="gender"
                      value={gender.value}
                      name="gender"
                      onChange={onFormChange}
                      fullWidth
                    >
                      <Select.Option value="Woman">Woman</Select.Option>
                      <Select.Option value="Man">Man</Select.Option>
                      <Select.Option value="Non-binary/non-conforming">
                        Non-binary/non-conforming
                      </Select.Option>
                      <Select.Option value="Prefer not to respond">
                        Prefer not to respond
                      </Select.Option>
                    </Select>
                  </FormField.Control>
                </FormField>

                <FormField>
                  <FormField.Label htmlFor="email">Email</FormField.Label>
                  <FormField.Control>
                    <TextField
                      id="email"
                      type="email"
                      name="email"
                      value={email.value}
                      onChange={onFormChange}
                      skin={email.valid ? "neutral" : "critical"}
                      placeholder="Enter your email"
                      fullWidth
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
                      skin={password.valid ? "neutral" : "critical"}
                      placeholder="Enter your password"
                      fullWidth
                    />
                  </FormField.Control>
                  <FormField.Description>
                    Use 8 or more characters with a mix of letters, numbers, and symbols.
                  </FormField.Description>
                  <FormField.Error hidden={password.valid}>{password.error}</FormField.Error>
                </FormField>
              </Stack>
            </Stack>
            <Separator space={{ block: "xl" }} />
            <Stack items="start" justify="between">
              <Stack direction="column" gap="sm">
                <Text weight="semi-bold">Favorites</Text>
                <Text size="xs" skin="neutral">
                  Receive notifications when there is activity related to your favorite items.
                </Text>
              </Stack>
              <Stack gap="md" direction="column" items="baseline">
                <Switch size="sm">Push</Switch>
                <Switch size="sm">Email</Switch>
                <Switch size="sm">Slack</Switch>
              </Stack>
            </Stack>
            <Separator space={{ block: "xl" }} />
            <Stack items="start" justify="between">
              <Stack direction="column" gap="sm">
                <Text weight="semi-bold">New documents</Text>
                <Text size="xs" skin="neutral">
                  Receive notifications whenever people on your team create new documents.
                </Text>
              </Stack>
              <Stack gap="md" direction="column" items="baseline">
                <Switch size="sm">Push</Switch>
                <Switch size="sm">Email</Switch>
                <Switch size="sm">Slack</Switch>
              </Stack>
            </Stack>
          </Card.Body>
          <Separator />
          <Card.Footer>
            <Stack justify="end" gap="md">
              <Button skin="neutral" appearance="outline" onClick={(): void => onFormReset()}>
                Clean
              </Button>
              <Button onClick={(): void => setOpen(true)}>Create an account</Button>
            </Stack>
          </Card.Footer>
        </Card>
      </Stack>
      <Dialog open={isOpen} size="sm">
        <Dialog.Header>
          <Text as="h4">Are you ready to create your account?</Text>
        </Dialog.Header>
        <Dialog.Body>
          <Text size="sm" skin="neutral">
            By proceeding, you ll be establishing a new account with us. Your information will be
            securely stored on our servers for your future access.
          </Text>
        </Dialog.Body>
        <Dialog.Footer>
          <Stack gap="md" justify="end">
            <Button
              skin="neutral"
              appearance="outline"
              type="button"
              onClick={(): void => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="button" skin="success" onClick={(): void => setOpen(false)}>
              Create Account
            </Button>
          </Stack>
        </Dialog.Footer>
      </Dialog>
    </>
  );
}

export const CreateAccount = {
  render: (): React.ReactElement => {
    return (
      <Theme<"metro" | "elegant">
        tokens={{
          metro: {
            color: {
              "primary-background": "teal-600",
              "primary-background-hovered": "teal-700",
              "primary-background-pressed": "teal-800"
            },
            fontFamily: {
              base: "'Roboto Serif', serif"
            },
            components: {
              "text-field": {
                radius: "none"
              },
              select: {
                radius: "none"
              },
              card: {
                radius: "none"
              },
              switch: {
                radius: "none"
              },
              dialog: {
                radius: "none",
                shadow: "xl"
              },
              button: {
                radius: "none"
              }
            }
          },
          elegant: {
            fontFamily: {
              base: "'DM Sans', sans-serif"
            },
            color: {
              "background-backdrop": "rgb(200 200 200 / 70%)",
              "primary-background": "#e91e63",
              "primary-background-hovered":
                "color-mix(in oklab, var(--color-primary-background) 90%, black)",
              "primary-background-pressed":
                "color-mix(in oklab, var(--color-primary-background) 80%, black)"
            },
            components: {
              button: {
                radius: "full"
              },
              "text-field": {
                radius: "2xl"
              },
              select: {
                radius: "2xl"
              },
              backdrop: {
                blur: "md"
              }
            }
          }
        }}
        theme="default"
      >
        <Container screen="lg" alignment="center">
          <Elements />
        </Container>
      </Theme>
    );
  }
};
