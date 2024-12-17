import React, { useEffect, useMemo } from "react";
// Context
import { useAccordion } from "./AccordionContext";
import { AccordionItemContext, type AccordionItemContextProps } from "./AccordionItemContext";
// Hooks
import { useBem } from "@stewed/hooks";
// Tokens
import { components } from "@stewed/tokens";
// Styles
import styles from "./styles/index.module.scss";

/**
 * Props for the `AccordionItem` component.
 * Extends `AccordionItemContextProps` and omits `children` and `open` from the native `details` element.
 */
export interface AccordionItemProps
  extends AccordionItemContextProps,
    Omit<React.ComponentPropsWithoutRef<"details">, "children" | "open"> {
  /**
   * Determines whether the accordion item is initially open.
   *
   * When set to `true`, the item will be expanded by default when the component mounts.
   * If not provided, the item defaults to closed unless controlled by the parent.
   *
   * @default false
   */
  defaultOpen?: boolean;
  /**
   * The content to be displayed in the accordion item body
   * or a function receiving the open state and returning a React node.
   */
  children?:
    | React.ReactNode
    | (({
        open
      }: {
        /** The current open state of accordion item. */
        open: boolean;
      }) => React.ReactNode);
}

/**
 * Component used to display an individual item in the accordion.
 * It controls whether the item is open or closed, and it can receive additional props from the native `details` element.
 *
 * @param props - The props for the `AccordionItem` component.
 * @returns The rendered `AccordionItem` component.
 */
export function AccordionItem({
  value,
  defaultOpen = false,
  children,
  className,
  ...props
}: AccordionItemProps): React.ReactElement {
  // Importing useBem to handle BEM class names
  const { getBlock } = useBem({ block: `${components.Accordion}__item`, styles });

  // Importing useAccordion to manage the accordion state
  const { setOpen, open } = useAccordion();

  // Memoized check to determine if the current item is open.
  // This ensures that the component only re-renders when the `open` state or `value` changes.
  const isOpen = useMemo(() => open.includes(value), [open, value]);

  // Generating CSS classes based on component props and styles
  const cssClasses = {
    root: getBlock({ extraClasses: className })
  };

  // Effect hook to set the initial open state of the accordion item.
  // This effect runs only once after the component is mounted, and it will add the `value` to the `open` state if `defaultOpen` is true.
  useEffect(() => {
    if (defaultOpen) {
      setOpen((prev) => [...prev, value]);
    }
  }, [defaultOpen, setOpen, value]);

  return (
    <details className={cssClasses.root} open={isOpen} {...props}>
      <AccordionItemContext value={{ value }}>
        {typeof children === "function" ? children({ open: isOpen }) : children}
      </AccordionItemContext>
    </details>
  );
}
