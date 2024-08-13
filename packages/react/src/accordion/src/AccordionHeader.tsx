import React, { useCallback } from "react";
// Hooks
import { useBem } from "@stewed/hooks";
import { useAccordion } from "./AccordionContext";
// Tokens
import { components } from "@stewed/tokens";
// Styles
import styles from "./styles/index.module.scss";

export interface AccordionHeaderProps extends React.ComponentPropsWithRef<"div"> {
  /** The content for the left slot of the accordion header. */
  leftSlot?: React.ReactNode;
  /** The content for the right slot of the accordion header. */
  rightSlot?: React.ReactNode;
}

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
  const { setOpen, open } = useAccordion();

  // Generating CSS classes based on component props and styles
  const cssClasses = {
    root: getBlock({ extraClasses: className }),
    left: getElement(["left"]),
    right: getElement(["right"]),
    text: getElement(["text"]),
  };

  /**
   * Handles click events on the accordion item.
   * Toggles the open state of the accordion and calls the onClick prop if provided.
   *
   * @param event - The click event
   */
  const onHandleClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>): void => {
      event.stopPropagation();
      setOpen((prev) => !prev);
      onClick?.(event);
    },
    [onClick, setOpen],
  );

  return (
    <summary className={cssClasses.root} onClick={onHandleClick} aria-expanded={open} {...props}>
      {leftSlot && <div className={cssClasses.left}>{leftSlot}</div>}
      <div className={cssClasses.text}>{children}</div>
      {rightSlot && <div className={cssClasses.right}>{rightSlot}</div>}
    </summary>
  );
}
