import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
// UI Components
import { Theme, Stack, Button, Separator, List } from "@stewed/react";
// Hooks
import { useArray } from "../index";

const meta: Meta<typeof useArray> = {
  title: "Hooks/useArray",
  decorators: [
    (Story) => (
      <Theme>
        <Story />
      </Theme>
    )
  ]
};

export default meta;

interface Person {
  id: number;
  name: string;
}

export const Base: StoryObj<typeof useArray> = {
  render: function Render() {
    const { array, pushOrRemove } = useArray<Person>({
      defaultValue: [{ id: 1, name: "James" }],
      comparator: (a, b) => a.id === b.id
    });

    return (
      <div>
        <Stack gap="md">
          <Button onClick={() => pushOrRemove({ id: 2, name: "Alice" })}>Add/Remove 'Alice'</Button>
          <Button onClick={() => pushOrRemove({ id: 1, name: "James" })}>Add/Remove 'James'</Button>
        </Stack>
        <Separator space={{ block: "lg" }} />
        <List>
          {array.map(({ id, name }) => (
            <List.Item key={id}>{name}</List.Item>
          ))}
        </List>
      </div>
    );
  }
};
