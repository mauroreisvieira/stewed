import React, { useMemo, useState } from "react";
// Utilities
import { sortData, TSortDirection } from "@stewed/utilities";
// TYpes
import { type TableRowProps } from "../../";

/** Define a type alias for the column key, which can be a key of the generic type T or a string */
export type TAccessorKeyKey<T> = keyof T | (string & {});

interface HeadCellRenderProps<T> {
  /** Determines if the column is sortable. If true, the column can be sorted by clicking on the header. */
  isSortable: boolean | undefined;
  /** The key of the currently sorted column in the table. */
  sortedColumn: keyof T | undefined;
  /**
   * The direction in which the current column is being sorted.
   * This could be either ascending, descending, or undefined if no sorting is applied.
   */
  sortDirection: TSortDirection;
}

export interface ColumnsDef<T> {
  /** Key to access the column value from the data object. */
  accessorKey: TAccessorKeyKey<T>;
  /**
   * A function or string used to render the header cell content.
   *
   * @param props - The properties passed to the function for rendering the header cell.
   * @returns A React element or a string representing the content of the header cell.
   */
  headCell?: (props: HeadCellRenderProps<T>) => React.ReactElement | string;
  /**
   * A function used to render the content of a body cell.
   *
   * @param data - The data object for the current row.
   * @returns A React element, string, or number representing the content of the body cell.
   */
  bodyCell?: (data: T) => React.ReactElement | string | number;
  /** Function or string to render the footer cell. */
  footCell?: () => React.ReactElement | string | number;
}

interface HeadCell<T> {
  /** Key to access the cell value from the data object. */
  columnKey: TAccessorKeyKey<T> | undefined;
  /** Indicates if the column is sortable. */
  isSortable: boolean | undefined;
  /** Function to handle sorting. */
  onSort: () => void;
  /** The content to be rendered inside the header cell. */
  cellNode: React.ReactNode;
}

/**
 * Represents a row of body data in a table.
 * Extends the standard `TableRowProps` to include specific properties for the row's body cells.
 *
 * @template T - The type of data for the body cells.
 */
interface BodyRows<T> extends TableRowProps {
  /**
   * A unique key for identifying the row.
   * This is typically used for efficient rendering and reconciliation in React.
   */
  key: string;
  /** Array of body cells in the row. */
  bodyCells: BodyCell<T>[];
}

interface BodyCell<T> {
  /** Key to access the cell value from the data object. */
  columnKey: TAccessorKeyKey<T> | undefined;
  /** The content to be rendered inside the body cell. */
  cellNode: React.ReactNode;
}

interface FootCell<T> {
  /** Key to access the cell value from the data object. */
  columnKey: TAccessorKeyKey<T> | undefined;
  /** The content to be rendered inside the footer cell. */
  cellNode: React.ReactNode;
}

interface UseDataTable<T> {
  /** Array of header cells. */
  headCells: HeadCell<T>[];
  /** Array of body rows. */
  bodyRows: BodyRows<T>[];
  /** Array of footer cells. */
  footCells: FootCell<T>[];
}

export interface UseDataTableProps<T> {
  /** Array of column definitions. */
  columns: ColumnsDef<T>[];
  /** Array of data items. */
  data: T[];
  /** Array of hidden column keys. */
  hiddenColumns?: (keyof T)[];
  /** Array of ordered column keys. */
  orderColumns?: (keyof T)[];
  /** Default sorting direction. */
  defaultColumnDirection?: TSortDirection;
  /** Array of sortable column keys. */
  sortableColumns?: (keyof T)[];
  /** Key of the default sorted column. */
  defaultColumnSorted?: keyof T;
  /**
   * A function to generate props for each row in the table body based on the data.
   *
   * @param data - The data item for which to generate props.
   * @param props - The information about its hierarchical level, parent index, and whether it is at the last level in the hierarchy.
   * @returns Props for the corresponding table body row or null if no specific props are needed.
   */
  bodyRowProps?: (data: T) => TableRowProps | undefined;
  /**
   * A function to select a key key for each item in the table.
   *
   * @param data - The data item for which to select a key.
   * @returns A unique key for the specified data item.
   */
  itemKeySelector: (data: T) => string;
  /**
   * Function to filter items, will takes an item of type T and returns a boolean indicating
   * whether the item should be included (true) or excluded (false) from the filtered results.
   *
   * @param data - The item of type T to be evaluated for inclusion in the filtered results.
   * @returns A boolean indicating whether the item should be included (true) or excluded (false) from the filtered results.
   */
  onFilter?: (data: T) => boolean;
  /**
   * Function to handle sorting, will takes sorting properties and returns a sorted array of items of type T,
   * or null if sorting is not applied.
   *
   * @param props - Sorting properties including the column to sort by, sorting direction, and items to sort.
   * @returns A sorted array of items of type T, or null if sorting is not applied.
   */
  onSort?: (props: { column: keyof T; direction: TSortDirection; items: T[] }) => T[] | null;
}

export function useDataTable<T>({
  columns,
  data,
  orderColumns,
  hiddenColumns,
  defaultColumnDirection,
  sortableColumns,
  defaultColumnSorted,
  itemKeySelector,
  bodyRowProps,
  onFilter,
  onSort
}: UseDataTableProps<T>): UseDataTable<T> {
  // Initially set to the default sorting direction.
  const [sortDirection, setSortDirection] = useState<TSortDirection>(
    defaultColumnDirection || "ASC"
  );

  // Initially set to the default sorted column.
  const [sortedColumn, setSortedColumn] = useState(defaultColumnSorted);

  // Sort data based on the current sorted column and direction, if no sorting column is specified, the items remain unsorted.
  const sortedItems = useMemo(() => {
    // If no sorting column is specified, return the items as they are
    if (!sortedColumn) {
      return [...data];
    }

    // Invoke the user-defined sorting function if provided
    const sorted = onSort?.({
      column: sortedColumn,
      direction: sortDirection === "ASC" ? "ASC" : "DESC",
      items: data
    });

    // If the user-defined sorting function returns a non-empty array, use it.
    if (sorted?.length) {
      return sorted;
    }

    // Sort the items based on the specified column and direction.
    return sortData<T>({
      items: data,
      column: sortedColumn,
      direction: sortDirection
    });
  }, [data, sortedColumn, sortDirection, onSort]);

  // The ordered columns based on the current order configurations.
  const orderedColumns = useMemo(() => {
    if (orderColumns?.length) {
      // Create a Set from orderColumns for efficient lookup.
      const orderedKeysSet = new Set(orderColumns);

      // Map order columns to corresponding columns.
      const mapOrderedColumns = orderColumns.map((key) =>
        columns.find((column) => column.accessorKey === key)
      );

      // Filter out columns not present in order columns.
      const remainingColumns = columns.filter(
        (column) => !orderedKeysSet.has(column.accessorKey as keyof T)
      );

      // Concatenate ordered columns with remaining columns.
      return mapOrderedColumns.concat(remainingColumns);
    }

    return columns;
  }, [orderColumns, columns]);

  // The visible columns based on the visibility configurations.
  const visibleColumns = useMemo(
    () =>
      orderedColumns?.filter(
        (column) => column?.accessorKey && !hiddenColumns?.includes(column.accessorKey as keyof T)
      ),
    [orderedColumns, hiddenColumns]
  );

  // Array to store head cells of the table.
  const headCells = useMemo(
    (): HeadCell<T>[] =>
      // Map over the visibleColumns to create an array of head cell objects
      (visibleColumns || [])?.map((column) => {
        const isSortable =
          sortableColumns && sortableColumns?.includes(column?.accessorKey as keyof T);

        return {
          columnKey: column?.accessorKey,
          isSortable,
          /** Callback function triggered when a sorting action occurs. */
          onSort: () => {
            setSortedColumn(column?.accessorKey as keyof T);
            setSortDirection((prev) => (prev === "ASC" ? "DESC" : "ASC"));
          },
          cellNode: column?.headCell?.({
            isSortable,
            sortDirection,
            sortedColumn
          })
        };
      }),
    [sortDirection, sortableColumns, sortedColumn, visibleColumns]
  );

  // Generate an array of body rows based on sorted items and ordered columns.
  const bodyRows = useMemo(() => {
    // Default to empty array if sortedItems is not defined
    const items = sortedItems ?? [];

    // Default to empty array if visibleColumns is not defined
    const columns = visibleColumns ?? [];

    return items.filter(onFilter ? (item: T) => onFilter(item) : () => true).map((item) => ({
      key: itemKeySelector(item),
      bodyCells: columns.map((column) => ({
        columnKey: column?.accessorKey,
        cellNode: column?.bodyCell?.(item)
      })),
      ...bodyRowProps?.(item)
    })) as BodyRows<T>[];
  }, [sortedItems, visibleColumns, onFilter, itemKeySelector, bodyRowProps]);

  // Array to store foot cells of the table.
  const footCells = useMemo(
    (): FootCell<T>[] =>
      (visibleColumns || [])?.map((column) => ({
        columnKey: column?.accessorKey,
        cellNode: column?.footCell?.()
      })),
    [visibleColumns]
  );

  // Flag indicating whether there are any cell node present in the foot cells.
  const displayFoot = useMemo(() => footCells.some(({ cellNode }) => cellNode), [footCells]);

  // Flag indicating whether there are any children present in the head cells.
  const displayHead = useMemo(() => headCells.some(({ cellNode }) => cellNode), [headCells]);

  return {
    headCells: displayHead ? headCells : [],
    bodyRows,
    footCells: displayFoot ? footCells : []
  };
}
