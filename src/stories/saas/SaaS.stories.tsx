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
  Tabs,
  Tooltip,
  Calendar,
  Stepper,
  Popover,
  Accordion,
  Switch,
  Dialog,
  Hue,
} from "@stewed/react";
// Icons
import {
  MdOutlineArrowUpward,
  MdOutlineArrowDownward,
  MdOutlineCalendarToday,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdOutlineTimerOff,
  MdOutlineTimer,
  MdOutlineEventRepeat,
} from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";
import { VscKebabVertical } from "react-icons/vsc";
import { GoKebabHorizontal } from "react-icons/go";
import { IoMdAdd } from "react-icons/io";
import {
  FiFile,
  FiFilePlus,
  FiSearch,
  FiTrash,
  FiUsers,
  FiActivity,
  FiMinus,
  FiPlus,
  FiEdit,
} from "react-icons/fi";
import { LuFilter } from "react-icons/lu";
import { IoAttach, IoChatbubbleOutline } from "react-icons/io5";
import { FormField, Radio, Select, TextArea } from "@stewed/react";
import { FaUserDoctor, FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { useInput } from "@stewed/hooks";

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
                <Table.Cell as="th">Assigned treatment</Table.Cell>
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
                    }}
                  >
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
                        size="sm"
                      >
                        {type.toUpperCase()}
                      </Tag>
                    </Table.Cell>
                    <Table.Cell>
                      <Button
                        size="sm"
                        skin="neutral"
                        appearance="ghost"
                        iconOnly
                        leftSlot={<VscKebabVertical />}
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
    const [dialogOpen, setDialogOpen] = useState(false);
    const [search, setSearch] = useState("");

    const stock: TStock[] = [
      {
        id: "001",
        image: "https://placehold.co/120x120",
        name: "Septodont",
        category: "Local Anesthesia",
        sku: "ZKS8124",
        vendor: "Barone LLC.",
        stock: 240,
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
        stock: 350,
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
            <Avatar image={{ src: image }} />
            {name}
          </Stack>
        ),
        headCell: ({ sortedColumn, sortDirection }) => (
          <Stack gap="xs" items="center">
            Name
            {sortedColumn === "name" && (
              <>
                {sortDirection === "ASC" ? (
                  <MdOutlineArrowUpward size={12} />
                ) : (
                  <MdOutlineArrowDownward size={12} />
                )}
              </>
            )}
          </Stack>
        ),
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
        headCell: ({ sortedColumn, sortDirection }) => (
          <Stack gap="xs" items="center">
            Stock
            {sortedColumn === "stock" && (
              <>
                {sortDirection === "ASC" ? (
                  <MdOutlineArrowUpward size={12} />
                ) : (
                  <MdOutlineArrowDownward size={12} />
                )}
              </>
            )}
          </Stack>
        ),
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
            <Tag skin={skins[status] as TagProps<"span">["skin"]} appearance="outline" size="sm">
              {status.replace("-", " ").toUpperCase()}
            </Tag>
          );
        },
        headCell: () => "Status",
      },
      {
        accessorKey: "options",
        headCell: () => "Options",
        bodyCell: () => (
          <Button
            leftSlot={<FiEdit size={14} />}
            skin="neutral"
            size="sm"
            appearance="ghost"
            iconOnly
            onClick={() => setDialogOpen(true)}
          >
            Edit
          </Button>
        ),
      },
    ];

    const totalProducts = stock.reduce((acc, curr) => (acc = acc + curr.stock), 0);

    const allColumns = ["name", "category", "sku", "vendor", "stock", "status"] as (keyof TStock)[];

    const [hiddenColumns, setHiddenColumns] = useState<(keyof TStock)[]>(["sku"]);

    const onHandleChange = useCallback(
      (value: keyof TStock) => {
        const hidden = hiddenColumns.includes(value)
          ? hiddenColumns.filter((v) => v !== value)
          : [...hiddenColumns, value];
        setHiddenColumns(hidden);
      },
      [hiddenColumns],
    );

    const { value, setValue, onChange } = useInput<number>(100, {
      validate: (newValue) => {
        return newValue >= 0 && newValue <= 1000;
      },
    });

    return (
      <>
        <Container screen="2xl" alignment="center" padding={{ block: "7xl" }}>
          <Box space={{ y: "xl" }}>
            <Stack direction="column">
              <Text as="h3">Stock</Text>

              <Separator space={{ block: "xl" }} />

              <Grid
                responsive={{ sm: { cols: 2 } }}
                cols={1}
                space={{ y: "2xl" }}
                padding={{ block: "md" }}
              >
                <Grid.Item>
                  <Text size="2xl" weight="light" skin="neutral">
                    Total assets value
                  </Text>
                  <Text size="5xl" weight="bold">
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
                    grow
                  >
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

                      <Progress size="md" value={totalProducts} max={1500} skin="primary" />

                      <Text skin="neutral" size="sm">
                        <Badge skin="primary" /> Max of capacity:{" "}
                        <Text as="span" size="sm">
                          1500
                        </Text>
                      </Text>
                    </Stack>
                  </Stack>
                </Grid.Item>
              </Grid>

              <Stack justify="between">
                <Stack size={4}>
                  <TextField
                    leftSlot={<FiSearch />}
                    placeholder="Search inventory"
                    onChange={(event) => setSearch(event.target.value)}
                    value={search}
                    fullWidth
                  />
                </Stack>
                <Stack justify="end" grow>
                  <Dropdown<HTMLButtonElement>
                    placement="bottom-end"
                    renderAnchor={({ ref, open, close, isOpen }) => (
                      <Button
                        ref={ref}
                        onClick={isOpen ? close : open}
                        appearance="outline"
                        skin={isOpen ? "primary" : "neutral"}
                        leftSlot={<LuFilter />}
                      >
                        Filters
                      </Button>
                    )}
                  >
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
                              }
                            >
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
              </Stack>

              <DataTable<TStock>
                itemKeySelector={({ id }) => id}
                appearance={["border-rows"]}
                data={stock}
                columns={columns}
                sortableColumns={["name", "stock"]}
                hiddenColumns={hiddenColumns}
                defaultColumnDirection="ASC"
                defaultColumnSorted="name"
                onFilter={({ name, vendor }) =>
                  name.toLowerCase().includes(search.toLowerCase()) ||
                  vendor.toLowerCase().includes(search.toLowerCase())
                }
              />
            </Stack>
          </Box>
        </Container>
        <Dialog
          open={dialogOpen}
          onEscape={() => setDialogOpen(false)}
          onClickOutside={() => setDialogOpen(false)}
        >
          <Dialog.Header>
            <Text size="2xl" space={{ y: "sm" }}>
              Add Stock
            </Text>
            <Text skin="neutral" size="sm">
              Enter the amount to add to your stock
            </Text>
          </Dialog.Header>

          <Dialog.Body>
            <Stack direction="column" gap="4xl">
              <Stack direction="row" gap="md">
                <Button
                  onClick={() => setValue(Number(value) - 1)}
                  size="lg"
                  appearance="outline"
                  leftSlot={<FiMinus size={20} />}
                  iconOnly
                >
                  Remove
                </Button>
                <TextField
                  value={value}
                  onChange={onChange}
                  alignment="center"
                  size="lg"
                  fullWidth
                />
                <Button
                  onClick={() => setValue(Number(value) + 1)}
                  size="lg"
                  appearance="outline"
                  leftSlot={<FiPlus size={20} />}
                  iconOnly
                >
                  Add
                </Button>
              </Stack>

              <Text size="sm">
                Add stock from your connected accounts directly to your available balance.
              </Text>
            </Stack>
          </Dialog.Body>
          <Dialog.Footer>
            <Stack direction="row" gap="md">
              <Button skin="neutral" appearance="ghost" size="lg" fullWidth>
                Cancel
              </Button>
              <Button skin="success" size="lg" fullWidth>
                Add Stock
              </Button>
            </Stack>
          </Dialog.Footer>
        </Dialog>
      </>
    );
  },
};

export const Kanban = {
  render: function Render() {
    const board = [
      {
        id: "backlog",
        title: "Backlog",
        tasks: [
          {
            id: "new-benefits-plan",
            title: "New Benefits Plan",
            category: "Human Resources",
            members: [
              {
                id: "john-smith",
                name: "John Smith",
              },
            ],
            tasks: {
              total: 6,
              completed: 0,
            },
            messages: 3,
          },
          {
            id: "onboarding-emails",
            title: "Onboarding Emails",
            category: "Customer Success",
            members: [
              {
                id: "jane-doe",
                name: "Jane Doe",
              },
              {
                id: "michael-johnson",
                name: "Michael Johnson",
              },
            ],
            tasks: {
              total: 10,
              completed: 0,
            },
            messages: 10,
          },
          {
            id: "api-integration",
            title: "API Integration",
            category: "Engineering",
            members: [
              {
                id: "john-smith",
                name: "John Smith",
              },
              {
                id: "jane-doe",
                name: "Jane Doe",
              },
              {
                id: "michael-johnson",
                name: "Michael Johnson",
              },
            ],
            tasks: {
              total: 12,
              completed: 0,
            },
            attach: 3,
            messages: 63,
          },
        ],
      },
      {
        id: "in-progress",
        title: "In Progress",
        tasks: [
          {
            id: "website-redesign",
            title: "Website Redesign",
            category: "Marketing",
            members: [
              {
                id: "emily-williams",
                name: "Emily Williams",
              },
            ],
            tasks: {
              total: 12,
              completed: 7,
            },
            messages: 5,
          },
          {
            id: "mobile-app-development",
            title: "Mobile App Development",
            category: "Engineering",
            members: [
              {
                id: "john-smith",
                name: "John Smith",
              },
              {
                id: "michael-johnson",
                name: "Michael Johnson",
              },
            ],
            tasks: {
              total: 30,
              completed: 15,
            },
            messages: 20,
            attach: 2,
          },
        ],
      },
      {
        id: "done",
        title: "Done",
        tasks: [
          {
            id: "quarterly-financial-report",
            title: "Quarterly Financial Report",
            category: "Finance",
            members: [
              {
                id: "susan-davis",
                name: "Susan Davis",
              },
            ],
            tasks: {
              total: 5,
              completed: 5,
            },
            messages: 2,
          },
          {
            id: "social-media-strategy",
            title: "Social Media Strategy",
            category: "Marketing",
            members: [
              {
                id: "emily-williams",
                name: "Emily Williams",
              },
            ],
            tasks: {
              total: 8,
              completed: 8,
            },
            messages: 4,
          },
        ],
      },
    ];

    return (
      <Container>
        <Stack direction="column" gap="5xl">
          <Tabs<"board" | "backlog" | "roadmap"> value="backlog">
            <Tabs.List>
              <Tabs.Item value="backlog">Backlog</Tabs.Item>
              <Tabs.Item value="board">Status board</Tabs.Item>
              <Tabs.Item value="roadmap">Roadmap</Tabs.Item>
            </Tabs.List>
          </Tabs>

          <Stack justify="between" items="center">
            <Text size="2xl" weight="medium">
              Acme Project - SaaS
            </Text>
          </Stack>

          <Stack direction="column" gap="md">
            <Stack
              wrap="wrap"
              gap="2xl"
              responsive={{
                md: {
                  wrap: "nowrap",
                },
              }}
            >
              {board.map(({ id, title, tasks }) => (
                <Stack
                  key={id}
                  size={12}
                  gap="md"
                  direction="column"
                  responsive={{
                    md: {
                      size: 4,
                    },
                  }}
                >
                  <Card shadow="sm" padding={{ block: "sm", inline: "md" }}>
                    <Card.Body>
                      <Stack items="center" justify="between">
                        <Text weight="semi-bold">{title}</Text>
                        <div>
                          <Button
                            size="sm"
                            skin="neutral"
                            appearance="ghost"
                            leftSlot={<IoMdAdd />}
                            iconOnly
                          >
                            Add
                          </Button>
                          <Button
                            size="sm"
                            skin="neutral"
                            appearance="ghost"
                            leftSlot={<GoKebabHorizontal />}
                            iconOnly
                          >
                            Add
                          </Button>
                        </div>
                      </Stack>
                    </Card.Body>
                  </Card>
                  <Hue skin="gray-100">
                    <Card padding={{ block: "sm", inline: "sm" }}>
                      <Card.Body>
                        <Stack gap="md" direction="column">
                          {tasks.map(({ id, title, members, tasks, messages, attach }) => (
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
                                        leftSlot={<IoChatbubbleOutline />}
                                      >
                                        {messages}
                                      </Button>
                                      {attach && (
                                        <Button
                                          size="sm"
                                          skin="neutral"
                                          appearance="ghost"
                                          leftSlot={<IoAttach />}
                                        >
                                          {attach}
                                        </Button>
                                      )}
                                    </Stack>
                                    <Avatar.Group>
                                      {members.map(({ id, name }) => (
                                        <Tooltip<HTMLDivElement>
                                          key={id}
                                          renderAnchor={(props) => (
                                            <Avatar key={id} size="xs" name={name} {...props} />
                                          )}
                                        >
                                          {name}
                                        </Tooltip>
                                      ))}
                                    </Avatar.Group>
                                  </Stack>
                                </Card.Body>
                              </Card>
                            </Stack>
                          ))}
                        </Stack>
                      </Card.Body>
                    </Card>
                  </Hue>
                </Stack>
              ))}
            </Stack>
          </Stack>
        </Stack>
      </Container>
    );
  },
};

export const SidePanel = {
  render: function Render() {
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
                whiteSpace="nowrap"
              >
                Stewed Board
              </Text>
            </Stack>
          </Drawer.Header>

          <Separator />

          <Drawer.Body>
            <Stack gap="2xl" direction="column">
              <TextField
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

export const AddStaff = {
  render: function Render() {
    const [selectedStep, setSelectedStep] = useState("4");

    const prevStep = useCallback(() => {
      const step = Number(selectedStep) - 1;
      setSelectedStep(step.toString());
    }, [selectedStep]);

    const nextStep = useCallback(() => {
      const step = Number(selectedStep) + 1;
      setSelectedStep(step.toString());
    }, [selectedStep]);

    const steps = [
      { step: "1", completed: true, title: "Staff Info", icon: <FaUserEdit size={20} /> },
      { step: "2", completed: true, title: "Assigned Services", icon: <FaUserDoctor size={20} /> },
      { step: "3", completed: true, title: "Working Hours", icon: <MdOutlineTimer size={20} /> },
      { step: "4", completed: false, title: "Days Off", icon: <MdOutlineTimerOff size={20} /> },
    ];

    return (
      <Container screen="sm" alignment="center" padding={{ block: "7xl" }}>
        <Text as="h5">Add new doctor</Text>
        <Text size="sm" skin="neutral" space={{ y: "lg" }}>
          Add new doctor to your staff.
        </Text>

        <Separator space={{ block: "lg" }} />

        <Box space={{ y: "4xl" }}>
          <Stepper selectedValue={selectedStep}>
            {steps.map(({ step, completed, icon, title }) => (
              <Stepper.Item key={step} value={step} icon={icon} completed={completed}>
                <Text size="xs" weight="medium" skin="neutral-faded" variation={"uppercase"}>
                  Step {step}
                </Text>
                <Text size="sm" weight="medium">
                  {title}
                </Text>
              </Stepper.Item>
            ))}
          </Stepper>
        </Box>

        {selectedStep === "1" && (
          <>
            <Box space={{ y: "2xl" }}>
              <Stack gap="2xl" items="center">
                <Stack>
                  <Avatar
                    image={{
                      src: "https://images.unsplash.com/photo-1633332755192-727a05c4013d",
                    }}
                    size="5xl"
                    name="Kevin White"
                  />
                </Stack>
                <Stack gap="md" grow direction="column">
                  <Stack>
                    <Button skin="primary" appearance="outline">
                      Upload photo
                    </Button>
                    <Separator orientation="vertical" space={{ inline: "md" }} />
                    <Button skin="critical" appearance="ghost">
                      Delete
                    </Button>
                  </Stack>
                  <Text skin="neutral-faded" size="sm">
                    An image of the person should have the same length and height
                  </Text>
                </Stack>
              </Stack>
            </Box>
            <Box space={{ y: "lg" }}>
              <Stack direction="column" gap="xl">
                <FormField>
                  <FormField.Label>Type</FormField.Label>
                  <FormField.Control>
                    <Radio.Group name="type" orientation="horizontal" fullWidth>
                      <Radio appearance="border" value="full-time" defaultChecked>
                        Full time
                      </Radio>
                      <Radio appearance="border" value="part-time">
                        Part time
                      </Radio>
                    </Radio.Group>
                  </FormField.Control>
                </FormField>

                <FormField>
                  <FormField.Label htmlFor="name">Name</FormField.Label>
                  <FormField.Control>
                    <TextField id="name" defaultValue="Kevin White" />
                  </FormField.Control>
                </FormField>

                <FormField>
                  <FormField.Label htmlFor="specialist">Specialist</FormField.Label>
                  <FormField.Control>
                    <Select id="specialist">
                      <Select.Option value="Cardiologist">Cardiologist</Select.Option>
                      <Select.Option value="Dental services">Dental services</Select.Option>
                      <Select.Option value="Heart specialist">Heart specialist</Select.Option>
                      <Select.Option value="Pediatrician">Pediatrician</Select.Option>
                    </Select>
                  </FormField.Control>
                </FormField>

                <FormField>
                  <FormField.Label htmlFor="phone">Phone Number</FormField.Label>
                  <FormField.Control>
                    <TextField id="phone" defaultValue="808 555 222" />
                  </FormField.Control>
                </FormField>

                <FormField>
                  <FormField.Label htmlFor="email">Email Address</FormField.Label>
                  <FormField.Control>
                    <TextField id="email" defaultValue="kevin-white@mail.com" />
                  </FormField.Control>
                </FormField>

                <FormField>
                  <FormField.Label htmlFor="address">Address</FormField.Label>
                  <FormField.Control>
                    <TextArea id="address" defaultValue="North Arizona 47 22TH" />
                  </FormField.Control>
                  <FormField.Description>Maximum of 200 characters</FormField.Description>
                </FormField>
              </Stack>
            </Box>
          </>
        )}

        {selectedStep === "2" && (
          <Box space={{ y: "2xl" }}>
            <Stack direction="column" gap="md">
              <Accordion appearance="border">
                <Accordion.Item open>
                  {({ open }) => (
                    <>
                      <Accordion.Header rightSlot={open ? <FiMinus /> : <FiPlus />}>
                        Cosmetic services
                      </Accordion.Header>
                      <Accordion.Body>
                        <Checkbox.Group orientation="vertical" fullWidth>
                          {[
                            "Teeth Whitening",
                            "Dental Veneers",
                            "Dental Bonding",
                            "Inlays and Onlays",
                            "Dental implants",
                          ].map((value) => (
                            <Checkbox key={value} defaultChecked={true} appearance="border">
                              {value}
                            </Checkbox>
                          ))}
                        </Checkbox.Group>
                      </Accordion.Body>
                    </>
                  )}
                </Accordion.Item>
              </Accordion>

              <Accordion appearance="border">
                <Accordion.Item open>
                  {({ open }) => (
                    <>
                      <Accordion.Header rightSlot={open ? <FiMinus /> : <FiPlus />}>
                        Treatment service
                      </Accordion.Header>
                      <Accordion.Body>
                        <Checkbox.Group orientation="vertical" fullWidth>
                          {["Bridges", "Crowns", "Fillings", "Root canal treatment"].map(
                            (value) => (
                              <Checkbox key={value} appearance="border">
                                {value}
                              </Checkbox>
                            ),
                          )}
                        </Checkbox.Group>
                      </Accordion.Body>
                    </>
                  )}
                </Accordion.Item>
              </Accordion>
            </Stack>
          </Box>
        )}

        {selectedStep === "3" && (
          <Box space={{ y: "2xl" }}>
            {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(
              (day) => (
                <React.Fragment key={day}>
                  <Stack gap="md" wrap="wrap">
                    <Stack size={3}>
                      <Switch defaultChecked>{day}</Switch>
                    </Stack>
                    <Stack gap="md" items="center" grow>
                      <Select leftSlot={<MdOutlineTimer size={18} />}>
                        <Select.Option>09:00 am</Select.Option>
                      </Select>
                      <Text skin="neutral-faded" weight="medium">
                        to
                      </Text>
                      <Select leftSlot={<MdOutlineTimer size={18} />}>
                        <Select.Option>03:00 pm</Select.Option>
                      </Select>
                    </Stack>
                  </Stack>
                  <Separator space={{ block: "lg" }} />
                </React.Fragment>
              ),
            )}
          </Box>
        )}

        {selectedStep === "4" && (
          <>
            <Box space={{ y: "2xl" }}>
              <Card padding={{ block: "md", inline: "md" }}>
                <Card.Body>
                  <Stack direction="column" gap="xl">
                    <FormField>
                      <FormField.Label htmlFor="title">Title</FormField.Label>
                      <FormField.Control>
                        <TextField id="title" />
                      </FormField.Control>
                    </FormField>

                    <FormField>
                      <FormField.Label htmlFor="date">Date</FormField.Label>
                      <FormField.Control>
                        <Stack gap="md" items="center" grow>
                          <Popover<HTMLInputElement>
                            renderAnchor={({ ref, open }) => (
                              <TextField
                                rootRef={ref}
                                onClick={open}
                                readOnly
                                leftSlot={<MdOutlineCalendarToday />}
                                placeholder="Start at"
                                fullWidth
                              />
                            )}
                            offset={6}
                            placement="bottom-start"
                          >
                            {({ close }) => (
                              <Box padding={{ block: "sm", inline: "sm" }}>
                                <Calendar
                                  siblingMonthDays={true}
                                  formatDate={{
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                    weekday: "narrow",
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
                                          leftSlot={<MdKeyboardArrowLeft />}
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
                                          leftSlot={<MdKeyboardArrowRight />}
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
                          <Text>to</Text>
                          <Popover<HTMLInputElement>
                            renderAnchor={({ ref, open }) => (
                              <TextField
                                rootRef={ref}
                                onClick={open}
                                readOnly
                                leftSlot={<MdOutlineCalendarToday />}
                                placeholder="End at"
                                fullWidth
                              />
                            )}
                            offset={6}
                            placement="bottom-start"
                          >
                            {({ close }) => (
                              <Box padding={{ block: "sm", inline: "sm" }}>
                                <Calendar
                                  siblingMonthDays={true}
                                  formatDate={{
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                    weekday: "narrow",
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
                                          leftSlot={<MdKeyboardArrowLeft />}
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
                                          leftSlot={<MdKeyboardArrowRight />}
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
                      </FormField.Control>
                    </FormField>

                    <FormField>
                      <FormField.Control>
                        <Checkbox>Repeat this day off yearly</Checkbox>
                      </FormField.Control>
                    </FormField>
                  </Stack>
                </Card.Body>
                <Separator />
                <Card.Footer>
                  <Stack justify="end" gap="md">
                    <Button skin="neutral" appearance="ghost">
                      Cancel
                    </Button>
                    <Button>Add</Button>
                  </Stack>
                </Card.Footer>
              </Card>
            </Box>

            <Box space={{ y: "lg" }}>
              <Stack direction="column">
                <Stack grow justify="between" items="center">
                  <Stack gap="sm" direction="column">
                    <Text weight="medium">Maternity leave</Text>
                    <Text skin="neutral-faded" size="sm">
                      23 Jun 20204 - 22 Nov 2024
                    </Text>
                  </Stack>
                  <Stack gap="sm" items="center">
                    <Text size="sm" weight="medium">
                      <MdOutlineEventRepeat size={16} />
                    </Text>
                    <Text size="sm" weight="medium">
                      Repeat yearly
                    </Text>
                  </Stack>
                </Stack>
                <Separator space={{ block: "md" }} />
              </Stack>
            </Box>
          </>
        )}

        <Stack justify="end" gap="md">
          <Button skin="neutral" appearance="ghost">
            Cancel
          </Button>
          {Number(selectedStep) > 1 && (
            <Button leftSlot={<FaArrowLeft />} appearance="outline" onClick={prevStep}>
              Prev Step
            </Button>
          )}

          {Number(selectedStep) < steps.length ? (
            <Button rightSlot={<FaArrowRight />} onClick={nextStep}>
              Next Step
            </Button>
          ) : (
            <Button>Save</Button>
          )}
        </Stack>
      </Container>
    );
  },
};
