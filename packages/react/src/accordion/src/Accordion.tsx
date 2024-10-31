import React from "react";
// Compound Component
import { AccordionBody } from "./AccordionBody";
import { AccordionHeader } from "./AccordionHeader";
import { AccordionItem } from "./AccordionItem";
// Hooks
import { useBem } from "@stewed/hooks";
// Tokens
import { components } from "@stewed/tokens";
// Styles
import styles from "./styles/index.module.scss";

interface AccordionProps extends React.ComponentPropsWithoutRef<"div"> {
  /**
   * Change the visual appearance of the accordion.
   * @default default
   */
  appearance?: "default" | "border";
}

/**
 * The Accordion component lets users show and hide sections of related content on a page.
 *
 * @param {AccordionProps} props - The props for the Accordion component.
 * @returns {React.ReactElement} - The rendered Accordion component.
 *
 * @remarks This component props extended from React.ComponentPropsWithoutRef<"div">.
 *
 * @example
 * ```tsx
 * <Accordion>
 *    <Accordion.Item>
 *      <Accordion.Header>Title</Accordion.Header>
 *      <Accordion.Body>Body</Accordion.Body>
 *    </Accordion.Item>
 * </Accordion>
 * ```
 *
 * ```tsx
 * <Accordion>
 *    <Accordion.Item>
 *        {( { open }) => (
 *            <>
 *                <Accordion.Header rightSlot={open ? "-" : "+"}>Title</Accordion.Header
 *                <Accordion.Body>Body</Accordion.Body>
 *            </>
 *        )}
 *    </Accordion.Item>
 * </Accordion>
 * ```
 */
export function Accordion({
  appearance,
  className,
  children,
  ...props
}: AccordionProps): React.ReactElement {
  // Importing useBem to handle BEM class names
  const { getBlock } = useBem({ block: components.Accordion, styles });

  // Generating CSS classes based on component props and styles
  const cssClasses = {
    root: getBlock({ modifiers: [appearance], extraClasses: className }),
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
