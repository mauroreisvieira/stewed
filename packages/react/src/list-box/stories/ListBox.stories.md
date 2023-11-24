import { Meta, Story, Canvas, ArgsTable } from "@storybook/addon-docs";
import { ListBox } from "../";

<Meta
  title="Components/List Box"
  component={ListBox}
/>

# List Box

List Box display a list of choices that can be selected.

### Installation

```bash
npm install --save @stewed/react
```

### Import

```js
import { ListBox } from "@stewed/react";
```

## Examples

export const Template = (args) => (
  <ListBox {...args}>
    <ListBox.Group title="Section 1">
      <ListBox.Item rightSlot="⌘X">ListBox 1</ListBox.Item>
      <ListBox.Item selected>ListBox 2</ListBox.Item>
      <ListBox.Item>ListBox 3</ListBox.Item>
      <ListBox.Item>ListBox 4</ListBox.Item>
    </ListBox.Group>
    <ListBox.Group title="Section 2">
      <ListBox.Item>ListBox 5</ListBox.Item>
      <ListBox.Item>ListBox 6</ListBox.Item>
    </ListBox.Group>
    <ListBox.Group title="Section 3">
      <ListBox.Item skin="danger">ListBox 5</ListBox.Item>
    </ListBox.Group>
  </ListBox>
);

### Base

<Canvas>
  <Story name="Base">{Template.bind({})}</Story>
</Canvas>

<ArgsTable of={ListBox} />
