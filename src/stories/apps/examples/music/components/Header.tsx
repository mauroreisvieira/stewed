import React from "react";
// UI Components
import {
  Box,
  Button,
  Container,
  Drawer,
  Grid,
  ListBox,
  Separator,
  Stack,
  Text
} from "@stewed/react";
// Hooks
import { useToggle } from "@stewed/hooks";
// Partials
import { Search } from "./Search";
import { Notifications } from "./Notifications";
import { Settings } from "./Settings";
// Icons
import { IoPersonCircleOutline, IoRadioOutline } from "react-icons/io5";
import { LuListMusic, LuMusic2 } from "react-icons/lu";
import { MdHome, MdOutlinePlayCircleOutline } from "react-icons/md";
import { RiAlbumFill, RiPlayListFill } from "react-icons/ri";
import { RxGrid } from "react-icons/rx";
import { TbMenuDeep, TbMicrophone2 } from "react-icons/tb";

export function Header(): React.ReactElement {
  // State to manage the visibility of a drawer (a toggle state)
  const [drawerState, onHandleDrawer] = useToggle(false);

  return (
    <>
      <Container as="header" screen="full">
        <Box padding={{ inline: "xl", block: "sm" }}>
          <Grid cols={2} responsive={{ sm: { cols: 6 }, lg: { cols: 3 } }} items="center">
            <Grid.Item>
              <Button
                leftSlot={<TbMenuDeep size={16} />}
                skin="secondary"
                appearance="ghost"
                onClick={onHandleDrawer}
                iconOnly
              >
                Menu
              </Button>
            </Grid.Item>

            <Grid.Item
              hidden
              responsive={{ sm: { hidden: false, colSpan: 4 }, lg: { colSpan: undefined } }}
            >
              <Stack items="center" gap="md">
                <Button
                  appearance="ghost"
                  skin="secondary"
                  leftSlot={<MdHome size={16} />}
                  iconOnly
                >
                  Home
                </Button>

                <Search />
              </Stack>
            </Grid.Item>

            <Grid.Item>
              <Stack justify="end">
                <Notifications />
                <Separator orientation="vertical" space={{ inline: "xl" }} />
                <Settings />
              </Stack>
            </Grid.Item>
          </Grid>
        </Box>
      </Container>
      <Drawer
        size="sm"
        onClose={onHandleDrawer}
        onClickOutside={onHandleDrawer}
        onEscape={onHandleDrawer}
        open={drawerState}
      >
        <Drawer.Header>
          <Text size="lg" weight="semi-bold">
            Your Library
          </Text>
        </Drawer.Header>
        <Drawer.Body>
          <Box space={{ y: "2xl" }}>
            <Stack direction="column" gap="md">
              <Text weight="bold">Discover</Text>
              <ListBox>
                <ListBox.Item leftSlot={<MdOutlinePlayCircleOutline />}>Listen now</ListBox.Item>
                <ListBox.Item leftSlot={<RxGrid />}>Browse</ListBox.Item>
                <ListBox.Item leftSlot={<IoRadioOutline />}>Radio</ListBox.Item>
              </ListBox>
            </Stack>
          </Box>

          <Box space={{ y: "2xl" }}>
            <Stack direction="column" gap="md">
              <Text weight="bold">Library</Text>
              <ListBox>
                <ListBox.Item leftSlot={<RiPlayListFill />}>Playlist</ListBox.Item>
                <ListBox.Item leftSlot={<LuMusic2 />}>Songs</ListBox.Item>
                <ListBox.Item leftSlot={<IoPersonCircleOutline />}>Made for you</ListBox.Item>
                <ListBox.Item leftSlot={<TbMicrophone2 />}>Artists</ListBox.Item>
                <ListBox.Item leftSlot={<RiAlbumFill />}>Albums</ListBox.Item>
              </ListBox>
            </Stack>
          </Box>

          <Box space={{ y: "2xl" }}>
            <Stack direction="column" gap="md">
              <Text weight="bold">Playlists</Text>
              <ListBox>
                <ListBox.Item leftSlot={<LuListMusic />}>Recently Added</ListBox.Item>
                <ListBox.Item leftSlot={<LuListMusic />}>Recently Played</ListBox.Item>
                <ListBox.Item leftSlot={<LuListMusic />}>Top Songs</ListBox.Item>
                <ListBox.Item leftSlot={<LuListMusic />}>Top Albums</ListBox.Item>
                <ListBox.Item leftSlot={<LuListMusic />}>Top Artists</ListBox.Item>
              </ListBox>
            </Stack>
          </Box>
        </Drawer.Body>
      </Drawer>
    </>
  );
}
