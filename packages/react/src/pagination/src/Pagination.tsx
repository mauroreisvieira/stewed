import React, { useMemo } from "react";
// UI Components
import { Button, Icon, type ButtonProps } from "../../index";
// Hooks
import { useBem } from "@stewed/hooks";
// Tokens
import { components } from "@stewed/tokens";
// Styles
import styles from "./styles/index.module.scss";

export interface PaginationProps {
  /** Total number of pages. */
  total: number;
  /** Current active page. */
  currentPage: number;
  /**
   * Number of pages visible before and after current page.
   * @default 1
   */
  siblings?: number;
  /**
   * Skin of the pagination buttons.
   * @default primary
   */
  skin?: Extract<ButtonProps<"button">["skin"], "primary" | "secondary" | "neutral">;
  /**
   * Size of the pagination buttons.
   * @default sm
   */
  size?: ButtonProps<"button">["size"];
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
   * Label for the previous page button.
   * @default "previous"
   */
  previousLabel?: string;
  /**
   * Label for the next page button.
   * @default "next"
   */
  nextLabel?: string;
  /**
   * Function to generate custom page labels.
   * @param page - The page number.
   * @returns The label for the specified page.
   */
  pageLabel?: ({ page }: { page: number }) => string;
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
  currentPage,
  siblings = 1,
  skin = "primary",
  size = "sm",
  alignment = "start",
  disabled,
  className,
  pageLabel,
  previousLabel = "previous",
  nextLabel = "next",
  onPageChange,
}: PaginationProps): React.ReactElement {
  // Importing useBem to handle BEM class names
  const { getBlock } = useBem({ block: components.Pagination, styles });

  // Generating CSS classes based on component props and styles
  const cssClasses = {
    root: getBlock({
      modifiers: [alignment],
      extraClasses: className,
    }),
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
      selectedPage + maxPivotPages * 2 - (selectedPage - minPage),
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
      <Button
        size={size}
        skin="neutral"
        appearance="ghost"
        disabled={disabled || selectedPage === 1}
        leftSlot={<Icon.ChevronLeft size={14} />}
        onClick={() => onPageChange?.(selectedPage - 1)}
        iconOnly
      >
        {previousLabel}
      </Button>
      {totalPages.map((page, index) => {
        const current = index + 1;
        const selected = selectedPage === page;
        const isEllipsis = typeof page === "string";
        return (
          <Button
            key={index}
            size={size}
            skin={selected ? skin : "neutral"}
            appearance={selected ? "filled" : "ghost"}
            disabled={disabled || isEllipsis}
            aria-current={isEllipsis ? undefined : selected}
            aria-selected={isEllipsis ? undefined : selected}
            aria-label={isEllipsis ? undefined : pageLabel?.({ page: current })}
            onClick={isEllipsis ? undefined : () => onPageChange?.(current)}
          >
            {page}
          </Button>
        );
      })}
      <Button
        size={size}
        skin="neutral"
        appearance="ghost"
        disabled={disabled || selectedPage === total}
        leftSlot={<Icon.ChevronRight size={14} />}
        onClick={() => onPageChange?.(selectedPage + 1)}
        iconOnly
      >
        {nextLabel}
      </Button>
    </nav>
  );
}
