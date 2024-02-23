import React, { useCallback } from "react";
// Hooks
import { useBem, useKeyboardNavigation } from "@stewed/hooks";
// Tokens
import { components } from "@stewed/tokens";
// Styles
import styles from "./styles/index.module.scss";

export interface ToggleGroupProps extends React.ComponentPropsWithRef<"div"> {
  /** Allows the toggle group to grow to the width of its container. */
  fullWidth?: boolean;
}

export function ToggleGroup({
  fullWidth,
  className,
  children,
  onKeyDown,
  ...props
}: ToggleGroupProps): React.ReactElement {
  // Importing useBem to handle BEM class names
  const { getBlock } = useBem({ block: `${components.Toggle}__group`, styles });

  // Generating CSS classes based on component props and styles
  const cssClasses = {
    root: getBlock({ modifiers: [fullWidth && "full-width"], extraClasses: className }),
  };

  // Define a reference to a list element
  const { ref, onNavigate } = useKeyboardNavigation<HTMLDivElement>({
    target: "button:not([aria-disabled='true'])",
  });

  const onHandleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      onNavigate?.(event);
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
