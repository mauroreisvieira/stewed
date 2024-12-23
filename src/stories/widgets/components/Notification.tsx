import React from "react";
// UI Components
import { Container, Card, Stack, Switch, Separator, Button, Text } from "@stewed/react";

export function Notification(): React.ReactElement {
  return (
    <Container screen="sm" alignment="center" padding={{ block: "7xl" }}>
      <Card style={{ flexGrow: 1 }}>
        <Card.Header>
          <Stack direction="column">
            <Text as="h5">Notification</Text>
            <Text size="sm" skin="neutral">
              Manage your notification settings.
            </Text>
          </Stack>
        </Card.Header>
        <Card.Body>
          <Stack items="baseline" justify="between" gap="md">
            <Stack direction="column" grow={false} gap="sm">
              <Text weight="semi-bold">Comments</Text>
              <Text size="xs" skin="neutral">
                Receive notifications when someone comments on your documents or mentions you.
              </Text>
            </Stack>
            <Stack gap="md" direction="column" items="baseline" grow={false}>
              <Switch size="sm">Push</Switch>
              <Switch size="sm">Email</Switch>
              <Switch size="sm">Slack</Switch>
            </Stack>
          </Stack>
          <Separator space={{ block: "xl" }} />
          <Stack items="start" justify="between">
            <Stack direction="column" gap="sm">
              <Text weight="semi-bold">Favorites</Text>
              <Text size="xs" skin="neutral">
                Receive notifications when there is activity related to your favorite items.
              </Text>
            </Stack>
            <Stack gap="md" direction="column" items="baseline" grow={false}>
              <Switch size="sm">Push</Switch>
              <Switch size="sm">Email</Switch>
              <Switch size="sm">Slack</Switch>
            </Stack>
          </Stack>
          <Separator space={{ block: "xl" }} />
          <Stack items="start" justify="between">
            <Stack direction="column" gap="sm">
              <Text weight="semi-bold">New documents</Text>
              <Text size="xs" skin="neutral">
                Receive notifications whenever people on your team create new documents.
              </Text>
            </Stack>
            <Stack gap="md" direction="column" items="baseline" grow={false}>
              <Switch size="sm">Push</Switch>
              <Switch size="sm">Email</Switch>
              <Switch size="sm">Slack</Switch>
            </Stack>
          </Stack>
        </Card.Body>
        <Card.Footer>
          <Button fullWidth>Save preferences</Button>
        </Card.Footer>
      </Card>
    </Container>
  );
}
