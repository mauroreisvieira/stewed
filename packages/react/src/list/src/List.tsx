import React from "react";
// Compound Component
import { ListItem } from "./ListItem";
// Hooks
import { useBem } from "@stewed/hooks";
// Tokens
import { components, type Spacings } from "@stewed/tokens";
// Styles
import styles from "./styles/index.module.scss";

/**
 * Props for the List component.
 * Extends the default properties of an HTML `<ul>` element.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ul}
 */
export interface ListProps extends React.ComponentPropsWithoutRef<"ul"> {
  /**
   * Type of list to display.
   * @default bullet
   */
  type?: "bullet" | "decimal" | "none";
  /**
   * The gap between items.
   * @default xs
   */
  gap?: Spacings;
}

/**
 * List display a set of related text-only content.
 *
 * @example
 * ```tsx
 * <List type="bullet">
 *   <List.Item>Item 1<List.Item>
 *   <List.Item>Item 2<List.Item>
 * </List>
 * ```
 *
 * @remarks This component props extended from React.ComponentPropsWithoutRef<"ul">.
 *
 * @see {@link ListProps} for more details on the available props.
 * @param props - The props for the List component.
 * @returns The rendered List component.
 */
export function List({
  type = "bullet",
  gap = "xs",
  className,
  children,
  ...props
}: ListProps): React.ReactElement {
  // Importing useBem to handle BEM class names
  const { getBlock } = useBem({ block: components.List, styles });

  // Generating CSS classes based on component props and styles
  const cssClasses = {
    root: getBlock({
      extraClasses: className,
      modifiers: [type, `gap-${gap}`]
    })
  };

  return (
    <ul className={cssClasses.root} {...props}>
      {children}
    </ul>
  );
}

// Compound component composition
List.Item = ListItem;
