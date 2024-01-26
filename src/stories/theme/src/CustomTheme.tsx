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
} from "../../../../packages/react/index";

type ThemeOptions = "metro" | "elegant";

function Elements(): React.ReactElement {
  const { theme, setTheme } = useTheme<ThemeOptions>();
  const [isOpen, setOpen] = useState(false);

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
            <Tabs.Item value="metro">Metro</Tabs.Item>
            <Tabs.Item value="disabled">Disabled</Tabs.Item>
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
                    <TextField id="username" type="text" placeholder="Enter your username" />
                  </FormField.Control>
                  <FormField.Description>
                    You can use letters, numbers, and periods.
                  </FormField.Description>
                </FormField>

                <FormField>
                  <FormField.Label htmlFor="email">Email</FormField.Label>
                  <FormField.Control>
                    <TextField id="email" type="email" placeholder="Enter your email" />
                  </FormField.Control>
                </FormField>

                <FormField>
                  <FormField.Label htmlFor="password">Password</FormField.Label>
                  <FormField.Control>
                    <TextField
                      skin="critical"
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                    />
                  </FormField.Control>
                  <FormField.Description>
                    Use 8 or more characters with a mix of letters, numbers, and symbols.
                  </FormField.Description>
                  <FormField.Error>Password needs to be more than 8 characters.</FormField.Error>
                </FormField>
              </Box>
            </Box>
            <Separator space={{ y: "xl" }} />
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
            <Separator space={{ y: "xl" }} />
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
            <Box justify="end">
              <Button onClick={(): void => setOpen(true)}>Create an account</Button>
            </Box>
          </Card.Footer>
        </Card>
      </Box>
      <Dialog open={isOpen} size="sm">
        <Dialog.Header>
          <Text as="h4">Create Account</Text>
        </Dialog.Header>
        <Dialog.Body>
          <Text size="sm" skin="neutral">
            Are you ready to create your account?
          </Text>
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
              Activate account
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
      defaultTheme="metro"
      tokens={{
        metro: {
          color: {
            text: "#444",
          },
          fontFamily: {
            base: "'Roboto Serif', serif",
          },
          components: {
            card: {
              radius: "none",
            },
            switch: {
              radius: "none",
            },
          },
        },
        elegant: {
          fontFamily: {
            base: "'DM Sans', sans-serif",
          },
          color: {
            "primary": "#e91e63",
            "primary-pressed": "#d81b60",
            "primary-faded": "#f48fb1",
            // Success
            "success": "#14784a",
            "success-pressed": "#178351",
            "success-faded": "#1f2a23",
            "success-border": "#21ab6b",
          },
          components: {
            button: {
              radius: "full",
            },
          },
        },
      }}>
      <Elements />
    </Theme>
  );
}
