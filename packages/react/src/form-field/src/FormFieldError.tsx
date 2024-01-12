import React from "react";
// UI Components
import { Text } from "../../typography";
// Utilities
import { classNames } from "@stewed/utilities";
// Styles
import styles from "./styles/index.module.scss";

interface FormFieldErrorProps {
  className?: string;
  children: React.ReactNode;
}

export function FormFieldError({ className, ...props }: FormFieldErrorProps): React.ReactElement {
  const rootName = "form-field__error";
  const cssClasses = {
    root: classNames(styles[rootName]),
    className,
  };

  return (
    <Text
      as="span"
      size="xs"
      skin="critical"
      className={cssClasses.root}
      aria-live="polite"
      {...props}
    />
  );
}
