import React, { useMemo, useState } from "react";
// UI Components
import {
  Container,
  Card,
  Stack,
  Separator,
  Box,
  Text,
  TextField,
  ListBox,
  Group,
  Avatar,
  Button
} from "@stewed/react";
// Hooks
import { useInput } from "@stewed/hooks";
// Icons
import { FiSearch, FiCheck } from "react-icons/fi";
// Data
import { team } from "./data";

export function NewMessage(): React.ReactElement {
  const [selected, setSelected] = useState<number[]>([]);

  const { value, onChange } = useInput<string>("");

  const filterTeam = useMemo(() => {
    if (value) {
      return team.filter(({ name }) => name.toUpperCase().includes(value.toUpperCase()));
    }

    return team;
  }, [value]);

  return (
    <Container screen="sm" alignment="center" padding={{ block: "7xl" }}>
      <Card>
        <Card.Header>
          <Stack gap="2xl">
            <Text as="h5">New message</Text>
          </Stack>
          <Text size="sm" skin="neutral">
            Invite a user to create a new group message.
          </Text>
        </Card.Header>
        <Separator />
        <Box padding={{ inline: "md" }}>
          <TextField
            leftSlot={<FiSearch />}
            appearance="ghost"
            onChange={onChange}
            value={value}
            placeholder="Search a user..."
          />
        </Box>
        <Separator />
        <Card.Body>
          <ListBox>
            <Group direction="column" gap="xxs" fullWidth>
              {filterTeam.length > 0 ? (
                <>
                  {filterTeam.map(({ id, name, email }) => (
                    <ListBox.Item
                      key={id}
                      as="button"
                      tabIndex={selected.includes(id) ? 0 : -1}
                      onClick={() => {
                        setSelected((prev) => {
                          const exists = prev.some((curr) => curr === id);

                          if (exists) {
                            return prev.filter((curr) => curr !== id);
                          }

                          return [...prev, id];
                        });
                      }}
                      rightSlot={selected.includes(id) ? <FiCheck /> : ""}
                    >
                      <Box padding={{ block: "sm" }}>
                        <Stack gap="lg" items="center">
                          <Avatar name={name} />
                          <Stack direction="column" gap="xs">
                            <Text weight="medium">{name}</Text>
                            <Text size="xs" skin="neutral">
                              {email}
                            </Text>
                          </Stack>
                        </Stack>
                      </Box>
                    </ListBox.Item>
                  ))}
                </>
              ) : (
                <Box padding={{ block: "4xl" }}>
                  <Text alignment="center" skin="neutral-faded">
                    No users found.
                  </Text>
                </Box>
              )}
            </Group>
          </ListBox>
        </Card.Body>
        <Separator />
        <Card.Footer>
          <Stack justify="between">
            <Stack gap="sm">
              <Avatar.Group>
                {team
                  .filter(({ id }) => selected.includes(id))
                  .map(({ id, name }) => (
                    <Avatar key={id} name={name} size="sm" />
                  ))}
              </Avatar.Group>
            </Stack>
            <Button disabled={selected.length === 0}>Continue</Button>
          </Stack>
        </Card.Footer>
      </Card>
    </Container>
  );
}
