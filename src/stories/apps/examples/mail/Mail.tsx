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
} from "@stewed/react";
// Hooks
import { useSelect } from "@stewed/hooks";
// Partials
import { Actions } from "./partials/Actions";
import { Sidebar } from "./partials/Sidebar";
import { Display } from "./partials/Display";
import { List } from "./partials/List";
// Icons
import { LuSearch } from "react-icons/lu";
// Data
import { mails } from "./data";

export function Mail(): React.ReactElement {
  const [show, setShow] = useState<"all" | "unread">("all");

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
                  outlineFocus={false}
                />
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
