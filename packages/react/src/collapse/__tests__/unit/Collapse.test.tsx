import React from "react";
// UI Components
import { Collapse } from "../../index";
// Utilities
import { render, fireEvent, waitFor } from "@testing-library/react";

describe("Collapse", () => {
  describe("Snapshots", () => {
    it("renders children properly", () => {
      const { container } = render(
        <Collapse isOpened={false}>
          <div>Test Content</div>
        </Collapse>
      );
      expect(container).toMatchSnapshot();
    });

    it("expands when isOpened is true", async () => {
      const { container } = render(
        <Collapse isOpened>
          <div>Test Content</div>
        </Collapse>
      );

      expect(container).toMatchSnapshot();
    });

    it("renders additional properties", () => {
      const { container } = render(
        <Collapse className="test-class" testId="test-id" isOpened>
          <div>Test Content</div>
        </Collapse>
      );
      expect(container).toMatchSnapshot();
    });
  });

  describe("Behavior", () => {
    it("updates inline styles on collapse/expand", async () => {
      const { container, rerender } = render(
        <Collapse isOpened={false}>
          <div>Test Content</div>
        </Collapse>
      );

      const collapseElement = container.firstChild as HTMLElement;

      // Initial state: height should be 0 when collapsed.
      expect(collapseElement.style.height).toBe("0px");

      // Re-render with the component expanded
      rerender(
        <Collapse isOpened>
          <div>Test Content</div>
        </Collapse>
      );

      // After expansion, the height should be set to `auto`
      expect(collapseElement.style.height).toBe("0px"); // It still stays at 0 until transition starts.

      // Simulate the transition end event
      fireEvent.transitionEnd(collapseElement);

      // Ensure that the height has transitioned to auto after the collapse transition is complete
      // The height will no longer be "0px" after transition ends.
      expect(collapseElement.style.height).toBe("");
    });
  });

  describe("Events", () => {
    it("calls onExpand when expanding", () => {
      const onExpandMock = jest.fn();
      const { rerender } = render(
        <Collapse isOpened={false} onExpand={onExpandMock}>
          <div>Test Content</div>
        </Collapse>
      );

      rerender(
        <Collapse isOpened onExpand={onExpandMock}>
          <div>Test Content</div>
        </Collapse>
      );

      expect(onExpandMock).toHaveBeenCalled();
    });

    it("calls onCollapse when collapsing", () => {
      const onCollapseMock = jest.fn();
      const { rerender } = render(
        <Collapse isOpened onCollapse={onCollapseMock}>
          <div>Test Content</div>
        </Collapse>
      );

      rerender(
        <Collapse isOpened={false} onCollapse={onCollapseMock}>
          <div>Test Content</div>
        </Collapse>
      );

      expect(onCollapseMock).toHaveBeenCalled();
    });

    it("calls onExpandEnd when expansion finishes", async () => {
      const onExpandEndMock = jest.fn();

      const { rerender, container } = render(
        <Collapse isOpened={false} onExpandEnd={onExpandEndMock}>
          <div>Test Content</div>
        </Collapse>
      );

      // Rerender to open the collapse
      rerender(
        <Collapse isOpened onExpandEnd={onExpandEndMock}>
          <div>Test Content</div>
        </Collapse>
      );

      // Trigger transition end event (mimicking the expansion finishing)
      const collapseElement = container.firstChild as HTMLElement;
      fireEvent.transitionEnd(collapseElement);

      // Wait for the onExpandEnd callback to be called
      await waitFor(() => expect(onExpandEndMock).toHaveBeenCalled());
    });

    it("calls onCollapseEnd when collapse finishes", async () => {
      const onCollapseEndMock = jest.fn();

      const { rerender, container } = render(
        <Collapse isOpened onCollapseEnd={onCollapseEndMock}>
          <div>Test Content</div>
        </Collapse>
      );

      // Re-render to collapse the content
      rerender(
        <Collapse isOpened={false} onCollapseEnd={onCollapseEndMock}>
          <div>Test Content</div>
        </Collapse>
      );

      // Trigger transition end event (mimicking the collapse finishing)
      const collapseElement = container.firstChild as HTMLElement;
      fireEvent.transitionEnd(collapseElement);

      // Wait for the onCollapseEnd callback to be called
      await waitFor(() => expect(onCollapseEndMock).toHaveBeenCalled());
    });
  });
});
