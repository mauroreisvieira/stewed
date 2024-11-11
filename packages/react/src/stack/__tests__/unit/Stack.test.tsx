import React from "react";
// UI Components
import { Stack } from "../../index";
// Utilities
import { render } from "@testing-library/react";

describe("Stack", () => {
  describe("Snapshots", () => {
    it("should renders default component", () => {
      const { container } = render(<Stack>Stack</Stack>);

      expect(container).toMatchSnapshot();
    });

    it("should renders component as main", () => {
      const { container } = render(<Stack as="main">Stack</Stack>);

      expect(container).toMatchSnapshot();
    });

    it("should render additional classes", () => {
      const { container } = render(<Stack className="other-class">Stack</Stack>);

      expect(container).toMatchSnapshot();
    });

    it("should render direction classes", () => {
      const { container } = render(<Stack direction="column-reverse">Stack</Stack>);

      expect(container).toMatchSnapshot();
    });

    it("should render size classes", () => {
      const { container } = render(<Stack size={4}>Stack</Stack>);

      expect(container).toMatchSnapshot();
    });

    it("should render gap classes", () => {
      const { container } = render(<Stack gap="2xl">Stack</Stack>);

      expect(container).toMatchSnapshot();
    });

    it("should render justify classes", () => {
      const { container } = render(<Stack justify="around">Stack</Stack>);

      expect(container).toMatchSnapshot();
    });

    it("should render items classes", () => {
      const { container } = render(<Stack items="baseline">Stack</Stack>);

      expect(container).toMatchSnapshot();
    });
  });
});
