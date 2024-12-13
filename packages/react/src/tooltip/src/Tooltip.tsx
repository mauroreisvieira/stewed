import React, { useEffect, useRef, useReducer } from "react";
// UI Components
import { Motion, Scope } from "../../";
// Hooks
import { useBem, useFloating, type FloatingPlacement } from "@stewed/hooks";
// Tokens
import { components } from "@stewed/tokens";
// Styles
import styles from "./styles/index.module.scss";

// Delay configuration for Tooltip opening and closing.
const SHOW_DELAY = 300;
const HIDE_DELAY = 100;
const HIDE_DURATION = 100;

/**
 * Represents the possible states of a Tooltip's lifecycle and its related data.
 */
type State = {
  /**
   * Describes the current stage of the Tooltip.
   * - `hidden`: The Tooltip is not visible.
   * - `might-show`: The Tooltip is preparing to become visible (e.g., during a delay).
   * - `showing`: The Tooltip is visible.
   * - `might-hide`: The Tooltip is preparing to hide (e.g., during a delay or interaction).
   * - `hiding`: The Tooltip is hiding, potentially with an animation.
   */
  stage: "hidden" | "might-show" | "showing" | "might-hide" | "hiding";

  /**
   * Stores the ID of the timer controlling delays, if applicable.
   * Can be used to cancel or clear timeouts.
   */
  timeoutId?: NodeJS.Timeout;
};

/**
 * Defines the set of possible actions that can trigger state transitions
 * for the Tooltip.
 */
type Action =
  | "hovered" // Indicates the Tooltip was hovered over, triggering a potential show.
  | "unhovered" // Indicates the Tooltip lost hover, triggering a potential hide.
  | "show-timer-elapsed" // Indicates the delay for showing the Tooltip has elapsed.
  | "hide-timer-elapsed" // Indicates the delay for hiding the Tooltip has elapsed.
  | "hide-animation-completed"; // Indicates the hiding animation has finished.

/**
 * Represents the properties passed to the children of a Tooltip component.
 *
 * @template T - An optional type for additional props that the Tooltip might use.
 */
export interface TooltipChildrenProps<T> {
  /** Ref to attach to the Tooltip element */
  ref: React.Ref<T>;
  /** Event handler for focus */
  onFocus: React.FocusEventHandler<T>;
  /** Event handler for blur */
  onBlur: React.FocusEventHandler<T>;
  /** Event handler for mouse enter */
  onMouseEnter: React.MouseEventHandler<T>;
  /** Event handler for mouse leave */
  onMouseLeave: React.MouseEventHandler<T>;
}

/**
 * Represents the properties for the Tooltip component.
 *
 * @template T - An optional type for additional props related to the Tooltip's children.
 */
export interface TooltipProps<T>
  extends Omit<React.ComponentPropsWithoutRef<"div">, "children" | "content"> {
  /**
   * Change the visual style of the `Tooltip`.
   * @default default
   */
  skin?: "default" | "neutral" | "neutral-faded" | "primary" | "primary-faded";
  /**
   * Specifies the preferred placement of the `Tooltip` relative to its trigger.
   * @default "top"
   */
  placement?: Extract<FloatingPlacement, "top" | "bottom" | "left" | "right">;
  /** Determines if the `Tooltip` is open. */
  open?: boolean;
  /**
   * Determines the delay in milliseconds ('ms') to displaying the Tooltip after hovering.
   * @default 300
   */
  delay?: number;
  /**
   * Function that returns a React element with events to trigger `Tooltip` position and visibility.
   * @param props - Render props for `Tooltip` component.
   */
  renderAnchor: (props: TooltipChildrenProps<T>) => React.ReactElement;
  /** Slot for Content to be displayed inside the `Tooltip`. */
  children: React.ReactNode;
}

/**
 * Tooltips component are floating labels that briefly explain the function of a user interface element.
 *
 * @example
 * ```tsx
 * <Tooltip<HTMLButtonElement>
 *   placement="top"
 *   renderAnchor={(props) => (
 *     <button {...props}>Order #1001</button>
 *   )}>
 *   This order has shipping labels.
 * </Tooltip>
 * ```
 *
 * @remarks This component's props extend from React.ComponentPropsWithoutRef<"div">.
 *
 * @param props - The props for the Tooltip component.
 * @returns The rendered Tooltip component.
 */
export function Tooltip<T extends HTMLElement>({
  skin = "default",
  placement = "top",
  open,
  delay = SHOW_DELAY,
  className,
  style,
  children,
  renderAnchor,
  onMouseEnter,
  onMouseLeave,
  ...props
}: TooltipProps<T>): React.ReactElement {
  // Importing useBem to handle BEM class names
  const { getBlock } = useBem({ block: components.Tooltip, styles });

  // Generating CSS classes based on component props and styles
  const cssClasses = {
    root: getBlock({ modifiers: [skin], extraClasses: className })
  };

  // Create a reference to manage the Tooltip element
  const tooltipRef = useRef<T>(null);

  const [currentState, dispatch] = useReducer(
    (state: State, action: Action): State => {
      if (state.stage === "hidden") {
        if (action === "hovered") {
          return {
            stage: "might-show",
            timeoutId: setTimeout(() => dispatch("show-timer-elapsed"), delay)
          };
        }
      }

      if (state.stage === "might-show") {
        if (action === "unhovered") {
          return { stage: "hidden" };
        }

        if (action === "show-timer-elapsed") {
          return { stage: "showing" };
        }
      }

      if (state.stage === "showing") {
        if (action === "unhovered") {
          return {
            stage: "might-hide",
            timeoutId: setTimeout(() => dispatch("hide-timer-elapsed"), HIDE_DELAY)
          };
        }
      }

      if (state.stage === "might-hide") {
        if (action === "hovered") {
          return { stage: "showing" };
        }

        if (action === "hide-timer-elapsed") {
          return {
            stage: "hiding",
            timeoutId: setTimeout(() => dispatch("hide-animation-completed"), HIDE_DURATION)
          };
        }
      }

      if (state.stage === "hiding") {
        if (action === "hide-animation-completed") {
          return { stage: "hidden" };
        }
      }

      return state;
    },
    { stage: "hidden" }
  );

  useEffect(() => {
    if (!currentState.timeoutId) {
      return;
    }
    const id = currentState.timeoutId;
    // eslint-disable-next-line react-compiler/react-compiler
    delete currentState.timeoutId;

    return () => clearTimeout(id);
  }, [currentState]);

  // Tooltip visible if is in the process of showing, is about to hide or is currently hiding.
  const isVisible =
    open ||
    currentState.stage === "showing" ||
    currentState.stage === "might-hide" ||
    currentState.stage === "hiding";

  // Floating position calculation hook
  const { floating, x, y, isPositioned } = useFloating<T, HTMLDivElement>({
    open: isVisible,
    placement,
    offset: 4,
    reference: tooltipRef.current
  });

  /**
   * Handles the "open" action, typically triggered by a hover event or similar interaction.
   *
   * This function dispatches an action to update the state to "hovered".
   */
  const onHandleOpen = (): void => {
    dispatch("hovered");
  };

  /**
   * Handles the "close" action, typically triggered by a mouse leave or similar interaction.
   *
   * This function dispatches an action to update the state to "unhovered".
   */
  const onHandleClose = (): void => {
    dispatch("unhovered");
  };

  return (
    <>
      {renderAnchor({
        ref: tooltipRef,
        onFocus: onHandleOpen,
        onBlur: onHandleClose,
        onMouseEnter: onHandleOpen,
        onMouseLeave: onHandleClose
      })}
      {isVisible && (
        <Scope elevation="hint">
          <Motion animation="zoom-in-soft">
            <div
              ref={floating}
              role="tooltip"
              className={cssClasses.root}
              style={{
                ...style,
                visibility: isPositioned ? "visible" : "hidden",
                left: `${x}px`,
                top: `${y}px`
              }}
              onMouseEnter={(event): void => {
                onHandleOpen();
                onMouseEnter?.(event);
              }}
              onMouseLeave={(event): void => {
                onHandleClose();
                onMouseLeave?.(event);
              }}
              {...props}
            >
              {children}
            </div>
          </Motion>
        </Scope>
      )}
    </>
  );
}
