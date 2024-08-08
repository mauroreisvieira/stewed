import React from "react";
// UI Components
import {
  Avatar,
  Box,
  Button,
  Card,
  Container,
  Dialog,
  Drawer,
  Dropdown,
  Grid,
  Hoverable,
  ListBox,
  Separator,
  Tabs,
  Text,
  TextField,
  Theme,
} from "@stewed/react";
// Hooks
import { useToggle } from "@stewed/hooks";
// Icons
import { TbMenuDeep } from "react-icons/tb";
import { FaPlayCircle } from "react-icons/fa";
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdOutlinePlayCircleOutline } from "react-icons/md";
import { IoRadioOutline } from "react-icons/io5";
import { RxGrid } from "react-icons/rx";
import { RiPlayListFill } from "react-icons/ri";
import { LuListMusic } from "react-icons/lu";
import { LuMusic2 } from "react-icons/lu";
import { TbMicrophone2 } from "react-icons/tb";
import { RiAlbumFill } from "react-icons/ri";
import { IoPersonCircleOutline } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";

const meta = {
  title: "Examples/Music",
  decorators: [
    (Story) => (
      <Theme
        theme="default"
        tokens={{
          default: {
            color: {
              primary: "#1DB954",
              secondary: "#333",
            },
            components: {
              "button": {
                radius: "full",
              },
              "text-field": {
                radius: "full",
              },
            },
          },
        }}>
        <Story />
      </Theme>
    ),
  ],
};

export default meta;

export const Discover = {
  render: function Render() {
    const [drawerState, onHandleDrawer] = useToggle(false);
    const [dialogState, onHandleDialog] = useToggle(false);

    return (
      <Container screen="full">
        <Grid cols={3}>
          <Button
            leftSlot={<TbMenuDeep />}
            skin="secondary"
            appearance="ghost"
            onClick={onHandleDrawer}
            iconOnly>
            Menu
          </Button>

          <TextField
            skin="neutral-faded"
            leftSlot={<FiSearch />}
            size="lg"
            placeholder="What do you want to play?"
            fullWidth
          />

          <Box justify="end">
            <Dropdown<HTMLSpanElement>
              placement="bottom-end"
              content={
                <ListBox>
                  <ListBox.Item>Account</ListBox.Item>
                  <ListBox.Item>Profile</ListBox.Item>
                  <ListBox.Item>Settings</ListBox.Item>
                  <ListBox.Item>Logout</ListBox.Item>
                </ListBox>
              }>
              {({ ref, onClick }) => (
                <span ref={ref} onClick={onClick}>
                  <Avatar src="https://placehold.co/100x100" name="Mauro Vieira" />
                </span>
              )}
            </Dropdown>
          </Box>
        </Grid>

        <Separator space={{ block: "md" }} />

        <Box items="baseline" space={{ y: "4xl" }}>
          <Tabs value="music" size="lg">
            <Tabs.List>
              <Tabs.Item value="music">Music</Tabs.Item>
              <Tabs.Item value="podcast">Podcast</Tabs.Item>
              <Tabs.Item value="live" disabled>
                Live
              </Tabs.Item>
            </Tabs.List>
          </Tabs>
          <Button onClick={onHandleDialog} leftSlot={<IoIosAddCircleOutline />}>Add music</Button>
        </Box>

        <Grid cols={2} responsive={{ md: { cols: 4 } }} gap="md">
          {Array.from({ length: 8 }).map((_, index) => (
            <Grid.Item key={index}>
              <Hoverable>
                {({ isHovering }) => (
                  <Card shadow="none" hoverable>
                    <Box direction="row" skin="neutral-faded" items="center" justify="between" grow>
                      <Box items="center" gap="md">
                        <img src="https://placehold.co/80x80" style={{ height: "100%" }} />
                        <Text weight="medium">Daily Mix 1</Text>
                      </Box>
                      {isHovering && (
                        <Box padding={{ inline: "md" }} items="center">
                          <Text skin="primary" size="5xl">
                            <FaPlayCircle />
                          </Text>
                        </Box>
                      )}
                    </Box>
                  </Card>
                )}
              </Hoverable>
            </Grid.Item>
          ))}
        </Grid>

        <Box direction="column">
          <Text as="h4" space={{ y: "xs" }}>
            Listen Now
          </Text>
          <Text size="sm" skin="neutral">
            Top picks for you. Updated daily.
          </Text>

          <Separator space={{ block: "lg" }} />

          <Grid cols={2} responsive={{ md: { cols: 4 } }} gap="md">
            {Array.from({ length: 4 }).map((_, index) => (
              <Card key={index} shadow="none" hoverable>
                <Box direction="column" gap="md">
                  <img
                    src="https://placehold.co/900x1200"
                    style={{ width: "100%", height: "100%" }}
                  />

                  <div>
                    <Text size="sm" weight="medium">
                      React Rendezvous
                    </Text>
                    <Text size="sm" skin="neutral">
                      Ethan Byte
                    </Text>
                  </div>
                </Box>
              </Card>
            ))}
          </Grid>
        </Box>

        <Box direction="column">
          <Text as="h4" space={{ y: "xs" }}>
            Made for You
          </Text>
          <Text size="sm" skin="neutral">
            Your personal playlists. Updated daily.
          </Text>
          <Separator space={{ block: "lg" }} />
          <Grid cols={2} responsive={{ sm: { cols: 4 }, md: { cols: 8 } }} gap="md">
            {Array.from({ length: 8 }).map((_, index) => (
              <Card key={index} shadow="none">
                <Box direction="column" gap="md">
                  <img
                    src="https://placehold.co/200x200"
                    style={{ width: "100%", height: "100%" }}
                  />

                  <div>
                    <Text size="sm" weight="medium">
                      React Rendezvous
                    </Text>
                    <Text size="xs" skin="neutral">
                      Ethan Byte
                    </Text>
                  </div>
                </Box>
              </Card>
            ))}
          </Grid>
        </Box>

        <Drawer size="sm" onClose={onHandleDrawer} open={drawerState}>
          <Drawer.Header>
            <Text size="lg" weight="semi-bold">
              Your Library
            </Text>
          </Drawer.Header>
          <Drawer.Body>
            <Box direction="column" space={{ y: "2xl" }} gap="md">
              <Text weight="bold">Discover</Text>
              <ListBox>
                <ListBox.Item leftSlot={<MdOutlinePlayCircleOutline />}>Listen now</ListBox.Item>
                <ListBox.Item leftSlot={<RxGrid />}>Browse</ListBox.Item>
                <ListBox.Item leftSlot={<IoRadioOutline />}>Radio</ListBox.Item>
              </ListBox>
            </Box>

            <Box direction="column" space={{ y: "2xl" }} gap="md">
              <Text weight="bold">Library</Text>
              <ListBox>
                <ListBox.Item leftSlot={<RiPlayListFill />}>Playlist</ListBox.Item>
                <ListBox.Item leftSlot={<LuMusic2 />}>Songs</ListBox.Item>
                <ListBox.Item leftSlot={<IoPersonCircleOutline />}>Made for you</ListBox.Item>
                <ListBox.Item leftSlot={<TbMicrophone2 />}>Artists</ListBox.Item>
                <ListBox.Item leftSlot={<RiAlbumFill />}>Albums</ListBox.Item>
              </ListBox>
            </Box>

            <Box direction="column" space={{ y: "2xl" }} gap="md">
              <Text weight="bold">Playlists</Text>
              <ListBox>
                <ListBox.Item leftSlot={<LuListMusic />}>Recently Added</ListBox.Item>
                <ListBox.Item leftSlot={<LuListMusic />}>Recently Played</ListBox.Item>
                <ListBox.Item leftSlot={<LuListMusic />}>Top Songs</ListBox.Item>
                <ListBox.Item leftSlot={<LuListMusic />}>Top Albums</ListBox.Item>
                <ListBox.Item leftSlot={<LuListMusic />}>Top Artists</ListBox.Item>
              </ListBox>
            </Box>
          </Drawer.Body>
        </Drawer>

        <Dialog onClose={onHandleDialog} open={dialogState}>
          <Dialog.Header>
            <Text size="lg" weight="semi-bold">
              Add music
            </Text>
          </Dialog.Header>
          <Dialog.Body>
            Dialog Content
          </Dialog.Body>
        </Dialog>
      </Container>
    );
  },
};
