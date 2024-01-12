import React from "react";
// UI Components
import {
  Text,
  Box,
  Card,
  Theme,
  useTheme,
  TextField,
  Button,
  Checkbox,
  Tabs,
  Switch,
  Separator,
  FormField,
} from "../../../../packages/react/index";

function Elements(): React.ReactElement {
  const { theme, setTheme } = useTheme<"default" | "revolution">();

  return (
    <Box direction="column" gap="2xl">
      <Tabs
        value={theme}
        alignment="center"
        onValueChange={(value) => {
          setTheme(value as "default" | "revolution");
        }}>
        <Tabs.List>
          <Tabs.Item value="default">Default</Tabs.Item>
          <Tabs.Item value="revolution">Revolution</Tabs.Item>
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
            <Button appearance="outline">Create an account</Button>
          </Box>
        </Card.Footer>
      </Card>
    </Box>
  );
}

export function CustomTheme(): React.ReactElement {
  return (
    <Theme<"default" | "revolution">
      defaultTheme="default"
      tokens={{
        default: {
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
        revolution: {
          fontFamily: {
            base: "'DM Sans', sans-serif",
          },
          color: {
            "primary": "#e91e63",
            "primary-pressed": "#d81b60",
            "primary-faded": "#f48fb1",
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
