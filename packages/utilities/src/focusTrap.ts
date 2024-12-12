/**
 * Extends the global `Window` interface to include a `FocusTrapInstances` property.
 * This property holds an array of `FocusTrap` instances for managing focus trapping
 * across the window context. Focus traps are often used for accessibility purposes,
 * ensuring focus remains within a specific UI element or component.
 */
declare global {
  /** Override Window interface */
  interface Window {
    /**
     * An array of `FocusTrap` instances used for managing focus trapping within
     * the window context. This can be useful for handling modal dialogs, popups,
     * or other UI components where focus should be confined to a specific area.
     */
    FocusTrapInstances: FocusTrap[];
  }
}

/**
 * Represents a FocusTrap instance,
 * which manages trapping focus within a specified root element.
 */
export class FocusTrap {
  private stack: Window;
  private root: HTMLElement;
  private initialElementFocused: HTMLElement | null;
  private initialRootTabIndex: string | null;
  private active: boolean;
  private selectors;

  /**
   * Creates an instance of FocusTrap.
   * @params root The root element to trap focus within.
   */
  constructor(root: HTMLElement, selectors?: string[]) {
    this.stack = window;
    this.root = root;
    this.selectors = selectors || [
      "[href]",
      "button",
      "input",
      "select",
      "textarea",
      "[tabindex]",
      "[controls]"
    ];
    this.initialElementFocused = null;
    this.initialRootTabIndex = null;
    this.active = false;

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleFocusIn = this.handleFocusIn.bind(this);

    this.stack.FocusTrapInstances = this.stack.FocusTrapInstances || [];
  }

  /**
   * Returns all elements that can be focused inside a given element.
   * @params root The root element to search within.
   * @returns An object containing the first and last focusable elements.
   */
  private getFocusableElements(root: HTMLElement): {
    /** First focusable elements */
    first: HTMLElement;
    /** Last focusable elements */
    last: HTMLElement;
  } {
    // Get list of potential focusable elements
    const elements: HTMLElement[] = Array.from(root.querySelectorAll(this.selectors.join(", ")));

    /**
     * Get filtered focusable elements
     * discard hidden elements & elements with "invalid" tabindex
     */
    const focusableEls = elements.filter((el) => {
      const { visibility, display } = window.getComputedStyle(el);

      return (
        el.tabIndex >= 0 &&
        display !== "none" &&
        visibility !== "hidden" &&
        !el.hasAttribute("disabled")
      );
    });

    // Add root as focusable element if no elements are available
    if (!focusableEls.length) {
      if (root.tabIndex < 0) {
        root.setAttribute("tabindex", "0");
      }

      focusableEls.push(root);
    }

    return {
      first: focusableEls[0] as HTMLElement,
      last: focusableEls[focusableEls.length - 1] as HTMLElement
    };
  }

  /**
   * Adds the instance to the stack to provide information between instances.
   */
  private addToStack(): void {
    this.stack.FocusTrapInstances.push(this);
  }

  /**
   * Removes the instance from the stack if it is the last active instance.
   */
  private removeFromStack(): void {
    if (!this.instanceOnTopOfStack) return;

    const index = this.stack.FocusTrapInstances.indexOf(this);
    this.stack.FocusTrapInstances.splice(index, 1);

    // Clean up any null or undefined entries
    this.stack.FocusTrapInstances = this.stack.FocusTrapInstances.filter(Boolean);
  }

  /**
   * Removes other active instances from the stack.
   */
  private removeOtherInstances(): void {
    this.stack.FocusTrapInstances.forEach((instance) => {
      if (instance !== this && instance.isActive) instance.removeFocusTrap();
    });
  }

  /**
   * Handles keydown events, intercepting Tab actions.
   * @params e The keyboard event.
   */
  private handleKeyDown(e: KeyboardEvent): void {
    if (e.key !== "Tab" || !this.activeInstance) return;

    // Get "focus loop" relevant elements
    const { first, last } = this.getFocusableElements(this.activeInstance?.root);

    /**
     * Create focus loop when tabbing forward
     * when tabbing on the last focusable element inside root element,
     * focus back on first focusable element inside root element
     */
    if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      if (first) first.focus();
    }

    /**
     * Create focus loop when tabbing backwards
     * when tabbing backwards on the first focusable element inside root element,
     * focus back on last focusable element inside root element
     */
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      if (last) last.focus();
    }
  }

  /**
   * Handles focus when it jumps out of the root element context.
   * @params e The focus event.
   */
  private handleFocusIn(e: FocusEvent): void {
    if (!this.activeInstance || e.composedPath().includes(this.activeInstance.root)) return;
    // Will reach here if focus happens out of root
    // Focus on first relevant element
    this.getFocusableElements(this.activeInstance.root).first.focus();
  }

  /**
   * Checks if the instance is in the stack.
   * @returns A boolean indicating whether the instance is in the stack.
   */
  get instanceInStack(): boolean {
    const idx = this.stack.FocusTrapInstances.indexOf(this);

    return idx > -1;
  }

  /**
   * Checks if the instance was the last added.
   * @returns A boolean indicating whether the instance was the last added.
   */
  get instanceOnTopOfStack(): boolean {
    const idx = this.stack.FocusTrapInstances.indexOf(this);

    return this.stack.FocusTrapInstances.length - 1 === idx;
  }

  /**
   * Returns the current active instance.
   * @returns The current active instance or null if no active instance is found.
   */
  get activeInstance(): FocusTrap | null {
    return (
      this.stack.FocusTrapInstances.find((instance) => instance === this && instance.isActive) ||
      null
    );
  }

  /**
   * Checks if the instance is active.
   * @returns A boolean indicating whether the instance is active.
   */
  get isActive(): boolean {
    return this.active;
  }

  /**
   * Adds focus trap, trapping focus within the specified root element.
   */
  public addFocusTrap(): void {
    if (this.isActive) return;

    if (!this.instanceInStack) {
      this.addToStack();
      this.removeOtherInstances();

      // Save previously focused element
      this.initialElementFocused =
        document.activeElement === document.body ? null : (document.activeElement as HTMLElement);
    }

    this.active = true;

    if (!this.activeInstance) return;

    // Save previous tab index value
    this.initialRootTabIndex = this.activeInstance?.root.getAttribute("tabindex");

    // Focus on first relevant element
    this.getFocusableElements(this.activeInstance.root).first.focus();

    this.activeInstance.root.addEventListener("keydown", this.handleKeyDown);

    // Prevent register in DOM, for each instance in stack.
    if (this.stack.FocusTrapInstances.length > 1) {
      document.addEventListener("focusin", this.handleFocusIn);
    }
  }

  /**
   * Removes focus trap, releasing focus trapping within the root element.
   */
  public removeFocusTrap(): void {
    if (!this.isActive || !this.instanceOnTopOfStack || !this.activeInstance) return;

    // Restore initial tabIndex
    if (this.activeInstance.initialRootTabIndex) {
      this.activeInstance.root.setAttribute("tabindex", this.activeInstance.initialRootTabIndex);
    } else {
      this.activeInstance.root.removeAttribute("tabindex");
    }

    this.activeInstance.root.removeEventListener("keydown", this.handleKeyDown);

    // Remove current instance from stack
    this.removeFromStack();

    // Remove event from DOM when not have more instances in stack
    if (this.stack.FocusTrapInstances.length === 0) {
      document.removeEventListener("focusin", this.handleFocusIn);
    }

    this.active = false;

    // Focus back on previously focused element (before new instance was created)
    if (this.initialElementFocused) this.initialElementFocused.focus();
  }
}
