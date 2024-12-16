import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
// UI Components
import { Theme, Checkbox, Text, Separator, type CheckboxGroupProps } from "../../index";
// Hooks
import { useToggle } from "@stewed/hooks";

type Story = StoryObj<typeof Checkbox>;

const meta: Meta<typeof Checkbox> = {
  title: "Components/Checkbox",
  component: Checkbox,
  subcomponents: {
    "Checkbox.Group": Checkbox.Group as React.FC<unknown>
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

/**
 * A [controlled component](https://reactjs.org/docs/forms.html#controlled-components) is a component that renders form elements and controls them by keeping the form data in the component's state.
 */
export const Controlled: Story = {
  argTypes: {
    onChange: { action: "change" }
  },
  args: {
    disabled: false,
    defaultChecked: true,
    children: "Label"
  }
};

/**
 * An [uncontrolled component](https://reactjs.org/docs/uncontrolled-components.html) is a component that renders form elements, where the form element's data is handled by the DOM (default DOM behavior).
 * To access the input's DOM node and extract its value you can use a [ref](https://reactjs.org/docs/refs-and-the-dom.html).
 **/
export const Uncontrolled: Story = {
  args: {
    children: "Label"
  },
  render: function Render() {
    const [isChecked, setChecked] = useToggle(false);

    return (
      <Checkbox checked={isChecked} onChange={setChecked}>
        Label
      </Checkbox>
    );
  }
};

export const Indeterminate: Story = {
  args: {
    children: "Label"
  },
  render: function Render() {
    const [isChecked, setChecked] = useToggle(false);

    return (
      <Checkbox checked={isChecked} onChange={setChecked} indeterminate={!isChecked}>
        Label
      </Checkbox>
    );
  }
};

export const Loading: Story = {
  argTypes: {
    onChange: { action: "change" }
  },
  args: {
    loading: true,
    size: "lg",
    defaultChecked: true,
    children: "Label"
  }
};

export const Error: Story = {
  argTypes: {
    onChange: { action: "change" }
  },
  args: {
    skin: "critical",
    defaultChecked: true,
    children: "Label"
  }
};

export const Custom: Story = {
  argTypes: {
    onChange: { action: "change" }
  },
  args: {
    defaultChecked: true,
    children: (
      <>
        <Text weight="medium" size="sm">
          Use different settings for my mobile devices
        </Text>
        <Text size="xs" skin="neutral">
          You can manage your mobile notifications in the mobile settings page.
        </Text>
      </>
    )
  }
};

/**
 * If `checkedValues` is undefined, this component will act as an uncontrolled input.
 * To avoid this, ensure `checkedValues` is either consistently controlled (always defined) or managed properly to handle potential undefined cases.
 */
export const Group: StoryObj<CheckboxGroupProps> = {
  argTypes: {
    orientation: {
      control: "select",
      options: ["vertical", "horizontal"]
    }
  },
  args: {
    orientation: "vertical",
    fullWidth: true
  },
  render: function Render({ ...args }) {
    const [checkedValues, setCheckedValues] = useState<string[]>();

    return (
      <>
        <Checkbox.Group checkedValues={checkedValues} onCheckedChange={setCheckedValues} {...args}>
          {["Red", "Blue", "Green", "Orange", "Pink"].map((color) => (
            <Checkbox key={color} appearance="border" value={color}>
              {color}
            </Checkbox>
          ))}
        </Checkbox.Group>

        <Separator space={{ block: "xl" }} />

        <Text size="sm">
          <Text as="strong" weight="bold" size="sm">
            Selected Values:
          </Text>{" "}
          {checkedValues?.toString()}
        </Text>
      </>
    );
  }
};
