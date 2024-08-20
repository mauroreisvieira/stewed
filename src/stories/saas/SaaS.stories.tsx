import React, { useCallback, useMemo, useState } from "react";
import type { Meta } from "@storybook/react";
// UI Components
import {
  Theme,
  Button,
  Box,
  Stack,
  Text,
  Container,
  Grid,
  Avatar,
  Separator,
  Table,
  Tag,
  Pagination,
  TextField,
  Checkbox,
  ListBox,
  Drawer,
  ColumnsDef,
  TagProps,
  DataTable,
  Progress,
  Badge,
  Dropdown,
} from "@stewed/react";
// Hooks
import { useInput } from "@stewed/hooks";
// Icons
import { FiFile, FiFilePlus, FiSearch, FiTrash, FiUsers, FiActivity } from "react-icons/fi";
import { MdOutlineArrowUpward, MdOutlineArrowDownward } from "react-icons/md";
import { HiArrowsUpDown } from "react-icons/hi2";
import { LuFilter } from "react-icons/lu";

const meta: Meta = {
  title: "Examples/SaaS",
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
  render: function Render() {
    const [team, setTeam] = useState([
      {
        id: "1",
        name: "Olivia Patel",
        email: "olivia.patel@example.com",
        content: "We're looking to include a new calendar component, is this very difficult for me",
        sentiment: "Positive",
        selected: false,
      },
      {
        id: "2",
        name: "Sophia Chang",
        email: "sophia.chang@example.com",
        content: "We're looking to include a new calendar component, is this very difficult for me",
        sentiment: "Negative",
        selected: true,
      },
      {
        id: "3",
        name: "Benjamin Martinez",
        email: "benjamin.martinez@example.com",
        content: "We're looking to include a new calendar component, is this very difficult for me",
        sentiment: "Positive",
        selected: false,
      },
      {
        id: "4",
        name: "Noah Andersen",
        email: "noah.andersen@example.com",
        content: "We're looking to include a new calendar component, is this very difficult for me",
        sentiment: "Positive",
        selected: false,
      },
      {
        id: "5",
        name: "Liam O'Connor",
        email: "liam.connor@example.com",
        content: "We're looking to include a new calendar component, is this very difficult for me",
        sentiment: "Neutral",
        selected: false,
      },
    ]);

    const isAllChecked = useMemo(() => team?.every(({ selected }) => selected), [team]);
    const isIndeterminate = useMemo(() => team.some(({ selected }) => selected), [team]);

    return (
      <Container screen="2xl" alignment="center" padding={{ block: "7xl" }}>
        <Stack direction="column" grow>
          <Text as="h5" space={{ y: "xs" }}>
            Recent feedback
          </Text>

          <Text size="sm" skin="neutral" space={{ y: "3xl" }}>
            Find all of your customer feedback in one place.
          </Text>

          <Table appearance={"striped"} hoverable>
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
                  }}>
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
                    <Stack items="center" gap="md">
                      <Avatar skin="neutral" size="lg" name={name} />
                      <Stack direction="column">
                        <Text size="sm" weight="medium">
                          {name}
                        </Text>
                        <Text as="a" href="" size="xs" skin="neutral" alignment="end">
                          {email}
                        </Text>
                      </Stack>
                    </Stack>
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
                      size="sm">
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
                          stroke="currentColor">
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
        </Stack>
      </Container>
    );
  },
};

type TStock = {
  id: string;
  image: string;
  name: string;
  category: string;
  sku: string;
  vendor: string;
  stock: number;
  status: "in-stock" | "low-stock" | "out-stock";
};

export const Inventory = {
  render: function Render() {
    const [search, setSearch] = useState("");
    const stock: TStock[] = [
      {
        id: "001",
        image: "https://placehold.co/120x120",
        name: "Septodont",
        category: "Local Anesthesia",
        sku: "ZKS8124",
        vendor: "Barone LLC.",
        stock: 124,
        status: "in-stock",
      },
      {
        id: "002",
        image: "https://placehold.co/120x120",
        name: "Chlorhexidine Gluconate",
        category: "Antiseptic",
        sku: "ZKS2098",
        vendor: "Acme Co.",
        stock: 4,
        status: "low-stock",
      },
      {
        id: "003",
        image: "https://placehold.co/120x120",
        name: "Amoxicillin",
        category: "Antibiotic",
        sku: "ZKS3498",
        vendor: "Abstergo Ltd.",
        stock: 0,
        status: "out-stock",
      },
      {
        id: "004",
        image: "https://placehold.co/120x120",
        name: "Ibuprofen",
        category: "Anti-inflammatory",
        sku: "ZKS3487",
        vendor: "Binford Ltd.",
        stock: 104,
        status: "in-stock",
      },
      {
        id: "005",
        image: "https://placehold.co/120x120",
        name: "Acetaminophen",
        category: "Analgesic",
        sku: "ZKS9823",
        vendor: "Acme Co.",
        stock: 50,
        status: "in-stock",
      },
      {
        id: "006",
        image: "https://placehold.co/120x120",
        name: "Methylprednisolone",
        category: "Steroid",
        sku: "ZKS2348",
        vendor: "Dentalku",
        stock: 0,
        status: "out-stock",
      },
      {
        id: "007",
        image: "https://placehold.co/120x120",
        name: "Fluconazole",
        category: "Antifungal",
        sku: "ZKS2342",
        vendor: "Acme Co.",
        stock: 24,
        status: "in-stock",
      },
      {
        id: "008",
        image: "https://placehold.co/120x120",
        name: "Chlorhexidine Gluconate",
        category: "Antiseptic",
        sku: "ZKS9817",
        vendor: "Biffco Enterprises",
        stock: 10,
        status: "low-stock",
      },
    ];

    const columns: ColumnsDef<TStock>[] = [
      {
        accessorKey: "name",
        bodyCell: ({ image, name }) => (
          <Stack items="center" gap="md">
            <Avatar src={image} />
            {name}
          </Stack>
        ),
        headCell: () => "Name",
      },
      {
        accessorKey: "category",
        bodyCell: ({ category }) => category,
        headCell: () => "Categories",
      },
      {
        accessorKey: "sku",
        bodyCell: ({ sku }) => sku,
        headCell: () => "SKU",
      },
      {
        accessorKey: "vendor",
        bodyCell: ({ vendor }) => vendor,
        headCell: () => "Vendor",
      },
      {
        accessorKey: "stock",
        bodyCell: ({ stock }) => stock,
        headCell: () => "Stock",
      },
      {
        accessorKey: "status",
        bodyCell: ({ status }) => {
          const skins = {
            "out-stock": "critical",
            "low-stock": "warning",
            "in-stock": "success",
          };

          return (
            <Tag skin={skins[status] as TagProps<"span">["skin"]} appearance="ghost" size="sm">
              {status.replace("-", " ").toUpperCase()}
            </Tag>
          );
        },
        headCell: () => "Status",
      },
    ];

    const totalProducts = stock.reduce((acc, curr) => (acc = acc + curr.stock), 0);

    const allColumns = ["name", "category", "sku", "vendor", "stock", "status"] as (keyof TStock)[];

    const [hiddenColumns, setHiddenColumns] = useState<(keyof TStock)[]>(["sku"]);

    const onHandleChange = useCallback(
      (value) => {
        const hidden = hiddenColumns.includes(value)
          ? hiddenColumns.filter((v) => v !== value)
          : [...hiddenColumns, value];
        setHiddenColumns(hidden);
      },
      [hiddenColumns],
    );

    return (
      <Container screen="2xl" alignment="center" padding={{ block: "7xl" }}>
        <Box space={{ y: "xl" }}>
          <Stack direction="column">
            <Text as="h3">Stock</Text>

            <Separator space={{ block: "xl" }} />

            <Grid
              responsive={{ sm: { cols: 2 } }}
              cols={1}
              space={{ y: "2xl" }}
              padding={{ block: "md" }}>
              <Grid.Item>
                <Text size="md" variation={"uppercase"} skin="neutral">
                  Total assets value
                </Text>
                <Text size="5xl" weight="semi-bold">
                  $10,100,323
                </Text>
              </Grid.Item>

              <Grid.Item>
                <Stack
                  direction="column"
                  responsive={{
                    sm: {
                      direction: "row",
                    },
                  }}
                  grow>
                  <Separator
                    orientation="horizontal"
                    space={{ block: "md" }}
                    responsive={{ sm: { orientation: "vertical", space: { inline: "xl" } } }}
                  />
                  <Stack direction="column" gap="lg" grow>
                    <Text size="3xl" weight="semi-bold">
                      {totalProducts}{" "}
                      <Text as="sup" skin="neutral">
                        products
                      </Text>
                    </Text>

                    <Progress size="md" value={totalProducts} max={2000} skin="primary" />

                    <Text skin="neutral" size="sm">
                      <Badge skin="primary" /> Max of capacity:{" "}
                      <Text as="span" skin="text-base" size="sm">
                        2000
                      </Text>
                    </Text>
                  </Stack>
                </Stack>
              </Grid.Item>
            </Grid>

            <Stack justify="between">
              <TextField
                leftSlot={<FiSearch />}
                placeholder="Search inventory"
                onChange={(event) => setSearch(event.target.value)}
                value={search}
              />

              <Dropdown<HTMLButtonElement>
                placement="bottom-end"
                renderAnchor={({ ref, open, close, isOpen }) => (
                  <Button
                    ref={ref}
                    onClick={isOpen ? close : open}
                    appearance="outline"
                    skin={isOpen ? "primary" : "neutral"}
                    leftSlot={<LuFilter />}>
                    Filters
                  </Button>
                )}>
                {() => (
                  <ListBox>
                    <ListBox.Group>
                      {allColumns.map((column) => (
                        <ListBox.Item
                          key={column}
                          onClick={() => onHandleChange(column)}
                          leftSlot={
                            <Checkbox
                              checked={!hiddenColumns.includes(column)}
                              onClick={(event) => {
                                event.preventDefault();
                                event.stopPropagation();
                              }}
                            />
                          }>
                          <Text size="sm" variation={"capitalize"}>
                            {column}
                          </Text>
                        </ListBox.Item>
                      ))}
                    </ListBox.Group>
                  </ListBox>
                )}
              </Dropdown>
            </Stack>

            <DataTable<TStock>
              data={stock}
              columns={columns}
              sortableColumns={["name", "category", "sku", "vendor", "stock", "status"]}
              hiddenColumns={hiddenColumns}
              defaultColumnDirection="ASC"
              defaultColumnSorted="name"
              onFilter={({ name, vendor }) =>
                name.toLowerCase().includes(search.toLowerCase()) ||
                vendor.toLowerCase().includes(search.toLowerCase())
              }>
              {({ headCells, bodyRows }) => (
                <Table appearance={["striped"]}>
                  <Table.Head>
                    <Table.Row>
                      {headCells.map(
                        ({
                          columnKey,
                          cellNode,
                          isSortable,
                          sortedColumn,
                          sortDirection,
                          onSort,
                        }) => (
                          <Table.Cell
                            as="th"
                            key={`head-${columnKey}`}
                            onClick={isSortable ? onSort : undefined}>
                            <Stack gap="xs">
                              {cellNode}
                              {sortedColumn === columnKey ? (
                                <span>
                                  {sortDirection === "ASC" ? (
                                    <MdOutlineArrowUpward size={12} />
                                  ) : (
                                    <MdOutlineArrowDownward size={12} />
                                  )}
                                </span>
                              ) : isSortable ? (
                                <HiArrowsUpDown size={12} />
                              ) : null}
                            </Stack>
                          </Table.Cell>
                        ),
                      )}
                    </Table.Row>
                  </Table.Head>
                  <Table.Body>
                    {bodyRows.map(({ bodyCells, data: { id } }) => (
                      <Table.Row key={id}>
                        {bodyCells.map(({ columnKey, cellNode }) => (
                          <Table.Cell key={`${id}-${columnKey}`}>{cellNode}</Table.Cell>
                        ))}
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
              )}
            </DataTable>
          </Stack>
        </Box>
      </Container>
    );
  },
};

export const SidePanel = {
  render: function Render() {
    const searchInput = useInput("");

    return (
      <Container screen="sm" alignment="center" padding={{ block: "7xl" }}>
        <Drawer size="sm" open>
          <Drawer.Header>
            <Stack gap="lg" items="center" direction="column" justify="center" grow>
              <Avatar size="3xl" name="Stewed Board" skin="primary" appearance="square" />
              <Text
                skin="primary"
                size="2xl"
                weight="light"
                variation="uppercase"
                whiteSpace="nowrap">
                Stewed Board
              </Text>
            </Stack>
          </Drawer.Header>

          <Separator />

          <Drawer.Body>
            <Stack gap="2xl" direction="column">
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
            </Stack>
          </Drawer.Body>
        </Drawer>
      </Container>
    );
  },
};
