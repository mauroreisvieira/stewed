import React, { useCallback, useEffect, useRef, useState } from "react";
// UI Components
import { Motion, Scope } from "../..";
// Hooks
import {
  useBem,
  useFloating,
  useClickOutside,
  useKey,
  type FloatingPlacement,
} from "@stewed/hooks";
// Tokens
import { components } from "@stewed/tokens";
// Styles
import styles from "./styles/index.module.scss";

export interface PopoverRenderProps<T> {
  /** Ref to attach to the `Popover` element */
  ref: React.RefObject<T>;
  /** Callback to open the Popover */
  open: () => void;
  /** Callback to close Popover  */
  close: () => void;
  /** Indicates whether the Popover is currently open */
  isOpen: boolean;
  /** Property that represents the `DOMRect` of the reference element. */
  reference?: DOMRect;
}

export interface PopoverProps<T>
  extends Omit<React.ComponentPropsWithoutRef<"div">, "children" | "content"> {
  /**
   * Specifies the preferred placement of the `Popover` relative to its trigger.
   * @example "top", "bottom", "left", "right"
   */
  placement?: FloatingPlacement;
  /**
   * Allows the `Popover` to remain open even when clicking outside of it.
   * @default false
   */
  allowClickOutside?: boolean;
  /** Callback function invoked when the escape key is pressed. */
  onEscape?: () => void;
  /**
   * The distance in pixels from the anchor.
   * @default 4
   */
  offset?: number;
  /**
   * The boundary element that will be checked for overflow relative to.
   * @default window
   */
  boundary?: HTMLElement | null;
  /** Callback function invoked when the dialog is clicked outside. */
  onClickOutside?: () => void;
  /**
   * Function that returns a React element used as the anchor for the `Popover`.
   * @param props - Render props for the `Popover` component, including the necessary event handlers.
   * @returns A React element that serves as the anchor for the `Popover`.
   */
  renderAnchor: (props: PopoverRenderProps<T>) => React.ReactElement;
  /**
   * The content to be displayed in the Popover
   * or function that returns a React element with events to trigger `Popover` position and visibility.
   */
  children: React.ReactNode | ((props: Omit<PopoverRenderProps<T>, "ref">) => React.ReactElement);
}

/**
 * Popover is used to bring attention to specific user interface elements.
 *
 * @example
 * ```tsx
 * <Popover<HTMLButtonElement>
 *   placement="bottom"
 *   renderAnchor={({ ref, open }) => (
 *     <button ref={ref} onClick={open}>Conor McGregor</button>
 *   )}>
 *   Surprise surprise, the king is back...
 * </Popover>
 * ```
 *
 * @remarks This component props extended from React.ComponentPropsWithoutRef<"div">.
 *
 * @param {PopoverProps} props - The props for the Popover component.
 * @returns {React.ReactElement} - The rendered Popover component.
 */
export function Popover<T extends HTMLElement>({
  placement = "bottom",
  className,
  style,
  boundary,
  offset = 8,
  renderAnchor,
  allowClickOutside = false,
  onEscape,
  onClickOutside,
  onKeyDown,
  children,
  ...props
}: PopoverProps<T>): React.ReactElement {
  // Importing useBem to handle BEM class names
  const { getBlock } = useBem({ block: components.Popover, styles });

  // Generating CSS classes based on component props and styles
  const cssClasses = {
    root: getBlock({ extraClasses: className }),
  };

  // Create a reference to manage the Popover element
  const popoverRef = useRef<T>(null);

  // Determines the visibility of the Popover based onstate.
  const [isOpen, setOpen] = useState(false);

  // Floating position calculation hook
  const { floating, x, y, isPositioned, reference } = useFloating<T, HTMLDivElement>({
    boundary,
    open: isOpen,
    placement,
    reference: popoverRef.current,
    offset,
  });

  // Hook to handle clicks outside the floating element.
  useClickOutside({
    enabled: isOpen,
    ignoredElements: [popoverRef.current as Element, floating.current as Element],
    onClickOutside: () => (allowClickOutside ? onClickOutside : setOpen(false)),
  });

  // Disable arrow key scrolling in users browser
  useKey({
    enabled: !!isOpen,
    keys: ["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"],
    callback: (event: KeyboardEvent) => {
      event.preventDefault();
    },
  });

  // Handles the `keydown` event on a specific HTML element.
  const onHandleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = useCallback(
    (event): void => {
      // Call the custom onKeyDown handler, if provided.
      onKeyDown?.(event);

      // Check if the pressed key is "Escape".
      if (event.key === "Escape") {
        // Close the popover component.
        setOpen(false);

        onEscape?.();

        // Stop the event from bubbling up to other elements.
        event.stopPropagation();
      }
    },
    [onKeyDown, onEscape, setOpen],
  );

  // Opens the popover by set the state to true.
  const onHandleOpen = (): void => {
    setOpen(true);
  };

  // Closes the popover by set the state to false.
  const onHandleClose = (): void => {
    setOpen(false);
  };

  useEffect(() => {
    // Cleanup function to run when the component unmounts or the effect is re-run
    return () => {
      // Close the floating element or popup when the component is unmounted
      setOpen(false);
    };
  }, []);

  return (
    <>
      {renderAnchor({
        ref: popoverRef,
        open: onHandleOpen,
        close: onHandleClose,
        isOpen: !!isOpen,
      })}
      {isOpen && (
        <Scope elevation="navigation">
          <Motion animation="fade-in">
            <div
              ref={floating}
              role="region"
              className={cssClasses.root}
              onKeyDown={onHandleKeyDown}
              style={{
                ...style,
                visibility: isPositioned ? "visible" : "hidden",
                left: `${x}px`,
                top: `${y}px`,
              }}
              {...props}>
              {typeof children === "function"
                ? children({
                    open: onHandleOpen,
                    close: onHandleClose,
                    isOpen: !!isOpen,
                    reference,
                  })
                : children}
            </div>
          </Motion>
        </Scope>
      )}
    </>
  );
}
