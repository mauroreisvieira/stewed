import React from "react";
// UI Components
import {
  Popover,
  Box,
  TextField,
  Stack,
  Separator,
  Button,
  ListBox,
  Hoverable
} from "@stewed/react";
// Icons
import { FiSearch } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { PiBrowsersFill } from "react-icons/pi";
import { RiHistoryLine } from "react-icons/ri";
// Data
import { RECENT_SEARCH } from "./data";

export function Search(): React.ReactElement {
  return (
    <Popover<HTMLDivElement>
      renderAnchor={({ ref: inputSearchRef, open, close }) => (
        <Box skin="neutral-faded" radius="sm" fullWidth>
          <TextField
            onFocus={open}
            onBlur={close}
            rootRef={inputSearchRef}
            list="recent-search"
            appearance="soft"
            skin="neutral"
            leftSlot={<FiSearch />}
            rightSlot={
              <Stack gap="sm">
                <Separator orientation="vertical" />
                <Button
                  leftSlot={<PiBrowsersFill size={16} />}
                  size="sm"
                  skin="secondary"
                  appearance="ghost"
                  iconOnly
                >
                  Browse
                </Button>
              </Stack>
            }
            size="xl"
            placeholder="What do you want to play?"
            fullWidth
          />
        </Box>
      )}
    >
      {({ reference }) => {
        return (
          <Box padding={{ block: "md", inline: "sm" }} style={{ width: `${reference?.width}px` }}>
            <ListBox>
              <ListBox.Group title="Recent searches">
                {RECENT_SEARCH.map((value, index) => (
                  <Hoverable key={index}>
                    {({ isHovering, isTouch }) => (
                      <ListBox.Item
                        as="a"
                        href="/"
                        leftSlot={<RiHistoryLine />}
                        rightSlot={
                          isHovering || isTouch ? (
                            <Button
                              size="xs"
                              skin="secondary"
                              appearance="ghost"
                              leftSlot={<IoMdClose />}
                              iconOnly
                            >
                              Remove
                            </Button>
                          ) : undefined
                        }
                      >
                        {value}
                      </ListBox.Item>
                    )}
                  </Hoverable>
                ))}
              </ListBox.Group>
            </ListBox>
          </Box>
        );
      }}
    </Popover>
  );
}
