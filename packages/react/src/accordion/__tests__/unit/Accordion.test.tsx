import React from "react";
// UI Components
import { Accordion } from "../../index";
// Utilities
import { fireEvent, render, act } from "@testing-library/react";

describe("Accordion", () => {
  describe("Snapshots", () => {
    it("should renders default component", () => {
      const { container } = render(
        <Accordion>
          <Accordion.Item value="1">
            <Accordion.Header>Header</Accordion.Header>
            <Accordion.Body>Body</Accordion.Body>
          </Accordion.Item>
        </Accordion>
      );

      expect(container).toMatchSnapshot();
    });

    it("should render additional classes", () => {
      const { container } = render(
        <Accordion className="other-class">
          <Accordion.Item value="1" className="other-item-class">
            <Accordion.Header className="other-header-class">Header</Accordion.Header>
            <Accordion.Body className="other-body-class">Body</Accordion.Body>
          </Accordion.Item>
        </Accordion>
      );

      expect(container).toMatchSnapshot();
    });

    it("should render left slot content", () => {
      const { container } = render(
        <Accordion>
          <Accordion.Item value="1">
            <Accordion.Header leftSlot="Left slot">Header</Accordion.Header>
            <Accordion.Body>Body</Accordion.Body>
          </Accordion.Item>
        </Accordion>
      );

      expect(container).toMatchSnapshot();
    });

    it("should render right slot content", () => {
      const { container } = render(
        <Accordion>
          <Accordion.Item value="1">
            <Accordion.Header rightSlot="Right slot">Header</Accordion.Header>
            <Accordion.Body>Body</Accordion.Body>
          </Accordion.Item>
        </Accordion>
      );

      expect(container).toMatchSnapshot();
    });
  });

  describe("Events", () => {
    it("should trigger onClick event when header is clicked", async () => {
      const handleClick = vitest.fn();

      const { findByText } = render(
        <Accordion>
          <Accordion.Item value="1">
            <Accordion.Header onClick={handleClick}>Header</Accordion.Header>
            <Accordion.Body>Body</Accordion.Body>
          </Accordion.Item>
        </Accordion>
      );

      const headerElement = await findByText("Header");

      act(() => {
        fireEvent.click(headerElement);
      });

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("should trigger onKeyDown event when key is pressed on header", async () => {
      const handleKeyDown = vi.fn();

      const { findByText } = render(
        <Accordion>
          <Accordion.Item value="1">
            <Accordion.Header onKeyDown={handleKeyDown}>Header</Accordion.Header>
            <Accordion.Body>Body</Accordion.Body>
          </Accordion.Item>
        </Accordion>
      );

      const headerElement = await findByText("Header");

      act(() => {
        fireEvent.keyDown(headerElement);
      });

      expect(handleKeyDown).toHaveBeenCalledTimes(1);
    });
  });
});
