import React from "react";
// UI Components
import {
  Text,
  Box,
  Card,
  Theme,
  Separator,
  Button,
  Avatar,
  Switch,
} from "../../../../packages/react/index";
import { FiSettings } from "react-icons/fi";

export function Notification(): React.ReactElement {
  return (
    <Theme>
      <Card>
        <Card.Header bordered>
          <Box direction="column" space={{ y: "lg" }}>
            <Text as="h5">Notification</Text>
            <Text size="sm" skin="secondary">
              Manage your notification settings.
            </Text>
          </Box>
        </Card.Header>
        <Card.Body>
          <Box items="baseline" justify="between" gap="md">
            <Box direction="column">
              <Text weight="semi-bold">Comments</Text>
              <Text size="xs" skin="secondary">
                Receive notifications when someone comments on your documents or mentions you.
              </Text>
            </Box>
            <Box gap="md" direction="column" items="baseline">
              <Switch size="sm">Push</Switch>
              <Switch size="sm">Email</Switch>
              <Switch size="sm">Slack</Switch>
            </Box>
          </Box>
          <Separator space={{ y: "xl" }} />
          <Box items="start" justify="between">
            <Box direction="column">
              <Text weight="semi-bold">Favorites</Text>
              <Text size="xs" skin="secondary">
                Receive notifications when there is activity related to your favorite items.
              </Text>
            </Box>
            <Box gap="md" direction="column" items="baseline">
              <Switch size="sm">Push</Switch>
              <Switch size="sm">Email</Switch>
              <Switch size="sm">Slack</Switch>
            </Box>
          </Box>
          <Separator space={{ y: "xl" }} />
          <Box items="start" justify="between">
            <Box direction="column">
              <Text weight="semi-bold">New documents</Text>
              <Text size="xs" skin="secondary">
                Receive notifications whenever people on your team create new documents.
              </Text>
            </Box>
            <Box gap="md" direction="column" items="baseline">
              <Switch size="sm">Push</Switch>
              <Switch size="sm">Email</Switch>
              <Switch size="sm">Slack</Switch>
            </Box>
          </Box>
        </Card.Body>
      </Card>
    </Theme>
  );
}
