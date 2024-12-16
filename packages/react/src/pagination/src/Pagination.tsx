import React, { useMemo } from "react";
// UI Components
import { Button, Icon } from "../../index";
// Hooks
import { useBem } from "@stewed/hooks";
// Tokens
import { components } from "@stewed/tokens";
// Styles
import styles from "./styles/index.module.scss";

/** Props for the NavigationButton component, used for rendering a button in a navigation context. */
interface NavigationButtonProps {
  /** Whether the navigation button is disabled. If true, the button will be non-interactive and typically styled as disabled. */
  disabled: boolean | undefined;
  /** Function to handle the click event for the navigation button. */
  onClick: () => void;
}

/**
 * Props for the PageButton component, used for rendering a button that represents a specific page in a navigation context.
 * Inherits all properties from {@link NavigationButtonProps}, with additional props specific to pagination.
 */
interface PageButtonProps extends NavigationButtonProps {
  /** Flag indicating whether the page button is selected (active). */
  selected: boolean;
  /** Flag indicating whether the button displays an ellipsis (`...`) as a placeholder. */
  hasEllipsis: boolean;
}

/** Props for the Pagination component, used to control and display pagination controls. */
export interface PaginationProps {
  /** Total number of pages. */
  total: number;
  /**
   * Current active page.
   * @default 1
   */
  currentPage?: number;
  /**
   * Number of pages visible before and after current page.
   * @default 1
   */
  siblings?: number;
  /**
   * Allow possibility to change alignment of tabs.
   * @default start
   */
  alignment?: "start" | "center" | "end";
  /** Sets whether the pagination is disabled. */
  disabled?: boolean;
  /** Additional class name(s) for custom styling. */
  className?: string;
  /**
   * A callback function for rendering the previous button.
   * @param props - The properties for rendering, including `onClick` and `disabled`.
   */
  renderPrev?: (props: NavigationButtonProps) => React.ReactNode;
  /**
   * A callback function for rendering the next button.
   * @param props - The properties for rendering, including `onClick` and `disabled`.
   */
  renderNext?: (props: NavigationButtonProps) => React.ReactNode;
  /**
   * A callback function for rendering the previous button.
   * @param props - The properties for rendering, including `onClick` and `disabled`.
   */
  renderPage?: (props: PageButtonProps) => React.ReactNode;
  /**
   * Callback function invoked when the active page changes.
   * @param page - The new active page.
   */
  onPageChange?: (page: number) => void;
}

/**
 * Pagination lets users navigate across a range of pages.
 *
 * @example
 * ```tsx
 * <Pagination total={10} currentPage={1} siblings={2} />
 * ```
 *
 * @param {PaginationProps} props - The props for the Pagination component.
 * @returns {React.ReactElement} - The rendered Pagination component.
 */
export function Pagination({
  total,
  currentPage = 1,
  siblings = 1,
  alignment = "start",
  disabled,
  className,
  renderPrev,
  renderPage,
  renderNext,
  onPageChange
}: PaginationProps): React.ReactElement {
  // Importing useBem to handle BEM class names
  const { getBlock } = useBem({ block: components.Pagination, styles });

  // Generating CSS classes based on component props and styles
  const cssClasses = {
    root: getBlock({
      modifiers: [alignment],
      extraClasses: className
    })
  };

  const selectedPage = Math.max(1, Math.min(currentPage, total));

  const totalPages = useMemo((): Array<string | number> => {
    const reservedSlots = 3;
    const maxEllipsis = 2;

    const max = siblings * 2 + reservedSlots + maxEllipsis;
    const maxPivotPages = Math.round((max - reservedSlots) / 2);

    if (total <= max) {
      return Array.from({ length: total }, (_page: number, index: number) => index + 1);
    }

    const pages: Array<string | number> = [1];
    let minPage = Math.max(maxEllipsis, selectedPage - maxPivotPages);
    const maxPage = Math.min(
      total - 1,
      selectedPage + maxPivotPages * 2 - (selectedPage - minPage)
    );
    minPage = Math.max(maxEllipsis, minPage - (maxPivotPages * 2 - (maxPage - minPage)));

    for (let i = minPage; i <= maxPage; i += 1) {
      if ((i === minPage && i !== 2) || (i === maxPage && i !== total - 1)) {
        pages.push("...");
      } else {
        pages.push(i);
      }
    }

    pages.push(total);

    return pages;
  }, [selectedPage, siblings, total]);

  return (
    <nav role="navigation" className={cssClasses.root}>
      {renderPrev ? (
        renderPrev({
          disabled: disabled || selectedPage === 1,
          /** Function to move for previous page */
          onClick: () => onPageChange?.(selectedPage - 1)
        })
      ) : (
        <Button
          size="sm"
          skin="neutral"
          appearance="soft"
          disabled={disabled || selectedPage === 1}
          leftSlot={<Icon.ChevronLeft size={14} />}
          onClick={() => onPageChange?.(selectedPage - 1)}
          aria-label="Previous page"
          iconOnly
        />
      )}
      {totalPages.map((page, index) => {
        const current = index + 1;
        const selected = selectedPage === page;
        const hasEllipsis = typeof page === "string";

        return renderPage ? (
          renderPage({
            selected,
            disabled,
            hasEllipsis,
            /** Function to set current page */
            onClick: () => onPageChange?.(current)
          })
        ) : (
          <Button
            key={index}
            size="sm"
            skin={selected ? "primary" : "neutral"}
            appearance={selected ? "filled" : "ghost"}
            disabled={disabled || hasEllipsis}
            aria-current={hasEllipsis ? undefined : selected}
            aria-selected={hasEllipsis ? undefined : selected}
            onClick={hasEllipsis ? undefined : () => onPageChange?.(current)}
          >
            {page}
          </Button>
        );
      })}
      {renderNext ? (
        renderNext({
          disabled: disabled || selectedPage === total,
          /** Function to move for next page */
          onClick: () => onPageChange?.(selectedPage + 1)
        })
      ) : (
        <Button
          size="sm"
          skin="neutral"
          appearance="soft"
          disabled={disabled || selectedPage === total}
          leftSlot={<Icon.ChevronRight size={14} />}
          onClick={() => onPageChange?.(selectedPage + 1)}
          aria-label="Next page"
          iconOnly
        />
      )}
    </nav>
  );
}
