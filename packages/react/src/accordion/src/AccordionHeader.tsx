import React, { useCallback } from "react";
// Context
import { useAccordion } from "./AccordionContext";
import { useAccordionItem } from "./AccordionItemContext";
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
export interface AccordionHeaderProps extends React.ComponentPropsWithoutRef<"div"> {
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
 */
export function AccordionHeader({
  leftSlot,
  rightSlot,
  className,
  children,
  onClick,
  ...props
}: AccordionHeaderProps): React.ReactElement {
  // Importing useBem to handle BEM class names
  const { getBlock, getElement } = useBem({ block: `${components.Accordion}__header`, styles });

  // Importing useAccordion to manage the accordion state
  const { setOpen, multipleExpanded, onOpenChange } = useAccordion();

  // Importing useAccordionItem to get the value of the accordion item
  const { value } = useAccordionItem();

  // Generating CSS classes based on component props and styles
  const cssClasses = {
    root: getBlock({ extraClasses: className }),
    left: getElement(["left"]),
    right: getElement(["right"]),
    text: getElement(["text"])
  };

  /**
   * Handles click events on the accordion item.
   * This function is responsible for toggling the open state of the accordion item
   * based on the `multipleExpanded` flag and the current `value`.
   *
   * @param event - The click event triggered when the accordion item is clicked.
   */
  const onHandleClick: React.MouseEventHandler<HTMLDivElement> = useCallback(
    (event): void => {
      // Prevent the default behavior of the details element (e.g., automatic toggle)
      event.preventDefault();

      // Update the `open` state based on whether the item is already open or not
      setOpen((prev) => {
        const isAlreadyOpen = prev.includes(value);

        // Prepare the new open state based on whether multiple items can be expanded
        let updatedValues: string[];

        if (multipleExpanded) {
          // If `multipleExpanded` is true, allow multiple items to be open at once
          updatedValues = isAlreadyOpen
            ? prev.filter((item) => item !== value) // Close if already open
            : [...prev, value]; // Open if closed
        } else {
          // If `multipleExpanded` is false, only one item can be open at a time
          updatedValues = isAlreadyOpen ? [] : [value]; // Toggle between open and closed
        }

        // Invoke the onOpenChange callback with the new open values
        onOpenChange?.(updatedValues);

        // Return the updated open state
        return updatedValues;
      });

      // Call the optional onClick callback prop, if provided
      onClick?.(event);
    },
    [multipleExpanded, onClick, setOpen, value, onOpenChange]
  );

  return (
    <summary onClick={onHandleClick} className={cssClasses.root} {...props}>
      {leftSlot && <div className={cssClasses.left}>{leftSlot}</div>}
      <div className={cssClasses.text}>{children}</div>
      {rightSlot && <div className={cssClasses.right}>{rightSlot}</div>}
    </summary>
  );
}
