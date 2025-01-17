import React from "react";
// Compound Component
import { TableBody } from "./TableBody";
import { TableCell } from "./TableCell";
import { TableHead } from "./TableHead";
import { TableFoot } from "./TableFoot";
import { TableRow } from "./TableRow";
// Hooks
import { useBem } from "@stewed/hooks";
// Tokens
import { components } from "@stewed/tokens";
// Styles
import styles from "./styles/index.module.scss";

/**
 * Defines the appearance options for the Table component.
 *
 * - "border": A table with borders around all cells.
 * - "border-rows": A table with borders only on the rows.
 * - "border-columns": A table with borders only on the columns.
 * - "striped-rows": A table with alternating row colors for better readability.
 */
type TableAppearance = "border" | "border-rows" | "border-columns" | "striped-rows";

/**
 * Props for the Table component.
 * Extends the standard table element props to allow for additional customization.
 */
export interface TableProps extends React.ComponentPropsWithoutRef<"table"> {
  /**
   * Change the visual appearance of the table.
   * @default default
   */
  appearance?: "default" | TableAppearance | TableAppearance[];
  /** Enable a hover state on table rows within */
  hoverable?: boolean;
}

/**
 * Table component that renders a customizable table element.
 *
 * @param props - The properties for the Table component.
 * @returns The rendered Table component.
 *
 * @see {@link TableProps} for the complete list of props.
 * @see {@link TableAppearance} for the available appearance options.
 */
export function Table({
  appearance = "default",
  hoverable,
  className,
  children,
  ...props
}: TableProps): React.ReactElement {
  // Importing useBem to handle BEM class names
  const { getBlock } = useBem({ block: components.Table, styles });

  // Ensure appearance is an array
  const computedAppearance = Array.isArray(appearance) ? appearance : [appearance];

  // Generating CSS classes based on component props and styles
  const cssClasses = {
    root: getBlock({
      modifiers: [...computedAppearance.map((i) => i), hoverable && "hoverable"],
      extraClasses: className
    })
  };

  return (
    <table className={cssClasses.root} {...props}>
      {children}
    </table>
  );
}

// Compound component composition
Table.Head = TableHead;
Table.Foot = TableFoot;
Table.Cell = TableCell;
Table.Body = TableBody;
Table.Row = TableRow;
