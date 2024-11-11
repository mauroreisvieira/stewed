import React from "react";
// UI Components
import { Button, type ButtonProps } from "../../index";
// Utilities
import { render, act, fireEvent } from "@testing-library/react";

describe("Button", () => {
  describe("Snapshots", () => {
    it("should renders default component", () => {
      const { container } = render(<Button>Button</Button>);

      expect(container).toMatchSnapshot();
    });

    it("should renders component as anchor", () => {
      const { container } = render(
        <Button as="a" href="#">
          Button
        </Button>,
      );

      expect(container).toMatchSnapshot();
    });

    it("should render additional classes", () => {
      const { container } = render(<Button className="other-class">Button</Button>);

      expect(container).toMatchSnapshot();
    });

    it.each<ButtonProps["skin"]>(["primary", "secondary", "neutral", "critical", "success"])(
      "should apply '%s' skin classes",
      (skin) => {
        const { container } = render(<Button skin={skin}>Button</Button>);

        expect(container).toMatchSnapshot();
      },
    );

    it.each<ButtonProps["appearance"]>(["filled", "ghost", "outline"])(
      "should apply '%s' appearance classes",
      (appearance) => {
        const { container } = render(<Button appearance={appearance}>Button</Button>);

        expect(container).toMatchSnapshot();
      },
    );

    it.each<ButtonProps["size"]>(["xs", "sm", "md", "lg", "xl"])(
      "should apply '%s' size classes",
      (size) => {
        const { container } = render(<Button size={size}>Button</Button>);

        expect(container).toMatchSnapshot();
      },
    );

    it("should render left slot content", () => {
      const { container } = render(<Button leftSlot="Left slot">Button</Button>);

      expect(container).toMatchSnapshot();
    });

    it("should render right slot content", () => {
      const { container } = render(<Button rightSlot="Right slot">Button</Button>);

      expect(container).toMatchSnapshot();
    });

    it("renders spinner when loading", () => {
      const { container } = render(<Button loading>Button</Button>);

      expect(container).toMatchSnapshot();
    });

    it("should applies disabled classes", () => {
      const { container } = render(<Button disabled>Button</Button>);

      expect(container).toMatchSnapshot();
    });

    it("should applies icon-only classes", () => {
      const { container } = render(
        <Button
          leftSlot={<i className="fas fa-star" />}
          rightSlot={<i className="fas fa-star" />}
          iconOnly
        >
          Button
        </Button>,
      );

      expect(container).toMatchSnapshot();
    });

    it("should applies fullWidth classes", () => {
      const { container } = render(<Button fullWidth>Button</Button>);

      expect(container).toMatchSnapshot();
    });

    it("should applies pressed classes", () => {
      const { container } = render(<Button pressed>Button</Button>);

      expect(container).toMatchSnapshot();
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
