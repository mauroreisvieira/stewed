import React from "react";
// Tokens
import { components } from "@stewed/tokens";
// Hooks
import { useBem } from "@stewed/hooks";
// Styles
import styles from "./styles/index.module.scss";

export type CardMediaProps = React.ComponentPropsWithoutRef<"img">;

export function CardMedia({
  className,
  children,
  alt,
  ...props
}: CardMediaProps): React.ReactElement {
  // Importing useBem to handle BEM class names
  const { getBlock, getElement } = useBem({ block: `${components.Card}__media`, styles });

  // Generating CSS classes based on component props and styles
  const cssClasses = {
    root: getBlock({}),
    img: getElement(["img"], className),
    slot: getElement(["slot"], className)
  };
  return (
    <div className={cssClasses.root}>
      <img className={cssClasses.img} alt={alt} {...props} />
      {children && <div className={cssClasses.slot}>{children}</div>}
    </div>
  );
}
