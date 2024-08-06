import React from "react";
// UI Components
import {
  AspectRatio,
  Box,
  Button,
  Card,
  Container,
  Grid,
  Hoverable,
  ListBox,
  Separator,
  Tabs,
  Text,
  Theme,
} from "@stewed/react";
// Icons
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

const meta = {
  title: "Examples/Music",
  decorators: [
    (Story) => (
      <Theme>
        <Story />
      </Theme>
    ),
  ],
};

export default meta;

export const Discover = {
  render: function Example() {
    return (
      <Container screen="full">
        <Grid cols={12} gap="2xl">
          <Grid.Item colSpan={2}>
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
          </Grid.Item>
          <Grid.Item colSpan={10}>
            <Separator orientation="vertical" />
            <Box space={{ y: "4xl" }}>
              <Tabs value="music">
                <Tabs.List>
                  <Tabs.Item value="music">Music</Tabs.Item>
                  <Tabs.Item value="podcast">Podcast</Tabs.Item>
                  <Tabs.Item value="live" disabled>
                    Live
                  </Tabs.Item>
                </Tabs.List>
              </Tabs>
              <Button leftSlot={<IoIosAddCircleOutline />}>Add music</Button>
            </Box>

            <Grid cols={4} gap="md">
              {Array.from({ length: 8 }).map((_, index) => (
                <Grid.Item key={index}>
                  <Hoverable>
                    {({ isHovering }) => (
                      <Card shadow="none" hoverable>
                        <Box
                          direction="row"
                          skin="neutral-faded"
                          items="center"
                          justify="between"
                          grow>
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
              <Grid cols={4} gap="md">
                {Array.from({ length: 4 }).map((_, index) => (
                  <Box key={index} direction="column" padding={{ block: "lg" }} gap="md">
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
              <Grid cols={8} gap="md">
                {Array.from({ length: 8 }).map((_, index) => (
                  <Box key={index} direction="column" padding={{ block: "lg" }} gap="md">
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
                ))}
              </Grid>
            </Box>
          </Grid.Item>
        </Grid>
      </Container>
    );
  },
};
