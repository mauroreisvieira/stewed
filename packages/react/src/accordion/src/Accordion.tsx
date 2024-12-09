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

interface AccordionProps
  extends Omit<AccordionContextProps, "open" | "setOpen">,
    React.ComponentPropsWithoutRef<"div"> {
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
  multipleExpanded = false,
  onOpenChange,
  appearance,
  className,
  onKeyDown,
  children,
  ...props
}: AccordionProps): React.ReactElement {
  // Importing useBem to handle BEM class names
  const { getBlock } = useBem({ block: components.Accordion, styles });

  // Generating CSS classes based on component props and styles
  const cssClasses = {
    root: getBlock({ modifiers: [appearance], extraClasses: className }),
  };

  // Used to manage the accordion state
  const [open, setOpen] = useState<string[]>([]);

  // Define a reference to a list element
  const { ref, onNavigate } = useKeyboardNavigation<HTMLDivElement>({
    target: "summary:not([aria-disabled='true'])",
    loop: true,
  });

  const onHandleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      onNavigate(event);
      onKeyDown?.(event);
    },
    [onKeyDown, onNavigate],
  );

  return (
    <AccordionContext.Provider value={{ multipleExpanded, onOpenChange, open, setOpen }}>
      <div
        ref={ref}
        role="group"
        className={cssClasses.root}
        onKeyDown={onHandleKeyDown}
        {...props}
      >
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

// Compound component composition
Accordion.Item = AccordionItem;
Accordion.Header = AccordionHeader;
Accordion.Body = AccordionBody;
