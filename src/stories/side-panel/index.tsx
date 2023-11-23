import React from "react";
import { Flex, Input, ActionList, Text as Text } from "../../../packages/react/index";
import { FiSearch, FiPenTool, FiFile, FiFilePlus, FiMap, FiTrash, FiLock } from "react-icons/fi";

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
      <ActionList>
        <ActionList.Group>
          <ActionList.Item leftSlot={<FiPenTool />} selected>
            <Text weight="medium">Daily notes</Text>
          </ActionList.Item>
          <ActionList.Item leftSlot={<FiFile />}>
            <Text weight="medium">All notes</Text>
          </ActionList.Item>
          <ActionList.Item leftSlot={<FiFilePlus />}>
            <Text weight="medium">Tasks</Text>
          </ActionList.Item>
          <ActionList.Item leftSlot={<FiMap />}>
            <Text weight="medium">Map</Text>
          </ActionList.Item>
          <ActionList.Item leftSlot={<FiTrash />} rightSlot={<FiLock />} disabled>
            <Text weight="medium">Trash</Text>
          </ActionList.Item>
        </ActionList.Group>

        <ActionList.Group title="Pinned messages">
          <ActionList.Item
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
          </ActionList.Item>
          <ActionList.Item>Individual errors coast</ActionList.Item>
          <ActionList.Item>Re-skin signs</ActionList.Item>
          <ActionList.Item>Reflect roadmap</ActionList.Item>
          <ActionList.Item>Top of mind</ActionList.Item>
        </ActionList.Group>
      </ActionList>
    </Flex>
  );
}
