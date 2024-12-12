import React from "react";
// Hooks
import { useBem } from "@stewed/hooks";
// Tokens
import { components } from "@stewed/tokens";
// Styles
import styles from "./styles/index.module.scss";

export interface DayProps extends React.ComponentPropsWithoutRef<"button"> {
  /** Indicates whether this day is today. */
  today?: boolean;
  /** Indicates whether this day is selected. */
  selected?: boolean;
  /** Indicates whether this day is highlighted (for events, holidays, etc.). */
  highlighted?: boolean;
  /** Indicates whether this day falls on a weekend. */
  weekend?: boolean;
  /** Indicates whether this day belongs to the previous or next month but is visible in the current view. */
  siblingMonthDays?: boolean;
  /** Indicates whether this day is locked and cannot be interacted with. */
  locked?: boolean;
  /** Indicates if this day is the start of a selected date range. */
  startRange?: boolean;
  /** Indicates if this day falls within a selected date range. */
  inRange?: boolean;
  /** Indicates if this day is the end of a selected date range. */
  endRange?: boolean;
}

export function Day({
  today,
  selected,
  highlighted,
  weekend,
  siblingMonthDays,
  locked,
  disabled,
  startRange,
  inRange,
  endRange,
  children,
  ...props
}: DayProps): React.ReactElement {
  // Importing useBem to handle BEM class names
  const { getBlock } = useBem({ block: `${components.Calendar}__day`, styles });

  // Generating CSS classes based on component props and styles
  const cssClasses = {
    root: getBlock({
      modifiers: [
        today && "today",
        selected && !inRange && "selected",
        disabled && "disabled",
        locked && "locked",
        highlighted && "highlighted",
        weekend && "weekend",
        siblingMonthDays && "sibling-month-day",
        startRange && "start-range",
        inRange && "in-range",
        endRange && "end-range"
      ]
    })
  };

  return (
    <button
      className={cssClasses.root}
      role="checkbox"
      aria-checked={selected}
      aria-disabled={disabled || locked}
      disabled={disabled || locked}
      tabIndex={-1}
      {...props}
    >
      {children}
    </button>
  );
}
