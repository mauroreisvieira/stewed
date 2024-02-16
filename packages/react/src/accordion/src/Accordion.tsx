import React from "react";
// Compound Component
import { AccordionItem } from "./AccordionItem";
import { AccordionHeader } from "./AccordionHeader";
import { AccordionBody } from "./AccordionBody";
// Hooks
import { useBem } from "@stewed/hooks";
// Tokens
import { components } from "@stewed/tokens";
// Styles
import styles from "./styles/index.module.scss";

export function Accordion({
  className,
  children,
  ...props
}: React.ComponentPropsWithRef<"div">): React.ReactElement {
  // Importing useBem to handle BEM class names
  const { getBlock } = useBem({ block: components.Accordion, styles });

  // Generating CSS classes based on component props and styles
  const cssClasses = {
    root: getBlock({ extraClasses: className }),
  };

  return (
    <div className={cssClasses.root} {...props}>
      {children}
    </div>
  );
}

// Compound component composition
Accordion.Item = AccordionItem;
Accordion.Header = AccordionHeader;
Accordion.Body = AccordionBody;
