import React from "react";
// Hooks
import { useBem } from "@stewed/hooks";
// Tokens
import { components } from "@stewed/tokens";
// Styles
import styles from "./styles/index.module.scss";

interface AccordionItemProps extends React.ComponentPropsWithRef<"details"> {
  /** The controlled open state of the dialog.  */
  open?: boolean;
}

export function AccordionItem({
  className,
  children,
  ...props
}: AccordionItemProps): React.ReactElement {
  // Importing useBem to handle BEM class names
  const { getBlock } = useBem({ block: `${components.Accordion}__item`, styles });

  // Generating CSS classes based on component props and styles
  const cssClasses = {
    root: getBlock({ modifiers: [], extraClasses: className }),
  };

  return (
    <details className={cssClasses.root} {...props}>
      {children}
    </details>
  );
}
