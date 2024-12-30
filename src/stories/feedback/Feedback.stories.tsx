import React from "react";
// UI Components
import { Box, Button, Container, Text, Theme, Stack, Hue } from "@stewed/react";
// Icons
import { GoArrowRight } from "react-icons/go";

const meta = {
  title: "Examples/Feedback",
  decorators: [
    (Story) => (
      <Theme>
        <Story />
      </Theme>
    )
  ]
};

export default meta;

export const Page404 = {
  render: function Example() {
    return (
      <Box as="main" skin="default">
        <Stack direction="column" items="center" justify="center">
          <Container screen="md" alignment="center" padding={{ block: "7xl" }}>
            <Box>
              <Text
                size="2xl"
                weight="bolder"
                skin="neutral-faded"
                variation="uppercase"
                family="mono"
              >
                404 Page
              </Text>
              <Hue skin={{ from: "slate-500", to: "slate-100" }} clipText>
                <Text skin="transparent" size="7xl" space={{ y: "sm" }} weight="bolder">
                  Oops! Page not found.
                </Text>
              </Hue>
              <Text size="2xl" space={{ y: "7xl" }} skin="neutral" weight="light">
                Sorry, we could`t find the page you where looking for.
              </Text>
              <Stack gap="lg">
                <Button>Go back home</Button>
                <Button appearance="ghost" rightSlot={<GoArrowRight />}>
                  Contact support
                </Button>
              </Stack>
            </Box>
          </Container>
        </Stack>
      </Box>
    );
  }
};
