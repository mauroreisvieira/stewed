export interface ClickOutsideOptions {
  /** Array of elements that will be ignored on click. */
  ignoredElements?: (Element | null)[];
  /** A callback function triggered on click outside the elements associated. */
  onClickOutside?: () => void;
}

interface ClickOutside {
  /**
   * Activates the ClickOutside function with the specified options.
   * @param options - The ClickOutsideOptions to be activated.
   */
  activate(options: ClickOutsideOptions): void;
  /** Deactivates the ClickOutside function. */
  deactivate(): void;
}

/** Represents the combined type for ClickOutside instance and its options. */
type ClickOutsideStackType = {
  instance: ClickOutside;
} & ClickOutsideOptions;

/**
 * Manages click outside functionality for elements.
 */
export class ClickOutsideManager {
  /** Represents the singleton instance of the ClickOutsideManager class. */
  private static instance: ClickOutsideManager | null = null;
  /** Represents the stack of ClickOutsideStackType for managing instances. */
  private stack: ClickOutsideStackType[] = [];

  /**
   * Gets the singleton instance of ClickOutsideManager.
   */
  static getInstance(): ClickOutsideManager {
    if (ClickOutsideManager.instance === null) {
      ClickOutsideManager.instance = new ClickOutsideManager();
    }
    return ClickOutsideManager.instance;
  }

  /**
   * Checks if an element contains the target node.
   *
   * @param target - The target node.
   * @param element - The element to check against.
   * @returns True if element contains target, otherwise false.
   */
  private elementContainsTarget(target: Node, element?: Element | null): boolean {
    return !!element && element.contains(target);
  }

  /**
   * Checks if the ClickOutside instance exists in the stack.
   *
   * @param instance - The ClickOutside instance.
   * @returns True if instance exists in the stack, otherwise false.
   */
  private instanceInStack(instance: ClickOutside): boolean {
    return this.stack.some((i) => i.instance === instance);
  }

  /**
   * Adds ClickOutside instance and options to the stack.
   *
   * @param options - The ClickOutsideStackType to be added to the stack.
   */
  private addToStack(options: ClickOutsideStackType): void {
    if (!this.instanceInStack(options.instance)) {
      this.stack.push(options);
    }
  }

  /**
   * Removes ClickOutside instance from the stack.
   *
   * @param instance - The ClickOutside instance to remove from the stack.
   */
  private removeFromStack(instance: ClickOutside): void {
    if (this.instanceInStack(instance)) {
      this.stack = this.stack.filter((i) => i.instance !== instance);
    }
  }

  /**
   * Handles the mousedown event to trigger onClickOutside.
   *
   * @param event - The MouseEvent object.
   */
  private mousedownHandler = (event: MouseEvent): void => {
    const { target } = event;
    const latestStackItem = this.stack[this.stack.length - 1];

    if (!latestStackItem) return;

    const { ignoredElements, onClickOutside } = latestStackItem;

    if (!onClickOutside) return;

    if (target instanceof Node) {
      if (!ignoredElements?.some((el) => this.elementContainsTarget(target, el))) {
        onClickOutside();
      }
    }
  };

  /**
   * Activates the ClickOutside operation with the specified options.
   *
   * @param options - The ClickOutsideStackType to be activated.
   */
  public activate(options: ClickOutsideStackType): void {
    this.addToStack(options);

    if (this.stack.length === 1) {
      document.addEventListener("mousedown", this.mousedownHandler);
    }
  }

  /**
   * Deactivates the ClickOutside operation for the given instance.
   *
   * @param instance - The ClickOutside instance to deactivate.
   */
  public deactivate(instance: ClickOutside): void {
    this.removeFromStack(instance);

    if (this.stack.length === 0) {
      document.removeEventListener("mousedown", this.mousedownHandler);
    }
  }

  /**
   * Updates the stack with the new options for the instance.
   *
   * @param options - The updated ClickOutsideStackType options.
   */
  public updateStack(options: ClickOutsideStackType): void {
    this.stack = this.stack.map((i) =>
      i.instance === options.instance && i !== options ? options : i,
    );
  }
}
