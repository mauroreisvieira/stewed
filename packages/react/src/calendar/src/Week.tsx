import React from "react";
// Hooks
import { useBem } from "@stewed/hooks";
// Tokens
import { components } from "@stewed/tokens";
// Styles
import styles from "./styles/index.module.scss";

interface WeekProps {
  weekDays: string[] | undefined;
}

export function Week({ weekDays }: WeekProps): React.ReactElement {
  // Importing useBem to handle BEM class names
  const { getBlock, getElement } = useBem({ block: `${components.Calendar}__week`, styles });

  // Generating CSS classes based on component props and styles
  const cssClasses = {
    root: getBlock({}),
    day: getElement(["day"]),
  };

  return (
    <div className={cssClasses.root}>
      {weekDays?.map((week, index) => (
        <div key={`week-${index}`} className={cssClasses.day}>
          {week}
        </div>
      ))}
    </div>
  );
}
