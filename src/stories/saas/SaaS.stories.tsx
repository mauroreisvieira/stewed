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
  Card,
} from "@stewed/react";
// Hooks
import { useInput } from "@stewed/hooks";
// Icons
import { FiFile, FiFilePlus, FiSearch, FiTrash, FiUsers, FiActivity } from "react-icons/fi";
import { MdOutlineArrowUpward, MdOutlineArrowDownward } from "react-icons/md";
import { HiArrowsUpDown } from "react-icons/hi2";
import { LuFilter } from "react-icons/lu";
import { IoAttach } from "react-icons/io5";

import { IoChatbubbleOutline } from "react-icons/io5";

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

export const Staff = {
  render: function Render() {
    const [staff, setStaff] = useState([
      {
        id: "1",
        name: "Olivia Patel",
        specialty: "Dentist",
        contacts: {
          email: "olivia.patel@example.com",
          phone: "233 900-0122",
        },
        workdays: {
          sun: true,
          mon: true,
          tue: false,
          wed: true,
          thu: false,
          fri: true,
          sat: true,
        },
        assignedTreatment: "Dental services",
        type: "Part-time",
        selected: false,
      },
      {
        id: "2",
        name: "Liam Nguyen",
        specialty: "Cardiologist",
        contacts: {
          email: "liam.nguyen@example.com",
          phone: "233 900-0155",
        },
        workdays: {
          sun: false,
          mon: true,
          tue: true,
          wed: false,
          thu: true,
          fri: false,
          sat: true,
        },
        assignedTreatment: "Heart specialist",
        type: "Full-time",
        selected: false,
      },
      {
        id: "3",
        name: "Emma Clark",
        specialty: "Pediatrician",
        contacts: {
          email: "emma.clark@example.com",
          phone: "233 900-0177",
        },
        workdays: {
          sun: true,
          mon: false,
          tue: true,
          wed: true,
          thu: false,
          fri: true,
          sat: false,
        },
        assignedTreatment: "Child healthcare",
        type: "Part-time",
        selected: false,
      },
      {
        id: "4",
        name: "Noah Kim",
        specialty: "Orthopedic Surgeon",
        contacts: {
          email: "noah.kim@example.com",
          phone: "233 900-0199",
        },
        workdays: {
          sun: false,
          mon: true,
          tue: false,
          wed: true,
          thu: true,
          fri: true,
          sat: false,
        },
        assignedTreatment: "Bone and joint surgery",
        type: "Full-time",
        selected: false,
      },
      {
        id: "5",
        name: "Ava Lopez",
        specialty: "Dermatologist",
        contacts: {
          email: "ava.lopez@example.com",
          phone: "233 900-0211",
        },
        workdays: {
          sun: true,
          mon: true,
          tue: false,
          wed: false,
          thu: true,
          fri: true,
          sat: true,
        },
        assignedTreatment: "Skin specialist",
        type: "Part-time",
        selected: false,
      },
      {
        id: "6",
        name: "William Rodriguez",
        specialty: "Neurologist",
        contacts: {
          email: "william.rodriguez@example.com",
          phone: "233 900-0233",
        },
        workdays: {
          sun: false,
          mon: true,
          tue: true,
          wed: false,
          thu: true,
          fri: true,
          sat: false,
        },
        assignedTreatment: "Brain and nervous system",
        type: "Full-time",
        selected: false,
      },
      {
        id: "7",
        name: "Sophia Gonzalez",
        specialty: "Ophthalmologist",
        contacts: {
          email: "sophia.gonzalez@example.com",
          phone: "233 900-0255",
        },
        workdays: {
          sun: true,
          mon: false,
          tue: true,
          wed: true,
          thu: false,
          fri: true,
          sat: true,
        },
        assignedTreatment: "Eye specialist",
        type: "Part-time",
        selected: false,
      },
      {
        id: "8",
        name: "James Martinez",
        specialty: "Gastroenterologist",
        contacts: {
          email: "james.martinez@example.com",
          phone: "233 900-0277",
        },
        workdays: {
          sun: false,
          mon: true,
          tue: false,
          wed: true,
          thu: true,
          fri: false,
          sat: true,
        },
        assignedTreatment: "Digestive system",
        type: "Full-time",
        selected: false,
      },
      {
        id: "9",
        name: "Mia Davis",
        specialty: "Psychiatrist",
        contacts: {
          email: "mia.davis@example.com",
          phone: "233 900-0299",
        },
        workdays: {
          sun: true,
          mon: true,
          tue: true,
          wed: false,
          thu: true,
          fri: false,
          sat: false,
        },
        assignedTreatment: "Mental health",
        type: "Full-time",
        selected: false,
      },
      {
        id: "10",
        name: "Lucas Brown",
        specialty: "Oncologist",
        contacts: {
          email: "lucas.brown@example.com",
          phone: "233 900-0311",
        },
        workdays: {
          sun: false,
          mon: true,
          tue: false,
          wed: true,
          thu: true,
          fri: true,
          sat: false,
        },
        assignedTreatment: "Cancer treatment",
        type: "Full-time",
        selected: false,
      },
    ]);

    const isAllChecked = useMemo(() => staff?.every(({ selected }) => selected), [staff]);
    const isIndeterminate = useMemo(() => staff.some(({ selected }) => selected), [staff]);

    return (
      <Container screen="2xl" alignment="center" padding={{ block: "7xl" }}>
        <Stack direction="column" grow>
          <Text as="h5" space={{ y: "xs" }}>
            Staff
          </Text>

          <Text size="sm" skin="neutral" space={{ y: "3xl" }}>
            Find all of your doctors in one place.
          </Text>

          <Table appearance={"border-rows"} hoverable>
            <Table.Head>
              <Table.Row>
                <Table.Cell as="th">
                  <Checkbox
                    indeterminate={isAllChecked ? undefined : isIndeterminate}
                    checked={isAllChecked}
                    onChange={() => {
                      setStaff((prev) =>
                        prev.map((value) => ({
                          ...value,
                          selected: !isAllChecked,
                        })),
                      );
                    }}
                  />
                </Table.Cell>
                <Table.Cell as="th">Name</Table.Cell>
                <Table.Cell as="th">Contact</Table.Cell>
                <Table.Cell as="th">Working days</Table.Cell>
                <Table.Cell as="th">assignedTreatment</Table.Cell>
                <Table.Cell as="th">Type</Table.Cell>
                <Table.Cell as="th" />
              </Table.Row>
            </Table.Head>
            <Table.Body>
              {staff.map(
                ({
                  id,
                  name,
                  contacts,
                  type,
                  specialty,
                  workdays,
                  assignedTreatment,
                  selected,
                }) => (
                  <Table.Row
                    key={id}
                    selected={selected}
                    onClick={() => {
                      setStaff((prev) =>
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
                          setStaff((prev) =>
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
                        <Avatar skin="neutral" size="md" name={name} />
                        <Stack direction="column" gap="xs">
                          <Text size="sm" weight="medium">
                            {name}
                          </Text>
                          <Text as="a" href="" size="xs" skin="neutral">
                            {specialty}
                          </Text>
                        </Stack>
                      </Stack>
                    </Table.Cell>
                    <Table.Cell>
                      <Stack direction="column" gap="xs">
                        <Text size="sm">{contacts.phone}</Text>
                        <Text as="a" skin="neutral" size="xs">
                          {contacts.email}
                        </Text>
                      </Stack>
                    </Table.Cell>
                    <Table.Cell>
                      <Stack gap="xs">
                        <Badge size="lg" value="S" skin={workdays.sun ? "info" : "neutral"} />
                        <Badge size="lg" value="M" skin={workdays.mon ? "info" : "neutral"} />
                        <Badge size="lg" value="T" skin={workdays.thu ? "info" : "neutral"} />
                        <Badge size="lg" value="W" skin={workdays.wed ? "info" : "neutral"} />
                        <Badge size="lg" value="T" skin={workdays.thu ? "info" : "neutral"} />
                        <Badge size="lg" value="F" skin={workdays.fri ? "info" : "neutral"} />
                        <Badge size="lg" value="S" skin={workdays.sat ? "info" : "neutral"} />
                      </Stack>
                    </Table.Cell>
                    <Table.Cell>
                      <Text size="sm" weight="light">
                        {assignedTreatment}
                      </Text>
                    </Table.Cell>
                    <Table.Cell>
                      <Tag
                        skin={type === "Full-time" ? "success" : "warning"}
                        appearance="soft"
                        size="sm">
                        {type.toUpperCase()}
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
                ),
              )}
            </Table.Body>
          </Table>
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
                fullWidth={false}
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
                <Table appearance={["striped-rows"]}>
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

export const Kanban = {
  render: function Render() {
    const projects = [
      {
        id: "new-benefits-plan",
        title: "New Benefits Plan",
        category: "Human Resources",
        members: [
          {
            id: "mauro-vieira",
            name: "Mauro Vieira",
          },
        ],
        tasks: {
          total: 6,
          completed: 1,
        },
        messages: 3,
      },

      {
        id: "onboarding-emails",
        title: "Onboarding Emails",
        category: "Customer Success",
        members: [
          {
            id: "bruna-santos",
            name: "Bruna Santos",
          },
          {
            id: "lourenco-vieira",
            name: "Lourenço Vieira",
          },
        ],
        tasks: {
          total: 10,
          completed: 8,
        },
        messages: 10,
      },
      {
        id: "api-integration",
        title: "API Integration",
        category: "Engineering",
        members: [
          {
            id: "mauro-vieira",
            name: "Mauro Vieira",
          },
          {
            id: "bruna-santos",
            name: "Bruna Santos",
          },
          {
            id: "lourenco-vieira",
            name: "Lourenço Vieira",
          },
        ],
        tasks: {
          total: 75,
          completed: 43,
        },
        attach: 3,
        messages: 63,
      },
    ];
    return (
      <Stack
        wrap="wrap"
        gap="2xl"
        responsive={{
          md: {
            wrap: "nowrap",
          },
        }}>
        {projects.map(({ id, title, members, tasks, messages, attach }) => (
          <Stack key={id} gap="md" grow>
            <Card padding={{ block: "md", inline: "md" }}>
              <Card.Body>
                <Box space={{ y: "lg" }}>
                  <Stack direction="column" gap="sm">
                    <Text weight="medium" size="lg" space={{ y: "lg" }}>
                      {title}
                    </Text>

                    {tasks && (
                      <>
                        <Stack justify="between">
                          <Text skin="neutral" size="xs">
                            Tasks
                          </Text>
                          <Text skin="neutral" size="xs">
                            {tasks.completed}/{tasks.total}
                          </Text>
                        </Stack>

                        <Progress
                          value={100 * (tasks.completed / tasks.total)}
                          skin="success"
                          size="xs"
                        />
                      </>
                    )}
                  </Stack>
                </Box>
                <Stack justify="between" items="center">
                  <Stack gap="xs">
                    <Button
                      size="sm"
                      skin="neutral"
                      appearance="ghost"
                      leftSlot={<IoChatbubbleOutline />}>
                      {messages}
                    </Button>
                    {attach && (
                      <Button size="sm" skin="neutral" appearance="ghost" leftSlot={<IoAttach />}>
                        {attach}
                      </Button>
                    )}
                  </Stack>
                  <Avatar.Group>
                    {members.map(({ id, name }) => (
                      <Avatar key={id} size="xs" name={name} />
                    ))}
                  </Avatar.Group>
                </Stack>
              </Card.Body>
            </Card>
          </Stack>
        ))}
      </Stack>
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
