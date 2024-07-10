import React, { useMemo } from "react";

export interface ColumnsDef<T> {
  accessorKey: keyof T;
  isHidden?: boolean;
  isSortable?: boolean;
  headCell?: () => React.ReactElement | string;
  bodyCell: (data: T) => React.ReactElement | string;
  footCell?: () => React.ReactElement | string;
}

interface HeadCell<T> {
  key: keyof T | undefined;
  isSortable: boolean | undefined;
  children: React.ReactElement | string | undefined;
}

interface BodyRows<T> {
  key: string;
  bodyCells: BodyCell<T>[];
}

interface BodyCell<T> {
  key: keyof T | undefined;
  isSortable: boolean | undefined;
  children: React.ReactElement | string | undefined;
}

interface FootCell<T> {
  key: keyof T | undefined;
  isSortable: boolean | undefined;
  children: React.ReactElement | string | undefined;
}

interface ChildProps<T> {
  headCells: HeadCell<T>[];
  bodyRows: BodyRows<T>[];
  footCells: FootCell<T>[];
}

interface DataTableProps<T> {
  columns: ColumnsDef<T>[];
  data: T[];
  itemKey: (data: T) => string;
  children: (props: ChildProps<T>) => React.ReactElement;
  orderColumns?: (keyof T)[];
  sortedColumn?: keyof T;
}

export function DataTable<T>({
  columns,
  data,
  itemKey,
  orderColumns,
  children,
}: DataTableProps<T>): React.ReactElement {
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
    () => orderedColumns?.filter((column) => !column?.isHidden),
    [orderedColumns],
  );

  const headCells = useMemo((): HeadCell<T>[] => {
    return (visibleColumns || []).map((column) => ({
      key: column?.accessorKey,
      isSortable: column?.isSortable || false,
      children: column?.headCell?.(),
    }));
  }, [visibleColumns]);

  const bodyRows = useMemo(
    (): BodyRows<T>[] =>
      data?.map((item) => ({
        key: itemKey(item),
        bodyCells: visibleColumns?.map((column) => ({
          key: column?.accessorKey,
          isSortable: column?.isSortable || false,
          children: column?.bodyCell?.(item),
        })),
      })),
    [data, visibleColumns],
  );

  const footCells = useMemo((): FootCell<T>[] => {
    return (visibleColumns || []).map((column) => ({
      key: column?.accessorKey,
      isSortable: column?.isSortable || false,
      children: column?.footCell?.(),
    }));
  }, [visibleColumns]);

  const displayFoot = useMemo(() => footCells.some(({ children }) => children), [footCells]);

  return children({
    headCells,
    bodyRows,
    footCells: displayFoot ? footCells : [],
  });
}
