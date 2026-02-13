import React, { forwardRef, useCallback, useState } from "react";
// Compound Component
import { AvatarGroup } from "./AvatarGroup";
// Hooks
import { useBem } from "@stewed/hooks";
// Tokens
import { components } from "@stewed/tokens";
// Types
import type { CombinedProps } from "../../types";
// Styles
import styles from "./styles/index.module.scss";

// Default element type to be used when 'as' prop is not provided.
const defaultElement = "div";

/**
 * Props for the Avatar component.
 *
 * This interface extends the properties of a default HTML element (e.g., `img`)
 * while omitting the `children` property to allow a custom rendering approach.
 *
 * @template E - The type of the element being used for the Avatar.
 */
export type AvatarProps<E extends React.ElementType = React.ElementType> = CombinedProps<
  {
    /**
     * Specifies the type of element to use as the avatar.
     * @default div
     */
    as?: E;
    /** The name associated with the avatar. */
    name?: string;
    /**
     * Defines the skin color of the avatar.
     * @default primary
     */
    skin?:
      | "primary"
      | "secondary"
      | "neutral"
      | "neutral-faded"
      | "critical"
      | "success"
      | "info"
      | "warning";
    /**
     * Specifies the size of the avatar.
     * @default md
     */
    size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl";
    /**
     * Determines the shape of the avatar.
     * @default circle
     */
    shape?: "circle" | "square";
    /**
     * Determines the appearance of the avatar.
     * @default filled
     */
    appearance?: "filled" | "outline";
    /** Additional CSS class to apply to the avatar. */
    className?: string;
    /** The props to be added on image element. */
    image?: React.ComponentPropsWithoutRef<"img"> & {
      /** The ref to attach to the `<img />` element. */
      ref?: React.Ref<HTMLImageElement>;
    };
    /** Slot for an SVG icon, a possible alternative to using an image. */
    svgIcon?: React.ComponentPropsWithoutRef<"svg">;
  },
  E
>;

/**
 * This component displays an avatar component.
 * When the image source is unavailable or the source is unspecified, the avatar component will display a default image.
 *
 * @remarks This component is a polymorphic component can be rendered as a different element
 * and support all native props from the element passed on `as` prop.
 *
 * @param props - The props for the Avatar component.
 * @return The rendered Avatar component.
 *
 * @see {@link AvatarProps} for more details on the available props.
 *
 * @example
 * ```tsx
 * <Avatar shape="square" name="Noah Andersen" size="3xl" skin="neutral" />
 * ```
 */
const Root = forwardRef(
  (
    {
      as,
      size = "md",
      skin = "primary",
      appearance = "filled",
      shape = "circle",
      className,
      image,
      svgIcon,
      name,
      ...props
    }: AvatarProps,
    ref: React.Ref<Element>
  ) => {
    // Component to render based on the 'as' prop
    const Comp = as || defaultElement;

    // Importing useBem to handle BEM class names
    const { getBlock, getElement } = useBem({
      block: components.Avatar,
      styles
    });

    // Generating CSS classes based on component props and styles
    const cssClasses = {
      root: getBlock({
        modifiers: [appearance, shape, size, skin, as === "button" && "button"],
        extraClasses: className
      }),
      img: getElement(["img"], image?.className)
    };

    // State to track if there was an error while loading the image
    const [imageError, setImageError] = useState(false);

    // Extract initials from the provided name, capturing the first two uppercase letters
    // and converting to uppercase, e.g., "John Doe" => "JD"
    const initials = name?.match(/[A-Z]/g)?.join("").slice(0, 2).toUpperCase();

    // Callback to handle image load errors
    // Sets the error state to true and triggers any optional `onError` event handler passed in `image`
    const onHandleError = useCallback<React.ReactEventHandler<HTMLImageElement>>(
      (event) => {
        setImageError(true);
        image?.onError?.(event);
      },
      [image]
    );

    return (
      <Comp ref={ref} className={cssClasses.root} {...props}>
        {svgIcon ? (
          svgIcon
        ) : (
          <>
            {image && !imageError ? (
              <img
                {...image}
                className={cssClasses.img}
                alt={image?.alt || name}
                onError={onHandleError}
              />
            ) : (
              initials
            )}
          </>
        )}
      </Comp>
    );
  }
) as <E extends React.ElementType = typeof defaultElement>(
  props: AvatarProps<E>
) => React.ReactElement;

// Compound component composition
export const Avatar = Object.assign(Root, {
  Group: AvatarGroup
});
