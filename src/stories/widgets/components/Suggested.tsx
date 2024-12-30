import React from "react";
// UI Components
import {
  Container,
  Card,
  Stack,
  Box,
  Group,
  Button,
  Dropdown,
  ListBox,
  Separator,
  Text
} from "@stewed/react";
// Hooks
import { useToggle } from "@stewed/hooks";
// Icons
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from "react-icons/md";
import { TbStar, TbPlus } from "react-icons/tb";

export function Suggested(): React.ReactElement {
  const [liked, handleToggle] = useToggle(false);

  return (
    <Container screen="sm" alignment="center" padding={{ block: "7xl" }}>
      <Card>
        <Card.Body>
          <Stack items="baseline">
            <Box>
              <Text weight="semi-bold" space={{ y: "lg" }}>
                @stewed/react
              </Text>
              <Text skin="neutral" size="sm">
                This is a collection of reusable React components built with SCSS, accompanied by
                React hooks, and a set of utilities to enhance the front-end development experience.
              </Text>
            </Box>
            <Group>
              <Button
                size="sm"
                skin="neutral"
                appearance={liked ? "filled" : "outline"}
                leftSlot={<TbStar />}
                onClick={handleToggle}
              >
                Start
              </Button>
              <Dropdown<HTMLButtonElement>
                placement="bottom-end"
                renderAnchor={({ ref, isOpen, open, close }) => (
                  <Button
                    ref={ref}
                    onClick={isOpen ? close : open}
                    pressed={isOpen}
                    size="sm"
                    skin="neutral"
                    appearance="outline"
                    leftSlot={
                      isOpen ? <MdOutlineKeyboardArrowUp /> : <MdOutlineKeyboardArrowDown />
                    }
                    iconOnly
                  >
                    Start
                  </Button>
                )}
              >
                {() => (
                  <Box padding={{ inline: "sm", block: "sm" }}>
                    <ListBox>
                      <ListBox.Group title="Suggested list">
                        <ListBox.Item>Future ideas</ListBox.Item>
                        <ListBox.Item>My Stack</ListBox.Item>
                        <ListBox.Item>Inspiration</ListBox.Item>
                      </ListBox.Group>
                      <Separator space={{ block: "none" }} />
                      <ListBox.Group>
                        <ListBox.Item leftSlot={<TbPlus />}>Create list</ListBox.Item>
                      </ListBox.Group>
                    </ListBox>
                  </Box>
                )}
              </Dropdown>
            </Group>
          </Stack>
        </Card.Body>
      </Card>
    </Container>
  );
}
