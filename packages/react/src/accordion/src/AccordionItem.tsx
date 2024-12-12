import React, { useCallback, useEffect, useMemo } from "react";
// Context
import { useAccordion } from "./AccordionContext";
// Hooks
import { useBem } from "@stewed/hooks";
// Tokens
import { components } from "@stewed/tokens";
// Styles
import styles from "./styles/index.module.scss";

export interface AccordionItemProps
  extends Omit<React.ComponentPropsWithoutRef<"details">, "children" | "open"> {
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
   * A unique identifier for the accordion item.
   * Used to track which accordion item is open, typically to manage the accordion's open/closed state in a collection of items.
   */
  value: string;
  /**
   * The content to be displayed in the accordion item body
   * or a function receiving the open state and returning a React node.
   */
  children?: React.ReactNode | (({ open }: { open: boolean }) => React.ReactNode);
}

export function AccordionItem({
  value,
  defaultOpen = false,
  children,
  className,
  onClick,
  ...props
}: AccordionItemProps): React.ReactElement {
  // Importing useBem to handle BEM class names
  const { getBlock } = useBem({ block: `${components.Accordion}__item`, styles });

  // Importing useAccordion to manage the accordion state
  const { setOpen, open, multipleExpanded, onOpenChange } = useAccordion();

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

  /**
   * Handles click events on the accordion item.
   * This function is responsible for toggling the open state of the accordion item
   * based on the `multipleExpanded` flag and the current `value`.
   *
   * @param event - The click event triggered when the accordion item is clicked.
   */
  const onHandleClick: React.MouseEventHandler<HTMLDetailsElement> = useCallback(
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
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events
    <details onClick={onHandleClick} className={cssClasses.root} open={isOpen} {...props}>
      {typeof children === "function" ? children({ open: isOpen }) : children}
    </details>
  );
}
