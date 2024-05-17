import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
// Components
import { Theme, Text, Card, Grid } from "../../index";

type Story = StoryObj<typeof Grid>;

const meta: Meta<typeof Grid> = {
  title: "Components/Grid",
  component: Grid,
  decorators: [
    (Story) => (
      <Theme>
        <Story />
      </Theme>
    ),
  ],
};

export default meta;

export const Base: Story = {
  argTypes: {
    as: {
      control: false,
    },
    children: {
      control: false,
    },
  },
  args: {
    gap: "md",
    cols: 4,
    children: (
      <>
        {Array.from({ length: 12 }).map((_, index) => (
          <Card key={index} padding={{ block: "xl", inline: "xl" }}>
            <Card.Body>
              <Text>Column {index + 1}</Text>
            </Card.Body>
          </Card>
        ))}
      </>
    ),
  },
};

export const ColSpan: Story = {
  argTypes: {
    as: {
      control: false,
    },
    children: {
      control: false,
    },
  },
  args: {
    gap: "md",
    cols: 3,
  },
  render: ({ ...args }) => {
    return (
      <Grid {...args}>
        <Card padding={{ block: "xl", inline: "xl" }}>
          <Card.Body>
            <Text>Column 1</Text>
          </Card.Body>
        </Card>
        <Card padding={{ block: "xl", inline: "xl" }}>
          <Card.Body>
            <Text>Column 2</Text>
          </Card.Body>
        </Card>
        <Card padding={{ block: "xl", inline: "xl" }}>
          <Card.Body>
            <Text>Column 3</Text>
          </Card.Body>
        </Card>
        <Grid.Item colSpan={2}>
          <Card skin="primary-faded" padding={{ block: "xl", inline: "xl" }}>
            <Card.Body>
              <Text>Column 4</Text>
            </Card.Body>
          </Card>
        </Grid.Item>
        <Card padding={{ block: "xl", inline: "xl" }}>
          <Card.Body>
            <Text>Column 5</Text>
          </Card.Body>
        </Card>
        <Card padding={{ block: "xl", inline: "xl" }}>
          <Card.Body>
            <Text>Column 6</Text>
          </Card.Body>
        </Card>
        <Grid.Item colSpan={2}>
          <Card skin="primary-faded" padding={{ block: "xl", inline: "xl" }}>
            <Card.Body>
              <Text>Column 7</Text>
            </Card.Body>
          </Card>
        </Grid.Item>
      </Grid>
    );
  },
};

export const RowSpan: Story = {
  argTypes: {
    as: {
      control: false,
    },
    children: {
      control: false,
    },
  },
  args: {
    gap: "md",
    cols: 3,
    rows: 3,
    flow: "column",
  },
  render: ({ ...args }) => {
    return (
      <Grid {...args}>
        <Grid.Item rowSpan={3}>
          <Card
            skin="primary-faded"
            style={{ height: "100%" }}
            padding={{ block: "xl", inline: "xl" }}
          >
            <Card.Body>
              <Text>Column 1</Text>
            </Card.Body>
          </Card>
        </Grid.Item>
        <Grid.Item colSpan={2}>
          <Card padding={{ block: "xl", inline: "xl" }}>
            <Card.Body>
              <Text>Column 2</Text>
            </Card.Body>
          </Card>
        </Grid.Item>
        <Grid.Item rowSpan={2} colSpan={2}>
          <Card
            skin="primary-faded"
            style={{ height: "100%" }}
            padding={{ block: "xl", inline: "xl" }}
          >
            <Card.Body>
              <Text>Column 3</Text>
            </Card.Body>
          </Card>
        </Grid.Item>
      </Grid>
    );
  },
};
