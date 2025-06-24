import React from "react";
// Base
import {
  Accordion as Unstyled_Accordion,
  type AccordionItemProps as Unstyled_AccordionItemProps
} from "@stewed/react";
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
export type AccordionItemProps = Unstyled_AccordionItemProps;

/**
 * Component used to display an individual item in the accordion.
 * It controls whether the item is open or closed, and it can receive additional props from the native `details` element.
 *
 * @param props - The props for the `AccordionItem` component.
 * @returns The rendered `AccordionItem` component.
 *
 * @see {@link AccordionItemProps} for the complete list of props.
 */
export function AccordionItem({
  children,
  className,
  ...props
}: AccordionItemProps): React.ReactElement {
  // Importing useBem to handle BEM class names
  const { getBlock } = useBem({ block: `${components.Accordion}__item`, styles });

  // Generating CSS classes based on component props and styles
  const cssClasses = {
    root: getBlock({ extraClasses: className })
  };

  return (
    <Unstyled_Accordion.Item className={cssClasses.root} {...props}>
      {children}
    </Unstyled_Accordion.Item>
  );
}
