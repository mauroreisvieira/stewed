import React from "react";
// UI Components
import { Button, type ButtonProps } from "../../index";
// Utilities
import { render, act, fireEvent } from "@testing-library/react";

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

    it.each<ButtonProps["skin"]>(["primary", "secondary", "neutral", "critical", "success"])(
      "should apply '%s' skin classes",
      (skin) => {
        const { asFragment } = render(<Button skin={skin}>Button</Button>);

        expect(asFragment()).toMatchSnapshot();
      },
    );

    it.each<ButtonProps["appearance"]>(["filled", "ghost", "outline"])(
      "should apply '%s' appearance classes",
      (appearance) => {
        const { asFragment } = render(<Button appearance={appearance}>Button</Button>);

        expect(asFragment()).toMatchSnapshot();
      },
    );

    it.each<ButtonProps["size"]>(["xs", "sm", "md", "lg", "xl"])(
      "should apply '%s' size classes",
      (size) => {
        const { asFragment } = render(<Button size={size}>Button</Button>);

        expect(asFragment()).toMatchSnapshot();
      },
    );

    it("should render left slot content", () => {
      const { asFragment } = render(<Button leftSlot="Left slot">Button</Button>);

      expect(asFragment()).toMatchSnapshot();
    });

    it("should render right slot content", () => {
      const { asFragment } = render(<Button rightSlot="Right slot">Button</Button>);

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

  describe("Events", () => {
    it("should trigger `onClick` event when clicked", async () => {
      const handleClick = jest.fn();

      const { findByText } = render(<Button onClick={handleClick}>Button</Button>);
      const btn = await findByText("Button");

      act(() => {
        fireEvent.click(btn);
      });

      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });
});
