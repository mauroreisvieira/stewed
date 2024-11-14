import React from "react";
// UI Components
import { TextField, type TextFieldProps } from "../../index";
// Utilities
import { render, act, fireEvent } from "@testing-library/react";

describe("TextField", () => {
  describe("Snapshots", () => {
    it("should renders default component", () => {
      const { container } = render(<TextField defaultValue="Input" />);

      expect(container).toMatchSnapshot();
    });

    it("should render additional classes", () => {
      const { container } = render(<TextField className="other-class" defaultValue="Input" />);

      expect(container).toMatchSnapshot();
    });

    it.each<TextFieldProps["skin"]>(["neutral-faded", "neutral", "critical", "success"])(
      "should apply '%s' skin classes",
      (skin) => {
        const { container } = render(<TextField skin={skin} defaultValue="Input" />);

        expect(container).toMatchSnapshot();
      },
    );

    it.each<TextFieldProps["appearance"]>(["soft", "ghost", "outline"])(
      "should apply '%s' appearance classes",
      (appearance) => {
        const { container } = render(<TextField appearance={appearance} defaultValue="Input" />);

        expect(container).toMatchSnapshot();
      },
    );

    it.each<TextFieldProps["size"]>(["sm", "md", "lg", "xl"])(
      "should apply '%s' size classes",
      (size) => {
        const { container } = render(<TextField size={size} defaultValue="Input" />);

        expect(container).toMatchSnapshot();
      },
    );

    it("should render left slot content", () => {
      const { container } = render(<TextField leftSlot="Left slot" defaultValue="Input" />);

      expect(container).toMatchSnapshot();
    });

    it("should render right slot content", () => {
      const { container } = render(<TextField rightSlot="Right slot" defaultValue="Input" />);

      expect(container).toMatchSnapshot();
    });

    it("should applies disabled classes", () => {
      const { container } = render(<TextField disabled defaultValue="Input" />);

      expect(container).toMatchSnapshot();
    });

    it("should applies fullWidth classes", () => {
      const { container } = render(<TextField fullWidth defaultValue="Input" />);

      expect(container).toMatchSnapshot();
    });
  });

  describe("Events", () => {
    it("should trigger `onChange` event when change value", () => {
      const handleChange = jest.fn();

      const { getByLabelText } = render(<TextField aria-label="input" onChange={handleChange} />);
      const input = getByLabelText("input");

      act(() => {
        fireEvent.change(input, { target: { value: "123" } });
        expect((input as HTMLInputElement).value).toBe("123");
      });

      expect(handleChange).toHaveBeenCalledTimes(1);
    });
  });
});
