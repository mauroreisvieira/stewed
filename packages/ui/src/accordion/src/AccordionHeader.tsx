import React from "react";
// Base
import {
  Accordion as Unstyled_Accordion,
  type AccordionBodyProps as Unstyled_AccordionBodyProps,
  useAccordionItem
} from "@stewed/react";
// Hooks
import { useBem } from "@stewed/hooks";
// Tokens
import { components } from "@stewed/tokens";
// Styles
import styles from "./styles/index.module.scss";

/**
 * Props for the `AccordionHeader` component.
 * Extends the props of a `div` element to allow passing standard `div` attributes.
 */
export interface AccordionHeaderProps extends Unstyled_AccordionBodyProps {
  /** The content for the left slot of the accordion header. */
  leftSlot?: React.ReactNode;
  /** The content for the right slot of the accordion header. */
  rightSlot?: React.ReactNode;
}

/**
 * Component used to display a header in an accordion.
 * It can accept all the standard props of a `div` element along with `children`.
 *
 * @param props - The props for the AccordionHeader component.
 * @returns The rendered AccordionHeader component.
 *
 * @see {@link AccordionHeaderProps} for the complete list of props.
 */
export function AccordionHeader({
  leftSlot,
  rightSlot,
  className,
  children,
  ...props
}: AccordionHeaderProps): React.ReactElement {
  // Importing useBem to handle BEM class names
  const { getBlock, getElement } = useBem({ block: `${components.Accordion}__header`, styles });

  // Importing useAccordionItem to get the value of the accordion item
  const { disabled } = useAccordionItem();

  // Generating CSS classes based on component props and styles
  const cssClasses = {
    root: getBlock({ extraClasses: className, modifiers: [disabled && "disabled"] }),
    left: getElement(["left"]),
    right: getElement(["right"]),
    text: getElement(["text"])
  };

  return (
    <Unstyled_Accordion.Header className={cssClasses.root} {...props}>
      {leftSlot && <div className={cssClasses.left}>{leftSlot}</div>}
      <div className={cssClasses.text}>{children}</div>
      {rightSlot && <div className={cssClasses.right}>{rightSlot}</div>}
    </Unstyled_Accordion.Header>
  );
}
