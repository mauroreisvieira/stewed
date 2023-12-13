import React from "react";
// UI Components
import { Text, Box, Card, Theme, Divider, Button, Avatar } from "../../../../packages/react/index";
import { FiBookmark } from "react-icons/fi";

export function RecentActivity(): React.ReactElement {
  return (
    <Theme>
      <Card>
        <Card.Header>
          <Box items="baseline" justify="between" gap="2xl">
            <Text as="h5">Recent activity</Text>
            <Button size="sm" leftSlot={<FiBookmark />} appearance="ghost" iconOnly>
              Bookmark
            </Button>
          </Box>
          <Text size="sm" skin="secondary">
            Review what has happened over the past days.
          </Text>
        </Card.Header>
        <Card.Body>
          <Box justify="between">
            <Box gap="md" items="center">
              <Avatar size="md" name="Zahra Ambessa" />
              <Box direction="column">
                <Text weight="medium">Zahra Ambessa</Text>
                <Text size="sm" skin="secondary">
                  Purchased 15 office chairs and 2 drum sets
                </Text>
              </Box>
            </Box>
            <Text size="xs" skin="secondary">
              June 21, 9:43 am
            </Text>
          </Box>
          <Divider space={{ y: "2xl" }} />
          <Box justify="between">
            <Box gap="md" items="center">
              <Avatar size="md" name="Jasper Eriksson" />
              <Box direction="column">
                <Text weight="medium">Jasper Eriksson</Text>
                <Text size="sm" skin="secondary">
                  Updated client details for{" "}
                  <Text as="a" size="sm" href="">
                    Acme Co.
                  </Text>
                </Text>
              </Box>
            </Box>
            <Text size="xs" skin="secondary">
              June 20, 3:30 pm
            </Text>
          </Box>
        </Card.Body>
      </Card>
    </Theme>
  );
}
