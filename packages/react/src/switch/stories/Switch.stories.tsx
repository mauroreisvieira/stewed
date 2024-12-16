import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Theme, Switch } from "../../index";
// Hooks
import { useToggle } from "@stewed/hooks";

type Story = StoryObj<typeof Switch>;

const meta: Meta<typeof Switch> = {
  title: "Components/Switch",
  component: Switch,
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
    children: "Label",
    disabled: false,
    defaultChecked: true
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
      <Switch checked={isChecked} onChange={setChecked}>
        Label
      </Switch>
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
