import React from "react";
// UI Components
import { Box, Button, Container, Text, Theme, Stack } from "@stewed/react";

const meta = {
  title: "Examples/Feedback",
  decorators: [
    (Story) => (
      <Theme>
        <Story />
      </Theme>
    ),
  ],
};

export default meta;

export const Page404 = {
  render: function Example() {
    return (
      <Box as="main" skin="default">
        <Stack direction="column" items="center" justify="center">
          <Container screen="md" alignment="center" padding={{ block: "7xl" }}>
            <Box>
              <Text weight="bolder" skin="neutral" variation={"uppercase"}>
                404 Page
              </Text>
              <Text size="7xl" space={{ y: "sm" }}>
                Oops! Page not found.
              </Text>
              <Text size="xl" skin="neutral" space={{ y: "7xl" }}>
                Sorry, we could`t find the page you where looking for.
              </Text>
              <Stack gap="lg">
                <Button>Go back home</Button>
                <Button appearance="outline" rightSlot="→">
                  Contact support
                </Button>
              </Stack>
            </Box>
          </Container>
        </Stack>
      </Box>
    );
  },
};
