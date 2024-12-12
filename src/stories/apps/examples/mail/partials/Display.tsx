import React from "react";
// UI Components
import { Stack, Box, Avatar, Text } from "@stewed/react";
// Hooks
import { useDateTime } from "@hello-week/hooks";
// Types
import type { Mail } from "../data";

export function Display(props: Partial<Mail>): React.ReactElement {
  const { formatDate } = useDateTime({ locale: "en-GB" });

  return (
    <Box padding={{ block: "md", inline: "md" }} fullWidth>
      <Stack gap="lg">
        <Avatar name={props?.name} />
        <Stack direction="column" grow>
          <Stack justify="between">
            <Text weight="semi-bold" space={{ y: "sm" }}>
              {props?.name}
            </Text>
            <Text size="xs" skin="neutral">
              {formatDate(props?.date, {
                month: "long",
                day: "2-digit",
                year: "numeric",
                hour: "numeric",
                minute: "2-digit",
                hour12: true
              })}
            </Text>
          </Stack>
          <Text size="xs" space={{ y: "xs" }}>
            {props?.subject}
          </Text>
          <Text size="xs" space={{ y: "xxs" }}>
            <Text as="span" weight="medium" inherit>
              Reply-To:{" "}
            </Text>
            <Text as="a" href="/" skin="primary" inherit>
              {props?.email}
            </Text>
          </Text>
        </Stack>
      </Stack>
    </Box>
  );
}
