import React, { useCallback, useState } from "react";
// Context
import { AccordionContext, type AccordionContextProps } from "./AccordionContext";
// Compound Component
import { AccordionBody } from "./AccordionBody";
import { AccordionHeader } from "./AccordionHeader";
import { AccordionItem } from "./AccordionItem";
// Hooks
import { useKeyboardNavigation } from "@stewed/hooks";

/**
 * Props for the Accordion component.
 *
 * This interface extends `AccordionContextProps`, omitting the `open` and `setOpen`
 * properties, and includes the standard properties of a `div` element.
 */
export type AccordionProps = Omit<AccordionContextProps, "open" | "setOpen"> &
  React.ComponentPropsWithoutRef<"div">;

/**
 * The Accordion component lets users show and hide sections of related content on a page.
 *
 * @remarks This component props extended from React.ComponentPropsWithoutRef<"div">.
 *
 * @param props - The props for the Accordion component.
 * @returns The rendered Accordion component.
 *
 * @see {@link AccordionProps} for more details on the available props.
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
  hiddenUntilFound = true,
  onKeyDown,
  children,
  onOpenChange,
  ...props
}: AccordionProps): React.ReactElement {
  // Used to manage the accordion state
  const [open, setOpen] = useState<string[]>([]);

  // Define a reference to a list element
  const { ref, onNavigate } = useKeyboardNavigation<HTMLDivElement>({
    target: "summary:not([aria-disabled='true'])",
    loop: true,
    preventDefaultOnKey: true // prevent arrow key scrolling in users browser
  });

  const onHandleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      onNavigate(event);
      onKeyDown?.(event);
    },
    [onKeyDown, onNavigate]
  );

  return (
    <AccordionContext value={{ hiddenUntilFound, multipleExpanded, onOpenChange, open, setOpen }}>
      <div ref={ref} role="group" onKeyDown={onHandleKeyDown} {...props}>
        {children}
      </div>
    </AccordionContext>
  );
}

// Compound component composition
Accordion.Item = AccordionItem;
Accordion.Header = AccordionHeader;
Accordion.Body = AccordionBody;
