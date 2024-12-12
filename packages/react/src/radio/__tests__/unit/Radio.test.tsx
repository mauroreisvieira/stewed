import React from "react";
// UI Components
import { Radio, type RadioProps } from "../../index";
// Utilities
import { render, act, fireEvent } from "@testing-library/react";

describe("Radio", () => {
  describe("Snapshots", () => {
    it("should renders default component", () => {
      const { container } = render(<Radio>Radio</Radio>);

      expect(container).toMatchSnapshot();
    });

    it("should render additional classes", () => {
      const { container } = render(<Radio className="other-class">Radio</Radio>);

      expect(container).toMatchSnapshot();
    });

    it.each<RadioProps["skin"]>(["primary", "critical", "success"])(
      "should apply '%s' skin classes",
      (skin) => {
        const { container } = render(<Radio skin={skin}>Radio</Radio>);

        expect(container).toMatchSnapshot();
      }
    );

    it.each<RadioProps["appearance"]>(["border", "default"])(
      "should apply '%s' appearance classes",
      (appearance) => {
        const { container } = render(<Radio appearance={appearance}>Radio</Radio>);

        expect(container).toMatchSnapshot();
      }
    );

    it.each<RadioProps["size"]>(["sm", "md", "lg"])("should apply '%s' size classes", (size) => {
      const { container } = render(<Radio size={size}>Radio</Radio>);

      expect(container).toMatchSnapshot();
    });
  });

  describe("Events", () => {
    it("should trigger `onChange` event when value changes", () => {
      const handleChange = jest.fn();

      // Render the Radio component
      const { getByLabelText } = render(
        <Radio aria-label="radio-input" onChange={handleChange}>
          Radio
        </Radio>
      );

      // Get the radio input by its ARIA label
      const input = getByLabelText("radio-input");

      // Simulate the change event
      act(() => {
        fireEvent.change(input, { target: { checked: true } });
      });

      // Check if the input is checked
      expect((input as HTMLInputElement).checked).toBe(true);
    });
  });
});
