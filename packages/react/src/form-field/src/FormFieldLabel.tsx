import React from "react";
// UI Components
import { Text } from "../../typography";
// Hooks
import { useBem } from "../../../../hooks/index";
// Tokens
import { components } from "@stewed/tokens";
// Styles
import styles from "./styles/index.module.scss";

interface FormFieldLabelProps {
  className?: string;
  htmlFor?: string;
  children: React.ReactNode;
}

export function FormFieldLabel({ className, ...props }: FormFieldLabelProps): React.ReactElement {
  // Importing useBem to handle BEM class names
  const { getBlock } = useBem({ block: `${components.FormField}__label`, styles });

  // Generating CSS classes based on component props and styles
  const cssClasses = {
    root: getBlock({ extraClasses: className }),
  };

  return <Text as="label" size="sm" className={cssClasses.root} {...props} />;
}
