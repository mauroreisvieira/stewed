import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
// Components
import { Theme, DataTable, DataTableProps, ColumnsDef, Table, Tag, Text } from "../../index";

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
      value: 100,
      currency: "€",
    },
    status: "pending",
    email: "olivia.patel@example.com",
  },
  {
    id: "2",
    amount: {
      value: 20,
      currency: "€",
    },
    status: "success",
    email: "sophia.chang@example.com",
  },
  {
    id: "3",
    amount: {
      value: 300,
      currency: "€",
    },
    status: "failed",
    email: "noah.andersen@example.com",
  },
  {
    id: "4",
    amount: {
      value: 200,
      currency: "€",
    },
    status: "success",
    email: "benjamin.martinez@example.com",
  },
  {
    id: "5",
    amount: {
      value: 50,
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
    sortableColumns: { control: "check", options: ["id", "amount", "email", "status"] },
    hiddenColumns: { control: "check", options: ["id", "amount", "email", "status"] },
  },
  args: {
    sortableColumns: "amount"
  },
  render: (args: React.JSX.IntrinsicAttributes & DataTableProps<Payment>): React.ReactElement => {
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
        bodyCell: ({ status }) => (
          <Tag skin={status === "failed" ? "critical" : "neutral"} appearance="soft" size="sm">
            {status}
          </Tag>
        ),
        headCell: () => "Status",
      },
      {
        accessorKey: "amount",
        bodyCell: ({ amount }) => `${amount.value}${amount.currency}`,
        headCell: () => "Amount",
        footCell: () => `${data.reduce((acc, curr) => (acc = acc + curr.amount.value), 0)}€`,
      },
    ];

    return (
      <DataTable<Payment>
        {...args}
        data={data}
        columns={columns}
        itemRowKey={({ id }) => id}
        defaultDirection="DESC"
        defaultSortedColumn="amount"
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
                  ({ cellKey, children, isSortable, sortedColumn, sortDirection, onSort }) => (
                    <Table.Cell
                      as="th"
                      key={`head-${cellKey}`}
                      onClick={isSortable ? onSort : undefined}>
                      {children}
                      {sortedColumn === cellKey && (
                        <span>
                          {sortDirection === "ASC" ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={2}
                              width={12}
                              stroke="currentColor">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M8.25 6.75 12 3m0 0 3.75 3.75M12 3v18"
                              />
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={2}
                              width={12}
                              stroke="currentColor">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15.75 17.25 12 21m0 0-3.75-3.75M12 21V3"
                              />
                            </svg>
                          )}
                        </span>
                      )}
                    </Table.Cell>
                  ),
                )}
              </Table.Row>
            </Table.Head>
            <Table.Body>
              {bodyRows.map(({ rowKey, bodyCells }) => (
                <Table.Row key={rowKey}>
                  {bodyCells.map(({ cellKey, children }) => (
                    <Table.Cell key={cellKey}>{children}</Table.Cell>
                  ))}
                </Table.Row>
              ))}
            </Table.Body>
            {footCells.length > 0 && (
              <Table.Foot>
                <Table.Row>
                  {footCells.map(({ cellKey, children, ...props }) => (
                    <Table.Cell key={`foot-${cellKey}`} {...props}>
                      {children}
                    </Table.Cell>
                  ))}
                </Table.Row>
              </Table.Foot>
            )}
          </Table>
        )}
      </DataTable>
    );
  },
};
