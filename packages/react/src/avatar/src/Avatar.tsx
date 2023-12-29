import React from "react";
// Compound Component
import { AvatarGroup } from "./AvatarGroup";
// Utilities
import { classNames } from "@stewed/utilities";
// Styles
import styles from "./styles/index.module.scss";

export interface AvatarProps {
  /**
   * Defines the skin color of the avatar.
   * @default "primary"
   */
  skin?: "primary" | "neutral" | "critical";
  /**
   * Specifies the size of the avatar.
   * @default "md"
   */
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl";
  /**
   * Determines the appearance shape of the avatar.
   * @default "circle"
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
 * <Avatar appearance="square" name="Lourenço Vieira" size="3xl" skin="neutral" />
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
}: AvatarProps): React.ReactElement {
  const rootName = "avatar";
  const cssClasses = {
    root: classNames(
      styles[rootName],
      appearance && styles[`${rootName}--${appearance}`],
      styles[`${rootName}--${size}`],
      styles[`${rootName}--${skin}`],
      className,
    ),
    img: styles[`${rootName}__img`],
  };

  const initials = name?.match(/[A-Z]/g)?.join("").slice(0, 2).toUpperCase();

  return (
    <div className={cssClasses.root}>
      {src ? <img className={cssClasses.img} src={src} alt={name} /> : initials}
    </div>
  );
}

// Compound component composition
Avatar.Group = AvatarGroup;
