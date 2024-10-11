import React from "react";
// Hooks
import { useBem } from "@stewed/hooks";
import { useCalendarContext } from "./CalendarContext";
// Tokens
import { components } from "@stewed/tokens";
// Styles
import styles from "./styles/index.module.scss";

interface NavigationChildrenProps {
  /**
   * Callback function to handle the previous action, such as navigating to the previous month.
   * @returns void
   */
  onPrev: (() => void) | undefined;
  /**
   * Callback function to handle the next action, such as navigating to the next month.
   * @returns void
   */
  onNext: (() => void) | undefined;
  /**  The current month displayed. */
  month: string | undefined;
  /** The current year displayed. */
  year: string | undefined;
  /** Indicates whether navigation is locked or disabled. */
  locked: boolean | undefined;
}

export interface NavigationProps {
  /**  Additional CSS class name for the root element of the navigation component. */
  className?: string;
  /**
   * Function that renders the navigation children.
   *
   * @param props - The `NavigationChildrenProps` object containing:
   * @returns A `React.ReactElement` that represents the rendered navigation UI.
   */
  children?: (props: NavigationChildrenProps) => React.ReactElement;
}

export function Navigation({ children, className }: NavigationProps): React.ReactElement {
  // Importing useBem to handle BEM class names
  const { getBlock } = useBem({ block: `${components.Calendar}__navigation`, styles });

  const { onPrev, onNext, month, year, locked } = useCalendarContext();

  // Generating CSS classes based on component props and styles
  const cssClasses = {
    root: getBlock({ extraClasses: className }),
  };

  return (
    <div className={cssClasses.root}>{children?.({ onPrev, onNext, month, year, locked })}</div>
  );
}
