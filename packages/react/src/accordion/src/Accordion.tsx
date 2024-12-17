import React, { useCallback, useState } from "react";
// Context
import { AccordionContext, type AccordionContextProps } from "./AccordionContext";
// Compound Component
import { AccordionBody } from "./AccordionBody";
import { AccordionHeader } from "./AccordionHeader";
import { AccordionItem } from "./AccordionItem";
// Hooks
import { useBem, useKeyboardNavigation } from "@stewed/hooks";
// Tokens
import { components } from "@stewed/tokens";
// Styles
import styles from "./styles/index.module.scss";

/**
 * Defines the appearance options for the Accordion component.
 * - `"border"`: Applies a border to the Accordion.
 * - `"border-row"`: Applies a border specifically to each row within the Accordion.
 *
 * @default border-row
 */
type Appearance = "border" | "border-row";

/**
 * Props for the Accordion component.
 *
 * This interface extends `AccordionContextProps`, omitting the `open` and `setOpen`
 * properties, and includes the standard properties of a `div` element.
 */
interface AccordionProps
  extends Omit<AccordionContextProps, "open" | "setOpen">,
    React.ComponentPropsWithoutRef<"div"> {
  /**
   * Change the visual appearance of the accordion.
   * @default border-row
   */
  appearance?: "panel" | Appearance | Appearance[];
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
  multipleExpanded = false,
  appearance = "border-row",
  className,
  onKeyDown,
  children,
  onOpenChange,
  ...props
}: AccordionProps): React.ReactElement {
  // Importing useBem to handle BEM class names
  const { getBlock } = useBem({ block: components.Accordion, styles });

  // Ensure appearance is an array
  const computedAppearance = Array.isArray(appearance) ? appearance : [appearance];

  // Generating CSS classes based on component props and styles
  const cssClasses = {
    root: getBlock({ modifiers: [...computedAppearance.map((i) => i)], extraClasses: className })
  };

  // Used to manage the accordion state
  const [open, setOpen] = useState<string[]>([]);

  // Define a reference to a list element
  const { ref, onNavigate } = useKeyboardNavigation<HTMLDivElement>({
    target: "summary:not([aria-disabled='true'])",
    loop: true
  });

  const onHandleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      onNavigate(event);
      onKeyDown?.(event);
    },
    [onKeyDown, onNavigate]
  );

  return (
    <AccordionContext value={{ multipleExpanded, onOpenChange, open, setOpen }}>
      <div
        ref={ref}
        role="group"
        className={cssClasses.root}
        onKeyDown={onHandleKeyDown}
        {...props}
      >
        {children}
      </div>
    </AccordionContext>
  );
}

// Compound component composition
Accordion.Item = AccordionItem;
Accordion.Header = AccordionHeader;
Accordion.Body = AccordionBody;
