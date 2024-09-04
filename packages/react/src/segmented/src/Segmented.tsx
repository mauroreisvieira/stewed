import React, { useCallback } from "react";
// Provider
import { SegmentedProvider, type SegmentedProviderProps } from "./SegmentedProvider";
// Compound Component
import { SegmentedItem } from "./SegmentedItem";
// Hooks
import { useBem, useKeyboardNavigation } from "@stewed/hooks";
// Tokens
import { components } from "@stewed/tokens";
// Styles
import styles from "./styles/index.module.scss";

export interface SegmentedProps<T extends string>
  extends React.ComponentPropsWithRef<"div">,
    SegmentedProviderProps<T> {
  /**
   * Changes the size of the segmented, giving it more or less padding.
   * @default md
   */
  size?: "sm" | "md" | "lg";
}

export function Segmented<T extends string>({
  value,
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
      modifiers: [size],
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
    <div ref={ref} className={cssClasses.root} onKeyDown={onHandleKeyDown} {...props}>
      <SegmentedProvider value={value} onValueChange={onValueChange}>
        {children}
      </SegmentedProvider>
    </div>
  );
}

// Compound component composition
Segmented.Item = SegmentedItem;
