import React, { useCallback } from "react";
// Context
import { useSegmented } from "./SegmentedContext";
// Hooks
import { useBem } from "@stewed/hooks";
// Tokens
import { components } from "@stewed/tokens";
// Styles
import styles from "./styles/index.module.scss";

export interface SegmentedItemProps extends React.ComponentPropsWithoutRef<"button"> {
  /** Sets or retrieves the value of a tab list. */
  value: string;
  /** Slot to display before the item children. */
  leftSlot?: React.ReactNode;
  /** Slot to display after the item children. */
  rightSlot?: React.ReactNode;
}

export function SegmentedItem({
  value,
  disabled,
  leftSlot,
  rightSlot,
  className,
  children,
  onClick,
  ...props
}: SegmentedItemProps): React.ReactElement {
  // Get `onValueChange` and `selectedValue` from the hook
  const { onValueChange, value: selectedValue } = useSegmented();

  // Determine if the current value is selected by comparing it with the selectedValue
  const isSelected = value === selectedValue;

  // Importing useBem to handle BEM class names
  const { getBlock, getElement } = useBem({ block: `${components.Segmented}__item`, styles });

  // Generating CSS classes based on component props and styles
  const cssClasses = {
    root: getBlock({
      modifiers: [isSelected && "selected", disabled && "disabled"],
      extraClasses: className,
    }),
    left: getElement(["left"]),
    right: getElement(["right"]),
  };

  // Handle click event to change the current item selected
  const onHandleClick: React.MouseEventHandler<HTMLButtonElement> = useCallback(
    (event) => {
      if (disabled) return;
      onValueChange?.(value);
      onClick?.(event);
    },
    [disabled, onClick, onValueChange, value],
  );

  return (
    <button
      role="tab"
      type="button"
      disabled={disabled}
      aria-disabled={disabled}
      aria-selected={isSelected}
      tabIndex={isSelected ? 0 : -1}
      className={cssClasses.root}
      onClick={onHandleClick}
      {...props}
    >
      {leftSlot && <div className={cssClasses.left}>{leftSlot}</div>}
      {children}
      {rightSlot && <div className={cssClasses.right}>{rightSlot}</div>}
    </button>
  );
}
