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
              <Avatar name="Poppy Nicholls" />
              <Text size="sm" as="a" href="">
                Poppy Nicholls
              </Text>
            </Box>
            <Text size="xs" skin="secondary">
              poppy.nicholls@example.com
            </Text>
            <Button appearance="ghost" leftSlot={<FiSettings />} size="sm" iconOnly>Settings</Button>
          </Box>
          <Divider space={{ y: "xl" }} />
          <Box items="center" justify="between">
            <Box items="center" gap="md">
              <Avatar name="Marisa Palermo" />
              <Text size="sm" as="a" href="">
                Marisa Palermo
              </Text>
            </Box>
            <Text size="xs" skin="secondary">
              marisa.palermo@example.com
            </Text>
            <Button appearance="ghost" leftSlot={<FiSettings />} size="sm" iconOnly>Settings</Button>
          </Box>
        </Card.Body>
      </Card>
    </Theme>
  );
}
