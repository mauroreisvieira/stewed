import React from "react";
// UI Components
import { Text } from "../../index";
// Utilities
import { render } from "@testing-library/react";

describe("Text", () => {
  describe("Snapshots", () => {
    it("should renders default component", () => {
      const { asFragment } = render(<Text>Text</Text>);

      expect(asFragment()).toMatchSnapshot();
    });

    it("should renders component as anchor", () => {
      const { asFragment } = render(
        <Text as="a" href="#">
          Text
        </Text>,
      );

      expect(asFragment()).toMatchSnapshot();
    });

    it("should renders component as heading", () => {
      const { asFragment } = render(<Text as="h1">Text</Text>);

      expect(asFragment()).toMatchSnapshot();
    });

    it("should render additional classes", () => {
      const { asFragment } = render(<Text className="other-class">Text</Text>);

      expect(asFragment()).toMatchSnapshot();
    });

    it("should applies correct skin classes", () => {
      const { asFragment } = render(<Text skin="primary">Text</Text>);

      expect(asFragment()).toMatchSnapshot();
    });

    it("should applies correct variation classes", () => {
      const { asFragment } = render(<Text variation={["italic", "uppercase"]}>Text</Text>);

      expect(asFragment()).toMatchSnapshot();
    });

    it("should applies correct white space classes", () => {
      const { asFragment } = render(<Text whiteSpace={"nowrap"}>Text</Text>);

      expect(asFragment()).toMatchSnapshot();
    });

    it("should applies correct line clamp classes", () => {
      const { asFragment } = render(<Text lineClamp={2}>Text</Text>);

      expect(asFragment()).toMatchSnapshot();
    });

    it("should applies correct space classes", () => {
      const { asFragment } = render(<Text space={{ x: "md", y: "xl" }}>Text</Text>);

      expect(asFragment()).toMatchSnapshot();
    });

    it("should applies correct weight classes", () => {
      const { asFragment } = render(<Text weight="extra-bold">Text</Text>);

      expect(asFragment()).toMatchSnapshot();
    });

    it("should applies correct size classes", () => {
      const { asFragment } = render(<Text size="md">Text</Text>);

      expect(asFragment()).toMatchSnapshot();
    });

    it("should applies correct alignment classes", () => {
      const { asFragment } = render(<Text alignment="center">Text</Text>);

      expect(asFragment()).toMatchSnapshot();
    });

    it("should applies correct font family classes", () => {
      const { asFragment } = render(<Text family="mono">Text</Text>);

      expect(asFragment()).toMatchSnapshot();
    });

    it("should applies correct hidden classes", () => {
      const { asFragment } = render(<Text hidden>Text</Text>);

      expect(asFragment()).toMatchSnapshot();
    });
  });
});
