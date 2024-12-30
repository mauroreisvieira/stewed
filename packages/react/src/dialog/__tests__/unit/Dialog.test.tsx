import React from "react";
// UI Components
import { Dialog } from "../../index";
// Utilities
import { render } from "@testing-library/react";

describe("Dialog", () => {
  describe("Snapshots", () => {
    it("should renders default component", () => {
      const { baseElement } = render(
        <Dialog open={true}>
          <Dialog.Header>Header</Dialog.Header>
          <Dialog.Body>Body</Dialog.Body>
          <Dialog.Footer>Footer</Dialog.Footer>
        </Dialog>
      );

      expect(baseElement.querySelector(".dialog")).toMatchSnapshot();
    });

    it("should renders close button component", () => {
      const { baseElement } = render(
        <Dialog onClose={vitest.fn()} open={true}>
          <Dialog.Header>Header</Dialog.Header>
          <Dialog.Body>Body</Dialog.Body>
        </Dialog>
      );

      expect(baseElement.querySelector(".dialog")).toMatchSnapshot();
    });

    it("should applies correct size classes", () => {
      const { baseElement } = render(
        <Dialog size="xl" open={true}>
          <Dialog.Header className="other-header-class">Header</Dialog.Header>
          <Dialog.Body className="other-body-class">Body</Dialog.Body>
          <Dialog.Footer className="other-footer-class">Footer</Dialog.Footer>
        </Dialog>
      );

      expect(baseElement.querySelector(".dialog")).toMatchSnapshot();
    });

    it("should render additional classes", () => {
      const { baseElement } = render(
        <Dialog className="other-class" open={true}>
          <Dialog.Header className="other-header-class">Header</Dialog.Header>
          <Dialog.Body className="other-body-class">Body</Dialog.Body>
          <Dialog.Footer className="other-footer-class">Footer</Dialog.Footer>
        </Dialog>
      );

      expect(baseElement.querySelector(".dialog")).toMatchSnapshot();
    });
  });
});
