import React from "react";
// UI Components
import { Avatar } from "../../index";
// Utilities
import { render } from "@testing-library/react";

describe("Avatar", () => {
  describe("Snapshots", () => {
    it("should renders default component", () => {
      const { asFragment } = render(<Avatar name="Emma Clark" />);

      expect(asFragment()).toMatchSnapshot();
    });

    it("should renders component as anchor", () => {
      const { asFragment } = render(<Avatar as="a" href="#" name="Emma Clark" />);

      expect(asFragment()).toMatchSnapshot();
    });

    it("should render image", async () => {
      const img = {
        src: "path/to/image.jpg",
        alt: "Image",
      };

      const { asFragment } = render(<Avatar name="Emma Clark" image={{ src: img.src }} />);

      expect(asFragment()).toMatchSnapshot();
    });

    it("should render additional classes", () => {
      const { asFragment } = render(<Avatar className="other-class" name="Emma Clark" />);

      expect(asFragment()).toMatchSnapshot();
    });

    it("should applies correct skin classes", () => {
      const { asFragment } = render(<Avatar skin="primary" name="Emma Clark" />);

      expect(asFragment()).toMatchSnapshot();
    });

    it("should applies correct size classes", () => {
      const { asFragment } = render(<Avatar size="lg" name="Emma Clark" />);

      expect(asFragment()).toMatchSnapshot();
    });

    it("should applies square appearance classes", () => {
      const { asFragment } = render(<Avatar appearance="square" name="Emma Clark" />);

      expect(asFragment()).toMatchSnapshot();
    });
  });
});
