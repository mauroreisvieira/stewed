import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
// Components
import {
  Button,
  Theme,
  Dropdown,
  Stack,
  Box,
  ListBox,
  Separator,
  Text,
  Avatar,
  Icon,
} from "../../index";
// Hooks
import { useSelect } from "@stewed/hooks";
// Icons
import { GoChevronRight } from "react-icons/go";

type Story = StoryObj<typeof Dropdown>;

const team = [
  {
    id: 1,
    name: "Sophia Chang",
    email: "sophia.chang@example.com",
  },
  {
    id: 2,
    name: "Olivia Patel",
    email: "olivia.patel@example.com",
  },
  {
    id: 3,
    name: "Benjamin Martinez",
    email: "benjamin.martinez@example.com",
  },
  {
    id: 4,
    name: "Noah Andersen",
    email: "noah.andersen@example.com",
  },
  {
    id: 5,
    name: "Liam O'Connor",
    email: "liam.connor@example.com",
  },
  {
    id: 6,
    name: "Emma Johnson",
    email: "emma.johnson@example.com",
  },
  {
    id: 7,
    name: "Lucas Kim",
    email: "lucas.kim@example.com",
  },
  {
    id: 8,
    name: "Amelia Davis",
    email: "amelia.davis@example.com",
  },
  {
    id: 9,
    name: "Ethan Nguyen",
    email: "ethan.nguyen@example.com",
  },
  {
    id: 10,
    name: "Charlotte Garcia",
    email: "charlotte.garcia@example.com",
  },
  {
    id: 11,
    name: "William Brown",
    email: "william.brown@example.com",
  },
  {
    id: 12,
    name: "Mia Wilson",
    email: "mia.wilson@example.com",
  },
  {
    id: 13,
    name: "Alexander Hall",
    email: "alexander.hall@example.com",
  },
  {
    id: 14,
    name: "Isabella Moore",
    email: "isabella.moore@example.com",
  },
  {
    id: 15,
    name: "James Taylor",
    email: "james.taylor@example.com",
  },
  {
    id: 16,
    name: "Ava Thompson",
    email: "ava.thompson@example.com",
  },
  {
    id: 17,
    name: "Michael White",
    email: "michael.white@example.com",
  },
  {
    id: 18,
    name: "Emily Harris",
    email: "emily.harris@example.com",
  },
  {
    id: 19,
    name: "Daniel Clark",
    email: "daniel.clark@example.com",
  },
  {
    id: 20,
    name: "Harper Lewis",
    email: "harper.lewis@example.com",
  },
];

const meta: Meta<typeof Dropdown> = {
  title: "Components/Dropdown",
  component: Dropdown,
  subcomponents: {
    "Dropdown.Button": Dropdown.Button as React.FC<unknown>,
  },
  decorators: [
    (Story) => (
      <Theme>
        <Box padding={{ block: "7xl", inline: "7xl" }}>
          <Stack justify="center" items="center">
            <Story />
          </Stack>
        </Box>
      </Theme>
    ),
  ],
};

export default meta;

export const Base: Story = {
  args: {
    placement: "top-fit",
  },
  argTypes: {
    renderAnchor: {
      control: false,
    },
    placement: {
      options: [
        "top",
        "top-start",
        "top-end",
        "right",
        "right-start",
        "right-end",
        "bottom",
        "bottom-start",
        "bottom-end",
        "left",
        "left-start",
        "left-end",
      ],
    },
  },
  render: function Render(args): React.ReactElement {
    const { item, index, setIndex } = useSelect(team, 0);

    return (
      <Dropdown<HTMLButtonElement>
        {...args}
        renderAnchor={({ ref, isOpen, open, close }) => (
          <Dropdown.Button
            ref={ref}
            onClick={isOpen ? close : open}
            fullWidth
            leftSlot={<Avatar size="xs" name={item?.name} />}
          >
            {item?.name}
          </Dropdown.Button>
        )}
      >
        {({ close }) => {
          return (
            <>
              <Dropdown.Scrollable>
                <Box padding={{ inline: "sm", block: "sm" }}>
                  <ListBox>
                    {team.map(({ id, name, email }, idx) => (
                      <ListBox.Item
                        key={id}
                        as="button"
                        leftSlot={<Avatar size="sm" name={name} />}
                        selected={idx === index}
                        rightSlot={idx === index ? <Icon.Check /> : undefined}
                        onClick={() => {
                          setIndex(idx);
                          close();
                        }}
                      >
                        <Box
                          padding={{
                            block: "sm",
                          }}
                        >
                          <Text size="sm">{name}</Text>
                          <Text size="xs" skin="neutral">
                            {email}
                          </Text>
                        </Box>
                      </ListBox.Item>
                    ))}
                  </ListBox>
                </Box>
              </Dropdown.Scrollable>
            </>
          );
        }}
      </Dropdown>
    );
  },
};

export const Nested: Story = {
  args: {
    placement: "bottom-start",
  },
  argTypes: {
    renderAnchor: {
      control: false,
    },
    placement: {
      options: [
        "top",
        "top-start",
        "top-end",
        "right",
        "right-start",
        "right-end",
        "bottom",
        "bottom-start",
        "bottom-end",
        "left",
        "left-start",
        "left-end",
      ],
    },
  },
  render: (args) => {
    return (
      <Dropdown<HTMLButtonElement>
        {...args}
        renderAnchor={({ ref, isOpen, open, close }) => (
          <Button ref={ref} onClick={isOpen ? close : open}>
            Edit
          </Button>
        )}
      >
        {() => {
          return (
            <Box padding={{ inline: "sm", block: "sm" }}>
              <ListBox>
                <ListBox.Item
                  rightSlot={
                    <Text size="xs" skin="neutral">
                      ⌘+T
                    </Text>
                  }
                >
                  New Tab
                </ListBox.Item>
                <ListBox.Item
                  rightSlot={
                    <Text size="xs" skin="neutral">
                      ⌘+N
                    </Text>
                  }
                >
                  New Window
                </ListBox.Item>
                <Dropdown<HTMLDivElement>
                  placement="right-start"
                  renderAnchor={({
                    ref: listRef,
                    open: openMoreTools,
                    close: closeMoreTools,
                    isOpen: isOpenMoreTools,
                  }) => (
                    <ListBox.Item
                      ref={listRef}
                      rightSlot={
                        <Text skin="neutral">
                          <GoChevronRight />
                        </Text>
                      }
                      onClick={() => (isOpenMoreTools ? closeMoreTools() : openMoreTools())}
                    >
                      More Tools
                    </ListBox.Item>
                  )}
                >
                  <Box padding={{ inline: "sm", block: "sm" }}>
                    <ListBox>
                      <ListBox.Item
                        rightSlot={
                          <Text size="xs" skin="neutral">
                            ⌘+S
                          </Text>
                        }
                      >
                        Save Page As
                      </ListBox.Item>
                    </ListBox>
                  </Box>
                </Dropdown>
                <Separator space={{ block: "xs" }} />
                <ListBox.Item
                  rightSlot={
                    <Text size="xs" skin="neutral">
                      ⌘+B
                    </Text>
                  }
                >
                  Show Bookmarks
                </ListBox.Item>
                <ListBox.Item>Show Full URLs</ListBox.Item>
              </ListBox>
            </Box>
          );
        }}
      </Dropdown>
    );
  },
};
