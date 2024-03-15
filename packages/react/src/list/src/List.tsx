import React from "react";
// Compound Component
import { ListItem } from "./ListItem";
// Hooks
import { useBem } from "@stewed/hooks";
// Tokens
import { type Spacings, components } from "@stewed/tokens";
// Styles
import styles from "./styles/index.module.scss";

export interface ListProps {
  /**
   * Type of list to display.
   * @default bullet
   */
  type?: "bullet" | "decimal";
  /**
   * The gap between items.
   * @default xs
   */
  gap?: Spacings;
  /** Additional class name(s) for the list. */
  className?: string;
  /** The children nodes to render within the list. */
  children?: React.ReactNode;
}

/**
 * List display a set of related text-only content. Each list item begins with a bullet or a decimal.
 *
 * @example
 * ```tsx
 * <List>
 *   <List.Item>Item 1<List.Item>
 *   <List.Item>Item 2<List.Item>
 * </List>
 * ```
 *
 * @param {ListProps} props - The props for the List component.
 * @returns {React.ReactElement} - The rendered List component.
 */
export function List({
  type = "bullet",
  gap = "xs",
  className,
  children,
}: ListProps): React.ReactElement {
  // Determine the component type based on 'type' prop.
  const Comp = type === "bullet" ? "ul" : "ol";

  // Importing useBem to handle BEM class names
  const { getBlock } = useBem({ block: components.List, styles });

  // Generating CSS classes based on component props and styles
  const cssClasses = {
    root: getBlock({
      extraClasses: className,
      modifiers: [type, `gap-${gap}`],
    }),
  };

  return <Comp className={cssClasses.root}>{children}</Comp>;
}

// Compound component composition
List.Item = ListItem;
