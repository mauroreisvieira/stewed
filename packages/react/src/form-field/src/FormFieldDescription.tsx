import React from "react";
// UI Components
import { Text } from "../../typography";
// Utilities
import { classNames } from "@stewed/utilities";
// Styles
import styles from "./styles/index.module.scss";

interface FormFieldDescriptionProps {
  className?: string;
  children: React.ReactNode;
}

export function FormFieldDescription({
  className,
  ...props
}: FormFieldDescriptionProps): React.ReactElement {
  const rootName = "form-field__description";
  const cssClasses = {
    root: classNames(styles[rootName]),
    className,
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
