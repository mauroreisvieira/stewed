import React from "react";
import { Flex, Input, Menu, Text as Text } from "../../../packages/react/index";
import {
  FiSearch,
  FiPenTool,
  FiFile,
  FiFilePlus,
  FiMap,
  FiTrash,
  FiLock,
  FiMapPin,
} from "react-icons/fi";

export function App(): React.ReactElement {
  return (
    <Flex gap="2xl" direction="column">
      <Input
        placeholder="Search anything..."
        leftSlot={<FiSearch />}
        rightSlot={
          <Text as="span" size="xs">
            ⌘K
          </Text>
        }
      />
      <Menu>
        <Menu.Group>
          <Menu.Item leftSlot={<FiPenTool />} selected>
            <Text weight="medium">Daily notes</Text>
          </Menu.Item>
          <Menu.Item leftSlot={<FiFile />}>
            <Text weight="medium">All notes</Text>
          </Menu.Item>
          <Menu.Item leftSlot={<FiFilePlus />}>
            <Text weight="medium">Tasks</Text>
          </Menu.Item>
          <Menu.Item leftSlot={<FiMap />}>
            <Text weight="medium">Map</Text>
          </Menu.Item>
          <Menu.Item leftSlot={<FiTrash />} rightSlot={<FiLock />} disabled>
            <Text weight="medium">Trash</Text>
          </Menu.Item>
        </Menu.Group>

        <Menu.Group title="Pinned messages">
          <Menu.Item
            rightSlot={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                width={16}>
                <path d="M15 4.5l-4 4L7 10l-1.5 1.5 7 7L14 17l1.5-4 4-4"></path>
                <path d="M9 15L4.5 19.5"></path>
                <path d="M14.5 4L20 9.5"></path>
              </svg>
            }>
            Lee Evans new tour
          </Menu.Item>
          <Menu.Item>Individual errors coast</Menu.Item>
          <Menu.Item>Re-skin signs</Menu.Item>
          <Menu.Item>Reflect roadmap</Menu.Item>
          <Menu.Item>Top of mind</Menu.Item>
        </Menu.Group>
      </Menu>
    </Flex>
  );
}
