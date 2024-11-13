import React from "react";
// UI Components
import { Tag, type TagProps } from "../../index";
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

    it.each<TagProps["skin"]>(["primary", "secondary", "neutral", "critical", "success"])(
      "should apply '%s' skin classes",
      (skin) => {
        const { container } = render(<Tag skin={skin}>Tag</Tag>);

        expect(container).toMatchSnapshot();
      },
    );

    it.each<TagProps["appearance"]>(["filled", "ghost", "outline", "soft"])(
      "should apply '%s' appearance classes",
      (appearance) => {
        const { container } = render(<Tag appearance={appearance}>Tag</Tag>);

        expect(container).toMatchSnapshot();
      },
    );

    it.each<TagProps["size"]>(["xs", "sm", "md", "lg"])(
      "should apply '%s' size classes",
      (size) => {
        const { container } = render(<Tag size={size}>Tag</Tag>);

        expect(container).toMatchSnapshot();
      },
    );

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
