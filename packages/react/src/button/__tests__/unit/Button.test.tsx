import React from "react";
// UI Components
import { Button } from "../../index";
// Utilities
import { render } from "@testing-library/react";

describe("Button", () => {
  describe("Snapshots", () => {
    it("should renders default component", () => {
      const { asFragment } = render(<Button>Button</Button>);

      expect(asFragment()).toMatchSnapshot();
    });

    it("should renders component as anchor", () => {
      const { asFragment } = render(
        <Button as="a" href="#">
          Button
        </Button>,
      );

      expect(asFragment()).toMatchSnapshot();
    });

    it("should render additional classes", () => {
      const { asFragment } = render(<Button className="other-class">Button</Button>);

      expect(asFragment()).toMatchSnapshot();
    });

    it("should applies correct skin classes", () => {
      const { asFragment } = render(<Button skin="primary">Button</Button>);

      expect(asFragment()).toMatchSnapshot();
    });

    it("should applies correct appearance classes", () => {
      const { asFragment } = render(<Button appearance="filled">Button</Button>);

      expect(asFragment()).toMatchSnapshot();
    });

    it("should render left slot content", () => {
      const { asFragment } = render(<Button leftSlot="Left slot">Button</Button>);

      expect(asFragment()).toMatchSnapshot();
    });

    it("should render right slot content", () => {
      const { asFragment } = render(<Button rightSlot="Right slot">Button</Button>);

      expect(asFragment()).toMatchSnapshot();
    });

    it("should applies correct size classes", () => {
      const { asFragment } = render(<Button size="md">Button</Button>);

      expect(asFragment()).toMatchSnapshot();
    });

    it("renders spinner when loading", () => {
      const { asFragment } = render(<Button loading>Button</Button>);

      expect(asFragment()).toMatchSnapshot();
    });

    it("should applies disabled classes", () => {
      const { asFragment } = render(<Button disabled>Button</Button>);

      expect(asFragment()).toMatchSnapshot();
    });

    it("should applies icon-only classes", () => {
      const { asFragment } = render(
        <Button
          leftSlot={<i className="fas fa-star" />}
          rightSlot={<i className="fas fa-star" />}
          iconOnly
        >
          Button
        </Button>,
      );

      expect(asFragment()).toMatchSnapshot();
    });

    it("should applies fullWidth classes", () => {
      const { asFragment } = render(<Button fullWidth>Button</Button>);

      expect(asFragment()).toMatchSnapshot();
    });

    it("should applies pressed classes", () => {
      const { asFragment } = render(<Button pressed>Button</Button>);

      expect(asFragment()).toMatchSnapshot();
    });
  });
});
