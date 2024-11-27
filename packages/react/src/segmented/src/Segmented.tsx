import React, { useCallback } from "react";
// Context
import { SegmentedContext, type SegmentedContextProps } from "./SegmentedContext";
// Compound Component
import { SegmentedItem } from "./SegmentedItem";
// Hooks
import { useBem, useKeyboardNavigation } from "@stewed/hooks";
// Tokens
import { components } from "@stewed/tokens";
// Styles
import styles from "./styles/index.module.scss";

export interface SegmentedProps<T extends string>
  extends React.ComponentPropsWithoutRef<"div">,
    SegmentedContextProps<T> {
  /**
   * Changes the size of the segmented, giving it more or less padding.
   * @default md
   */
  size?: "sm" | "md" | "lg";
  /** Sets the segmented control to use the full width of its container. */
  fullWidth?: boolean;
}

export function Segmented<T extends string>({
  value,
  fullWidth,
  size = "md",
  className,
  onValueChange,
  onKeyDown,
  children,
  ...props
}: SegmentedProps<T>): React.ReactElement {
  // Importing useBem to handle BEM class names
  const { getBlock } = useBem({ block: components.Segmented, styles });

  // Generating CSS classes based on component props and styles
  const cssClasses = {
    root: getBlock({
      modifiers: [size, fullWidth && "full-width"],
      extraClasses: className,
    }),
  };

  // Define a reference to a tab list element
  const { ref, onNavigate } = useKeyboardNavigation<HTMLDivElement>({
    target: '[role="tab"]:not([aria-disabled])',
  });

  const onHandleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      onNavigate(event);
      onKeyDown?.(event);
    },
    [onKeyDown, onNavigate],
  );

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <div ref={ref} role="group" className={cssClasses.root} onKeyDown={onHandleKeyDown} {...props}>
      <SegmentedContext.Provider
        value={{ value, onValueChange: onValueChange as (value: unknown) => void }}
      >
        {children}
      </SegmentedContext.Provider>
    </div>
  );
}

// Compound component composition
Segmented.Item = SegmentedItem;
