import React from "react";
// UI Components
import {
  Box,
  Stack,
  Tooltip,
  Button,
  Separator,
  Popover,
  Dropdown,
  Calendar,
  ListBox,
  Text
} from "@stewed/react";
// Icons
import {
  LuArchive,
  LuArchiveRestore,
  LuTrash,
  LuTimerOff,
  LuChevronRight,
  LuChevronLeft,
  LuReply,
  LuReplyAll,
  LuForward,
  LuEllipsisVertical
} from "react-icons/lu";

export function Actions(): React.ReactElement {
  return (
    <Box padding={{ block: "sm", inline: "md" }} fullWidth>
      <Stack justify="between" grow>
        <Stack gap="sm">
          <Tooltip<HTMLButtonElement>
            renderAnchor={(props) => (
              <Button
                {...props}
                appearance="ghost"
                skin="neutral"
                leftSlot={<LuArchive size={14} />}
                iconOnly
              >
                Archive
              </Button>
            )}
          >
            Archive
          </Tooltip>

          <Tooltip<HTMLButtonElement>
            renderAnchor={(props) => (
              <Button
                {...props}
                appearance="ghost"
                skin="neutral"
                leftSlot={<LuArchiveRestore size={14} />}
                iconOnly
              >
                Archive junk
              </Button>
            )}
          >
            Archive junk
          </Tooltip>

          <Tooltip<HTMLButtonElement>
            renderAnchor={(props) => (
              <Button
                {...props}
                appearance="ghost"
                skin="neutral"
                leftSlot={<LuTrash size={14} />}
                iconOnly
              >
                Move to trash
              </Button>
            )}
          >
            Move to trash
          </Tooltip>

          <Separator orientation="vertical" />

          <Popover
            renderAnchor={({ attachRefs, isOpen, open, close }) => (
              <Tooltip<HTMLButtonElement>
                renderAnchor={({ ref: tooltipRef, onMouseEnter, onMouseLeave }) => (
                  <Button
                    ref={attachRefs([tooltipRef])}
                    onClick={() => (isOpen ? close() : open())}
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                    appearance="ghost"
                    skin="neutral"
                    leftSlot={<LuTimerOff size={14} />}
                    iconOnly
                  >
                    Snooze
                  </Button>
                )}
              >
                Snooze
              </Tooltip>
            )}
            placement="bottom"
          >
            {({ close }) => (
              <Box padding={{ block: "md", inline: "md" }}>
                <Calendar
                  siblingMonthDays={true}
                  formatDate={{
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    weekday: "narrow"
                  }}
                  onDaySelected={() => {
                    close();
                  }}
                >
                  <Calendar.Navigation>
                    {({ locked, month, year, onPrev, onNext }) => (
                      <>
                        <Button
                          skin="neutral"
                          appearance="ghost"
                          size="sm"
                          iconOnly
                          aria-label="Previous month"
                          disabled={locked}
                          onClick={onPrev}
                          leftSlot={<LuChevronLeft />}
                        />

                        <Stack justify="center" grow>
                          <Text weight="medium">
                            {month} {year}
                          </Text>
                        </Stack>

                        <Button
                          skin="neutral"
                          appearance="ghost"
                          size="sm"
                          iconOnly
                          onClick={onNext}
                          aria-label="Next month"
                          disabled={locked}
                          leftSlot={<LuChevronRight />}
                        />
                      </>
                    )}
                  </Calendar.Navigation>
                  <Calendar.Week />
                  <Calendar.Month />
                </Calendar>
              </Box>
            )}
          </Popover>
        </Stack>

        <Stack gap="sm">
          <Tooltip<HTMLButtonElement>
            renderAnchor={(props) => (
              <Button
                {...props}
                appearance="ghost"
                skin="neutral"
                leftSlot={<LuReply size={14} />}
                iconOnly
              >
                Reply
              </Button>
            )}
          >
            Reply
          </Tooltip>

          <Tooltip<HTMLButtonElement>
            renderAnchor={(props) => (
              <Button
                {...props}
                appearance="ghost"
                skin="neutral"
                leftSlot={<LuReplyAll size={14} />}
                iconOnly
              >
                Reply all
              </Button>
            )}
          >
            Reply all
          </Tooltip>

          <Tooltip<HTMLButtonElement>
            renderAnchor={(props) => (
              <Button
                {...props}
                appearance="ghost"
                skin="neutral"
                leftSlot={<LuForward size={14} />}
                iconOnly
              >
                Forward
              </Button>
            )}
          >
            Forward
          </Tooltip>

          <Separator orientation="vertical" />

          <Dropdown<HTMLButtonElement>
            renderAnchor={({ ref, isOpen, open, close }) => (
              <Button
                ref={ref}
                onClick={isOpen ? close : open}
                appearance="ghost"
                skin="neutral"
                leftSlot={<LuEllipsisVertical size={14} />}
                iconOnly
              >
                More options
              </Button>
            )}
            placement="bottom-end"
          >
            <Box padding={{ inline: "xs", block: "xs" }}>
              <ListBox>
                <ListBox.Item>Mark as unread</ListBox.Item>
                <ListBox.Item>Star thread</ListBox.Item>
                <ListBox.Item>Mute thread</ListBox.Item>
              </ListBox>
            </Box>
          </Dropdown>
        </Stack>
      </Stack>
    </Box>
  );
}
