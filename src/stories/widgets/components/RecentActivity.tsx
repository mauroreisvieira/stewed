import React from "react";
// UI Components
import { Container, Card, Stack, Tooltip, Button, Avatar, Separator, Text } from "@stewed/react";
// Hooks
import { useDateTime } from "@hello-week/hooks";
// Icons
import { TbPin } from "react-icons/tb";

export function RecentActivity(): React.ReactElement {
  const { createDate } = useDateTime();

  return (
    <Container screen="md" alignment="center" padding={{ block: "7xl" }}>
      <Card>
        <Card.Header>
          <Stack items="baseline" justify="between" gap="2xl">
            <Text as="h5">Recent activity</Text>
            <Tooltip<HTMLButtonElement>
              placement="top"
              delay={1000}
              renderAnchor={(props) => (
                <Button size="sm" leftSlot={<TbPin />} appearance="ghost" iconOnly {...props}>
                  Bookmark
                </Button>
              )}
            >
              <Text size="xs" skin="white" inherit>
                Pin this widget to your dashboard for quick access.
              </Text>
            </Tooltip>
          </Stack>
          <Text size="sm" skin="neutral">
            Review what has happened over the past days.
          </Text>
        </Card.Header>
        <Card.Body>
          <Stack justify="between" gap="2xl" wrap="wrap">
            <Stack gap="md" items="center">
              <Avatar size="md" name="Noah Andersen" />
              <Stack direction="column">
                <Text weight="medium">Noah Andersen</Text>
                <Text size="sm" skin="neutral">
                  Purchased 15 office chairs and 2 drum sets
                </Text>
              </Stack>
            </Stack>
            <Text size="xs" skin="neutral" hidden responsive={{ md: { hidden: false } }}>
              {createDate().format({
                dateStyle: "medium",
                timeStyle: "short",
                hour12: true
              })}
            </Text>
          </Stack>
          <Separator space={{ block: "2xl" }} />
          <Stack justify="between" gap="2xl" wrap="wrap">
            <Stack gap="md" items="center">
              <Avatar size="md" name="Olivia Patel" />
              <Stack direction="column">
                <Text weight="medium">Olivia Patel</Text>
                <Text size="sm" skin="neutral">
                  Updated client details for{" "}
                  <Text as="a" size="sm" href="">
                    Acme Co.
                  </Text>
                </Text>
              </Stack>
            </Stack>
            <Text size="xs" skin="neutral" hidden responsive={{ md: { hidden: false } }}>
              {createDate().subtract(10, "days").format({
                dateStyle: "medium",
                timeStyle: "short",
                hour12: true
              })}
            </Text>
          </Stack>
        </Card.Body>
      </Card>
    </Container>
  );
}
