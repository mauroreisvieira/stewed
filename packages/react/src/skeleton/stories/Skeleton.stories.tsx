import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
// UI Components
import { Theme, Grid, Skeleton, AspectRatio, Table, Card, Stack, Separator } from "../../index";

type Story = StoryObj<typeof Skeleton>;

const meta: Meta<typeof Skeleton> = {
  title: "Components/Skeleton",
  component: Skeleton,
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
    children: {
      control: false,
    },
  },
};

export const CardMedia: Story = {
  argTypes: {
    children: {
      control: false,
    },
  },
  render: function Render() {
    return (
      <Grid cols={1} responsive={{ sm: { cols: 3 } }}>
        <Card>
          <AspectRatio ratio="16:9">
            <Skeleton radius="none" size="auto" />
          </AspectRatio>
          <Separator />
          <Card.Body>
            <Stack direction="column" gap="sm">
              <Skeleton />
              <Skeleton size="xs" />
              <Skeleton size="xs" />
            </Stack>
          </Card.Body>
        </Card>
      </Grid>
    );
  },
};

export const DataTable: Story = {
  argTypes: {
    children: {
      control: false,
    },
  },
  render: function Render() {
    return (
      <Table appearance={["border", "border-rows", "border-columns"]}>
        <Table.Head>
          <Table.Row>
            {Array.from({ length: 4 }).map((_, cellIndex) => (
              <Table.Cell key={cellIndex} as="th">
                <Skeleton size="md" />
              </Table.Cell>
            ))}
          </Table.Row>
        </Table.Head>

        <Table.Body>
          {Array.from({ length: 6 }).map((_, rowIndex) => (
            <Table.Row key={rowIndex}>
              {Array.from({ length: 4 }).map((_, cellIndex) => (
                <Table.Cell key={cellIndex}>
                  <Skeleton size="sm" style={{ width: "50%" }} />
                </Table.Cell>
              ))}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    );
  },
};
