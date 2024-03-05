import React, { useRef, useState } from "react";
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
  Dropdown,
  ListBox,
} from "../../../../packages/react/index";
import { TbDotsVertical } from "react-icons/tb";

const TEAM = [
  {
    id: 1,
    name: "Mauro Vieira",
    email: "mauro.vieira@example.com",
    open: false,
  },
  {
    id: 2,
    name: "Henrique Vieira",
    email: "henrique.vieira@example.com",
    open: false,
  },
  {
    id: 3,
    name: "Lourenco Vieira",
    email: "lourenco.vieira@example.com",
    open: false,
  },
  {
    id: 4,
    name: "Bruna Santos",
    email: "bruna.santos@example.com",
    open: false,
  },
  {
    id: 5,
    name: "Daniel Reis Vieira",
    email: "daniel.vieira@example.com",
    open: false,
  },
];

function Action({ onClick, open }) {
  const ref = useRef<HTMLButtonElement>(null);

  return (
    <>
      <Button
        ref={ref}
        skin="neutral"
        appearance="ghost"
        leftSlot={<TbDotsVertical />}
        size="sm"
        onClick={onClick}
        iconOnly>
        Settings
      </Button>
      <Dropdown placement="bottom-end" reference={ref.current} open={open}>
        <ListBox>
          <ListBox.Group>
            <ListBox.Item>Edit</ListBox.Item>
            <ListBox.Item>Send message</ListBox.Item>
          </ListBox.Group>
          <Separator space={{ block: "sm" }} />
          <ListBox.Group>
            <ListBox.Item skin="critical">Delete</ListBox.Item>
          </ListBox.Group>
        </ListBox>
      </Dropdown>
    </>
  );
}

export function Team(): React.ReactElement {
  const [team, setTeam] = useState(TEAM);

  return (
    <Theme>
      <Card>
        <Card.Header>
          <Text as="h5">Your team</Text>
          <Text size="sm" skin="neutral" space={{ y: "lg" }}>
            Invite and manage your team members.
          </Text>

          <Box items="baseline" gap="lg">
            <TextField placeholder="Email address" />
            <Button>Invite</Button>
          </Box>
        </Card.Header>
        <Card.Body>
          {team.map(({ id, name, email, open }, index) => (
            <React.Fragment key={id}>
              <Box items="center" justify="between">
                <Box items="center" gap="md">
                  <Avatar name={name} />
                  <Box direction="column">
                    <Text size="sm" weight="medium">
                      {name}
                    </Text>
                    <Text as="a" href="" size="xs" skin="neutral" alignment="end">
                      {email}
                    </Text>
                  </Box>
                </Box>
                <Action
                  open={open}
                  onClick={() =>
                    setTeam((prev) =>
                      prev.map((value) => ({
                        ...value,
                        open: value.id === id ? !value.open : false,
                      })),
                    )
                  }
                />
              </Box>
              <Separator space={{ block: "xl" }} />
            </React.Fragment>
          ))}
        </Card.Body>
      </Card>
    </Theme>
  );
}
