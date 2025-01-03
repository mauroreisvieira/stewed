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

type TableAppearance = "border" | "border-rows" | "border-columns" | "striped-rows";

export interface TableProps extends React.ComponentPropsWithoutRef<"table"> {
  /**
   * Change the visual appearance of the table.
   * @default default
   */
  appearance?: "default" | TableAppearance | TableAppearance[];
  /** Enable a hover state on table rows within */
  hoverable?: boolean;
}

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
