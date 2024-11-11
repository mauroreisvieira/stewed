import React from "react";
// UI Components
import { Text } from "../../index";
// Utilities
import { render } from "@testing-library/react";

describe("Text", () => {
  describe("Snapshots", () => {
    it("should renders default component", () => {
      const { container } = render(<Text>Text</Text>);

      expect(container).toMatchSnapshot();
    });

    it("should renders component as anchor", () => {
      const { container } = render(
        <Text as="a" href="#">
          Text
        </Text>,
      );

      expect(container).toMatchSnapshot();
    });

    it("should renders component as heading", () => {
      const { container } = render(<Text as="h1">Text</Text>);

      expect(container).toMatchSnapshot();
    });

    it("should render additional classes", () => {
      const { container } = render(<Text className="other-class">Text</Text>);

      expect(container).toMatchSnapshot();
    });

    it("should applies correct skin classes", () => {
      const { container } = render(<Text skin="primary">Text</Text>);

      expect(container).toMatchSnapshot();
    });

    it("should applies correct variation classes", () => {
      const { container } = render(<Text variation={["italic", "uppercase"]}>Text</Text>);

      expect(container).toMatchSnapshot();
    });

    it("should applies correct white space classes", () => {
      const { container } = render(<Text whiteSpace={"nowrap"}>Text</Text>);

      expect(container).toMatchSnapshot();
    });

    it("should applies correct line clamp classes", () => {
      const { container } = render(<Text lineClamp={2}>Text</Text>);

      expect(container).toMatchSnapshot();
    });

    it("should applies correct space classes", () => {
      const { container } = render(<Text space={{ x: "md", y: "xl" }}>Text</Text>);

      expect(container).toMatchSnapshot();
    });

    it("should applies correct weight classes", () => {
      const { container } = render(<Text weight="extra-bold">Text</Text>);

      expect(container).toMatchSnapshot();
    });

    it("should applies correct size classes", () => {
      const { container } = render(<Text size="md">Text</Text>);

      expect(container).toMatchSnapshot();
    });

    it("should applies correct alignment classes", () => {
      const { container } = render(<Text alignment="center">Text</Text>);

      expect(container).toMatchSnapshot();
    });

    it("should applies correct font family classes", () => {
      const { container } = render(<Text family="mono">Text</Text>);

      expect(container).toMatchSnapshot();
    });

    it("should applies correct hidden classes", () => {
      const { container } = render(<Text hidden>Text</Text>);

      expect(container).toMatchSnapshot();
    });
  });
});
