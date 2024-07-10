import React, { useMemo, useState } from "react";
import { sortData, TSortDirection } from "@stewed/utilities";

export interface ColumnsDef<T> {
  accessorKey: keyof T;
  headCell?: () => React.ReactElement | string;
  bodyCell: (data: T) => React.ReactElement | string | number;
  footCell?: () => React.ReactElement | string | number;
}

interface HeadCell<T> {
  cellKey: keyof T | undefined;
  isSortable: boolean | undefined;
  sortDirection: TSortDirection;
  sortedColumn: keyof T | undefined;
  onSort: () => void;
  children: React.ReactNode;
}

interface BodyRows<T> {
  rowKey: string;
  bodyCells: BodyCell<T>[];
}

interface BodyCell<T> {
  cellKey: keyof T | undefined;
  children: React.ReactNode;
}

interface FootCell<T> {
  cellKey: keyof T | undefined;
  children: React.ReactNode;
}

interface ChildProps<T> {
  headCells: HeadCell<T>[];
  bodyRows: BodyRows<T>[];
  footCells: FootCell<T>[];
}

interface DataTableProps<T> {
  columns: ColumnsDef<T>[];
  data: T[];
  itemRowKey: (data: T) => string;
  children: (props: ChildProps<T>) => React.ReactElement;
  sortableColumns?: (keyof T)[];
  hiddenColumns?: (keyof T)[];
  orderColumns?: (keyof T)[];
  defaultSortedColumn?: keyof T;
  defaultDirection?: TSortDirection;
  onSort?: (props: { column: keyof T; direction: TSortDirection; items: T[] }) => T[] | null;
}

export function DataTable<T>({
  columns,
  data,
  itemRowKey,
  defaultSortedColumn,
  orderColumns,
  hiddenColumns,
  defaultDirection,
  sortableColumns,
  onSort,
  children,
}: DataTableProps<T>): React.ReactElement {
  // Initially set to the default sorting direction specified in the `sorting` configuration, or 'asc' if not provided.
  const [sortDirection, setSortDirection] = useState<TSortDirection>(defaultDirection || "ASC");

  const [sortedColumn, setSortedColumn] = useState(defaultSortedColumn);

  // Memoized function to sort the items based on the current sorted column and direction.
  // If no sorting column is specified, the items remain unsorted.
  const sortedItems = useMemo(() => {
    // If no sorting column is specified, return the items as they are
    if (!sortedColumn) {
      return [...data];
    }

    // Invoke the user-defined sorting function if provided
    const sorted = onSort?.({
      column: sortedColumn,
      direction: sortDirection === "ASC" ? "ASC" : "DESC",
      items: data,
    });


    // If the user-defined sorting function returns a non-empty array, use it
    if (sorted?.length) {
      return sorted;
    }

    // Sort the items based on the specified column and direction
    return sortData<T>({
      items: data,
      column: sortedColumn,
      direction: sortDirection,
    });
  }, [data, sortedColumn, sortDirection, onSort]);

  // The ordered columns based on the current order configurations.
  const orderedColumns = useMemo(() => {
    if (orderColumns?.length) {
      // Create a Set from orderColumns for efficient lookup.
      const orderedKeysSet = new Set(orderColumns);

      // Map order columns to corresponding columns.
      const mapOrderedColumns = orderColumns.map((key) =>
        columns.find((column) => column.accessorKey === key),
      );

      // Filter out columns not present in order columns.
      const remainingColumns = columns.filter((column) => !orderedKeysSet.has(column.accessorKey));

      // Concatenate ordered columns with remaining columns.
      return mapOrderedColumns.concat(remainingColumns);
    }

    return columns;
  }, [orderColumns, columns]);

  // The visible columns based on the visibility configurations.
  const visibleColumns = useMemo(
    () =>
      orderedColumns?.filter(
        (column) => column?.accessorKey && !hiddenColumns?.includes(column.accessorKey),
      ),
    [orderedColumns, hiddenColumns],
  );

  const headCells = useMemo(
    (): HeadCell<T>[] =>
      (visibleColumns || [])?.map((column) => ({
        cellKey: column?.accessorKey,
        isSortable: sortableColumns && sortableColumns?.includes(column?.accessorKey as keyof T),
        sortDirection,
        sortedColumn,
        onSort: () => {
          setSortedColumn(column?.accessorKey);
          setSortDirection((prev) => (prev === "ASC" ? "DESC" : "ASC"));
        },
        children: column?.headCell?.(),
      })),
    [sortedItems, visibleColumns, itemRowKey],
  );

  const bodyRows = useMemo(
    (): BodyRows<T>[] =>
      sortedItems?.map((item) => ({
        rowKey: itemRowKey(item),
        bodyCells: visibleColumns?.map((column) => ({
          cellKey: column?.accessorKey,
          children: column?.bodyCell?.(item),
        })),
      })),
    [sortedItems, visibleColumns, itemRowKey],
  );

  const footCells = useMemo(
    (): FootCell<T>[] =>
      (visibleColumns || [])?.map((column) => ({
        cellKey: column?.accessorKey,
        children: column?.footCell?.(),
      })),
    [sortedItems, visibleColumns, itemRowKey],
  );

  const displayFoot = useMemo(() => footCells.some(({ children }) => children), [footCells]);
  const displayHead = useMemo(() => headCells.some(({ children }) => children), [headCells]);

  return children({
    headCells: displayHead ? headCells : [],
    bodyRows,
    footCells: displayFoot ? footCells : [],
  });
}
