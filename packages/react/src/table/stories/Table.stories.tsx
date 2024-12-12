import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Theme, Table, Checkbox } from "../../index";

type Story = StoryObj<typeof Table>;

const meta: Meta<typeof Table> = {
  title: "Components/Table",
  component: Table,
  subcomponents: {
    "Table.Head": Table.Head as React.FC<unknown>,
    "Table.Body": Table.Body as React.FC<unknown>,
    "Table.Foot": Table.Foot as React.FC<unknown>,
    "Table.Row": Table.Row as React.FC<unknown>,
    "Table.Cell": Table.Cell as React.FC<unknown>
  },
  decorators: [
    (Story) => (
      <Theme>
        <Story />
      </Theme>
    )
  ]
};

export default meta;

const data = [
  {
    id: "1",
    name: "Benjamin Martinez",
    email: "benjamin.martinez@example.com"
  },
  {
    id: "2",
    name: "Sophia Chang",
    email: "sophia.chang@example.com"
  },
  {
    id: "3",
    name: "Olivia Patel",
    email: "olivia.patel@example.com"
  },
  {
    id: "4",
    name: "Mark Zen",
    email: "mark.zen@example.com"
  },
  {
    id: "5",
    name: "Kevin Clark",
    email: "kevin.clark@example.com"
  },
  {
    id: "6",
    name: "Albert Frost",
    email: "albert.frost@example.com"
  },
  {
    id: "7",
    name: "Katheryn Winnick",
    email: "kath.winnick@example.com"
  }
];

export const Base: Story = {
  argTypes: {
    children: {
      control: false
    }
  },
  args: {
    children: (
      <>
        <Table.Head>
          <Table.Row>
            <Table.Cell as="th">ID</Table.Cell>
            <Table.Cell as="th">Name</Table.Cell>
            <Table.Cell as="th">Email</Table.Cell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {data.map(({ id, name, email }) => (
            <Table.Row key={id}>
              <Table.Cell>{id}</Table.Cell>
              <Table.Cell>{name}</Table.Cell>
              <Table.Cell>{email}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
        <Table.Foot>
          <Table.Row>
            <Table.Cell>Foot</Table.Cell>
            <Table.Cell>Foot</Table.Cell>
            <Table.Cell>Foot</Table.Cell>
          </Table.Row>
        </Table.Foot>
      </>
    )
  }
};

export const Border: Story = {
  argTypes: {
    children: {
      control: false
    }
  },
  args: {
    appearance: ["border", "border-rows", "border-columns"],
    children: (
      <>
        <Table.Head>
          <Table.Row>
            <Table.Cell as="th">ID</Table.Cell>
            <Table.Cell as="th">Name</Table.Cell>
            <Table.Cell as="th">Email</Table.Cell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {data.map(({ id, name, email }) => (
            <Table.Row key={id}>
              <Table.Cell>{id}</Table.Cell>
              <Table.Cell>{name}</Table.Cell>
              <Table.Cell>{email}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
        <Table.Foot>
          <Table.Row>
            <Table.Cell colSpan={4}>Foot</Table.Cell>
          </Table.Row>
        </Table.Foot>
      </>
    )
  }
};

export const Striped: Story = {
  argTypes: {
    children: {
      control: false
    }
  },
  args: {
    appearance: ["striped-rows", "border"],
    children: (
      <>
        <Table.Head>
          <Table.Row>
            <Table.Cell as="th">ID</Table.Cell>
            <Table.Cell as="th">Name</Table.Cell>
            <Table.Cell as="th">Email</Table.Cell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {data.map(({ id, name, email }) => (
            <Table.Row key={id}>
              <Table.Cell>{id}</Table.Cell>
              <Table.Cell>{name}</Table.Cell>
              <Table.Cell>{email}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </>
    )
  }
};

export const Error: Story = {
  argTypes: {
    children: {
      control: false
    }
  },
  args: {
    hoverable: true,
    children: (
      <>
        <Table.Head>
          <Table.Row>
            <Table.Cell as="th">
              <Checkbox indeterminate />
            </Table.Cell>
            <Table.Cell as="th">ID</Table.Cell>
            <Table.Cell as="th">Name</Table.Cell>
            <Table.Cell as="th">Email</Table.Cell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {data.map(({ id, name, email }, index) => (
            <Table.Row key={id} skin={index === 1 ? "critical" : "default"}>
              <Table.Cell>
                <Checkbox skin={index === 1 ? "critical" : "primary"} />
              </Table.Cell>
              <Table.Cell>{id}</Table.Cell>
              <Table.Cell>{name}</Table.Cell>
              <Table.Cell>{email}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
        <Table.Foot>
          <Table.Row>
            <Table.Cell>Foot</Table.Cell>
            <Table.Cell>Foot</Table.Cell>
            <Table.Cell>Foot</Table.Cell>
            <Table.Cell>Foot</Table.Cell>
          </Table.Row>
        </Table.Foot>
      </>
    )
  }
};
