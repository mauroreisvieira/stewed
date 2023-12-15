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
  TextField,
} from "../../../../packages/react/index";
import { TbDotsVertical } from "react-icons/tb";

const TEAM = [
  {
    name: "Mauro Vieira",
    email: "mauro.vieira@example.com",
  },
  {
    name: "Henrique Vieira",
    email: "henrique.vieira@example.com",
  },
  {
    name: "Lourenco Vieira",
    email: "lourenco.vieira@example.com",
  },
  {
    name: "Bruna Santos",
    email: "bruna.santos@example.com",
  },
  {
    name: "Daniel Reis Vieira",
    email: "daniel.vieira@example.com",
  },
  {
    name: "Dider Margarido",
    email: "dider.margarido@example.com",
  },
];

export function Team(): React.ReactElement {
  return (
    <Theme>
      <Card>
        <Card.Header>
          <Box direction="column" space={{ y: "lg" }}>
            <Text as="h5">Your team</Text>
            <Text size="sm" skin="secondary">
              Invite and manage your team members.
            </Text>
          </Box>
          <Box items="baseline" gap="lg">
            <TextField placeholder="Email address" />
            <Button>Invite</Button>
          </Box>
        </Card.Header>
        <Card.Body>
          {TEAM.map(({ name, email }) => (
            <React.Fragment key={email}>
              <Box items="center" justify="between">
                <Box items="center" gap="md">
                  <Avatar name={name} />
                  <Box direction="column">
                    <Text size="sm" weight="medium">
                      {name}
                    </Text>
                    <Text as="a" href="" size="xs" skin="secondary" alignment="end">
                      {email}
                    </Text>
                  </Box>
                </Box>
                <Button
                  skin="secondary"
                  appearance="ghost"
                  leftSlot={<TbDotsVertical />}
                  size="sm"
                  iconOnly>
                  Settings
                </Button>
              </Box>
              <Separator space={{ y: "xl" }} />
            </React.Fragment>
          ))}
        </Card.Body>
      </Card>
    </Theme>
  );
}
