import React from "react";
// UI Components
import { Container, Card, Stack, TextField, Button, Avatar, Separator, Text } from "@stewed/react";
// Data
import { team } from "./data";

export function Team(): React.ReactElement {
  return (
    <Container screen="lg" alignment="center" padding={{ block: "7xl" }}>
      <Card>
        <Card.Header>
          <Text as="h5">Your team</Text>
          <Text size="sm" skin="neutral" space={{ y: "lg" }}>
            Invite and manage your team members.
          </Text>

          <Stack items="baseline" gap="lg">
            <TextField placeholder="Email address" fullWidth />
            <Button>Invite</Button>
          </Stack>
        </Card.Header>
        <Card.Body>
          {team.map(({ id, name, email }) => (
            <React.Fragment key={id}>
              <Stack items="center" justify="between">
                <Stack items="center" gap="md">
                  <Avatar name={name} />
                  <Stack direction="column" gap="xs">
                    <Text size="sm" weight="medium">
                      {name}
                    </Text>
                    <Text as="a" href="" size="xs" skin="neutral">
                      {email}
                    </Text>
                  </Stack>
                </Stack>
              </Stack>
              <Separator space={{ block: "xl" }} />
            </React.Fragment>
          ))}
        </Card.Body>
      </Card>
    </Container>
  );
}
