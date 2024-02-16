import React from "react";
// Hooks
import { useBem } from "@stewed/hooks";
// Tokens
import { components } from "@stewed/tokens";
// Styles
import styles from "./styles/index.module.scss";

export interface AccordionHeaderProps extends React.ComponentPropsWithRef<"div"> {
  leftSlot?: React.ReactNode;
  rightSlot?: React.ReactNode;
}

export function AccordionHeader({
  leftSlot,
  rightSlot,
  className,
  children,
  ...props
}: AccordionHeaderProps): React.ReactElement {
  // Importing useBem to handle BEM class names
  const { getBlock, getElement } = useBem({ block: `${components.Accordion}__header`, styles });

  // Generating CSS classes based on component props and styles
  const cssClasses = {
    root: getBlock({ extraClasses: className }),
    left: getElement(["left"]),
    right: getElement(["right"]),
    text: getElement(["text"]),
  };

  return (
    <summary className={cssClasses.root} {...props}>
      {leftSlot && <div className={cssClasses.left}>{leftSlot}</div>}
      <div className={cssClasses.text}>{children}</div>
      {rightSlot && <div className={cssClasses.right}>{rightSlot}</div>}
    </summary>
  );
}
