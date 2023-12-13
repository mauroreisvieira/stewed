import React from "react";
// UI Components
import {
  Text,
  Box,
  Card,
  Theme,
  Divider,
  Button,
  Avatar,
  TextField,
} from "../../../../packages/react/index";
import { FiSettings } from "react-icons/fi";

export function Team(): React.ReactElement {
  return (
    <Theme>
      <Card>
        <Card.Header>
          <Box direction="column" space={{y: "lg"}}>
            <Text as="h5">Your team</Text>
            <Text size="sm" skin="secondary">
              Invite and manage your team members.
            </Text>
          </Box>
          <Box items="baseline" gap="lg">
            <TextField />
            <Button>Invite</Button>
          </Box>
        </Card.Header>
        <Card.Body>
          <Box items="center" justify="between">
            <Box items="center" gap="md">
              <Avatar name="Bruna Santos" />
              <Text size="sm" as="a" href="">
                Bruna Santos
              </Text>
            </Box>
            <Text size="xs" skin="secondary">
              bruna.santos@example.com
            </Text>
            <Button appearance="ghost" leftSlot={<FiSettings />} size="sm" iconOnly>Settings</Button>
          </Box>
          <Divider space={{ y: "xl" }} />
          <Box items="center" justify="between">
            <Box items="center" gap="md">
              <Avatar name="Mauro Vieira" />
              <Text size="sm" as="a" href="">
                Mauro Vieira
              </Text>
            </Box>
            <Text size="xs" skin="secondary">
              mauro.vieira@example.com
            </Text>
            <Button appearance="ghost" leftSlot={<FiSettings />} size="sm" iconOnly>Settings</Button>
          </Box>
        </Card.Body>
      </Card>
    </Theme>
  );
}
