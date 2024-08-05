import React, { useRef, useState } from "react";
// UI Components
import { Scope } from "../..";
// Hooks
import { useBem, useFloating, useClickOutside, type FloatingPlacement } from "@stewed/hooks";
// Tokens
import { components } from "@stewed/tokens";
// Styles
import styles from "./styles/index.module.scss";

export interface DropdownChildrenProps<T> {
  /** Ref to attach to the `Dropdown` element */
  ref: React.Ref<T>;
  /** Event handler for mouse click */
  onClick: React.MouseEventHandler<T>;
  /** Current state of the dropdown */
  isOpen: boolean;
}

export interface DropdownProps<T>
  extends Omit<React.ComponentPropsWithRef<"div">, "children" | "content"> {
  /**
   * Specifies the preferred placement of the `Dropdown` relative to its trigger.
   * @example "top", "bottom", "left", "right"
   */
  placement?: FloatingPlacement;
  /** Indicates whether the `Dropdown` is currently open. */
  open?: boolean;
  /**
   * Allows the `Dropdown` to remain open even when clicking outside of it.
   * @default false
   */
  allowClickOutside?: boolean;
  /** Callback function invoked when the dialog is clicked outside. */
  onClickOutside?: () => void;
  /**
   * Defines the content to be displayed inside the `Dropdown`.
   */
  content: React.ReactNode;
  /**
   * Function that returns a React element with events to trigger `Dropdown` position and visibility.
   * @param props - Render props for `Dropdown` component.
   */
  children: (props: DropdownChildrenProps<T>) => React.ReactElement;
}

/**
 * Dropdown component is a floating element designed to serve as a lightweight context menu,
 * perfect for containing navigation options and action items within a user interface.
 *
 * @example
 * ```tsx
 * <Dropdown<HTMLButtonElement> placement="top" content="Surprise surprise, the king is back...">
 *   {(props) => (
 *     <button {...props}>Conor McGregor</button>
 *   )}
 * </Dropdown>
 * ```
 *
 * @remarks This component props extended from React.ComponentPropsWithRef<"div">.
 *
 * @param {DropdownProps} props - The props for the Dropdown component.
 * @returns {React.ReactElement} - The rendered Dropdown component.
 */
export function Dropdown<T extends HTMLElement>({
  placement = "bottom-start",
  open,
  className,
  style,
  allowClickOutside = false,
  onClickOutside,
  content,
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

  const [isOpen, setOpen] = useState(open);

  // Determines the visibility of the Dropdown based on controlled (open) or uncontrolled (isOpen) state.
  const isVisible = open || isOpen;

  // Floating position calculation hook
  const { floating, x, y, isPositioned } = useFloating<T, HTMLDivElement>({
    open: isVisible,
    placement,
    reference: dropdownRef.current,
    offset: 2,
  });

  // Hook to handle clicks outside the floating element.
  useClickOutside({
    enabled: isVisible,
    ignoredElements: [dropdownRef.current as Element, floating.current as Element],
    onClickOutside: () => (allowClickOutside ? onClickOutside : setOpen(false)),
  });

  const onHandleOpen = (): void => {
    setOpen((prev) => !prev);
  };

  return (
    <>
      {children?.({
        ref: dropdownRef,
        onClick: onHandleOpen,
        isOpen: !!isVisible,
      })}
      {isVisible && (
        <Scope elevation="navigation">
          <div
            ref={floating}
            className={cssClasses.root}
            style={{
              ...style,
              visibility: isPositioned ? "visible" : "hidden",
              left: `${x}px`,
              top: `${y}px`,
            }}
            {...props}>
            {content}
          </div>
        </Scope>
      )}
    </>
  );
}
