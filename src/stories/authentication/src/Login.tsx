import React from "react";
// UI Components
import { Text, Box, Card, Theme, TextField, Button } from "../../../../packages/react/index";

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
              <TextField id="email" type="email" />
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
              <TextField id="password" type="password" />
            </Box>
            <Box justify="end" gap="md">
              <Button appearance="outline">Create an account</Button>
              <Button>Sign in</Button>
            </Box>
          </Box>
        </Card.Body>
      </Card>
    </Theme>
  );
}
