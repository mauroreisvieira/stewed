import React from "react";
// UI Components
import { Progress } from "../../index";
// Utilities
import { render } from "@testing-library/react";

describe("Progress", () => {
  describe("Snapshots", () => {
    it("should renders default component", () => {
      const { container } = render(<Progress />);

      expect(container).toMatchSnapshot();
    });

    it("should renders value", () => {
      const { container } = render(<Progress value="50" />);

      expect(container).toMatchSnapshot();
    });

    it("should render steps", () => {
      const { container } = render(<Progress steps={10} />);

      expect(container).toMatchSnapshot();
    });

    it("should render additional classes", () => {
      const { container } = render(<Progress className="other-class" />);

      expect(container).toMatchSnapshot();
    });

    it("should applies critical skin", () => {
      const { container } = render(<Progress skin="critical" />);

      expect(container).toMatchSnapshot();
    });

    it("should applies correct size classes", () => {
      const { container } = render(<Progress size="md" />);

      expect(container).toMatchSnapshot();
    });

    it("should applies appearance classes", () => {
      const { container } = render(<Progress appearance="squared" />);

      expect(container).toMatchSnapshot();
    });
  });
});
