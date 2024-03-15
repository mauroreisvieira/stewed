import React from "react";
// Compound Component
import { TableBody } from "./TableBody";
import { TableCell } from "./TableCell";
import { TableHead } from "./TableHead";
import { TableRow } from "./TableRow";
// Hooks
import { useBem } from "@stewed/hooks";
// Tokens
import { components } from "@stewed/tokens";
// Styles
import styles from "./styles/index.module.scss";

type TableAppearance = "border" | "border-rows" | "border-columns" | "striped";

export interface TableProps extends React.ComponentPropsWithRef<"table"> {
  /**
   * Change the visual appearance of the table.
   * @default border
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
  const computedVariation = Array.isArray(appearance) ? appearance : [appearance];

  // Generating CSS classes based on component props and styles
  const cssClasses = {
    root: getBlock({
      modifiers: [...computedVariation.map((i) => i), hoverable && "hoverable"],
      extraClasses: className,
    }),
  };

  return (
    <table className={cssClasses.root} {...props}>
      {children}
    </table>
  );
}

// Compound component composition
Table.Head = TableHead;
Table.Cell = TableCell;
Table.Body = TableBody;
Table.Row = TableRow;
