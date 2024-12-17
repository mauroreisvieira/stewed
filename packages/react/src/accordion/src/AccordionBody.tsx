import React from "react";
// Hooks
import { useBem } from "@stewed/hooks";
// Tokens
import { components } from "@stewed/tokens";
// Styles
import styles from "./styles/index.module.scss";

/**
 * Props for the `AccordionBody` component.
 * Inherits the standard props of a `div` element, allowing you to pass any props a `div` would accept.
 */
export type AccordionBodyProps = React.ComponentPropsWithoutRef<"div">;

/**
 * Component used to display the body content of an accordion item.
 * It allows any valid `div` props to be passed, such as `className`, `style`, etc.
 *
 * @param props - The props for the `AccordionBody` component.
 * @returns The rendered `AccordionBody` component.
 */
export function AccordionBody({
  className,
  children,
  ...props
}: AccordionBodyProps): React.ReactElement {
  // Importing useBem to handle BEM class names
  const { getBlock } = useBem({ block: `${components.Accordion}__body`, styles });

  // Generating CSS classes based on component props and styles
  const cssClasses = {
    root: getBlock({ extraClasses: className })
  };

  return (
    <div className={cssClasses.root} {...props}>
      {children}
    </div>
  );
}
