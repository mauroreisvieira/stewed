import React from "react";
// Hooks
import { useBem } from "@stewed/hooks";
// Tokens
import { components } from "@stewed/tokens";
// Styles
import styles from "./styles/index.module.scss";

/**
 * Props for the TableRow component.
 * Extends the standard `tr` element props to allow for additional customization.
 */
export interface TableRowProps extends React.ComponentPropsWithoutRef<"tr"> {
  /**
   * Specifies the visual style of the table row.
   * @default default
   */
  skin?: "default" | "critical";

  /** Indicates whether the item is selected. */
  selected?: boolean;
}

/**
 * TableRow component that renders a tr element for a table.
 *
 * @param props - The properties for the TableRow component.
 * @returns The rendered TableRow component.
 *
 * @see {@link TableRowProps} for the complete list of props.
 */
export function TableRow({
  selected = false,
  skin = "default",
  className,
  children,
  ...props
}: TableRowProps): React.ReactElement {
  // Importing useBem to handle BEM class names
  const { getBlock } = useBem({ block: `${components.Table}__row`, styles });

  // Generating CSS classes based on component props and styles
  const cssClasses = {
    root: getBlock({
      modifiers: [selected && "selected", skin !== "default" && skin],
      extraClasses: className
    })
  };

  return (
    <tr className={cssClasses.root} {...props}>
      {children}
    </tr>
  );
}
