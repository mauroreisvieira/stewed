import React from "react";
// UI Components
import { Text, Card, Theme, Box, Avatar, Progress } from "../../../../packages/react/index";

export function ComponentProgress(): React.ReactElement {
  return (
    <Theme>
      <Card skin="primary" padding={{ block: "2xl", inline: "2xl" }}>
        <Card.Body>
          <Box direction="column" gap="xl">
            <Text weight="semi-bold" skin="white" space={{ y: "lg" }}>
              UI Component Progress
            </Text>
            <Text skin="white" size="3xl" weight="light" space={{ y: "2xl" }}>
              This widget tracks the percentage of UI components already built in relation to the
              total project scope.
            </Text>
            <Box gap="md" items="center">
              <Avatar src="./images/logo/stewed.svg" skin="neutral" size="2xl" name="Stewed" />
              <Box direction="column">
                <Text weight="medium" skin="white" size="xs">
                  Assigned to
                </Text>
                <Text weight="medium" size="lg" skin="white">
                  Stewed React Kit
                </Text>
              </Box>
            </Box>
            <Box gap="4xl" items="center">
              <Progress size="lg" skin="white" value={70} />
              <Text weight="bold" skin="white">
                70%
              </Text>
            </Box>
          </Box>
        </Card.Body>
      </Card>
    </Theme>
  );
}
