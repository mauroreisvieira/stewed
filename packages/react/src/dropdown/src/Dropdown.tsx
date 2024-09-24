import React, { useCallback, useEffect, useRef, useState } from "react";
// UI Components
import { Motion, Scope } from "../..";
// Hooks
import {
  useBem,
  useFloating,
  useClickOutside,
  useKey,
  useKeyboardNavigation,
  useMergeRefs,
  type FloatingPlacement,
} from "@stewed/hooks";
// Tokens
import { components } from "@stewed/tokens";
// Styles
import styles from "./styles/index.module.scss";

export interface DropdownRenderProps<T> {
  /** Ref to attach to the `Dropdown` element */
  ref: React.RefObject<T>;
  /** Callback to open the dropdown */
  open: () => void;
  /** Callback to close dropdown  */
  close: () => void;
  /** Indicates whether the dropdown is currently open */
  isOpen: boolean;
}

export interface DropdownProps<T>
  extends Omit<React.ComponentPropsWithoutRef<"div">, "children" | "content"> {
  /**
   * Specifies the preferred placement of the `Dropdown` relative to its trigger.
   * @example "top", "bottom", "left", "right"
   */
  placement?: FloatingPlacement;
  /**
   * Allows the `Dropdown` to remain open even when clicking outside of it.
   * @default false
   */
  allowClickOutside?: boolean;
  /** Callback function invoked when the escape key is pressed. */
  onEscape?: () => void;
  /** Callback function invoked when the dialog is clicked outside. */
  onClickOutside?: () => void;
  /**
   * Function that returns a React element used as the anchor for the `Dropdown`.
   * @param props - Render props for the `Dropdown` component, including the necessary event handlers.
   * @returns A React element that serves as the anchor for the `Dropdown`.
   */
  renderAnchor: (props: DropdownRenderProps<T>) => React.ReactElement;
  /**
   * The content to be displayed in the dropdown
   * or function that returns a React element with events to trigger `Dropdown` position and visibility.
   */
  children: React.ReactNode | ((props: Omit<DropdownRenderProps<T>, "ref">) => React.ReactElement);
}

/**
 * Dropdown component is a floating element designed to serve as a lightweight context menu,
 * perfect for containing navigation options and action items within a user interface.
 *
 * @example
 * ```tsx
 * <Dropdown<HTMLButtonElement>
 *   placement="top"
 *   renderAnchor={({ ref, open }) => (
 *     <button ref={ref} onClick={open}>Conor McGregor</button>
 *   )}>
 *   Surprise surprise, the king is back...
 * </Dropdown>
 * ```
 *
 * @remarks This component props extended from React.ComponentPropsWithoutRef<"div">.
 *
 * @param {DropdownProps} props - The props for the Dropdown component.
 * @returns {React.ReactElement} - The rendered Dropdown component.
 */
export function Dropdown<T extends HTMLElement>({
  placement = "bottom-start",
  className,
  style,
  renderAnchor,
  allowClickOutside = false,
  onEscape,
  onClickOutside,
  onKeyDown,
  children,
  ...props
}: DropdownProps<T>): React.ReactElement {
  // Importing useBem to handle BEM class names
  const { getBlock } = useBem({ block: components.Dropdown, styles });

  // Generating CSS classes based on component props and styles
  const cssClasses = {
    root: getBlock({ extraClasses: className }),
  };

  // Create a reference to manage the dropdown element
  const dropdownRef = useRef<T>(null);

  // Determines the visibility of the Dropdown based onstate.
  const [isOpen, setOpen] = useState(false);

  // Floating position calculation hook
  const { floating, x, y, isPositioned } = useFloating<T, HTMLDivElement>({
    open: isOpen,
    placement,
    reference: dropdownRef.current,
    offset: 4,
  });

  // Hook to handle clicks outside the floating element.
  useClickOutside({
    enabled: isOpen,
    ignoredElements: [dropdownRef.current as Element, floating.current as Element],
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

  // Define a reference for the list element and enable keyboard navigation within it
  const {
    ref: navigationRef,
    onNavigate,
    setFirstElementFocusable,
  } = useKeyboardNavigation<HTMLDivElement>({
    target: '[tabindex="0"]:not([aria-disabled]), [role="option"]:not([aria-disabled])',
  });

  // Merge the floating reference (likely for a floating UI element) with the navigation reference
  const mergedRefs = useMergeRefs([floating, navigationRef]);

  // Handles the `keydown` event on a specific HTML element.
  const onHandleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = useCallback(
    (event): void => {
      // Call function to navigate between dropdown content child's
      onNavigate(event);

      // Call the custom onKeyDown handler, if provided.
      onKeyDown?.(event);

      // Check if the pressed key is "Escape".
      if (event.key === "Escape") {
        // Close the dropdown component.
        setOpen(false);

        onEscape?.();

        // Stop the event from bubbling up to other elements.
        event.stopPropagation();
      }
    },
    [onNavigate, onKeyDown, onEscape],
  );

  // Opens the dropdown by set the state to true.
  const onHandleOpen = (): void => {
    setOpen(true);
  };

  // Closes the dropdown by set the state to false.
  const onHandleClose = (): void => {
    setOpen(false);
  };

  useEffect(() => {
    // Set the first element as focusable when the floating element is mounted or updated
    if (floating.current) {
      setFirstElementFocusable();
    }
  }, [floating, setFirstElementFocusable]);

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
        ref: dropdownRef,
        open: onHandleOpen,
        close: onHandleClose,
        isOpen: !!isOpen,
      })}
      {isOpen && (
        <Scope elevation="navigation">
          <Motion animation="fade-in">
            <div
              ref={mergedRefs}
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
                ? children({ open: onHandleOpen, close: onHandleClose, isOpen: !!isOpen })
                : children}
            </div>
          </Motion>
        </Scope>
      )}
    </>
  );
}
