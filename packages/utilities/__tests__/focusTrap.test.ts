import { FocusTrap } from "../index";
// Utilities
import { fireEvent } from "@testing-library/react";

// Mock DOM setup
document.body.innerHTML = `
  <div id="root">
    <button id="first-btn">First Button</button>
    <button id="last-btn">Last Button</button>
  </div>
`;

describe("FocusTrap", () => {
  let rootElement: HTMLElement;
  let focusTrap: FocusTrap;

  beforeEach(() => {
    rootElement = document.getElementById("root") as HTMLElement;
    focusTrap = new FocusTrap(rootElement);
  });

  afterEach(() => {
    focusTrap.removeFocusTrap();
    // Reset any added properties on the window
    window.FocusTrapInstances = [];
  });

  it("activates focus trapping when addFocusTrap is called", () => {
    focusTrap.addFocusTrap();
    expect(focusTrap.isActive).toBe(true);
    expect(focusTrap.instanceInStack).toBe(true);
  });

  it("focuses on the first focusable element when activated", () => {
    focusTrap.addFocusTrap();
    expect(document.activeElement).toBe(document.getElementById("first-btn"));
  });

  it("creates a focus loop when tabbing forward", () => {
    focusTrap.addFocusTrap();
    const lastButton = document.getElementById("last-btn") as HTMLElement;
    const firstButton = document.getElementById("first-btn") as HTMLElement;

    // Focus on the last button
    lastButton.focus();
    expect(document.activeElement).toBe(lastButton);

    // Simulate pressing Tab
    fireEvent.keyDown(lastButton, { key: "Tab" });
    expect(document.activeElement).toBe(firstButton);
  });

  it("creates a focus loop when tabbing backward", () => {
    focusTrap.addFocusTrap();
    const lastButton = document.getElementById("last-btn") as HTMLElement;
    const firstButton = document.getElementById("first-btn") as HTMLElement;

    // Focus the first button and simulate pressing Shift+Tab
    firstButton.focus();
    expect(document.activeElement).toBe(firstButton); // Initial focus is on firstButton

    // Simulate Shift+Tab key event using fireEvent
    fireEvent.keyDown(firstButton, { key: "Tab", shiftKey: true });
    expect(document.activeElement).toBe(lastButton); // Focus should loop back to lastButton
  });

  it("removes focus trapping and restores focus on the initial element", () => {
    // Set initial focus on the last button
    const lastButton = document.getElementById("last-btn") as HTMLElement;
    lastButton.focus();
    expect(document.activeElement).toBe(lastButton);

    // Add focus trap
    focusTrap.addFocusTrap();
    const firstButton = document.getElementById("first-btn") as HTMLElement;
    expect(document.activeElement).toBe(firstButton); // Focus should be on the first button

    // Remove focus trap
    focusTrap.removeFocusTrap();
    expect(document.activeElement).toBe(lastButton); // Focus should be restored to the initial element
  });

  it("removes instance from stack when removeFocusTrap is called", () => {
    focusTrap.addFocusTrap();
    expect(window.FocusTrapInstances).toContain(focusTrap);

    focusTrap.removeFocusTrap();
    expect(window.FocusTrapInstances).not.toContain(focusTrap);
  });

  it("restores the root's tabindex attribute after removing focus trap", () => {
    rootElement.setAttribute("tabindex", "-1");
    focusTrap.addFocusTrap();

    expect(rootElement.getAttribute("tabindex")).toBe("-1"); // Focus trap should set tabindex

    focusTrap.removeFocusTrap();
    expect(rootElement.getAttribute("tabindex")).toBe("-1"); // Should restore original tabindex
  });

  it("handles empty stack and removes event listeners when stack is cleared", () => {
    focusTrap.addFocusTrap();
    focusTrap.removeFocusTrap();

    // Ensure the instance is not in the stack and focus listeners are removed
    expect(window.FocusTrapInstances).toHaveLength(0);
  });
});
