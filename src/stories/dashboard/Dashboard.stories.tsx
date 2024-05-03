import React, { useMemo, useState } from "react";
// UI Components
import {
  Theme,
  Button,
  Box,
  Text,
  Container,
  Avatar,
  Separator,
  Table,
  Tag,
  Pagination,
  TextField,
  Checkbox,
  ListBox,
} from "@stewed/react";
// Hooks
import { useInput } from "@stewed/hooks";
// Icons
import { FiFile, FiFilePlus, FiSearch, FiTrash, FiUsers, FiActivity } from "react-icons/fi";

const meta = {
  title: "Examples/Dashboard",
  decorators: [
    (Story) => (
      <Theme>
        <Story />
      </Theme>
    ),
  ],
};

export default meta;

export const RecentFeedback = {
  render: function Example() {
    const [team, setTeam] = useState([
      {
        id: "1",
        name: "Henrique Vieira",
        email: "henrique.vieira@example.com",
        content: "We're looking to include a new calendar component, is this very difficult for me",
        sentiment: "Positive",
        selected: false,
      },
      {
        id: "2",
        name: "Mauro Vieira",
        email: "mauro.vieira@example.com",
        content: "We're looking to include a new calendar component, is this very difficult for me",
        sentiment: "Negative",
        selected: true,
      },
      {
        id: "3",
        name: "Lourenco Vieira",
        email: "lourenco.vieira@example.com",
        content: "We're looking to include a new calendar component, is this very difficult for me",
        sentiment: "Positive",
        selected: false,
      },
      {
        id: "4",
        name: "Bruna Santos",
        email: "bruna.santos@example.com",
        content: "We're looking to include a new calendar component, is this very difficult for me",
        sentiment: "Positive",
        selected: false,
      },
      {
        id: "5",
        name: "Daniel Reis Vieira",
        email: "daniel.vieira@example.com",
        content: "We're looking to include a new calendar component, is this very difficult for me",
        sentiment: "Neutral",
        selected: false,
      },
    ]);

    const isAllChecked = useMemo(() => team?.every(({ selected }) => selected), [team]);
    const isIndeterminate = useMemo(() => team.some(({ selected }) => selected), [team]);

    return (
      <Container screen="2xl" alignment="center" padding={{ block: "7xl" }}>
        <Box direction="column" grow>
          <Text as="h5" space={{ y: "xs" }}>
            Recent feedback
          </Text>
          <Text size="sm" skin="neutral" space={{ y: "3xl" }}>
            Find all of your customer feedback in one place.
          </Text>

          <Table appearance={"striped"}  hoverable>
            <Table.Head>
              <Table.Row>
                <Table.Cell as="th">
                  <Checkbox
                    indeterminate={isAllChecked ? undefined : isIndeterminate}
                    checked={isAllChecked}
                    onChange={() => {
                      setTeam((prev) =>
                        prev.map((value) => ({
                          ...value,
                          selected: !isAllChecked,
                        })),
                      );
                    }}
                  />
                </Table.Cell>
                <Table.Cell as="th">Name</Table.Cell>
                <Table.Cell as="th">Content</Table.Cell>
                <Table.Cell as="th">Sentiment</Table.Cell>
                <Table.Cell as="th" />
              </Table.Row>
            </Table.Head>
            <Table.Body>
              {team.map(({ id, name, email, content, sentiment, selected }) => (
                <Table.Row
                  key={id}
                  selected={selected}
                  onClick={() => {
                    setTeam((prev) =>
                      prev.map((value) => ({
                        ...value,
                        selected: value.id === id ? !value.selected : value.selected,
                      })),
                    );
                  }}
                >
                  <Table.Cell>
                    <Checkbox
                      checked={selected}
                      onChange={() => {
                        setTeam((prev) =>
                          prev.map((value) => ({
                            ...value,
                            selected: value.id === id ? !value.selected : value.selected,
                          })),
                        );
                      }}
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <Box items="center" gap="md">
                      <Avatar skin="neutral" size="lg" name={name} />
                      <Box direction="column">
                        <Text size="sm" weight="medium">
                          {name}
                        </Text>
                        <Text as="a" href="" size="xs" skin="neutral" alignment="end">
                          {email}
                        </Text>
                      </Box>
                    </Box>
                  </Table.Cell>
                  <Table.Cell>
                    <Text size="sm" weight="light" lineClamp={2}>
                      {content}
                    </Text>
                  </Table.Cell>
                  <Table.Cell>
                    <Tag
                      skin={
                        sentiment === "Positive"
                          ? "success"
                          : sentiment === "Negative"
                            ? "critical"
                            : "neutral"
                      }
                      appearance="soft"
                      size="sm"
                    >
                      {sentiment}
                    </Tag>
                  </Table.Cell>
                  <Table.Cell>
                    <Button
                      size="sm"
                      skin="neutral"
                      appearance="ghost"
                      iconOnly
                      leftSlot={
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="2"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                          />
                        </svg>
                      }
                      onClick={(event) => event.stopPropagation()}
                    />
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
          <Separator space={{ block: "2xl" }} />
          <Pagination total={18} siblings={2} currentPage={1} />
        </Box>
      </Container>
    );
  },
};

export const SidePanel = {
  render: function Example() {
    const searchInput = useInput("");

    return (
      <Container screen="sm" alignment="center" padding={{ block: "7xl" }}>
        <Box gap="2xl" direction="column" grow>
          <Box gap="lg" items="center" direction="column" grow>
            <Avatar size="3xl" name="Stewed Board" skin="primary" appearance="square" />
            <Text
              skin="primary"
              size="2xl"
              weight="light"
              variation="uppercase"
              whiteSpace="nowrap"
            >
              Stewed Board
            </Text>
          </Box>
          <TextField
            {...searchInput}
            placeholder="Quick search"
            leftSlot={<FiSearch />}
            rightSlot={
              <Text skin="neutral" size="xs">
                ⌘K
              </Text>
            }
          />
          <ListBox>
            <ListBox.Group>
              <ListBox.Item leftSlot={<FiActivity />}>Activity</ListBox.Item>
              <ListBox.Item leftSlot={<FiFile />} rightSlot={<FiUsers />} selected>
                All boards
              </ListBox.Item>
              <ListBox.Item leftSlot={<FiFilePlus />}>Tasks</ListBox.Item>
              <ListBox.Item skin="critical" leftSlot={<FiTrash />}>
                Trash
              </ListBox.Item>
            </ListBox.Group>
            <Separator space={{ block: "sm" }} />
            <ListBox.Group>
              <ListBox.Item>Lee Evans new tour</ListBox.Item>
              <ListBox.Item>Individual errors coast</ListBox.Item>
              <ListBox.Item>Re-skin signs</ListBox.Item>
              <ListBox.Item>Reflect roadmap</ListBox.Item>
              <ListBox.Item>Top of mind</ListBox.Item>
            </ListBox.Group>
          </ListBox>
        </Box>
      </Container>
    );
  },
};
