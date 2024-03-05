import React from "react";
// Hooks
import { useBem, useFloating, type Placement } from "../../../../hooks/index";
// Tokens
import { components } from "@stewed/tokens";
// Styles
import styles from "./styles/index.module.scss";
import { Scope } from "../../scope";

export interface DropdownProps<T> extends React.ComponentPropsWithRef<"div"> {
  reference: T | null;
  placement?: Placement;
  open?: boolean;
  /** Callback function invoked when the escape key is pressed. */
  onEscape?: () => void;
  /** Callback function invoked when the dialog is clicked outside. */
  onClickOutside?: () => void;
}

/**
 * A React component that enforces a specific aspect ratio for its children.
 *
 * @example
 * ```tsx
 * <Dropdown >
 *   TODO
 * </Dropdown>
 * ```
 *
 * @remarks This component props extended from React.ComponentPropsWithRef<"div">.
 *
 * @param {DropdownProps} props - The props for the Dropdown component.
 * @returns {React.ReactElement} - The rendered Dropdown component.
 */
export function Dropdown<T extends HTMLElement>({
  placement = "bottom-end",
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

  const { floating, x, y } = useFloating<T, HTMLDivElement>({
    placement,
    reference: open ? reference : null,
  });

  return (
    <>
      {open && (
        <Scope>
          <div
            ref={floating}
            className={cssClasses.root}
            {...props}
            style={{
              ...style,
              position: "absolute",
              left: `${x}px`,
              top: `${y}px`,
            }}
          >
            {children}
          </div>
        </Scope>
      )}
    </>
  );
}
