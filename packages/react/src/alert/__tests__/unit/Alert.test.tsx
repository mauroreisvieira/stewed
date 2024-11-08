import React from "react";
// UI Components
import { Alert } from "../../index";
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

    it("should render shadow classes", () => {
      const { container } = render(<Alert shadow="3xl">Alert</Alert>);

      expect(container).toMatchSnapshot();
    });

    it("should applies critical skin", () => {
      const { container } = render(<Alert skin="critical">Alert</Alert>);

      expect(container).toMatchSnapshot();
    });

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
