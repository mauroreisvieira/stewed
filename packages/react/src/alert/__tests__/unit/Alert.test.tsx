import React from "react";
// UI Components
import { Alert, type AlertProps } from "../../index";
// Utilities
import { render } from "@testing-library/react";

describe("Alert", () => {
  describe("Snapshots", () => {
    it("should renders default component", () => {
      const { container } = render(<Alert>Alert</Alert>);

      expect(container).toMatchSnapshot();
    });

    it("should renders title", () => {
      const { container } = render(<Alert title="Title">Alert</Alert>);

      expect(container).toMatchSnapshot();
    });

    it("should render additional classes", () => {
      const { container } = render(<Alert className="other-class">Alert</Alert>);

      expect(container).toMatchSnapshot();
    });

    it.each<AlertProps["shadow"]>(["none", "sm", "md", "lg", "xl", "2xl", "3xl"])(
      "should apply '%s' shadow classes",
      (shadow) => {
        const { container } = render(<Alert shadow={shadow}>Alert</Alert>);

        expect(container).toMatchSnapshot();
      },
    );

    it.each<AlertProps["skin"]>(["primary", "secondary", "neutral", "critical", "success"])(
      "should apply '%s' skin classes",
      (skin) => {
        const { container } = render(<Alert skin={skin}>Alert</Alert>);

        expect(container).toMatchSnapshot();
      },
    );

    it("should render left slot content", () => {
      const { container } = render(<Alert leftSlot="Left slot">Alert</Alert>);

      expect(container).toMatchSnapshot();
    });

    it("should render right slot content", () => {
      const { container } = render(<Alert rightSlot="Right slot">Alert</Alert>);

      expect(container).toMatchSnapshot();
    });

    it("should applies correct size classes", () => {
      const { container } = render(<Alert size="md">Alert</Alert>);

      expect(container).toMatchSnapshot();
    });
  });
});
