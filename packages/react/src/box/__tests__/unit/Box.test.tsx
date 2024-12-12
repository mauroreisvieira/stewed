import React from "react";
// UI Components
import { Box, type BoxProps } from "../../index";
// Utilities
import { render } from "@testing-library/react";

describe("Box", () => {
  describe("Snapshots", () => {
    it("should renders default component", () => {
      const { container } = render(<Box>Box</Box>);

      expect(container).toMatchSnapshot();
    });

    it("should renders component as main", () => {
      const { container } = render(<Box as="main">Box</Box>);

      expect(container).toMatchSnapshot();
    });

    it("should render additional classes", () => {
      const { container } = render(<Box className="other-class">Box</Box>);

      expect(container).toMatchSnapshot();
    });

    it.each<BoxProps["skin"]>([
      "default",
      "primary-faded",
      "secondary-faded",
      "neutral-faded",
      "white"
    ])("should apply '%s' skin classes", (skin) => {
      const { container } = render(<Box skin={skin}>Box</Box>);

      expect(container).toMatchSnapshot();
    });

    it("should applies radius classes", () => {
      const { container } = render(<Box radius="2xl">Box</Box>);

      expect(container).toMatchSnapshot();
    });

    it("should applies border-style classes", () => {
      const { container } = render(<Box borderStyle="dashed">Box</Box>);

      expect(container).toMatchSnapshot();
    });

    it("should applies border-width classes", () => {
      const { container } = render(<Box borderWidth={2}>Box</Box>);

      expect(container).toMatchSnapshot();
    });

    it("should applies border-color classes", () => {
      const { container } = render(<Box borderColor="secondary">Box</Box>);

      expect(container).toMatchSnapshot();
    });

    it("should applies full-width classes", () => {
      const { container } = render(<Box fullWidth>Box</Box>);

      expect(container).toMatchSnapshot();
    });

    it("should applies full-screen classes", () => {
      const { container } = render(<Box fullScreen>Box</Box>);

      expect(container).toMatchSnapshot();
    });
  });
});
