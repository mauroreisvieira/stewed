import React from "react";
import { Scope } from "../../scope";
// Hooks
import { useBem, useFloating, type Placement } from "../../../../hooks/index";
// Tokens
import { components } from "@stewed/tokens";
// Styles
import styles from "./styles/index.module.scss";

export interface DropdownProps<T> extends React.ComponentPropsWithRef<"div"> {
  /** The reference element for positioning the dropdown. */
  reference: T | null;
  /** The preferred placement of the dropdown. */
  placement?: Placement;
  /** Determines if the dropdown is open. */
  open?: boolean;
  /** Callback function invoked when the escape key is pressed. */
  onEscape?: () => void;
  /** Callback function invoked when the dialog is clicked outside. */
  onClickOutside?: () => void;
}

/**
 * Dropdown component is a floating element designed to serve as a lightweight context menu,
 * perfect for containing navigation options and action items within a user interface
 *
 * @example
 * ```tsx
 * <Dropdown placement="top">Your Content Place</Dropdown>
 * ```
 *
 * @remarks This component props extended from React.ComponentPropsWithRef<"div">.
 *
 * @param {DropdownProps} props - The props for the Dropdown component.
 * @returns {React.ReactElement} - The rendered Dropdown component.
 */
export function Dropdown<T extends HTMLElement>({
  placement = "bottom-start",
  reference,
  open,
  className,
  style,
  children,
  ...props
}: DropdownProps<T>): React.ReactElement {
  // Importing useBem to handle BEM class names
  const { getBlock } = useBem({ block: components.Dropdown, styles });

  // Generating CSS classes based on component props and styles
  const cssClasses = {
    root: getBlock({ extraClasses: className }),
  };

  const { floating, x, y, isPositioned } = useFloating<T, HTMLDivElement>({
    open,
    placement,
    reference,
  });

  return (
    <>
      {open && (
        <Scope
          elevation="300"
        >
          <div
            ref={floating}
            className={cssClasses.root}
            style={{
              ...style,
              visibility: isPositioned ? "visible" : "hidden",
              left: `${x}px`,
              top: `${y}px`,
            }}
            {...props}
          >
            {children}
          </div>
        </Scope>
      )}
    </>
  );
}
