import React, { useCallback, useState } from "react";
// Compound Component
import { AvatarGroup } from "./AvatarGroup";
// Hooks
import { useBem } from "@stewed/hooks";
// Tokens
import { type Color, components } from "@stewed/tokens";
// Types
import { type DistributiveOmit, fixedForwardRef } from "../../types";
// Styles
import styles from "./styles/index.module.scss";

const defaultElement = "div";

export interface AvatarProps<T> extends React.ComponentProps<typeof defaultElement> {
  /**
   * Specifies the type of element to use as the avatar.
   * @default div
   */
  as?: T;
  /** The ref to attach to the `<img />` element. */
  imageRef?: React.Ref<HTMLImageElement>;
  /**
   * Defines the skin color of the avatar.
   * @default primary
   */
  skin?: Extract<
    Color,
    "primary" | "secondary" | "neutral" | "critical" | "success" | "info" | "warning"
  >;
  /**
   * Specifies the size of the avatar.
   * @default md
   */
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl";
  /**
   * Determines the appearance shape of the avatar.
   * @default circle
   */
  appearance?: "circle" | "square";
  /** The name associated with the avatar. */
  name?: string;
  /** Additional CSS class to apply to the avatar. */
  className?: string;
  /** The URL of the image to be displayed as the avatar. */
  src?: string;
}

/**
 * This component displays an avatar component.
 * When the image source is unavailable or the source is unspecified, the avatar component will display a default image.
 *
 * @example
 * ```tsx
 * <Avatar appearance="square" name="Noah Andersen" size="3xl" skin="neutral" />
 * ```
 *
 * @remarks This component is a polymorphic component can be rendered as a different element
 * and support all native props from the element passed on `as` prop.
 *
 * @param {AvatarProps} props - The props for the Avatar component.
 * @returns {React.ReactElement} - The rendered Avatar component.
 */
export const Root = fixedForwardRef(
  <T extends React.ElementType>(
    {
      as,
      imageRef,
      size = "md",
      skin = "primary",
      appearance = "circle",
      className,
      src,
      name,
      ...props
    }: AvatarProps<T> &
      DistributiveOmit<
        React.ComponentPropsWithRef<React.ElementType extends T ? typeof defaultElement : T>,
        "as"
      >,
    ref: React.ForwardedRef<unknown>,
  ): React.ReactElement => {
    // Component to render based on the 'as' prop
    const Comp = as || defaultElement;
    // Importing useBem to handle BEM class names
    const { getBlock, getElement } = useBem({ block: components.Avatar, styles });

    // Generating CSS classes based on component props and styles
    const cssClasses = {
      root: getBlock({ modifiers: [appearance, size, skin], extraClasses: className }),
      img: getElement(["img"]),
    };

    // State to track if there is an error loading the image
    const [imageError, setImageError] = useState(false);

    // Extract initials from the given name, using only the first two uppercase letters
    const initials = name?.match(/[A-Z]/g)?.join("").slice(0, 2).toUpperCase();

    // Callback to handle image load errors, setting the error state
    const onHandleError = useCallback<React.ReactEventHandler<HTMLImageElement>>(() => {
      setImageError(true);
    }, []);

    return (
      <Comp ref={ref} className={cssClasses.root} {...props}>
        {!imageError && src ? (
          <img
            ref={imageRef}
            className={cssClasses.img}
            src={src}
            alt={name}
            onError={onHandleError}
          />
        ) : (
          initials
        )}
      </Comp>
    );
  },
);

// Compound component composition
export const Avatar = Object.assign(Root, {
  Group: AvatarGroup,
});
