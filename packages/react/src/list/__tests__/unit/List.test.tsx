import React from "react";
// UI Components
import { List, type ListProps } from "../../index";
// Utilities
import { render } from "@testing-library/react";

describe("List", () => {
  describe("Snapshots", () => {
    it("should renders default component", () => {
      const { container } = render(
        <List>
          <List.Item>Item</List.Item>
        </List>
      );

      expect(container).toMatchSnapshot();
    });

    it.each<ListProps["type"]>([
      "bullet",
      "decimal",
      "none"
    ])("should apply '%s' skin classes", (type) => {
      const { container } = render(
        <List type={type}>
          <List.Item>Item</List.Item>
        </List>
      );

      expect(container).toMatchSnapshot();
    });

    it("should render additional classes", () => {
      const { container } = render(
        <List className="other-class">
          <List.Item className="other-class">Item</List.Item>
        </List>
      );

      expect(container).toMatchSnapshot();
    });
  });
});
