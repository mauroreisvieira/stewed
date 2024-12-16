import React from "react";
// Tokens
import { components } from "@stewed/tokens";
// Hooks
import { useBem } from "@stewed/hooks";
// Styles
import styles from "./styles/index.module.scss";

/**
 * The props for the `CardMedia` component, which extends the standard HTML `<img>` element props.
 * This type inherits all properties from the native `<img>` element, such as `src`, `alt`, `width`, `height`, and more.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img}
 */
export type CardMediaProps = React.ComponentPropsWithoutRef<"img">;

/**
 * `CardMedia` is a component that renders an image inside a card.
 * It allows all the standard `<img>` attributes, such as `src`, `alt`, `width`, and `height`. You can use this component to display media in a card layout.
 *
 * @see {@link CardMediaProps} for more details on the available props.
 *
 * @param props - The properties passed to the component, including all `<img>` attributes.
 * @returns The rendered image component.
 */
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
