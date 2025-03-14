import React from "react";
// Hooks
import { useBem, useResponsive, type UseResponsiveProps } from "@stewed/hooks";
import { useTheme } from "../../theme";
// Tokens
import { components, type Spacings } from "@stewed/tokens";
// Styles
import styles from "./styles/index.module.scss";

/**
 * Interface defines the props for a separator component.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/hr}
 */
export interface SeparatorProps
  extends React.ComponentPropsWithoutRef<"hr">,
    UseResponsiveProps<{
      /** Adds space between separators on the horizontal and vertical axes. */
      space?: {
        /**
         * Adds space between separators on the block axis (e.g., top and bottom margins).
         * @default none
         */
        block?: Spacings;
        /**
         * Adds space between separators on the inline axis (e.g., left and right margins).
         * @default none
         */
        inline?: Spacings;
      };
      /**
       * Specifies the orientation of the separator.
       * @default horizontal
       */
      orientation?: "vertical" | "horizontal";
    }> {
  /**
   * Change the visual color of the separator.
   * @default neutral-faded
   */
  skin?:
    | "white"
    | "black"
    | "primary"
    | "primary-faded"
    | "secondary"
    | "secondary-faded"
    | "neutral"
    | "neutral-faded"
    | "critical"
    | "critical-faded"
    | "success"
    | "success-faded"
    | "info"
    | "info-faded"
    | "warning"
    | "warning-faded";
}

/**
 * This component displays an separator component.
 * Separator component usually used for visually separating content.
 *
 * @example
 * ```tsx
 * <Separator skin="primary-faded" space={{ block: 'sm', inline: 'md' }} orientation="horizontal" />
 * ```
 *
 * @remarks This component props extended from React.ComponentPropsWithoutRef<"hr">.
 *
 * @see {@link SeparatorProps} for more details on the available props.
 * @param props - The props for the Separator component.
 * @returns The rendered Separator component.
 */
export function Separator({
  skin = "neutral-faded",
  space = { block: "none", inline: "none" },
  orientation = "horizontal",
  responsive,
  className,
  ...props
}: SeparatorProps): React.ReactElement {
  // Retrieve values from the current theme context
  const { activeToken } = useTheme();

  // Compute responsive props based on current theme and screen sizes
  const computedProps = useResponsive(
    {
      space,
      orientation,
      responsive
    },
    activeToken.breakpoints
  );

  // Importing useBem to handle BEM class names
  const { getBlock } = useBem({ block: components.Separator, styles });

  // Generating CSS classes based on component props and styles
  const cssClasses = {
    root: getBlock({
      modifiers: [
        skin,
        computedProps.orientation,
        computedProps.space?.block && `space-block-${computedProps.space.block}`,
        computedProps.space?.inline && `space-inline-${computedProps.space.inline}`
      ],
      extraClasses: className
    })
  };

  return <hr className={cssClasses.root} aria-orientation={orientation} {...props} />;
}
