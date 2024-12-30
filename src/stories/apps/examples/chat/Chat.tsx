import React from "react";
// UI Components
import { Box, Card, Container, Hue, Text, Theme } from "@stewed/react";
// Partials
import { Suggestions } from "./components/Suggestions";
import { Prompt } from "./components/Prompt";

export function Chat(): React.ReactElement {
  return (
    <Theme>
      <Box
        skin="neutral-faded"
        padding={{ block: "9xl", inline: "lg" }}
        responsive={{ md: { padding: { block: "9xl", inline: "9xl" } } }}
        fullScreen
        fullWidth
      >
        <Container screen="lg" alignment="center">
          <Box space={{ y: "4xl" }}>
            <Text weight="medium" size="4xl" responsive={{ md: { size: "7xl" } }}>
              Hi there,{" "}
              <Hue skin={{ from: "indigo-500", to: "pink-800" }} clipText>
                <Text skin="transparent" as="span" weight="extra-bold" inherit>
                  Devon Lane
                </Text>
              </Hue>
            </Text>

            <Text
              weight="semi-bold"
              size="3xl"
              responsive={{ md: { size: "5xl" } }}
              space={{ y: "xl" }}
            >
              What would like to know?
            </Text>

            <Text size="xl" skin="neutral">
              Use one of the most common prompts below or use your own to begin
            </Text>
          </Box>

          <Box space={{ y: "9xl" }}>
            <Suggestions />
          </Box>

          <Card padding={{ block: "md", inline: "md" }} shadow="md">
            <Card.Body>
              <Prompt />
            </Card.Body>
          </Card>
        </Container>
      </Box>
    </Theme>
  );
}
