import React from "react";
// Context
import { useDialog } from "./DialogContext";
// Utilities
import { classNames } from "@stewed/utilities";
// Styles
import styles from "./styles/index.module.scss";
import { Button } from "../../button";

export function DialogHeader({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>): React.ReactElement {
  const rootName = "dialog__header";
  const cssClasses = {
    root: classNames(styles[rootName], className),
  };

  const { onClose } = useDialog();

  return (
    <div className={cssClasses.root} {...props}>
      <div>{children}</div>
      <div>
        {onClose && (
          <Button
            onClick={onClose}
            size="sm"
            appearance="ghost"
            iconOnly
            leftSlot={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            }
          />
        )}
      </div>
    </div>
  );
}
