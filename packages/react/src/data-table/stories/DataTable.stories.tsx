import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
// Components
import {
  Theme,
  Box,
  DataTable,
  ColumnsDef,
  Table,
  Tag,
  Text,
  Select,
  Separator,
  Grid,
  type TagProps,
} from "../../index";
// Icons
import { MdOutlineArrowUpward, MdOutlineArrowDownward } from "react-icons/md";
import { useSelect } from "@stewed/hooks";

type Story = StoryObj<typeof DataTable>;

const meta: Meta<typeof DataTable> = {
  title: "Components/Data Table",
  component: DataTable,
  decorators: [
    (Story) => (
      <Theme>
        <Story />
      </Theme>
    ),
  ],
};

export default meta;

type Payment = {
  id: string;
  amount: {
    value: number;
    currency: string;
  };
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

const data: Payment[] = [
  {
    id: "1",
    amount: {
      value: 1000,
      currency: "€",
    },
    status: "pending",
    email: "olivia.patel@example.com",
  },
  {
    id: "2",
    amount: {
      value: 2100,
      currency: "€",
    },
    status: "success",
    email: "sophia.chang@example.com",
  },
  {
    id: "3",
    amount: {
      value: 3000,
      currency: "€",
    },
    status: "failed",
    email: "noah.andersen@example.com",
  },
  {
    id: "4",
    amount: {
      value: 2000,
      currency: "€",
    },
    status: "processing",
    email: "benjamin.martinez@example.com",
  },
  {
    id: "5",
    amount: {
      value: 1500,
      currency: "€",
    },
    status: "success",
    email: "liam.connor@example.com",
  },
];

export const Base: Story = {
  argTypes: {
    children: {
      control: false,
    },
    hiddenColumns: { control: "check", options: ["id", "amount", "email", "status"] },
  },
  render: (args): React.ReactElement => {
    const columns: ColumnsDef<Payment>[] = [
      {
        accessorKey: "id",
        bodyCell: ({ id }) => id,
        headCell: () => "ID",
        footCell: () => <Text weight="semi-bold">Total</Text>,
      },
      {
        accessorKey: "email",
        bodyCell: ({ email }) => email,
        headCell: () => "Email",
      },
      {
        accessorKey: "status",
        bodyCell: ({ status }) => {
          const skins = {
            failed: "critical",
            processing: "warning",
            success: "success",
            pending: "neutral",
          };

          return (
            <Tag skin={skins[status] as TagProps<"span">["skin"]} appearance="soft" size="sm">
              {status}
            </Tag>
          );
        },
        headCell: () => "Status",
      },
      {
        accessorKey: "amount",
        bodyCell: ({ amount }) => `${amount.value}${amount.currency}`,
        headCell: () => "Amount",
        footCell: () => `${data.reduce((acc, curr) => (acc = acc + curr.amount.value), 0)}€`,
      },
    ];

    // Example data
    const items = ["all", "processing", "pending", "success", "failed"];
    // Using the useSelect hook to manage selection
    const { index, item: selectedOption, setIndex } = useSelect<string>(items);

    // Event handler to handle selection change
    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const newIndex = Number(event.target.value);
      setIndex(newIndex);
    };

    return (
      <>
        <Grid cols={3}>
          <Select value={index} onChange={handleSelectChange}>
            {items.map((item, idx) => (
              <Select.Option key={idx} value={idx}>
                {item}
              </Select.Option>
            ))}
          </Select>
        </Grid>
        <Separator space={{ block: "lg" }} />
        <DataTable<Payment>
          {...args}
          data={data}
          columns={columns}
          sortableColumns={["amount"]}
          defaultColumnDirection="DESC"
          defaultColumnSorted="amount"
          onFilter={({ status }) => {
            return selectedOption && selectedOption !== "all"
              ? selectedOption.includes(status)
              : true;
          }}
          onSort={({ column, direction, items }) => {
            if (column === "amount") {
              return [...items].sort((a, b) => {
                return direction === "ASC"
                  ? a.amount.value - b.amount.value
                  : b.amount.value - a.amount.value;
              });
            }
            return null;
          }}>
          {({ headCells, bodyRows, footCells }) => (
            <Table appearance={["border", "border-rows", "border-columns"]}>
              <Table.Head>
                <Table.Row>
                  {headCells.map(
                    ({ cellKey, cellNode, isSortable, sortedColumn, sortDirection, onSort }) => (
                      <Table.Cell
                        as="th"
                        key={`head-${cellKey}`}
                        onClick={isSortable ? onSort : undefined}>
                        <Box gap="xs">
                          {cellNode}
                          {sortedColumn === cellKey && (
                            <span>
                              {sortDirection === "ASC" ? (
                                <MdOutlineArrowUpward size={12} />
                              ) : (
                                <MdOutlineArrowDownward size={12} />
                              )}
                            </span>
                          )}
                        </Box>
                      </Table.Cell>
                    ),
                  )}
                </Table.Row>
              </Table.Head>
              <Table.Body>
                {bodyRows.map(({ bodyCells, data: { id } }) => (
                  <Table.Row key={id}>
                    {bodyCells.map(({ cellKey, cellNode }) => (
                      <Table.Cell key={cellKey}>{cellNode}</Table.Cell>
                    ))}
                  </Table.Row>
                ))}
              </Table.Body>
              {footCells.length > 0 && (
                <Table.Foot>
                  <Table.Row>
                    {footCells.map(({ cellKey, cellNode, ...props }) => (
                      <Table.Cell key={`foot-${cellKey}`} {...props}>
                        {cellNode}
                      </Table.Cell>
                    ))}
                  </Table.Row>
                </Table.Foot>
              )}
            </Table>
          )}
        </DataTable>
      </>
    );
  },
};
