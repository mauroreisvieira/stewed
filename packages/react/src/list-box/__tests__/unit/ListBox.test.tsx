import React from "react";
// UI Components
import { ListBox } from "../../index";
// Utilities
import { fireEvent, render, act } from "@testing-library/react";

describe("ListBox", () => {
  describe("Snapshots", () => {
    it("should renders default component", () => {
      const { container } = render(
        <ListBox>
          <ListBox.Item>Item</ListBox.Item>
        </ListBox>,
      );

      expect(container).toMatchSnapshot();
    });

    it("should renders group component", () => {
      const { container } = render(
        <ListBox>
          <ListBox.Group title="Group">
            <ListBox.Item>Item</ListBox.Item>
          </ListBox.Group>
        </ListBox>,
      );

      expect(container).toMatchSnapshot();
    });

    it("should render additional classes", () => {
      const { container } = render(
        <ListBox className="other-class">
          <ListBox.Group className="other-group-class">
            <ListBox.Item className="other-item-class">Item</ListBox.Item>
          </ListBox.Group>
        </ListBox>,
      );

      expect(container).toMatchSnapshot();
    });

    it("should render left slot content", () => {
      const { container } = render(
        <ListBox>
          <ListBox.Item leftSlot="Left slot">Item</ListBox.Item>
        </ListBox>,
      );

      expect(container).toMatchSnapshot();
    });

    it("should render right slot content", () => {
      const { container } = render(
        <ListBox>
          <ListBox.Item rightSlot="Right slot">Item</ListBox.Item>
        </ListBox>,
      );

      expect(container).toMatchSnapshot();
    });
  });

  describe("Events", () => {
    it("should trigger onClick event when is clicked", async () => {
      const handleClick = jest.fn();

      const { findByText } = render(
        <ListBox>
          <ListBox.Item onClick={handleClick}>Item</ListBox.Item>
        </ListBox>,
      );

      const item = await findByText("Item");

      act(() => {
        fireEvent.click(item);
      });

      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });
});
