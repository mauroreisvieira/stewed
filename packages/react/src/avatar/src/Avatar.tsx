import React, { useCallback, useState } from "react";
// Compound Component
import { AvatarGroup } from "./AvatarGroup";
// Hooks
import { useBem } from "@stewed/hooks";
// Tokens
import { type Color, components } from "@stewed/tokens";
// Styles
import styles from "./styles/index.module.scss";

export interface AvatarProps extends React.ComponentPropsWithRef<"div"> {
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
 * @param {AvatarProps} props - The props for the Avatar component.
 * @returns {React.ReactElement} - The rendered Avatar component.
 */
export function Avatar({
  size = "sm",
  skin = "primary",
  appearance = "circle",
  className,
  src,
  name,
  ...props
}: AvatarProps): React.ReactElement {
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
    <div className={cssClasses.root} {...props}>
      {!imageError && src ? (
        <img className={cssClasses.img} src={src} alt={name} onError={onHandleError} />
      ) : (
        initials
      )}
    </div>
  );
}

// Compound component composition
Avatar.Group = AvatarGroup;
