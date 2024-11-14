import React from "react";
// UI Components
import { TextArea, type TextAreaProps } from "../../index";
// Utilities
import { render, act, fireEvent } from "@testing-library/react";

describe("TextArea", () => {
  describe("Snapshots", () => {
    it("should renders default component", () => {
      const { container } = render(<TextArea defaultValue="TextArea" />);

      expect(container).toMatchSnapshot();
    });

    it("should render additional classes", () => {
      const { container } = render(<TextArea defaultValue="TextArea" className="other-class" />);

      expect(container).toMatchSnapshot();
    });

    it.each<TextAreaProps["skin"]>(["neutral-faded", "neutral", "critical", "success"])(
      "should apply '%s' skin classes",
      (skin) => {
        const { container } = render(<TextArea defaultValue="TextArea" skin={skin} />);

        expect(container).toMatchSnapshot();
      },
    );

    it.each<TextAreaProps["appearance"]>(["ghost", "outline", "soft"])(
      "should apply '%s' appearance classes",
      (appearance) => {
        const { container } = render(<TextArea defaultValue="TextArea" appearance={appearance} />);

        expect(container).toMatchSnapshot();
      },
    );

    it("should applies disabled classes", () => {
      const { container } = render(<TextArea defaultValue="TextArea" disabled />);

      expect(container).toMatchSnapshot();
    });

    it("should applies fullWidth classes", () => {
      const { container } = render(<TextArea defaultValue="TextArea" fullWidth />);

      expect(container).toMatchSnapshot();
    });
  });

  describe("Events", () => {
    it("should trigger `onChange` event when change value", () => {
      const handleChange = jest.fn();

      const { getByLabelText } = render(
        <TextArea aria-label="text-area" onChange={handleChange} />,
      );
      const textarea = getByLabelText("text-area");

      act(() => {
        fireEvent.change(textarea, { target: { value: "123" } });
        expect((textarea as HTMLInputElement).value).toBe("123");
      });

      expect(handleChange).toHaveBeenCalledTimes(1);
    });
  });
});
