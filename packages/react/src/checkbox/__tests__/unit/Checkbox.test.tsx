import React from "react";
// UI Components
import { Checkbox, type CheckboxProps } from "../../index";
// Utilities
import { render, act, fireEvent } from "@testing-library/react";

describe("Checkbox", () => {
  describe("Snapshots", () => {
    it("should renders default component", () => {
      const { container } = render(<Checkbox>Checkbox</Checkbox>);

      expect(container).toMatchSnapshot();
    });

    it("should render additional classes", () => {
      const { container } = render(<Checkbox className="other-class">Checkbox</Checkbox>);

      expect(container).toMatchSnapshot();
    });

    it("should render loading", () => {
      const { container } = render(<Checkbox loading>Checkbox</Checkbox>);

      expect(container).toMatchSnapshot();
    });

    it.each<CheckboxProps["skin"]>(["primary", "critical", "success"])(
      "should apply '%s' skin classes",
      (skin) => {
        const { container } = render(<Checkbox skin={skin}>Checkbox</Checkbox>);

        expect(container).toMatchSnapshot();
      }
    );

    it.each<CheckboxProps["appearance"]>(["border", "default"])(
      "should apply '%s' appearance classes",
      (appearance) => {
        const { container } = render(<Checkbox appearance={appearance}>Checkbox</Checkbox>);

        expect(container).toMatchSnapshot();
      }
    );

    it.each<CheckboxProps["size"]>(["sm", "md", "lg"])("should apply '%s' size classes", (size) => {
      const { container } = render(<Checkbox size={size}>Checkbox</Checkbox>);

      expect(container).toMatchSnapshot();
    });
  });

  describe("Events", () => {
    it("should trigger `onChange` event when value changes", () => {
      const handleChange = vitest.fn();

      // Render the Checkbox component
      const { getByLabelText } = render(
        <Checkbox aria-label="checkbox-input" onChange={handleChange}>
          Checkbox
        </Checkbox>
      );

      // Get the Checkbox input by its ARIA label
      const input = getByLabelText("checkbox-input");

      // Simulate the change event
      act(() => {
        fireEvent.change(input, { target: { checked: true } });
      });

      // Check if the input is checked
      expect((input as HTMLInputElement).checked).toBe(true);
    });
  });
});
