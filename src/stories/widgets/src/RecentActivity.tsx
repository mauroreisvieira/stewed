import React from "react";
// UI Components
import { Text, Box, Card, Theme, Separator, Button, Avatar } from "../../../../packages/react/index";
import { TbPin } from "react-icons/tb";

export function RecentActivity(): React.ReactElement {
  return (
    <Theme>
      <Card>
        <Card.Header>
          <Box items="baseline" justify="between" gap="2xl">
            <Text as="h5">Recent activity</Text>
            <Button size="sm" leftSlot={<TbPin />} appearance="ghost" iconOnly>
              Bookmark
            </Button>
          </Box>
          <Text size="sm" skin="secondary">
            Review what has happened over the past days.
          </Text>
        </Card.Header>
        <Card.Body>
          <Box justify="between" gap="2xl" wrap="wrap">
            <Box gap="md" items="center">
              <Avatar size="md" name="Lourenço Vieira" />
              <Box direction="column">
                <Text weight="medium">Lourenço Vieira</Text>
                <Text size="sm" skin="secondary">
                  Purchased 15 office chairs and 2 drum sets
                </Text>
              </Box>
            </Box>
            <Text size="xs" skin="secondary">
              June 21, 9:43 am
            </Text>
          </Box>
          <Separator space={{ y: "2xl" }} />
          <Box justify="between" gap="2xl" wrap="wrap">
            <Box gap="md" items="center">
              <Avatar size="md" name="Henrique Vieira" />
              <Box direction="column">
                <Text weight="medium">Henrique Vieira</Text>
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
