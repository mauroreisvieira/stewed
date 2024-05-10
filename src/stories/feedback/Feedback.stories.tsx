import React from "react";
// UI Components
import { Box, Button, Container, Text, Theme } from "@stewed/react";

const meta = {
  title: "Examples/Feedback",
  decorators: [
    (Story) => (
      <Theme
        tokens={{
          default: {
            color: {
              primary: "#607d8b",
              text: "#fff",
              dark: "#000",
            },
          },
        }}
      >
        <Story />
      </Theme>
    ),
  ],
};

export default meta;

export const Page404 = {
  render: function Example() {
    return (
      <Box as="main" skin="dark" screen="vh" direction="column" items="center" justify="center">
        <Container screen="md" alignment="center" padding={{ block: "7xl" }}>
          <Box block>
            <Text weight="bold" variation={"uppercase"}>
              404 Page
            </Text>
            <Text size="7xl" space={{ y: "sm" }}>
              Oops! Page not found.
            </Text>
            <Text size="xl" skin="neutral" space={{ y: "7xl" }}>
              Sorry, we could`t find the page you where looking for.
            </Text>
            <Box gap="lg">
              <Button>Go back home</Button>
              <Button appearance="outline" rightSlot="→">
                Contact support
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    );
  },
};
