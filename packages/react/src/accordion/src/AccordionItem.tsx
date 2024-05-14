import React, { useEffect, useState } from "react";
// Context
import { AccordionProvider } from "./context/AccordionProvider";
// Hooks
import { useBem } from "@stewed/hooks";
// Tokens
import { components } from "@stewed/tokens";
// Styles
import styles from "./styles/index.module.scss";
import { Separator } from "../../separator";

interface AccordionItemProps extends Omit<React.ComponentPropsWithRef<"details">, "children"> {
  /**
   * The content to be displayed in the accordion item body.
   * This can be a React node or a function receiving the open state and returning a React node.
   */
  children?: React.ReactNode | (({ open }: { open: boolean }) => React.ReactNode);
}

export function AccordionItem({
  open: defaultOpen = false,
  children,
  ...props
}: AccordionItemProps): React.ReactElement {
  // Importing useAccordion to manage the accordion state
  const [open, setOpen] = useState(defaultOpen);

  /**
   * Effect hook to set the initial open state of the accordion item.
   * This effect runs only once after the component is mounted.
   */
  useEffect(() => {
    setOpen(defaultOpen || false);
  }, [defaultOpen]);

  return (
    <AccordionProvider open={open} setOpen={setOpen}>
      <details open={defaultOpen} {...props}>
        {typeof children === "function" ? children({ open }) : children}
      </details>
      <Separator />
    </AccordionProvider>
  );
}
