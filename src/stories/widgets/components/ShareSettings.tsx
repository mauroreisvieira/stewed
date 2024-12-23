import React from "react";
// UI Components
import {
  Container,
  Card,
  Stack,
  Avatar,
  Text,
  Switch,
  TextField,
  Dropdown,
  Button,
  ListBox,
  Separator,
  FormField
} from "@stewed/react";
// Icons
import { FiCopy } from "react-icons/fi";
import { MdOutlineKeyboardArrowUp, MdOutlineKeyboardArrowDown } from "react-icons/md";
// Data
import { team } from "./data";

export function ShareSettings(): React.ReactElement {
  return (
    <Container screen="sm" alignment="center" padding={{ block: "7xl" }}>
      <Card>
        <Card.Header>
          <Stack items="center" gap="md">
            <Avatar name="Acme" size="xl" shape="square" />
            <Stack direction="column" gap="xxs">
              <Text as="h5">Share Settings</Text>
              <Text size="sm" skin="neutral">
                Manage the authorization of this workspaces
              </Text>
            </Stack>
          </Stack>
        </Card.Header>
        <Card.Body>
          <Stack direction="column" gap="xl">
            <Card>
              <Card.Body>
                <Stack justify="between">
                  <div>
                    <Text weight="medium" space={{ y: "sm" }}>
                      Public Access
                    </Text>
                    <Text size="xs">Publish and share link with anyone</Text>
                  </div>
                  <Switch defaultChecked />
                </Stack>
              </Card.Body>
            </Card>

            <Stack direction="column" gap="sm">
              <Text weight="medium">Team members</Text>
              <Stack justify="between" gap="lg">
                <TextField
                  placeholder="Enter email"
                  rightSlot={
                    <Dropdown<HTMLButtonElement>
                      placement="bottom-end"
                      renderAnchor={({ ref, isOpen, open, close }) => (
                        <Button
                          ref={ref}
                          onClick={isOpen ? close : open}
                          size="xs"
                          skin="neutral"
                          appearance="ghost"
                          rightSlot={
                            isOpen ? <MdOutlineKeyboardArrowUp /> : <MdOutlineKeyboardArrowDown />
                          }
                        >
                          Can view
                        </Button>
                      )}
                    >
                      {({ close }) => (
                        <ListBox>
                          <ListBox.Item onClick={close}>Can view</ListBox.Item>
                          <ListBox.Item onClick={close}>Can edit</ListBox.Item>
                        </ListBox>
                      )}
                    </Dropdown>
                  }
                  fullWidth
                />
                <Button>Send Invite</Button>
              </Stack>
            </Stack>
          </Stack>

          <Separator space={{ block: "xl" }} />

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
                <Dropdown<HTMLButtonElement>
                  placement="bottom-end"
                  renderAnchor={({ ref, isOpen, open, close }) => (
                    <Button
                      ref={ref}
                      onClick={isOpen ? close : open}
                      size="xs"
                      skin="neutral"
                      appearance="ghost"
                      rightSlot={
                        isOpen ? <MdOutlineKeyboardArrowUp /> : <MdOutlineKeyboardArrowDown />
                      }
                    >
                      Can view
                    </Button>
                  )}
                >
                  {({ close }) => (
                    <ListBox>
                      <ListBox.Item onClick={close}>Can view</ListBox.Item>
                      <ListBox.Item onClick={close}>Can edit</ListBox.Item>
                    </ListBox>
                  )}
                </Dropdown>
              </Stack>
              <Separator space={{ block: "xl" }} />
            </React.Fragment>
          ))}

          <FormField>
            <FormField.Label>Copy link</FormField.Label>
            <FormField.Control>
              <TextField
                placeholder="https://figma.com/design/oobq11Zltwz0ai"
                rightSlot={
                  <Button size="sm" appearance="ghost" leftSlot={<FiCopy />} iconOnly>
                    Copy
                  </Button>
                }
                fullWidth
              />
            </FormField.Control>
          </FormField>
        </Card.Body>
      </Card>
    </Container>
  );
}
