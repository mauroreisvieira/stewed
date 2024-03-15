import React from "react";
// UI Components
import { Text } from "../../typography";
// Hooks
import { useBem } from "@stewed/hooks";
// Tokens
import { components } from "@stewed/tokens";
// Styles
import styles from "./styles/index.module.scss";

interface FormFieldDescriptionProps {
  /** Custom class name for the form field description. */
  className?: string;
  /** The children nodes to be rendered within the form field description. */
  children: React.ReactNode;
}

export function FormFieldDescription({
  className,
  ...props
}: FormFieldDescriptionProps): React.ReactElement {
  // Importing useBem to handle BEM class names
  const { getBlock } = useBem({ block: `${components.FormField}__description`, styles });

  // Generating CSS classes based on component props and styles
  const cssClasses = {
    root: getBlock({ extraClasses: className }),
  };

  return (
    <Text
      as="span"
      size="xs"
      skin="neutral"
      className={cssClasses.root}
      aria-live="polite"
      {...props}
    />
  );
}
