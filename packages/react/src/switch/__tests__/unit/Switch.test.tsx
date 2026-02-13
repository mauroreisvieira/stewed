import React from "react";
// UI Components
import { Switch, type SwitchProps } from "../../index";
// Utilities
import { render, act, fireEvent } from "@testing-library/react";

describe("Switch", () => {
  describe("Snapshots", () => {
    it("should renders default component", () => {
      const { container } = render(<Switch>Switch</Switch>);

      expect(container).toMatchSnapshot();
    });

    it("should render additional classes", () => {
      const { container } = render(<Switch className="other-class">Switch</Switch>);

      expect(container).toMatchSnapshot();
    });

    it("should render loading", () => {
      const { container } = render(<Switch loading>Switch</Switch>);

      expect(container).toMatchSnapshot();
    });

    it.each<SwitchProps["skin"]>([
      "primary",
      "critical",
      "success"
    ])("should apply '%s' skin classes", (skin) => {
      const { container } = render(<Switch skin={skin}>Switch</Switch>);

      expect(container).toMatchSnapshot();
    });

    it.each<SwitchProps["size"]>(["sm", "md", "lg"])("should apply '%s' size classes", (size) => {
      const { container } = render(<Switch size={size}>Switch</Switch>);

      expect(container).toMatchSnapshot();
    });
  });

  describe("Events", () => {
    it("should trigger `onChange` event when value changes", () => {
      const handleChange = vitest.fn();

      // Render the Switch component
      const { getByLabelText } = render(
        <Switch aria-label="Switch-input" onChange={handleChange}>
          Switch
        </Switch>
      );

      // Get the Switch input by its ARIA label
      const input = getByLabelText("Switch-input");

      // Simulate the change event
      act(() => {
        fireEvent.change(input, { target: { checked: true } });
      });

      // Check if the input is checked
      expect((input as HTMLInputElement).checked).toBe(true);
    });
  });
});
