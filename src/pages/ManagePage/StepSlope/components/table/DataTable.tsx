import React from 'react';
import styled from 'styled-components';
import { DataTableProps } from '../../../interface';

const DataTable: React.FC<DataTableProps> = ({
  tableContainerRef,
  handleScroll,
  table,
  rows,
  rowVirtualizer,
  selectedRow,
  setSelectedRow,
  openImgsModal,
}) => {
  const paddingTop = rowVirtualizer.getVirtualItems()[0]?.start || 0;
  const paddingBottom =
    rowVirtualizer.getTotalSize() -
    (paddingTop + rowVirtualizer.getVirtualItems().length * 40);

  // 셀 렌더링 함수
  const renderCell = (cell: any) => {
    // 체크박스 열인 경우 별도 처리
    if (cell.column.id === 'select') {
      // 컬럼 정의에서 cell 함수를 호출
      const cellContent = (cell.column.columnDef as any).cell;
      if (typeof cellContent === 'function') {
        return cellContent({ row: cell.row, table, column: cell.column });
      }
      return cellContent;
    }

    // 일반 셀
    return cell.getValue() as string;
  };

  return (
    <TableContainer ref={tableContainerRef} onScroll={handleScroll}>
      <Table>
        <TableHeader>
          <tr>
            {table.getHeaderGroups()[0].headers.map((header) => (
              <HeaderCell key={header.id} width={header.getSize()}>
                {header.column.id === 'select'
                  ? typeof (header.column.columnDef as any).header ===
                    'function'
                    ? ((header.column.columnDef as any).header as any)({
                        table,
                      })
                    : (header.column.columnDef as any).header
                  : (header.column.columnDef.header as string)}
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
                onClick={(e) => {
                  // 체크박스 열이 아닌 부분을 클릭했을 때만 기존 선택 동작 수행
                  if (
                    !(e.target as HTMLElement).closest('input[type="checkbox"]')
                  ) {
                    setSelectedRow(
                      selectedRow?.managementNo === row.original.managementNo
                        ? null
                        : row.original
                    );
                  }
                }}
                onDoubleClick={(e) => {
                  // 체크박스 열이 아닌 부분을 더블클릭했을 때만 모달 열기
                  if (
                    !(e.target as HTMLElement).closest('input[type="checkbox"]')
                  ) {
                    // 더블클릭한 행을 선택 상태로 설정
                    setSelectedRow(row.original);
                    // ImgsModal 열기
                    if (openImgsModal) {
                      openImgsModal();
                    }
                  }
                }}
                $selected={
                  selectedRow?.managementNo === row.original.managementNo ||
                  row.getIsSelected?.() ||
                  false
                }
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} width={cell.column.getSize()}>
                    {renderCell(cell)}
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
