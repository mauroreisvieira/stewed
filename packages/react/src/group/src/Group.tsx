import React, { useCallback } from "react";
// Hooks
import { useBem, useKeyboardNavigation } from "@stewed/hooks";
// Tokens
import { components } from "@stewed/tokens";
// Styles
import styles from "./styles/index.module.scss";

export interface GroupProps extends React.ComponentPropsWithoutRef<"div"> {}

/**
 * Group component arranges its children components in a horizontal group,
 * removing spaces and adjusting the border radius of the middle elements to create a unified appearance.
 *
 * @example
 * ```tsx
 * <Group>
 *   <Button />
 *   <Button />
 * </Group>
 * ```
 *
 * @param {GroupProps} props - The props for the `Group` component.
 * @returns {React.ReactElement} - The rendered `Group` component.
 */
export function Group({
  className,
  children,
  onKeyDown,
  ...props
}: GroupProps): React.ReactElement {
  // Importing useBem to handle BEM class names
  const { getBlock } = useBem({ block: components.Group, styles });

  // Generating CSS classes based on component props and styles
  const cssClasses = {
    root: getBlock({ extraClasses: className }),
  };

  // Define a reference to a list element
  const { ref, onNavigate } = useKeyboardNavigation<HTMLDivElement>({
    target: "button:not([aria-disabled='true']), input:not([disabled='true'])",
  });

  const onHandleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      onNavigate(event);
      onKeyDown?.(event);
    },
    [onKeyDown, onNavigate],
  );

  return (
    <div ref={ref} className={cssClasses.root} role="group" onKeyDown={onHandleKeyDown} {...props}>
      {children}
    </div>
  );
}
