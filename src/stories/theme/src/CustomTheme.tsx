import React, { useState } from "react";
// UI Components
import {
  Text,
  Box,
  Card,
  Theme,
  useTheme,
  TextField,
  Button,
  Tabs,
  Switch,
  Separator,
  FormField,
  Dialog,
  Select,
} from "../../../../packages/react/index";
// Hooks
import { useStateForm } from "@stewed/hooks";

type ThemeOptions = "default" | "metro" | "elegant";

function Elements(): React.ReactElement {
  const { theme, setTheme } = useTheme<ThemeOptions>();
  const [isOpen, setOpen] = useState(false);

  const {
    formData: { username, gender, email, password },
    onFormChange,
    onFormReset,
  } = useStateForm({
    initialValues: {
      username: "",
      email: "",
      gender: "Prefer not to respond",
      password: "",
    },
    validators: ({ username, email, password }) => ({
      username: {
        condition: () => {
          return username ? /^[a-zA-Z0-9]+$/.exec(username) !== null : true;
        },
        description: "Username can only contain letters or digits.",
      },
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
    <>
      <Box direction="column" gap="2xl">
        <Tabs
          value={theme}
          alignment="center"
          onValueChange={(value) => {
            setTheme(value as ThemeOptions);
          }}>
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
            <Box direction="column" gap="2xl">
              <Box direction="column" gap="md">
                <FormField>
                  <FormField.Label htmlFor="username">Username</FormField.Label>
                  <FormField.Control>
                    <TextField
                      id="username"
                      type="text"
                      name="username"
                      value={username.value}
                      onChange={onFormChange}
                      skin={username.valid ? "default" : "critical"}
                      placeholder="Enter your username"
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
                    <Select id="gender" value={gender.value} name="gender" onChange={onFormChange}>
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
                      skin={email.valid ? "default" : "critical"}
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
                      skin={password.valid ? "default" : "critical"}
                      placeholder="Enter your password"
                    />
                  </FormField.Control>
                  <FormField.Description>
                    Use 8 or more characters with a mix of letters, numbers, and symbols.
                  </FormField.Description>
                  <FormField.Error hidden={password.valid}>{password.error}</FormField.Error>
                </FormField>
              </Box>
            </Box>
            <Separator space={{ block: "xl" }} />
            <Box items="start" justify="between">
              <Box direction="column">
                <Text weight="semi-bold">Favorites</Text>
                <Text size="xs" skin="neutral">
                  Receive notifications when there is activity related to your favorite items.
                </Text>
              </Box>
              <Box gap="md" direction="column" items="baseline">
                <Switch size="sm">Push</Switch>
                <Switch size="sm">Email</Switch>
                <Switch size="sm">Slack</Switch>
              </Box>
            </Box>
            <Separator space={{ block: "xl" }} />
            <Box items="start" justify="between">
              <Box direction="column">
                <Text weight="semi-bold">New documents</Text>
                <Text size="xs" skin="neutral">
                  Receive notifications whenever people on your team create new documents.
                </Text>
              </Box>
              <Box gap="md" direction="column" items="baseline">
                <Switch size="sm">Push</Switch>
                <Switch size="sm">Email</Switch>
                <Switch size="sm">Slack</Switch>
              </Box>
            </Box>
          </Card.Body>
          <Separator />
          <Card.Footer>
            <Box justify="end" gap="md">
              <Button skin="neutral" appearance="outline" onClick={(): void => onFormReset()}>
                Clean
              </Button>
              <Button onClick={(): void => setOpen(true)}>Create an account</Button>
            </Box>
          </Card.Footer>
        </Card>
      </Box>
      <Dialog open={isOpen} size="sm">
        <Dialog.Header>
          <Text as="h4">Are you ready to create your account?</Text>
        </Dialog.Header>
        <Dialog.Body>
          <Text size="sm" skin="neutral">
            By proceeding, you'll be establishing a new account with us. Your information will be
            securely stored on our servers for your future access.
          </Text>
        </Dialog.Body>
        <Dialog.Footer>
          <Box gap="md" justify="end">
            <Button
              skin="neutral"
              appearance="outline"
              type="button"
              onClick={(): void => setOpen(false)}>
              Cancel
            </Button>
            <Button type="button" skin="success" onClick={(): void => setOpen(false)}>
              Create Account
            </Button>
          </Box>
        </Dialog.Footer>
      </Dialog>
    </>
  );
}

export function CustomTheme(): React.ReactElement {
  return (
    <Theme<ThemeOptions>
      tokens={{
        metro: {
          color: {
            "text": "#444",
            "primary": "#3f51b5",
            "primary-faded": "#e8eaf6",
            "primary-border": "#9fa8da",
            "primary-pressed": "#3949ab",
          },
          fontFamily: {
            base: "'Roboto Serif', serif",
          },
          components: {
            "text-field": {
              radius: "none",
            },
            "select": {
              radius: "none",
            },
            "card": {
              radius: "none",
            },
            "switch": {
              radius: "none",
            },
            "dialog": {
              radius: "none",
              shadow: "xl",
            },
            "tabs": {
              radius: "none",
            },
            "button": {
              radius: "none",
            },
          },
        },
        elegant: {
          fontFamily: {
            base: "'DM Sans', sans-serif",
          },
          color: {
            backdrop: "rgb(200 200 200 / 70%)",
            // Primary
            "primary": "#e91e63",
            "primary-faded": "#f48fb1",
            "primary-border": "#f0c6d3",
            "primary-pressed": "#d81b60",
            // Critical
            "critical": "#ef4444",
            "critical-pressed": "#dc2626",
            "critical-faded": "#fecaca",
            "critical-border": "#f87171",
            // Success
            "success": "#14784a",
            "success-pressed": "#178351",
            "success-faded": "#1f2a23",
            "success-border": "#21ab6b",
          },
          components: {
            "button": {
              radius: "full",
            },
            "tabs": {
              radius: "xl",
            },
            "text-field": {
              radius: "2xl",
            },
            "select": {
              radius: "2xl",
            },
          },
        },
      }}
      defaultTheme="metro">
      <Elements />
    </Theme>
  );
}
