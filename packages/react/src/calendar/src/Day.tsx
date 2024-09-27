import React from "react";
// UI Components
import { Button } from "../../index";

interface DayProps extends React.ComponentPropsWithoutRef<"div"> {
  className?: string;
  dayOfMonth: number;
  dayOfWeek: number;
  fullScreen?: boolean;
  disabled?: boolean;
  highlighted?: boolean;
  locked?: boolean;
  inRange?: boolean;
  startRange?: boolean;
  endRange?: boolean;
  selected?: boolean;
  today?: boolean;
  weekend?: boolean;
}

export function Day({
  className,
  dayOfMonth,
  dayOfWeek,
  disabled,
  highlighted,
  locked,
  inRange,
  startRange,
  endRange,
  selected,
  today,
  weekend,
  children,
  onClick,
}: DayProps): React.ReactElement {
  return (
    <div
      tabIndex={0}
      role="button"
      className={className}
      aria-disabled={disabled || locked}
      onClick={onClick}>
      {children}
    </div>
  );
}
