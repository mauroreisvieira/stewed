import { Meta, Story, Canvas, ArgsTable } from "@storybook/addon-docs";
import { FiSearch } from "react-icons/fi";
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

### Base

<Canvas>
  <Tabs value="1">
    <Tabs.List>
      <Tabs.Item leftSlot={<FiSearch width={"8px"} />} value="1">
        <span>Item 1</span>
      </Tabs.Item>
      <Tabs.Item leftSlot={<FiSearch width={"8px"} />} value="2">
        <span>Item 2</span>
      </Tabs.Item>
      <Tabs.Item leftSlot={<FiSearch width={"8px"} />} value="3">
        <span>Item 3</span>
      </Tabs.Item>
    </Tabs.List>
  </Tabs>
</Canvas>

### Direction

<Canvas>
  <Tabs value="1" direction="column">
    <Tabs.List>
      <Tabs.Item leftSlot={<FiSearch width={"8px"} />} value="1">
        <span>Item</span>
      </Tabs.Item>
      <Tabs.Item leftSlot={<FiSearch width={"8px"} />} value="2">
        <span>Long Item</span>
      </Tabs.Item>
      <Tabs.Item leftSlot={<FiSearch width={"8px"} />} value="3">
        <span>Very Long Item</span>
      </Tabs.Item>
    </Tabs.List>
  </Tabs>
</Canvas>

## Props

<ArgsTable of={Tabs} />
