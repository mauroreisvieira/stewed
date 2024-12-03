import React from "react";
// Tokens
import { components } from "@stewed/tokens";
// Hooks
import { useBem } from "@stewed/hooks";
// Styles
import styles from "./styles/index.module.scss";

export type DialogBodyProps = React.ComponentPropsWithoutRef<"div">;

export function DialogBody({ className, children, ...props }: DialogBodyProps): React.ReactElement {
  // Importing useBem to handle BEM class names
  const { getBlock } = useBem({ block: `${components.Dialog}__body`, styles });

  // Generating CSS classes based on component props and styles
  const cssClasses = {
    root: getBlock({ extraClasses: className }),
  };

  return (
    <div className={cssClasses.root} {...props}>
      {children}
    </div>
  );
}
