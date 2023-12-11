import React from "react";
// UI Components
import { Text, Box, Card, Theme, Input, Button } from "../../../../packages/react/index";

export function Login(): React.ReactElement {
  return (
    <Theme>
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
              <Input id="email" type="email" />
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
              <Input id="password" type="password" />
            </Box>
            <Button>Sign in</Button>
            <Text alignment="center">
              Not a member?{" "}
              <Text as="a" href="" weight="medium">
                Start a 14 day free trial
              </Text>
            </Text>
          </Box>
        </Card.Body>
      </Card>
    </Theme>
  );
}
