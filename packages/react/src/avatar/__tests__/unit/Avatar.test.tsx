import React from "react";
// UI Components
import { Avatar, type AvatarProps } from "../../index";
// Utilities
import { fireEvent, act, render } from "@testing-library/react";

describe("Avatar", () => {
  describe("Snapshots", () => {
    it("should renders default component", () => {
      const { container } = render(<Avatar name="Emma Clark" />);

      expect(container).toMatchSnapshot();
    });

    it("should renders component as anchor", () => {
      const { container } = render(<Avatar as="a" href="#" name="Emma Clark" />);

      expect(container).toMatchSnapshot();
    });

    it("should render image", async () => {
      const img = {
        src: "path/to/image.jpg",
        alt: "Image",
      };

      const { container } = render(<Avatar name="Emma Clark" image={{ src: img.src }} />);

      expect(container).toMatchSnapshot();
    });

    it("should render additional classes", () => {
      const { container } = render(<Avatar className="other-class" name="Emma Clark" />);

      expect(container).toMatchSnapshot();
    });

    it.each<AvatarProps["skin"]>(["primary", "secondary", "neutral", "critical", "success"])(
      "should apply '%s' skin classes",
      (skin) => {
        const { container } = render(<Avatar name="Emma Clark" skin={skin} />);

        expect(container).toMatchSnapshot();
      },
    );

    it.each<AvatarProps["shape"]>(["circle", "square"])(
      "should apply '%s' shape classes",
      (shape) => {
        const { container } = render(<Avatar name="Emma Clark" shape={shape} />);

        expect(container).toMatchSnapshot();
      },
    );

    it.each<AvatarProps["appearance"]>(["filled", "outline"])(
      "should apply '%s' appearance classes",
      (appearance) => {
        const { container } = render(<Avatar name="Emma Clark" appearance={appearance} />);

        expect(container).toMatchSnapshot();
      },
    );

    it.each<AvatarProps["size"]>(["xs", "sm", "md", "lg", "xl"])(
      "should apply '%s' size classes",
      (size) => {
        const { container } = render(<Avatar name="Emma Clark" size={size} />);

        expect(container).toMatchSnapshot();
      },
    );
  });

  describe("Events", () => {
    it("should trigger `onClick` event when clicked", async () => {
      const handleClick = jest.fn();

      const { findByText } = render(<Avatar name="Emma Clark" onClick={handleClick} />);
      const btn = await findByText("EC");

      act(() => {
        fireEvent.click(btn);
      });

      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });
});
