import React from "react";
// Hooks
import { useBem } from "../../../../hooks/index";
// Tokens
import { components } from "@stewed/tokens";
// Styles
import styles from "./styles/index.module.scss";

interface FormFieldControlProps {
  className?: string;
  children: React.ReactNode;
}

export function FormFieldControl({
  className,
  ...props
}: FormFieldControlProps): React.ReactElement {
  // Importing useBem to handle BEM class names
  const { getBlock } = useBem({ block: `${components.FormField}__control`, styles });

  // Generating CSS classes based on component props and styles
  const cssClasses = {
    root: getBlock({ extraClasses: className }),
  };

  return <div role="presentation" className={cssClasses.root} {...props} />;
}
