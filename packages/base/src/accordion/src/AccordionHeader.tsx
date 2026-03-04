import React, { useCallback } from "react";
// Context
import { useAccordion } from "./AccordionContext";
import { useAccordionItem } from "./AccordionItemContext";

/**
 * Props for the `AccordionHeader` component.
 * Extends the props of a `div` element to allow passing standard `div` attributes.
 */
export type AccordionHeaderProps = React.ComponentPropsWithoutRef<"div">;
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
  children,
  onClick,
  ...props
}: AccordionHeaderProps): React.ReactElement {
  // Importing useAccordion to manage the accordion state
  const { setOpen, multipleExpanded, onOpenChange } = useAccordion();

  // Importing useAccordionItem to get the value of the accordion item
  const { value, disabled } = useAccordionItem();

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

      // Will prevent to close other items when click
      if (disabled) {
        return;
      }

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
    [multipleExpanded, onClick, setOpen, value, onOpenChange, disabled]
  );

  return (
    <summary onClick={onHandleClick} aria-disabled={disabled} {...props}>
      {children}
    </summary>
  );
}
