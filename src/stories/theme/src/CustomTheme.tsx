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
              <TextField id="password" type="password" placeholder="Enter your password" />
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
    </Box>
  );
}

export function CustomTheme(): React.ReactElement {
  return (
    <Theme<"default" | "revolution">
      defaultTheme="default"
      tokens={{
        default: {},
        revolution: {
          color: {
            "primary": "#e91e63",
            "primary-pressed": "#d81b60",
            "primary-faded": "#f48fb1",
          },
          components: {
            "card": {
              radius: "2xl",
            },
            "button": {
              radius: "full",
            },
            "text-field": {
              radius: "lg",
            },
          },
        },
      }}>
      <Elements />
    </Theme>
  );
}
