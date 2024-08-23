import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
// UI Components
import { Theme, Checkbox, Text, Separator } from "../../index";
// Hooks
import { useToggle } from "@stewed/hooks";

type Story = StoryObj<typeof Checkbox>;

const meta: Meta<typeof Checkbox> = {
  title: "Components/Checkbox",
  component: Checkbox,
  subcomponents: {
    Group: Checkbox.Group as React.FC<unknown>,
  },
  decorators: [
    (Story) => (
      <Theme>
        <Story />
      </Theme>
    ),
  ],
};

export default meta;

/**
 * A [controlled component](https://reactjs.org/docs/forms.html#controlled-components) is a component that renders form elements and controls them by keeping the form data in the component's state.
 */
export const Controlled: Story = {
  argTypes: {
    onChange: { action: "change" },
  },
  args: {
    defaultChecked: true,
    children: "Label",
  },
};

/**
 * An [uncontrolled component](https://reactjs.org/docs/uncontrolled-components.html) is a component that renders form elements, where the form element's data is handled by the DOM (default DOM behavior).
 * To access the input's DOM node and extract its value you can use a [ref](https://reactjs.org/docs/refs-and-the-dom.html).
 **/
export const Uncontrolled: Story = {
  args: {
    children: "Label",
  },
  render: function Render() {
    const [isChecked, setChecked] = useToggle(false);
    return (
      <Checkbox checked={isChecked} onChange={setChecked}>
        Label
      </Checkbox>
    );
  },
};

export const Indeterminate: Story = {
  args: {
    children: "Label",
  },
  render: function Render() {
    const [isChecked, setChecked] = useToggle(false);
    return (
      <Checkbox checked={isChecked} onChange={setChecked} indeterminate={!isChecked}>
        Label
      </Checkbox>
    );
  },
};

export const Error: Story = {
  argTypes: {
    onChange: { action: "change" },
  },
  args: {
    skin: "critical",
    defaultChecked: true,
    children: "Label",
  },
};

export const Group: Story = {
  render: function Render() {
    const [checkedValues, setCheckedValues] = useState<string[]>(["Red", "Orange"]);
    return (
      <>
        <Checkbox.Group
          checkedValues={checkedValues}
          onCheckedChange={(checked) => setCheckedValues(checked)}>
          {["Red", "Blue", "Green", "Orange", "Pink"].map((color) => (
            <Checkbox key={color} value={color}>
              {color}
            </Checkbox>
          ))}
        </Checkbox.Group>

        <Separator space={{ block: "xl" }} />

        <Text size="sm">
          <Text as="strong" weight="bold" size="sm">
            Selected Values:
          </Text>{" "}
          {checkedValues.toString()}
        </Text>
      </>
    );
  },
};
