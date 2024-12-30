import React from "react";
// UI Components
import { AspectRatio } from "../../index";
// Utilities
import { render } from "@testing-library/react";

describe("Aspect Ratio", () => {
  describe("Snapshots", () => {
    it("should renders default component", () => {
      const { container } = render(
        <AspectRatio>
          <div />
        </AspectRatio>
      );

      expect(container).toMatchSnapshot();
    });

    it("should render additional classes", () => {
      const { container } = render(
        <AspectRatio className="other-class">
          <div />
        </AspectRatio>
      );

      expect(container).toMatchSnapshot();
    });

    it("should render ratio classes", () => {
      const { container } = render(
        <AspectRatio ratio="16:9">
          <div />
        </AspectRatio>
      );

      expect(container).toMatchSnapshot();
    });

    it("should render radius classes", () => {
      const { container } = render(
        <AspectRatio radius="2xl">
          <div />
        </AspectRatio>
      );

      expect(container).toMatchSnapshot();
    });
  });
});
