import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Theme, Table, Checkbox } from "../../index";

type Story = StoryObj<typeof Table>;

const meta: Meta<typeof Table> = {
  title: "Components/Table",
  component: Table,
  decorators: [
    (Story) => (
      <Theme>
        <Story />
      </Theme>
    ),
  ],
};

export default meta;

const data = [
  {
    id: "1",
    name: "Lourenço Vieira",
    email: "lourenco.vieira@mail.com",
  },
  {
    id: "2",
    name: "Mauro Vieira",
    email: "mauro.vieira@mail.com",
  },
  {
    id: "3",
    name: "Henrique Vieira",
    email: "henrique.vieira@mail.com",
  },
];

export const Base: Story = {
  argTypes: {
    children: {
      control: false,
    },
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
      </>
    ),
  },
};

export const Border: Story = {
  argTypes: {
    children: {
      control: false,
    },
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
      </>
    ),
  },
};

export const Striped: Story = {
  argTypes: {
    children: {
      control: false,
    },
  },
  args: {
    appearance: ["striped"],
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
    ),
  },
};

export const Error: Story = {
  argTypes: {
    children: {
      control: false,
    },
  },
  args: {
    appearance: ["border", "border-rows"],
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
                <Checkbox
                  skin={index === 1 ? "critical" : "primary"}
                />
              </Table.Cell>
              <Table.Cell>{id}</Table.Cell>
              <Table.Cell>{id}</Table.Cell>
              <Table.Cell>{name}</Table.Cell>
              <Table.Cell>{email}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </>
    ),
  },
};
