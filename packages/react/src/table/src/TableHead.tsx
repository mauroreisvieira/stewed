import React from "react";
// Hooks
import { useBem } from "@stewed/hooks";
// Tokens
import { components } from "@stewed/tokens";
// Styles
import styles from "./styles/index.module.scss";

export interface TableHeadProps extends React.ComponentPropsWithoutRef<"thead"> {
  /**
   * Change the visual style of the table head.
   * @default neutral-faded
   */
  skin?: "default" | "neutral-faded" | "primary-faded";
}

export function TableHead({
  skin = "neutral-faded",
  className,
  children,
  ...props
}: TableHeadProps): React.ReactElement {
  // Importing useBem to handle BEM class names
  const { getBlock } = useBem({ block: `${components.Table}__head`, styles });

  // Generating CSS classes based on component props and styles
  const cssClasses = {
    root: getBlock({ modifiers: [skin], extraClasses: className }),
  };

  return (
    <thead className={cssClasses.root} {...props}>
      {children}
    </thead>
  );
}
