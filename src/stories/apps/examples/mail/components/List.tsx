import React from "react";
// UI Components
import {
  Group,
  Hoverable,
  Box,
  Stack,
  Badge,
  Tag,
  ScrollArea,
  Text,
  type BoxProps
} from "@stewed/react";
// Hooks
import { useDateTime } from "@hello-week/hooks";
// Types
import type { Mail } from "../data";

interface ListProps {
  mails: Mail[];
  selectedIndex: number;
  onSelectIndex: (index: number) => void;
}

export function List({ mails, selectedIndex, onSelectIndex }: ListProps): React.ReactElement {
  const { formatDate } = useDateTime({ locale: "en-GB" });

  return (
    <ScrollArea>
      <Box padding={{ block: "md", inline: "md" }} fullWidth>
        <Group direction="column" gap="sm" loop={false}>
          {mails.map(({ id, read, name, date, subject, labels, text }, idx) => (
            <Hoverable
              key={id}
              aria-selected={selectedIndex === idx}
              onClick={() => onSelectIndex(idx)}
            >
              {({ isHovering }) => {
                let skin: BoxProps["skin"] = "default";

                if (selectedIndex === idx) {
                  skin = "primary-faded";
                }

                if (isHovering) {
                  skin = "neutral-faded";
                }

                return (
                  <Box
                    as="button"
                    padding={{ block: "md", inline: "md" }}
                    radius="md"
                    borderColor={selectedIndex === idx ? "primary-faded" : "neutral-faded"}
                    borderStyle="solid"
                    borderWidth={1}
                    skin={skin}
                    fullWidth
                  >
                    <Stack gap="md" items="baseline">
                      {read ? <Badge skin="info" /> : <div />}
                      <div>
                        <Stack items="baseline" justify="between">
                          <Stack gap="sm">
                            <Text size="sm" weight="semi-bold" space={{ y: "sm" }}>
                              {name}
                            </Text>
                          </Stack>
                          <Text size="xs" skin="neutral">
                            {formatDate(date, {
                              day: "2-digit",
                              month: "2-digit",
                              year: "numeric"
                            })}
                          </Text>
                        </Stack>
                        <Text size="xs" weight="medium" space={{ y: "md" }}>
                          {subject}
                        </Text>
                        <Text size="xs" skin="neutral" lineClamp={2} space={{ y: "md" }}>
                          {text}
                        </Text>
                        <Stack gap="xs">
                          {labels.map((label) => (
                            <Tag key={label} size="xs" skin="neutral" appearance="outline">
                              {label}
                            </Tag>
                          ))}
                        </Stack>
                      </div>
                    </Stack>
                  </Box>
                );
              }}
            </Hoverable>
          ))}
        </Group>
      </Box>
    </ScrollArea>
  );
}
