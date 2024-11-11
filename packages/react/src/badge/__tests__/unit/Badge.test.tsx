import React from "react";
// UI Components
import { Badge } from "../../index";
// Utilities
import { render } from "@testing-library/react";

describe("Badge", () => {
  describe("Snapshots", () => {
    it("should renders default component", () => {
      const { container } = render(<Badge>Badge</Badge>);

      expect(container).toMatchSnapshot();
    });

    it("should renders value", () => {
      const { container } = render(<Badge value="1">Badge</Badge>);

      expect(container).toMatchSnapshot();
    });

    it("should render additional classes", () => {
      const { container } = render(<Badge className="other-class">Badge</Badge>);

      expect(container).toMatchSnapshot();
    });

    it("should applies appearance classes", () => {
      const { container } = render(<Badge appearance="outline">Badge</Badge>);

      expect(container).toMatchSnapshot();
    });

    it("should applies critical skin", () => {
      const { container } = render(<Badge skin="critical">Badge</Badge>);

      expect(container).toMatchSnapshot();
    });

    it("should applies correct position classes", () => {
      const { container } = render(<Badge position="bottom-right">Badge</Badge>);

      expect(container).toMatchSnapshot();
    });

    it("should applies correct size classes", () => {
      const { container } = render(<Badge size="md">Badge</Badge>);

      expect(container).toMatchSnapshot();
    });
  });
});
