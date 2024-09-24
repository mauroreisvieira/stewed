import React from "react";
// UI Components
import { Table, type TableProps } from "../../";
// Hooks
import { useDataTable, type UseDataTableProps } from "./useDataTable";

export interface DataTableProps<T> extends TableProps, UseDataTableProps<T> {}

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
  itemKeySelector,
  defaultColumnDirection,
  defaultColumnSorted,
  hiddenColumns,
  onFilter,
  onSort,
  orderColumns,
  sortableColumns,
  bodyRowProps,
  ...props
}: DataTableProps<T>): React.ReactElement {
  // Access to table head, body and footer props
  const { bodyRows, footCells, headCells } = useDataTable({
    columns,
    data,
    itemKeySelector,
    defaultColumnDirection,
    defaultColumnSorted,
    hiddenColumns,
    onFilter,
    onSort,
    orderColumns,
    sortableColumns,
    bodyRowProps,
  });

  return (
    <Table {...props}>
      <Table.Head>
        <Table.Row>
          {headCells.map(({ columnKey, isSortable, onSort, cellNode }) => (
            <Table.Cell
              as="th"
              key={`head-${columnKey?.toString()}`}
              onClick={isSortable ? onSort : undefined}>
              {cellNode}
            </Table.Cell>
          ))}
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {bodyRows.map(({ bodyCells, key, ...bodyRowProps }) => (
          <Table.Row key={key} {...bodyRowProps}>
            {bodyCells.map(({ columnKey, cellNode }) => (
              <Table.Cell key={`${key}-${columnKey as string}`}>{cellNode}</Table.Cell>
            ))}
          </Table.Row>
        ))}
      </Table.Body>
      {footCells.length > 0 && (
        <Table.Foot>
          <Table.Row>
            {footCells.map(({ columnKey, cellNode, ...props }) => (
              <Table.Cell key={`foot-${columnKey as string}`} {...props}>
                {cellNode}
              </Table.Cell>
            ))}
          </Table.Row>
        </Table.Foot>
      )}
    </Table>
  );
}
