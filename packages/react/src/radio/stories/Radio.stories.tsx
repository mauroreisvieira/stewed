import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
// UI Components
import { Theme, Radio, Separator, Text, type RadioGroupProps } from "../../index";
// Hooks
import { useToggle } from "@stewed/hooks";

type Story = StoryObj<typeof Radio>;

const meta: Meta<typeof Radio> = {
  title: "Components/Radio",
  component: Radio,
  subcomponents: {
    "Radio.Group": Radio.Group as React.FC<unknown>
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
  args: {
    disabled: false,
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
      <Radio checked={isChecked} onChange={setChecked}>
        Label
      </Radio>
    );
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

/**
 * If `checkedValues` is undefined, this component will act as an uncontrolled input.
 * To avoid this, ensure `checkedValues` is either consistently controlled (always defined) or managed properly to handle potential undefined cases.
 */
export const Group: StoryObj<RadioGroupProps> = {
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
    const [checkedValue, setCheckedValues] = useState<string>("Red");

    return (
      <>
        <Radio.Group checkedValue={checkedValue} onCheckedChange={setCheckedValues} {...args}>
          {["Red", "Blue", "Green"].map((color) => (
            <Radio key={color} appearance="border" value={color} size="lg">
              {color}
            </Radio>
          ))}
        </Radio.Group>

        <Separator space={{ block: "xl" }} />

        <Text size="sm">
          <Text as="strong" weight="bold" size="sm">
            Selected Value:
          </Text>{" "}
          {checkedValue?.toString()}
        </Text>
      </>
    );
  }
};
