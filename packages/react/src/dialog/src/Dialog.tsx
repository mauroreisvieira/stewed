import React, { useState, useCallback, useEffect } from "react";
// UI Components
import { Backdrop, Motion, Scope, useTheme, type BackdropProps } from "../..";
// Context
import { DialogContext, type DialogContextProps } from "./DialogContext";
// Compound Component
import { DialogBody } from "./DialogBody";
import { DialogHeader } from "./DialogHeader";
import { DialogFooter } from "./DialogFooter";
import { DialogSeparator } from "./DialogSeparator";
// Hooks
import {
  useBem,
  useClickOutside,
  useResponsive,
  useScrollLock,
  useFocusTrap,
  type UseResponsiveProps
} from "@stewed/hooks";
// Tokens
import { components, type Spacings } from "@stewed/tokens";
// Styles
import styles from "./styles/index.module.scss";

/**
 * Interface for the properties of the `Dialog` component.
 *
 * @remarks Extends the properties of a standard `<div>` element (`React.ComponentPropsWithoutRef<"div">`),
 * allowing the `Dialog` component to accept all native `div` attributes.
 */
export interface DialogProps
  extends React.ComponentProps<"div">,
    BackdropProps,
    DialogContextProps,
    UseResponsiveProps<{
      /**
       * Specifies the margin around the dialog to ensure safe spacing from the viewport edges.
       * @default xl
       */
      safeMargin?: Spacings;
      /**
       * Changes the size of the dialog, will specify the width of the element.
       * @default md
       */
      size?: "sm" | "md" | "lg" | "xl";
      /** Padding options for horizontal and vertical orientation. */
      padding?: {
        /** Adds padding in the block direction (e.g., top and bottom for vertical orientation). */
        block?: Spacings;
        /** Adds padding in the inline direction (e.g., left and right for vertical orientation). */
        inline?: Spacings;
      };
    }> {
  /** The controlled open state of the dialog. */
  open?: boolean;
  /**
   * Whether to keep the element in the DOM while the dialog is closed.
   * @default false
   */
  keepMounted?: boolean;
  /**
   * Whether to keep the element in the DOM while the drawer is closed.
   * @default false
   */
  /**
   * Allows scrolling within the viewport when content overflows.
   * @default false
   */
  scrollInViewport?: boolean;
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
  open,
  size = "md",
  safeMargin = "xl",
  padding = {
    block: "xl",
    inline: "xl"
  },
  responsive,
  scrollInViewport = false,
  keepMounted = false,
  blur,
  className,
  children,
  onClose,
  onEscape,
  onClickOutside,
  ...props
}: DialogProps): React.ReactElement {
  // State to hold the reference to the root div element
  const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null);

  const [shouldRender, setShouldRender] = useState(open);

  // Importing useBem to handle BEM class names
  const { getBlock, getElement } = useBem({ block: components.Dialog, styles });

  // Lock scrolling when dialog is open
  useScrollLock({ enabled: !!open });

  // Trap focus within the dialog when open and rootRef is available
  useFocusTrap({
    root: rootRef,
    enabled: !!open && !!rootRef
  });

  // Retrieve values from the current theme context
  const { activeToken } = useTheme();

  // Compute responsive props based on current theme and screen sizes
  const computedProps = useResponsive(
    {
      size,
      safeMargin,
      responsive
    },
    activeToken.breakpoints
  );

  // Generating CSS classes based on component props and styles
  const cssClasses = {
    root: getBlock({
      modifiers: [
        computedProps.size,
        open && "open",
        scrollInViewport && "scroll-in-viewport",
        safeMargin && `safe-margin-${safeMargin}`,
        padding?.block && `padding-block-${padding.block}`,
        padding?.inline && `padding-inline-${padding.inline}`
      ],
      extraClasses: className
    }),
    surface: getElement([`surface`])
  };

  const onHandleKeydown: React.KeyboardEventHandler<HTMLDivElement> = useCallback(
    (event): void => {
      if (event.key === "Escape") {
        if (onEscape) onEscape();
        event.stopPropagation();
      }
    },
    [onEscape]
  );

  // Hook to handle clicks outside the floating element.
  useClickOutside({
    enabled: open,
    ignoredElements: rootRef ? [rootRef] : undefined,
    /** Defines a handler function that invokes the `onClickOutside` callback. */
    handler: () => onClickOutside?.()
  });

  useEffect(() => {
    if (open) {
      setShouldRender(true);
    }
  }, [open]);

  /**
   * Handles the end of the animation event for a component.
   *
   * This function used to clean up the component's state after an animation finishes.
   * If the `open` state is `false`, it sets `shouldRender` to `false` to remove the component from the DOM.
   *
   * @returns {void}
   */
  const onHandleAnimationEnd = (): void => {
    if (!open) {
      setShouldRender(false);
    }
  };

  return (
    <>
      {(keepMounted || shouldRender) && (
        <Scope elevation="popup" hidden={!shouldRender}>
          <Motion animation={open ? "fade-in" : "fade-out"}>
            <Backdrop blur={blur} />
          </Motion>
          <DialogContext value={{ onClose }}>
            <div className={cssClasses.root} {...props}>
              <Motion
                timing="ease-out-back"
                duration="quickly"
                animation={open ? "zoom-in-soft" : "zoom-out-soft"}
                onDone={onHandleAnimationEnd}
              >
                <div
                  ref={setRootRef}
                  role="dialog"
                  aria-modal="true"
                  onKeyDown={onHandleKeydown}
                  className={cssClasses.surface}
                >
                  {children}
                </div>
              </Motion>
            </div>
          </DialogContext>
        </Scope>
      )}
    </>
  );
}

// Compound component composition
Dialog.Body = DialogBody;
Dialog.Header = DialogHeader;
Dialog.Footer = DialogFooter;
Dialog.Separator = DialogSeparator;
