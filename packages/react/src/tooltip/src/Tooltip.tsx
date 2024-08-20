import React, { useEffect, useRef, useReducer } from "react";
import { Scope } from "../../scope";
// Hooks
import { useBem, useFloating, type FloatingPlacement } from "@stewed/hooks";
// Tokens
import { components } from "@stewed/tokens";
// Styles
import styles from "./styles/index.module.scss";

// Delay configuration for tooltip opening and closing.
const SHOW_DELAY = 300;
const HIDE_DELAY = 100;
const HIDE_DURATION = 100;

type State = {
  // Possible states for the tooltip.
  stage: "hidden" | "might-show" | "showing" | "might-hide" | "hiding";
  // Timer ID for controlling delays.
  timeoutId?: NodeJS.Timeout;
};

type Action =
  | "hovered"
  | "unhovered"
  | "show-timer-elapsed"
  | "hide-timer-elapsed"
  | "hide-animation-completed";

export interface TooltipChildrenProps<T> {
  /** Ref to attach to the tooltip element */
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

export interface TooltipProps<T>
  extends Omit<React.ComponentPropsWithRef<"div">, "children" | "content"> {
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
   * Determines the delay in milliseconds ('ms') to displaying the tooltip after hovering.
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
 * @remarks This component's props extend from React.ComponentPropsWithRef<"div">.
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
    root: getBlock({ modifiers: [skin], extraClasses: className }),
  };

  // Create a reference to manage the tooltip element
  const tooltipRef = useRef<T>(null);

  const [currentState, dispatch] = useReducer(
    (state: State, action: Action): State => {
      if (state.stage === "hidden") {
        if (action === "hovered") {
          return {
            stage: "might-show",
            timeoutId: setTimeout(() => dispatch("show-timer-elapsed"), delay),
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
            timeoutId: setTimeout(() => dispatch("hide-timer-elapsed"), HIDE_DELAY),
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
            timeoutId: setTimeout(() => dispatch("hide-animation-completed"), HIDE_DURATION),
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
    { stage: "hidden" },
  );

  useEffect(() => {
    if (currentState.timeoutId) {
      const id = currentState.timeoutId;
      delete currentState.timeoutId;
      return () => clearTimeout(id);
    }
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
    reference: tooltipRef.current,
  });

  const onHandleOpen = (): void => {
    dispatch("hovered");
  };

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
        onMouseLeave: onHandleClose,
      })}
      {isVisible && (
        <Scope elevation="hint">
          <div
            ref={floating}
            role="tooltip"
            className={cssClasses.root}
            style={{
              ...style,
              visibility: isPositioned ? "visible" : "hidden",
              left: `${x}px`,
              top: `${y}px`,
            }}
            onMouseEnter={(event): void => {
              onHandleOpen();
              onMouseEnter?.(event);
            }}
            onMouseLeave={(event): void => {
              onHandleClose();
              onMouseLeave?.(event);
            }}
            {...props}>
            {children}
          </div>
        </Scope>
      )}
    </>
  );
}
