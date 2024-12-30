import React from "react";
// Hooks
import { useBem } from "@stewed/hooks";
// Tokens
import { components } from "@stewed/tokens";
// Styles
import styles from "./styles/index.module.scss";

/**
 * Props for a ListItem component.
 * Extends the default properties of an HTML `<li>` element.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/li}
 */
export type ListItemProps = React.ComponentPropsWithoutRef<"li">;

/**
 * A functional component that renders a list item (`<li>`).
 *
 * @see {@link ListItemProps} for more details on the available props.
 *
 * @param props - Additional props to pass to the `<li>` element.
 * @returns A React element representing the list item.
 */
export function ListItem({ className, children, ...props }: ListItemProps): React.ReactElement {
  // Importing useBem to handle BEM class names
  const { getBlock } = useBem({ block: `${components.List}__item`, styles });

  // Generating CSS classes based on component props and styles
  const cssClasses = {
    root: getBlock({
      extraClasses: className
    })
  };

  return (
    <li className={cssClasses.root} {...props}>
      {children}
    </li>
  );
}
