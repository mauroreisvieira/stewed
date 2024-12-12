import React from "react";
// UI Components
import { Drawer } from "../../index";
// Utilities
import { render } from "@testing-library/react";

describe("Drawer", () => {
  describe("Snapshots", () => {
    it("should renders default component", () => {
      const { baseElement } = render(
        <Drawer open={true}>
          <Drawer.Header>Header</Drawer.Header>
          <Drawer.Body>Body</Drawer.Body>
          <Drawer.Footer>Footer</Drawer.Footer>
        </Drawer>
      );

      expect(baseElement.querySelector(".drawer")).toMatchSnapshot();
    });

    it("should renders close button component", () => {
      const { baseElement } = render(
        <Drawer onClose={jest.fn()} open={true}>
          <Drawer.Header>Header</Drawer.Header>
          <Drawer.Body>Body</Drawer.Body>
        </Drawer>
      );

      expect(baseElement.querySelector(".drawer")).toMatchSnapshot();
    });

    it("should applies correct size classes", () => {
      const { baseElement } = render(
        <Drawer size="sm" open={true}>
          <Drawer.Header className="other-header-class">Header</Drawer.Header>
          <Drawer.Body className="other-body-class">Body</Drawer.Body>
          <Drawer.Footer className="other-footer-class">Footer</Drawer.Footer>
        </Drawer>
      );

      expect(baseElement.querySelector(".drawer")).toMatchSnapshot();
    });

    it("should applies correct placement classes", () => {
      const { baseElement } = render(
        <Drawer placement="bottom" open={true}>
          <Drawer.Header className="other-header-class">Header</Drawer.Header>
          <Drawer.Body className="other-body-class">Body</Drawer.Body>
          <Drawer.Footer className="other-footer-class">Footer</Drawer.Footer>
        </Drawer>
      );

      expect(baseElement.querySelector(".drawer")).toMatchSnapshot();
    });

    it("should render additional classes", () => {
      const { baseElement } = render(
        <Drawer className="other-class" open={true}>
          <Drawer.Header className="other-header-class">Header</Drawer.Header>
          <Drawer.Body className="other-body-class">Body</Drawer.Body>
          <Drawer.Footer className="other-footer-class">Footer</Drawer.Footer>
        </Drawer>
      );

      expect(baseElement.querySelector(".drawer")).toMatchSnapshot();
    });
  });
});
