import React, { useMemo, useState } from "react";
// UI Components
import {
  Box,
  Button,
  Container,
  Dropdown,
  Segmented,
  Separator,
  Stack,
  Switch,
  Text,
  TextArea,
  TextField,
  ListBox,
  Theme
} from "@stewed/react";
// Hooks
import { useSelect } from "@stewed/hooks";
// Partials
import { Actions } from "./components/Actions";
import { Sidebar } from "./components/Sidebar";
import { Display } from "./components/Display";
import { List } from "./components/List";
// Icons
import { LuSearch, LuCheck } from "react-icons/lu";
// Data
import { mails, accounts } from "./data";

export function Mail(): React.ReactElement {
  const [show, setShow] = useState<"all" | "unread">("all");

  const { item, index, setIndex } = useSelect(mails, 0);

  const {
    item: accountsItem,
    index: accountIndex,
    setIndex: setAccountsIndex
  } = useSelect(accounts, 0);

  const memoMails = useMemo(() => {
    if (show === "all") {
      return mails;
    }

    return mails.filter(({ read }) => Boolean(read));
  }, [show]);

  return (
    <Theme
      style={{ height: "90vh" }}
      tokens={{
        default: {
          color: {
            focus: "#000",
            "primary-foreground": "#000",
            "primary-background": "#000",
            "primary-border-faded": "slate-400",
            "primary-background-faded": "slate-100",
            "primary-background-hovered": "#010101",
            "primary-background-pressed": "#020202"
          }
        }
      }}
    >
      <Container
        screen="xl"
        alignment="center"
        style={{ height: "100%" }}
        padding={{ block: "2xl", inline: "2xl" }}
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
                <Dropdown<HTMLButtonElement>
                  renderAnchor={({ ref, isOpen, open, close }) => (
                    <Dropdown.Button
                      ref={ref}
                      onClick={isOpen ? close : open}
                      size="md"
                      leftSlot={accountsItem?.icon}
                      fullWidth
                    >
                      {accountsItem?.label}
                    </Dropdown.Button>
                  )}
                  placement="bottom-fit"
                >
                  {({ close }) => {
                    return (
                      <>
                        <Dropdown.Scrollable>
                          <Box padding={{ inline: "xs", block: "xs" }}>
                            <ListBox>
                              {accounts.map(({ icon, email }, idx) => (
                                <ListBox.Item
                                  key={email}
                                  as="button"
                                  leftSlot={icon}
                                  rightSlot={idx === accountIndex ? <LuCheck /> : undefined}
                                  selected={idx === accountIndex}
                                  onClick={() => {
                                    setAccountsIndex(idx);
                                    close();
                                  }}
                                >
                                  {email}
                                </ListBox.Item>
                              ))}
                            </ListBox>
                          </Box>
                        </Dropdown.Scrollable>
                      </>
                    );
                  }}
                </Dropdown>
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
                <TextField skin="neutral" placeholder="Search" leftSlot={<LuSearch />} />
              </Box>

              <Separator />

              <List mails={memoMails} selectedIndex={index} onSelectIndex={setIndex} />
            </Stack>

            <Separator orientation="vertical" />

            <Stack direction="column" size={6}>
              <Actions />

              <Separator />

              <Display {...item} />

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
