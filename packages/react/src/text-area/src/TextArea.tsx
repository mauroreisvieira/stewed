import React from "react";
// Utilities
import { classNames } from "@stewed/utilities";
// Styles
import styles from "./styles/index.module.scss";

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /**
   * Change the visual style of the button.
   * @default default
   */
  skin?: "default" | "error" | "critical";
}

export const TextArea = React.forwardRef(
  (
    { skin = "default", className, disabled, children, ...props }: TextAreaProps,
    ref: React.Ref<HTMLTextAreaElement>,
  ): React.ReactElement => {
    const rootName = "text-area";
    const cssClasses = {
      root: classNames(
        styles[rootName],
        disabled && `${styles[rootName]}--disabled`,
        skin !== "default" && styles[`${rootName}--${skin}`],
        className,
      ),
    };

    return (
      <textarea ref={ref} className={cssClasses.root} disabled={disabled} {...props}>
        {children}
      </textarea>
    );
  },
);
