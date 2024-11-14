import React from "react";
// UI Components
import { Separator, type SeparatorProps } from "../../index";
// Utilities
import { render } from "@testing-library/react";

describe("Separator", () => {
  describe("Snapshots", () => {
    it("should renders default component", () => {
      const { container } = render(<Separator />);

      expect(container).toMatchSnapshot();
    });

    it("should render additional classes", () => {
      const { container } = render(<Separator className="other-class" />);

      expect(container).toMatchSnapshot();
    });

    it("should orientation classes", () => {
      const { container } = render(<Separator orientation="vertical" />);

      expect(container).toMatchSnapshot();
    });

    it("should space classes", () => {
      const { container } = render(<Separator space={{ block: "lg", inline: "5xl" }} />);

      expect(container).toMatchSnapshot();
    });

    it.each<SeparatorProps["skin"]>([
      "primary",
      "primary-faded",
      "secondary",
      "secondary-faded",
      "neutral",
      "neutral-faded",
      "critical",
      "critical-faded",
      "success",
      "success-faded",
      "info",
      "info-faded",
      "warning",
      "warning-faded",
      "white",
      "black",
    ])("should apply '%s' skin classes", (skin) => {
      const { container } = render(<Separator skin={skin} />);

      expect(container).toMatchSnapshot();
    });
  });
});
