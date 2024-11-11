import React from "react";
// UI Components
import { Tag } from "../../index";
// Utilities
import { render } from "@testing-library/react";

describe("Tag", () => {
  describe("Snapshots", () => {
    it("should renders default component", () => {
      const { container } = render(<Tag>Tag</Tag>);

      expect(container).toMatchSnapshot();
    });

    it("should renders component as anchor", () => {
      const { asFragment } = render(
        <Tag as="a" href="#">
          Tag
        </Tag>,
      );

      expect(asFragment()).toMatchSnapshot();
    });

    it("should render additional classes", () => {
      const { container } = render(<Tag className="other-class">Tag</Tag>);

      expect(container).toMatchSnapshot();
    });

    it("should applies appearance classes", () => {
      const { container } = render(<Tag appearance="outline">Tag</Tag>);

      expect(container).toMatchSnapshot();
    });

    it("should applies critical skin", () => {
      const { container } = render(<Tag skin="critical">Tag</Tag>);

      expect(container).toMatchSnapshot();
    });

    it("should applies correct size classes", () => {
      const { container } = render(<Tag size="md">Tag</Tag>);

      expect(container).toMatchSnapshot();
    });

    it("should render left slot content", () => {
      const { container } = render(<Tag leftSlot="Left slot">Tag</Tag>);

      expect(container).toMatchSnapshot();
    });

    it("should render right slot content", () => {
      const { container } = render(<Tag rightSlot="Right slot">Tag</Tag>);

      expect(container).toMatchSnapshot();
    });
  });
});
