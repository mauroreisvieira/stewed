import { ClickOutsideManager, type ClickOutsideOptions } from "./clickOutsideManager";

export class ClickOutside {
  private ClickOutsideManager: ClickOutsideManager = ClickOutsideManager.getInstance();

  /**
   * Updates the ClickOutside stack with the specified options for the instance.
   *
   * @param options - The ClickOutsideOptions to update the stack with.
   */
  public update(options: ClickOutsideOptions): void {
    this.ClickOutsideManager.updateStack({
      instance: this,
      ...options,
    });
  }

  /**
   * Activates the ClickOutside functionality with the specified options.
   *
   * @param options - The ClickOutsideOptions to activate with.
   */
  public activate(options: ClickOutsideOptions): void {
    this.ClickOutsideManager.activate({
      instance: this,
      ...options,
    });
  }

  /**
   * Deactivates the ClickOutside functionality for the current instance.
   */
  public deactivate(): void {
    this.ClickOutsideManager.deactivate(this);
  }
}
