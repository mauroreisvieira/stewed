import React from "react";
// UI Components
import { ListBox, Separator, Text } from "@stewed/react";
// Icons
import {
  LuInbox,
  LuFile,
  LuSend,
  LuArchiveRestore,
  LuTrash,
  LuArchive,
  LuUsers,
  LuShoppingCart,
  LuPercent,
  LuStar
} from "react-icons/lu";

export function Sidebar(): React.ReactElement {
  return (
    <ListBox>
      <ListBox.Item leftSlot={<LuInbox />} rightSlot={<Text size="xs">11</Text>} selected>
        Inbox
      </ListBox.Item>
      <ListBox.Item leftSlot={<LuFile />}>Drafts</ListBox.Item>
      <ListBox.Item leftSlot={<LuSend />}>Sent</ListBox.Item>
      <ListBox.Item
        leftSlot={<LuArchiveRestore />}
        rightSlot={
          <Text size="xs" weight="medium">
            659
          </Text>
        }
      >
        Junk
      </ListBox.Item>
      <ListBox.Item leftSlot={<LuTrash />}>Trash</ListBox.Item>
      <ListBox.Item leftSlot={<LuArchive />}>Archive</ListBox.Item>

      <Separator space={{ block: "md" }} />

      <ListBox.Item
        leftSlot={<LuUsers />}
        rightSlot={
          <Text size="xs" weight="medium">
            74
          </Text>
        }
      >
        Social
      </ListBox.Item>
      <ListBox.Item
        leftSlot={<LuStar />}
        rightSlot={
          <Text size="xs" weight="medium">
            19
          </Text>
        }
      >
        Vip
      </ListBox.Item>
      <ListBox.Item
        leftSlot={<LuShoppingCart />}
        rightSlot={
          <Text size="xs" weight="medium">
            28
          </Text>
        }
      >
        Shoppings
      </ListBox.Item>
      <ListBox.Item
        leftSlot={<LuPercent />}
        rightSlot={
          <Text size="xs" weight="medium">
            7
          </Text>
        }
      >
        Promotions
      </ListBox.Item>
    </ListBox>
  );
}
