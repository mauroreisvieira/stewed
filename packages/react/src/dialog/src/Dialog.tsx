import React, { useState, useCallback } from "react";
import { Scope } from "../..";
// Provider
import { type DialogProviderProps, DialogProvider } from "./DialogProvider";
// Compound Component
import { DialogBody } from "./DialogBody";
import { DialogHeader } from "./DialogHeader";
import { DialogFooter } from "./DialogFooter";
// Hooks
import { useBem } from "@stewed/hooks";
import { useFocusTrap } from "@stewed/hooks";
// Tokens
import { components } from "@stewed/tokens";
// Styles
import styles from "./styles/index.module.scss";

export interface DialogProps extends React.HTMLAttributes<HTMLDivElement>, DialogProviderProps {
  /** The controlled open state of the dialog. */
  open?: boolean;
  /**
   * Changes the size of the dialog, will specify the width of the element.
   * @default "md"
   */
  size?: "sm" | "md" | "lg" | "xl";
  /** Callback function invoked when the escape key is pressed. */
  onEscape?: () => void;
  /** Callback function invoked when the dialog is clicked outside. */
  onClickOutside?: () => void;
}

/**
 * The `Dialog` component displays a modal dialog.
 * Dialogs appear in front of the main content to provide critical information or an actionable piece of content.
 *
 * @example
 * ```tsx
 * <Dialog open>
 *   <Dialog.Body>
 *     <p>This action cannot be undone...</p>
 *   </Dialog.Body>
 * </Dialog>
 * ```
 *
 * @remarks
 * This component extends `ReactDialogHTMLAttributes<HTMLDivElement>`.
 *
 * @param {DialogProps} props - The props for the Dialog component.
 * @returns {React.ReactElement} - The rendered Dialog component.
 */
export function Dialog({
  size = "md",
  open,
  className,
  children,
  onClose,
  onEscape,
  onClickOutside,
  onKeyDown,
  onMouseDown,
  ...props
}: DialogProps): React.ReactElement {
  const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null);

  // Importing useBem to handle BEM class names
  const { getBlock, getElement } = useBem({ block: components.Dialog, styles });

  // Generating CSS classes based on component props and styles
  const cssClasses = {
    root: getBlock({ modifiers: [size, open && "open"], extraClasses: className }),
    surface: getElement([`surface`]),
  };

  const onHandleKeydown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>): void => {
      if (onKeyDown) onKeyDown(event);

      if (event.key === "Escape") {
        if (onEscape) onEscape();
        event.stopPropagation();
      }
    },
    [onEscape, onKeyDown],
  );

  const onHandleMouseDown = useCallback(
    (event: React.MouseEvent<HTMLDivElement>): void => {
      if (onMouseDown) onMouseDown(event);

      if (!rootRef) return;

      const { target } = event;

      if (rootRef === target) {
        if (onClickOutside) onClickOutside();
      }

      event.stopPropagation();
    },
    [onClickOutside, onMouseDown, rootRef],
  );

  useFocusTrap({
    root: rootRef,
    enabled: !!open && !!rootRef,
  });

  return (
    <>
      {open && (
        <Scope>
          <DialogProvider onClose={onClose}>
            <div
              ref={setRootRef}
              className={cssClasses.root}
              onMouseDown={onHandleMouseDown}
              onKeyDown={onHandleKeydown}
              {...props}
            >
              <div className={cssClasses.surface}>{children}</div>
            </div>
          </DialogProvider>
        </Scope>
      )}
    </>
  );
}

// Compound component composition
Dialog.Body = DialogBody;
Dialog.Header = DialogHeader;
Dialog.Footer = DialogFooter;
