import React from "react";
// UI Components
import {
  Dropdown,
  Avatar,
  Box,
  Stack,
  Separator,
  Segmented,
  ListBox,
  Text,
  useTheme
} from "@stewed/react";
// Icons
import {
  MdLightMode,
  MdDarkMode,
  MdComputer,
  MdAccountCircle,
  MdSettings,
  MdHelpCenter,
  MdLogout
} from "react-icons/md";

type TMusicTheme = "default" | "dark";

export function Settings(): React.ReactElement {
  // Theme management hook to set and retrieve the current theme
  const { setTheme, theme } = useTheme<TMusicTheme>();

  return (
    <Dropdown<HTMLButtonElement>
      placement="bottom-end"
      flip={false}
      allowScroll={false}
      renderAnchor={({ ref, open, close, isOpen }) => (
        <Avatar
          ref={ref}
          as="button"
          onClick={isOpen ? close : open}
          name="Devon Lane"
          image={{
            src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde"
          }}
        />
      )}
    >
      {() => (
        <Box padding={{ block: "sm", inline: "sm" }}>
          <Stack items="center" gap="md">
            <Avatar
              skin="primary"
              size="md"
              name="Devon Lane"
              image={{
                src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde"
              }}
            />
            <Stack direction="column" gap="xs">
              <Text weight="medium">Devon Lane</Text>
              <Text as="a" href="" size="xs" skin="secondary">
                devon.lane@example.com
              </Text>
            </Stack>
          </Stack>
          <Separator space={{ block: "sm" }} />
          <Segmented value={theme} fullWidth>
            <Segmented.Item
              value="default"
              leftSlot={<MdLightMode />}
              aria-label="Light"
              onClick={() => {
                setTheme("default");
              }}
            />
            <Segmented.Item
              value="dark"
              leftSlot={<MdDarkMode />}
              aria-label="Dark"
              onClick={() => {
                setTheme("dark");
              }}
            />
            <Segmented.Item value="system" leftSlot={<MdComputer />} aria-label="System" disabled />
          </Segmented>
          <Separator space={{ block: "sm" }} />
          <ListBox>
            <ListBox.Item leftSlot={<MdAccountCircle />}>Account</ListBox.Item>
            <ListBox.Item leftSlot={<MdSettings />}>Settings</ListBox.Item>
            <ListBox.Item leftSlot={<MdHelpCenter />}>Help Center</ListBox.Item>
            <Separator space={{ block: "sm" }} />
            <ListBox.Item leftSlot={<MdLogout />}>Log Out</ListBox.Item>
          </ListBox>
        </Box>
      )}
    </Dropdown>
  );
}
