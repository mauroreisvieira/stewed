import React from "react";
// Tokens
import { components } from "@stewed/tokens";
// Hooks
import { useBem } from "@stewed/hooks";
// Styles
import styles from "./styles/index.module.scss";

/**
 * The props for the `CardMedia` component, which extends the standard HTML `<div>` element props.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/div}
 */
export interface CardMediaProps extends React.ComponentPropsWithoutRef<"div"> {
  /**
   * The props to be added on image element.
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img}
   */
  image?: React.ComponentPropsWithoutRef<"img"> & {
    /** The ref to attach to the `<img />` element. */
    ref?: React.Ref<HTMLImageElement>;
  };
}

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
  image,
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
    <div className={cssClasses.root} {...props}>
      <img className={cssClasses.img} {...image} />
      {children && <div className={cssClasses.slot}>{children}</div>}
    </div>
  );
}
