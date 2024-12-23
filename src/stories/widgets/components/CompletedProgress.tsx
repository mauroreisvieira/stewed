import React from "react";
// UI Components
import { Container, Hue, Card, Stack, Avatar, Progress, Text } from "@stewed/react";

export function CompletedProgress(): React.ReactElement {
  return (
    <Container screen="xl" alignment="center" padding={{ block: "7xl" }}>
      <Hue skin={{ from: "indigo-600", to: "blue-900" }}>
        <Card padding={{ block: "2xl", inline: "2xl" }} shadow="lg">
          <Card.Body>
            <Stack direction="column" gap="xl">
              <Text weight="semi-bold" skin="white" space={{ y: "lg" }}>
                UI Component Progress
              </Text>
              <Text skin="white" size="3xl" weight="light" space={{ y: "2xl" }}>
                This widget tracks the percentage of UI components already built in relation to the
                total project scope.
              </Text>

              <Stack gap="md" items="center">
                <Avatar
                  image={{ src: "./images/logo/stewed.svg" }}
                  skin="neutral"
                  size="2xl"
                  name="Stewed"
                />
                <Stack direction="column">
                  <Text weight="medium" skin="white" size="xs">
                    Assigned to
                  </Text>
                  <Text weight="medium" size="lg" skin="white">
                    Stewed React Kit
                  </Text>
                </Stack>
              </Stack>

              <Stack gap="4xl" items="center">
                <Progress size="lg" skin="white" value={70} />
                <Text weight="bold" skin="white">
                  70%
                </Text>
              </Stack>
            </Stack>
          </Card.Body>
        </Card>
      </Hue>
    </Container>
  );
}
