import React from "react";
// Tokens
import { components } from "@stewed/tokens";
// Hooks
import { useBem } from "@stewed/hooks";
// Styles
import styles from "./styles/index.module.scss";

export function CardBody({
  className,
  children,
  ...props
}: React.ComponentPropsWithRef<"div">): React.ReactElement {
  // Importing useBem to handle BEM class names
  const { getBlock } = useBem({ block: `${components.Card}__body`, styles });

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
