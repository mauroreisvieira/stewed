import React from "react";
// Hooks
import { useBem } from "@stewed/hooks";
// Tokens
import { components } from "@stewed/tokens";
// Styles
import styles from "./styles/index.module.scss";

interface FormFieldControlProps {
  /** Custom class name for the form field control. */
  className?: string;
  /** The children nodes to be rendered within the form field control. */
  children: React.ReactNode;
}

export function FormFieldControl({
  className,
  ...props
}: FormFieldControlProps): React.ReactElement {
  // Importing useBem to handle BEM class names
  const { getBlock } = useBem({
    block: `${components.FormField}__control`,
    styles
  });

  // Generating CSS classes based on component props and styles
  const cssClasses = {
    root: getBlock({ extraClasses: className })
  };

  return <div className={cssClasses.root} {...props} />;
}
