import React from 'react';
import styled from 'styled-components';
import {
  Table as TableInstance,
  Row as RowInstance,
} from '@tanstack/react-table';

import { Virtualizer } from '@tanstack/react-virtual';
import { Slope } from '../../../../../apis/slopeMap';

interface DataTableProps {
  tableContainerRef: React.RefObject<HTMLDivElement>;
  handleScroll: () => void;
  table: TableInstance<any>;
  rows: RowInstance<any>[];
  rowVirtualizer: Virtualizer<HTMLDivElement, Element>;
  selectedRow: Slope | null;
  setSelectedRow: (row: Slope | null) => void;
}

const DataTable: React.FC<DataTableProps> = ({
  tableContainerRef,
  handleScroll,
  table,
  rows,
  rowVirtualizer,
  selectedRow,
  setSelectedRow,
}) => {
  const paddingTop = rowVirtualizer.getVirtualItems()[0]?.start || 0;
  const paddingBottom =
    rowVirtualizer.getTotalSize() -
    (paddingTop + rowVirtualizer.getVirtualItems().length * 40);

  return (
    <TableContainer ref={tableContainerRef} onScroll={handleScroll}>
      <Table>
        <TableHeader>
          <tr>
            {table.getHeaderGroups()[0].headers.map((header) => (
              <HeaderCell key={header.id} width={header.getSize()}>
                {header.column.columnDef.header as string}
                <ResizeHandle
                  onMouseDown={header.getResizeHandler()}
                  onTouchStart={header.getResizeHandler()}
                />
              </HeaderCell>
            ))}
          </tr>
        </TableHeader>
        <tbody>
          {paddingTop > 0 && (
            <tr>
              <td
                style={{ height: `${paddingTop}px` }}
                colSpan={table.getHeaderGroups()[0].headers.length}
              />
            </tr>
          )}
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const row = rows[virtualRow.index];
            return (
              <TableRow
                key={virtualRow.index}
                onClick={() => {
                  setSelectedRow(
                    selectedRow?.managementNo === row.original.managementNo
                      ? null
                      : row.original
                  );
                }}
                $selected={
                  selectedRow?.managementNo === row.original.managementNo
                }
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} width={cell.column.getSize()}>
                    {cell.getValue() as string}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
          {paddingBottom > 0 && (
            <tr>
              <td
                style={{ height: `${paddingBottom}px` }}
                colSpan={table.getHeaderGroups()[0].headers.length}
              />
            </tr>
          )}
        </tbody>
      </Table>
    </TableContainer>
  );
};

export default DataTable;

// 스타일 컴포넌트
const TableContainer = styled.div`
  height: 85%;
  overflow: auto;
  position: relative;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
`;

const TableHeader = styled.thead`
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.colors.grey[100]};
`;

interface HeaderCellProps {
  width?: number;
}

const HeaderCell = styled.th<HeaderCellProps>`
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey[300]};
  border-right: 2px solid ${({ theme }) => theme.colors.grey[300]};
  padding: 0.5rem;
  text-align: left;
  position: relative;
  width: ${(props) => props.width}px;
`;

const ResizeHandle = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 5px;
  cursor: col-resize;
  background-color: #d1d5db;
  opacity: 0;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }
`;

interface TableRowProps {
  $selected?: boolean;
}

const TableRow = styled.tr<TableRowProps>`
  cursor: pointer;
  background-color: ${(props) => (props.$selected ? '#f0f7ff' : 'transparent')};

  &:hover {
    background-color: ${(props) => (props.$selected ? '#f0f7ff' : '#f9fafb')};
  }
`;

interface TableCellProps {
  width?: number;
}

const TableCell = styled.td<TableCellProps>`
  border-bottom: 1px solid #e5e7eb;
  padding: 0.5rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: ${(props) => props.width}px;
`;
