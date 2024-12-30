import React, { useCallback, useMemo, useState } from "react";
// UI Components
import {
  Avatar,
  Badge,
  Box,
  Button,
  Dropdown,
  ListBox,
  ScrollArea,
  Separator,
  Stack,
  Text
} from "@stewed/react";
// Hooks
import { useDateTime } from "@hello-week/hooks";
// Icons
import { MdNotifications } from "react-icons/md";
import { IoCheckmarkDone } from "react-icons/io5";
// Data
import { NOTIFICATIONS } from "./data";

export function Notifications(): React.ReactElement {
  const { createDate, formatDate } = useDateTime();

  const [listNotifications, setListNotifications] = useState(NOTIFICATIONS);

  const convertDatetime = useCallback(
    (date: Date) => {
      const minDate = new Date(new Date().setDate(new Date().getDate() - 3)); // 3 days ago
      const now = new Date();
      const createdDate = createDate(date);

      const diffInMinutes = createdDate.diff(now, "minutes");

      // If the createdDate is within the last 5 days
      if (createdDate.isAfter(minDate)) {
        if (diffInMinutes > 60) {
          const diffInHours = createdDate.diff(now, "hours");
          if (diffInHours > 23) {
            return `${createdDate.diff(now, "days")} day(s)`;
          }

          return `${diffInHours} hour(s)`;
        }

        return `${diffInMinutes} minute(s)`;
      }

      // If the createdDate is older than 5 days, display the formatted date
      return formatDate(date, {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "numeric",
        minute: "numeric"
      });
    },
    [createDate, formatDate]
  );

  const countNotifications = useMemo(() => {
    return listNotifications.reduce((acc, cur) => {
      if (!cur.read) {
        return acc + 1;
      }

      return acc;
    }, 0);
  }, [listNotifications]);

  const onHandleSetAllRead = useCallback(() => {
    setListNotifications((prev) =>
      prev.map((item) => ({
        ...item,
        read: true
      }))
    );
  }, []);

  return (
    <Dropdown<HTMLButtonElement>
      placement="bottom-end"
      allowScroll={false}
      renderAnchor={({ ref, open, close, isOpen }) => (
        <Badge
          overlap="circular"
          skin="critical"
          value={countNotifications}
          hidden={!countNotifications}
        >
          <Button
            ref={ref}
            onClick={isOpen ? close : open}
            appearance="ghost"
            skin="secondary"
            leftSlot={<MdNotifications size={16} />}
            iconOnly
          >
            Notifications
          </Button>
        </Badge>
      )}
    >
      {() => (
        <div style={{ width: 360 }}>
          <Box padding={{ inline: "lg", block: "md" }}>
            <Stack justify="between" items="center">
              <Text weight="medium">Notifications</Text>
              <Button
                as="button"
                size="sm"
                skin="neutral"
                appearance="ghost"
                onClick={onHandleSetAllRead}
                leftSlot={<IoCheckmarkDone />}
                iconOnly
              >
                Mark all as read
              </Button>
            </Stack>
          </Box>
          <Separator />
          <Stack style={{ maxHeight: 420 }}>
            <ScrollArea>
              <Box padding={{ block: "sm", inline: "sm" }}>
                <ListBox>
                  {listNotifications
                    .sort((a, b) => b.date.getTime() - a.date.getTime())
                    .map(({ id, user, action, content, date, read }) => (
                      <ListBox.Item as="button" key={id}>
                        <Box padding={{ block: "sm" }}>
                          <Stack gap="sm">
                            {read ? (
                              <Avatar
                                appearance="outline"
                                skin="neutral-faded"
                                name={user}
                                size="sm"
                              />
                            ) : (
                              <Badge overlap="circular">
                                <Avatar
                                  appearance="outline"
                                  skin="neutral-faded"
                                  name={user}
                                  size="sm"
                                />
                              </Badge>
                            )}
                            <Box>
                              <Text weight="medium" size="sm" space={{ y: "xs" }}>
                                {user}{" "}
                                <Text
                                  weight="normal"
                                  as="span"
                                  skin="neutral"
                                  space={{ x: "xs" }}
                                  inherit
                                >
                                  {action}
                                </Text>
                                <Text as="a" tabIndex={-1} href="/" inherit>
                                  {content}
                                </Text>
                              </Text>
                              <Text size="xs" skin="neutral">
                                {convertDatetime(date)} ago
                              </Text>
                            </Box>
                          </Stack>
                        </Box>
                      </ListBox.Item>
                    ))}
                </ListBox>
              </Box>
            </ScrollArea>
          </Stack>
        </div>
      )}
    </Dropdown>
  );
}
