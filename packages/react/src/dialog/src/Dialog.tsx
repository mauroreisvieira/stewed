import React, { useCallback, useRef } from "react";
import { Scope } from "../..";
// Provider
import { type DialogProviderProps, DialogProvider } from "./DialogProvider";
// Compound Component
import { DialogBody } from "./DialogBody";
import { DialogHeader } from "./DialogHeader";
import { DialogFooter } from "./DialogFooter";
// Utilities
import { classNames } from "@stewed/utilities";
// Styles
import styles from "./styles/index.module.scss";

export interface DialogProps extends React.HTMLAttributes<HTMLDivElement>, DialogProviderProps {
  /** The controlled open state of the dialog. */
  open?: boolean;
  /**
   * Changes the size of the dialog, will specify the width of the element.
   * @default "md"
   */
  onEscape?: () => void;
  onClickOutside?: () => void;
  size?: "sm" | "md" | "lg" | "xl";
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
  const rootRef = useRef<HTMLDivElement>(null);

  const rootName = "dialog";
  const cssClasses = {
    root: classNames(
      styles[rootName],
      size && styles[`${rootName}--${size}`],
      open && styles[`${rootName}--open`],
      className,
    ),
    surface: classNames(styles[`${rootName}__surface`]),
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

      if (!rootRef.current) return;

      const { target } = event;

      if (rootRef.current === target) {
        if (onClickOutside) onClickOutside();
      }

      event.stopPropagation();
    },
    [onClickOutside, onMouseDown],
  );

  return (
    <>
      {open && (
        <Scope>
          <DialogProvider onClose={onClose}>
            <div
              ref={rootRef}
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
