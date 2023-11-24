import { Meta, Story, Canvas, ArgsTable } from "@storybook/addon-docs";
import { Tabs } from "../";

<Meta
  title="Components/Tabs"
  component={Tabs}
  subcomponents={{
    "Tabs": Tabs,
    "Tabs List": Tabs.List,
    "Tabs Item": Tabs.Item,
  }}
/>
# Tabs

Navigation between multiple pages or content sections.

### Installation

```bash
npm install --save @stewed/react
```

### Import

```js
import { Tabs } from "@stewed/react";
```

## Examples

export const Template = (args) => (
  <Tabs {...args}>
    <Tabs.List>
      <Tabs.Item value="1">Item 1</Tabs.Item>
      <Tabs.Item value="2">Item 2</Tabs.Item>
      <Tabs.Item value="3">Item 3</Tabs.Item>
    </Tabs.List>
  </Tabs>
);

### Base

<Canvas>
  <Story
    name="Base"
    args={{
      value: "1",
    }}>
    {Template.bind({})}
  </Story>
</Canvas>

## Props

<ArgsTable of={Tabs} />
