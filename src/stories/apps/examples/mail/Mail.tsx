import React, { useMemo, useState } from "react";
// UI Components
import {
  Box,
  Button,
  Container,
  Stack,
  Text,
  Theme,
  TextArea,
  Segmented,
  Separator,
  TextField,
  Switch,
  Select,
  Avatar,
  Tooltip,
  Group,
  Badge,
  Tag,
  ScrollArea,
  Hoverable,
  Dropdown,
  ListBox,
} from "@stewed/react";
// Icons
import {
  LuReplyAll,
  LuReply,
  LuTrash,
  LuArchiveRestore,
  LuForward,
  LuTimerOff,
  LuMoreVertical,
  LuSearch,
  LuArchive,
} from "react-icons/lu";

import { Sidebar } from "./components/Sidebar";

// Hooks
import { useDateTime } from "@hello-week/hooks";
import { useSelect } from "@stewed/hooks";

// Data
import { mails } from "./data";

export function Mail(): React.ReactElement {
  const [show, setShow] = useState<"all" | "unread">("all");

  const { formatDate } = useDateTime({ locale: "en-GB" });
  const { item, index, setIndex } = useSelect(mails, 0);

  const memoMails = useMemo(() => {
    if (show === "all") {
      return mails;
    }

    return mails.filter(({ read }) => Boolean(read));
  }, [show]);

  return (
    <Theme style={{ height: "80vh" }}>
      <Container
        screen="2xl"
        alignment="center"
        style={{ height: "100%" }}
        padding={{ block: "lg", inline: "lg" }}
      >
        <Box
          radius="md"
          borderStyle="solid"
          borderColor="neutral-faded"
          borderWidth={1}
          style={{ height: "100%" }}
        >
          <Stack style={{ height: "100%" }}>
            <Stack direction="column" size={3}>
              <Box padding={{ block: "sm", inline: "md" }}>
                <Select leftSlot={<Text>🌸</Text>}>
                  <Select.Option>Judith Black</Select.Option>
                </Select>
              </Box>

              <Separator />

              <Box padding={{ block: "md", inline: "md" }}>
                <Sidebar />
              </Box>
            </Stack>

            <Separator orientation="vertical" />

            <Stack direction="column" size={4}>
              <Box padding={{ block: "sm", inline: "md" }} fullWidth>
                <Stack items="center" justify="between">
                  <Text size="lg" weight="bold">
                    Inbox
                  </Text>
                  <Segmented value={show} onValueChange={setShow}>
                    <Segmented.Item value="all">All mail</Segmented.Item>
                    <Segmented.Item value="unread">Unread</Segmented.Item>
                  </Segmented>
                </Stack>
              </Box>

              <Separator />

              <Box skin="default" padding={{ block: "md", inline: "md" }} fullWidth>
                <TextField
                  skin="neutral"
                  placeholder="Search"
                  leftSlot={<LuSearch />}
                  outline={false}
                />
              </Box>

              <Separator />

              <ScrollArea>
                <Box padding={{ block: "md", inline: "md" }} fullWidth>
                  <Group direction="column" gap="sm" loop={false}>
                    {memoMails.map(({ id, read, name, date, subject, labels, text }, idx) => (
                      <Hoverable key={id} aria-selected={index === idx} onClick={() => setIndex(idx)}>
                        {({ isHovering }) => (
                          <Box
                            as="button"
                            padding={{ block: "md", inline: "md" }}
                            radius="md"
                            borderColor={index === idx ? "primary-faded" : "neutral-faded"}
                            borderStyle="solid"
                            borderWidth={1}
                            skin={
                              index === idx
                                ? "primary-faded"
                                : isHovering
                                  ? "neutral-faded"
                                  : "default"
                            }
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
                                      year: "numeric",
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
                        )}
                      </Hoverable>
                    ))}
                  </Group>
                </Box>
              </ScrollArea>
            </Stack>

            <Separator orientation="vertical" />

            <Stack direction="column" size={6}>
              <Box padding={{ block: "sm", inline: "md" }} fullWidth>
                <Stack justify="between" grow>
                  <Stack gap="sm">
                    <Tooltip<HTMLButtonElement>
                      renderAnchor={(props) => (
                        <Button
                          {...props}
                          appearance="ghost"
                          skin="neutral"
                          leftSlot={<LuArchive size={14} />}
                          iconOnly
                        >
                          Archive
                        </Button>
                      )}
                    >
                      Archive
                    </Tooltip>

                    <Tooltip<HTMLButtonElement>
                      renderAnchor={(props) => (
                        <Button
                          {...props}
                          appearance="ghost"
                          skin="neutral"
                          leftSlot={<LuArchiveRestore size={14} />}
                          iconOnly
                        >
                          Archive junk
                        </Button>
                      )}
                    >
                      Archive junk
                    </Tooltip>

                    <Tooltip<HTMLButtonElement>
                      renderAnchor={(props) => (
                        <Button
                          {...props}
                          appearance="ghost"
                          skin="neutral"
                          leftSlot={<LuTrash size={14} />}
                          iconOnly
                        >
                          Move to trash
                        </Button>
                      )}
                    >
                      Move to trash
                    </Tooltip>

                    <Separator orientation="vertical" />

                    <Tooltip<HTMLButtonElement>
                      renderAnchor={(props) => (
                        <Button
                          {...props}
                          appearance="ghost"
                          skin="neutral"
                          leftSlot={<LuTimerOff size={14} />}
                          iconOnly
                        >
                          Snooze
                        </Button>
                      )}
                    >
                      Snooze
                    </Tooltip>
                  </Stack>

                  <Stack gap="sm">
                    <Tooltip<HTMLButtonElement>
                      renderAnchor={(props) => (
                        <Button
                          {...props}
                          appearance="ghost"
                          skin="neutral"
                          leftSlot={<LuReply size={14} />}
                          iconOnly
                        >
                          Reply
                        </Button>
                      )}
                    >
                      Reply
                    </Tooltip>

                    <Tooltip<HTMLButtonElement>
                      renderAnchor={(props) => (
                        <Button
                          {...props}
                          appearance="ghost"
                          skin="neutral"
                          leftSlot={<LuReplyAll size={14} />}
                          iconOnly
                        >
                          Reply all
                        </Button>
                      )}
                    >
                      Reply all
                    </Tooltip>

                    <Tooltip<HTMLButtonElement>
                      renderAnchor={(props) => (
                        <Button
                          {...props}
                          appearance="ghost"
                          skin="neutral"
                          leftSlot={<LuForward size={14} />}
                          iconOnly
                        >
                          Forward
                        </Button>
                      )}
                    >
                      Forward
                    </Tooltip>

                    <Separator orientation="vertical" />

                    <Dropdown<HTMLButtonElement>
                      renderAnchor={({ ref, isOpen, open, close }) => (
                        <Button
                          ref={ref}
                          onClick={isOpen ? close : open}
                          appearance="ghost"
                          skin="neutral"
                          leftSlot={<LuMoreVertical size={14} />}
                          iconOnly
                        >
                          More options
                        </Button>
                      )}
                      placement="bottom-end"
                    >
                      <ListBox>
                        <ListBox.Item>Mark as unread</ListBox.Item>
                        <ListBox.Item>Star thread</ListBox.Item>
                        <ListBox.Item>Mute thread</ListBox.Item>
                      </ListBox>
                    </Dropdown>
                  </Stack>
                </Stack>
              </Box>

              <Separator />

              <Box padding={{ block: "md", inline: "md" }} fullWidth>
                <Stack gap="lg">
                  <Avatar name={item?.name} />
                  <Stack direction="column" grow>
                    <Stack justify="between">
                      <Text weight="semi-bold" space={{ y: "sm" }}>
                        {item?.name}
                      </Text>
                      <Text size="xs" skin="neutral">
                        {formatDate(item?.date, {
                          month: "long",
                          day: "2-digit",
                          year: "numeric",
                          hour: "numeric",
                          minute: "2-digit",
                          hour12: true,
                        })}
                      </Text>
                    </Stack>
                    <Text size="xs" space={{ y: "xs" }}>
                      {item?.subject}
                    </Text>
                    <Text size="xs" space={{ y: "xxs" }}>
                      <Text as="span" weight="medium" inherit>
                        Reply-To:{" "}
                      </Text>
                      <Text as="a" href="/" skin="primary" inherit>
                        {item?.email}
                      </Text>
                    </Text>
                  </Stack>
                </Stack>
              </Box>

              <Separator />

              <Box padding={{ block: "lg", inline: "lg" }} fullHeight>
                <Text as="div" size="sm" whiteSpace="pre-wrap">
                  {item?.text}
                </Text>
              </Box>

              <Separator space={{ block: "md" }} />

              <Box padding={{ inline: "md" }} fullWidth>
                <TextArea rows={4} placeholder={`Reply ${item?.name}...`} resize="none" />
              </Box>

              <Box padding={{ block: "md", inline: "md" }} fullWidth>
                <Stack justify="between">
                  <Switch>
                    <Text size="xs">Mute this thread</Text>
                  </Switch>
                  <Button size="sm">Send</Button>
                </Stack>
              </Box>
            </Stack>
          </Stack>
        </Box>
      </Container>
    </Theme>
  );
}
