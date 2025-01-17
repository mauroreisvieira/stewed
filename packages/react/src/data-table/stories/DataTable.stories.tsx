import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
// Components
import {
  Theme,
  DataTable,
  Tag,
  Text,
  Select,
  Separator,
  Grid,
  type TagProps,
  type ColumnsDef,
  Stack
} from "../../index";
// Hooks
import { useSelect } from "@stewed/hooks";
// Icons
import { MdOutlineArrowUpward, MdOutlineArrowDownward } from "react-icons/md";

type Story = StoryObj<typeof DataTable>;

const meta: Meta<typeof DataTable> = {
  title: "Components/Data Table",
  component: DataTable,
  decorators: [
    (Story) => (
      <Theme>
        <Story />
      </Theme>
    )
  ]
};

export default meta;

type Status = "pending" | "processing" | "success" | "failed";

interface Payment {
  id: string;
  amount: {
    value: number;
    currency: string;
  };
  status: Status;
  email: string;
}

const data: Payment[] = [
  {
    id: "1",
    amount: {
      value: 1000,
      currency: "€"
    },
    status: "pending",
    email: "olivia.patel@example.com"
  },
  {
    id: "2",
    amount: {
      value: 2100,
      currency: "€"
    },
    status: "success",
    email: "sophia.chang@example.com"
  },
  {
    id: "3",
    amount: {
      value: 3000,
      currency: "€"
    },
    status: "failed",
    email: "noah.andersen@example.com"
  },
  {
    id: "4",
    amount: {
      value: 2000,
      currency: "€"
    },
    status: "processing",
    email: "benjamin.martinez@example.com"
  },
  {
    id: "5",
    amount: {
      value: 1500,
      currency: "€"
    },
    status: "success",
    email: "liam.connor@example.com"
  }
];

export const Base: Story = {
  argTypes: {
    hiddenColumns: { control: "check", options: ["id", "amount", "email", "status"] }
  },
  render: function Render(args): React.ReactElement {
    const columns: ColumnsDef<Payment>[] = [
      {
        accessorKey: "id",
        bodyCell: ({ id }) => id,
        headCell: () => "ID",
        footCell: () => <Text weight="semi-bold">Total</Text>
      },
      {
        accessorKey: "email",
        bodyCell: ({ email }) => email,
        headCell: () => "Email"
      },
      {
        accessorKey: "status",
        bodyCell: ({ status }) => {
          const skins = {
            failed: "critical",
            processing: "warning",
            success: "success",
            pending: "neutral"
          };

          return (
            <Tag
              as="a"
              skin={skins[status] as TagProps["skin"]}
              appearance="soft"
              size="md"
              href="/"
            >
              {status}
            </Tag>
          );
        },
        headCell: () => "Status"
      },
      {
        accessorKey: "amount",
        bodyCell: ({ amount }) => `${amount.value}${amount.currency}`,
        headCell: ({ isSortable, sortDirection }) => (
          <Stack gap="xs" items="center">
            Amount
            {isSortable && sortDirection === "ASC" ? (
              <MdOutlineArrowUpward size={12} />
            ) : (
              <MdOutlineArrowDownward size={12} />
            )}
          </Stack>
        ),
        footCell: () => `${data.reduce((acc, curr) => (acc = acc + curr.amount.value), 0)}€`
      }
    ];

    // Example data
    const items: (Status | "all")[] = ["all", "processing", "pending", "success", "failed"];
    // Using the useSelect hook to manage selection
    const { index, item: selectedOption, setIndex } = useSelect<Status | "all">(items);

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
              <Select.Option key={item} value={idx}>
                {item}
              </Select.Option>
            ))}
          </Select>
        </Grid>
        <Separator space={{ block: "lg" }} />
        <DataTable<Payment>
          {...args}
          appearance={["border", "border-columns", "striped-rows", "border-rows"]}
          data={data}
          columns={columns}
          sortableColumns={["amount"]}
          defaultColumnDirection="ASC"
          defaultColumnSorted="amount"
          itemKeySelector={({ id }) => id}
          bodyRowProps={({ status }) => (status === "failed" ? { skin: "critical" } : undefined)}
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
          }}
        />
      </>
    );
  }
};
