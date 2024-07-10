import React, { useMemo, useState } from "react";
// Utilities
import { sortData, TSortDirection } from "@stewed/utilities";

export interface ColumnsDef<T> {
  /** Key to access the column value from the data object. */
  accessorKey: keyof T;
  /** Function or string to render the header cell. */
  headCell?: () => React.ReactElement | string;
  /** Function to render the body cell with data. */
  bodyCell: (data: T) => React.ReactElement | string | number;
  /** Function or string to render the footer cell. */
  footCell?: () => React.ReactElement | string | number;
}

interface HeadCell<T> {
  /** Key to access the cell value from the data object. */
  cellKey: keyof T | undefined;
  /** Indicates if the column is sortable. */
  isSortable: boolean | undefined;
  /** Direction of the sorting (e.g., 'ASC' or 'DESC'). */
  sortDirection: TSortDirection;
  /** Key of the currently sorted column. */
  sortedColumn: keyof T | undefined;
  /** Function to handle sorting. */
  onSort: () => void;
  /** The content to be rendered inside the header cell. */
  cellNode: React.ReactNode;
}

interface BodyRows<T> {
  /** Unique key for the row. */
  rowKey: string;
  /** Array of body cells in the row. */
  bodyCells: BodyCell<T>[];
}

interface BodyCell<T> {
  /** Key to access the cell value from the data object. */
  cellKey: keyof T | undefined;
  /** The content to be rendered inside the body cell. */
  cellNode: React.ReactNode;
}

interface FootCell<T> {
  /** Key to access the cell value from the data object. */
  cellKey: keyof T | undefined;
  /** The content to be rendered inside the footer cell. */
  cellNode: React.ReactNode;
}

interface ChildProps<T> {
  /** Array of header cells. */
  headCells: HeadCell<T>[];
  /** Array of body rows. */
  bodyRows: BodyRows<T>[];
  /** Array of footer cells. */
  footCells: FootCell<T>[];
}

export interface DataTableProps<T> {
  /** Array of column definitions. */
  columns: ColumnsDef<T>[];
  /** Array of data items. */
  data: T[];
  /** Function to get the unique key for each data item. */
  itemRowKey: (data: T) => string;
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
  /** Function to handle sorting. */
  onSort?: (props: { column: keyof T; direction: TSortDirection; items: T[] }) => T[] | null;
  /** Function to render the child components of the table. */
  children: (props: ChildProps<T>) => React.ReactElement;
}

/**
 * The Data Table component is a powerful and flexible tool for displaying and managing tabular data.
 *
 * @template T - The type of data to be displayed in the table.
 *
 * @param {DataTableProps} props - The properties for the DataTable component.
 * @returns {React.ReactElement} The rendered DataTable component.
 *
 * @example
 *
 * interface UserData {
 *   id: number;
 *   name: string;
 *   email: string;
 * }
 *
 * const columns = [
 *   { id: 'id', headCell: () => 'ID', bodyCell: ({ id }) => id },
 *   { id: 'name', label: () => 'Name', bodyCell: ({ name }) => name },
 *   { id: 'email', label: () => 'Email', bodyCell: ({ email }) => email },
 * ];
 *
 * const data: UserData[] = [
 *   { id: 1, name: 'John Doe', email: 'john@example.com' },
 *   { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
 * ];
 *
 * const Example = () => (
 *   <DataTable<UserData>
 *     columns={columns}
 *     data={data}
 *     itemRowKey={(item) => item.id}
 *     defaultColumnSorted="name"
 *     defaultColumnDirection="ASC"
 *     sortableColumns={['name', 'email']}>
 *     {({ headCells, bodyRows }) => (
 *       ...
 *     )}
 *   </DataTable>
 * );
 */
export function DataTable<T>({
  columns,
  data,
  itemRowKey,
  orderColumns,
  hiddenColumns,
  defaultColumnDirection,
  sortableColumns,
  defaultColumnSorted,
  onSort,
  children,
}: DataTableProps<T>): React.ReactElement {
  // Initially set to the default sorting direction.
  const [sortDirection, setSortDirection] = useState<TSortDirection>(defaultColumnDirection || "ASC");

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
      items: data,
    });

    // If the user-defined sorting function returns a non-empty array, use it.
    if (sorted?.length) {
      return sorted;
    }

    // Sort the items based on the specified column and direction.
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

  // Array to store head cells of the table.
  const headCells = useMemo(
    (): HeadCell<T>[] =>
      // Map over the visibleColumns to create an array of HeadCell objects
      (visibleColumns || [])?.map((column) => ({
        cellKey: column?.accessorKey,
        isSortable: sortableColumns && sortableColumns?.includes(column?.accessorKey as keyof T),
        sortDirection,
        sortedColumn,
        onSort: () => {
          setSortedColumn(column?.accessorKey);
          setSortDirection((prev) => (prev === "ASC" ? "DESC" : "ASC"));
        },
        cellNode: column?.headCell?.(),
      })),
    [sortedItems, visibleColumns, itemRowKey],
  );

  // Generate an array of body rows based on sorted items and ordered columns.
  const bodyRows = useMemo(
    (): BodyRows<T>[] =>
      sortedItems?.map((item) => ({
        rowKey: itemRowKey(item),
        bodyCells: visibleColumns?.map((column) => ({
          cellKey: column?.accessorKey,
          cellNode: column?.bodyCell?.(item),
        })),
      })),
    [sortedItems, visibleColumns, itemRowKey],
  );

  // Array to store foot cells of the table.
  const footCells = useMemo(
    (): FootCell<T>[] =>
      (visibleColumns || [])?.map((column) => ({
        cellKey: column?.accessorKey,
        cellNode: column?.footCell?.(),
      })),
    [sortedItems, visibleColumns, itemRowKey],
  );

  // Flag indicating whether there are any cell node present in the foot cells.
  const displayFoot = useMemo(() => footCells.some(({ cellNode }) => cellNode), [footCells]);

  // Flag indicating whether there are any children present in the head cells.
  const displayHead = useMemo(() => headCells.some(({ cellNode }) => cellNode), [headCells]);

  return children({
    headCells: displayHead ? headCells : [],
    bodyRows,
    footCells: displayFoot ? footCells : [],
  });
}
