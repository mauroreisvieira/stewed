import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
// Components
import { Theme, DataTable, ColumnsDef, Table, Tag } from "../../index";

type Story = StoryObj<typeof DataTable>;

const meta: Meta<typeof DataTable> = {
  title: "Components/DataTable",
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
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

const data: Payment[] = [
  {
    id: "1",
    amount: 1000,
    status: "pending",
    email: "example@email.com",
  },
  {
    id: "2",
    amount: 2000,
    status: "success",
    email: "example@email.com",
  },
  {
    id: "3",
    amount: 5000,
    status: "failed",
    email: "example@email.com",
  },
];

export const Base: Story = {
  argTypes: {
    children: {
      control: false,
    },
  },
  render: (): React.ReactElement => {
    const columns: ColumnsDef<Payment>[] = [
      {
        accessorKey: "id",
        bodyCell: ({ id }) => id,
        headCell: () => "ID",
        footCell: () => "Total",
        isHidden: false,
      },
      {
        accessorKey: "email",
        bodyCell: ({ email }) => email,
        headCell: () => "Email",
      },
      {
        accessorKey: "amount",
        bodyCell: ({ amount }) => <span>{amount}</span>,
        headCell: () => "Amount",
        isSortable: true,
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
    ];

    return (
      <DataTable<Payment>
        data={data}
        columns={columns}
        itemKey={({ id }) => id}
        sortedColumn="id"
        orderColumns={["id", "status"]}>
        {({ headCells, bodyRows, footCells }) => (
          <Table appearance={["border", "border-columns", "border-rows", "striped"]}>
            <Table.Head>
              <Table.Row>
                {headCells.map(({ key, children }) => (
                  <Table.Cell as="th" key={`head-${key}`}>
                    {children}
                  </Table.Cell>
                ))}
              </Table.Row>
            </Table.Head>
            <Table.Body>
              {bodyRows.map(({ key, bodyCells }) => (
                <Table.Row key={key}>
                  {bodyCells.map(({ key, children }) => (
                    <Table.Cell key={key}>{children}</Table.Cell>
                  ))}
                </Table.Row>
              ))}
            </Table.Body>
            {footCells.length > 0 && (
              <Table.Foot>
                <Table.Row>
                  {footCells.map(({ key, children }) => (
                    <Table.Cell key={`foot-${key}`}>{children}</Table.Cell>
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
