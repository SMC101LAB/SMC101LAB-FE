import React, { useState, useMemo, useRef, useCallback } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  ColumnDef,
  VisibilityState,
  createColumnHelper,
  ColumnResizeMode,
  ColumnSizingState,
} from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import { FilterFn } from '@tanstack/react-table';
import { rankItem } from '@tanstack/match-sorter-utils';
import { useInfiniteQuery } from '@tanstack/react-query';
import { slopeManageAPI } from '../../../apis/Map/slopeManage';
import { Slope } from '../../../apis/Map/slopeMap';
import styled from 'styled-components';
const FETCH_SIZE = 50; // 한 번에 가져올 데이터 수

declare module '@tanstack/react-table' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>;
  }
}

// API 응답 타입 정의
interface SlopeApiResponse {
  data: Slope[];
  meta: {
    totalCount: number;
    hasMore: boolean;
  };
}

const fetchSlopeData = async (pageParam = 0) => {
  try {
    const allData = await slopeManageAPI.batchSlope();
    const start = pageParam * FETCH_SIZE;
    const slicedData = allData.slice(start, start + FETCH_SIZE);

    return {
      data: slicedData,
      meta: {
        totalCount: allData.length,
        hasMore: start + FETCH_SIZE < allData.length,
      },
    };
  } catch (error) {
    console.error('급경사지 데이터 조회 오류:', error);
    throw error;
  }
};

const SteepSlopeLookUp = () => {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnSizing, setColumnSizing] = useState<ColumnSizingState>({});
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const columnHelper = createColumnHelper<Slope>();

  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['slopes'],
      queryFn: ({ pageParam = 0 }) => fetchSlopeData(pageParam),
      getNextPageParam: (lastPage, allPages) =>
        lastPage.meta.hasMore ? allPages.length : undefined,
      initialPageParam: 0,
    });

  // const columns = useMemo(
  //   () => [
  //     columnHelper.accessor('managementNo', {
  //       header: '관리번호',
  //       size: 120,
  //     }),
  //     columnHelper.accessor('name', {
  //       header: '명칭',
  //       size: 150,
  //     }),
  //     columnHelper.accessor((row) => row.location.province, {
  //       id: 'province',
  //       header: '시/도',
  //       size: 100,
  //     }),
  //     columnHelper.accessor((row) => row.location.city, {
  //       id: 'city',
  //       header: '시/군/구',
  //       size: 120,
  //     }),
  //     columnHelper.accessor((row) => row.location.address || '', {
  //       id: 'address',
  //       header: '주소',
  //       size: 200,
  //     }),
  //     columnHelper.accessor((row) => row.management.organization || '', {
  //       id: 'organization',
  //       header: '관리기관',
  //       size: 150,
  //     }),
  //     columnHelper.accessor(
  //       (row) => {
  //         const latestInspection = row.inspections[row.inspections.length - 1];
  //         return latestInspection ? latestInspection.result : '';
  //       },
  //       {
  //         id: 'inspectionResult',
  //         header: '점검결과',
  //         size: 120,
  //       }
  //     ),
  //     columnHelper.accessor(
  //       (row) => (row.collapseRisk.designated ? '지정' : '미지정'),
  //       {
  //         id: 'riskDesignation',
  //         header: '위험지정여부',
  //         size: 120,
  //       }
  //     ),
  //   ],
  //   []
  // );
  const columns = useMemo(
    () => [
      columnHelper.accessor('managementNo', {
        header: '관리번호',
        size: 120,
      }),
      columnHelper.accessor('name', {
        header: '급경사지명',
        size: 150,
      }),
      columnHelper.accessor((row) => row.management.organization || '', {
        id: 'organization',
        header: '시행청명',
        size: 120,
      }),
      columnHelper.accessor((row) => row.management.authority || '', {
        id: 'authority',
        header: '관리주체구분코드',
        size: 150,
      }),
      columnHelper.accessor((row) => row.management.department || '', {
        id: 'department',
        header: '소관부서명',
        size: 150,
      }),
      columnHelper.accessor((row) => row.location.province, {
        id: 'province',
        header: '시도',
        size: 100,
      }),
      columnHelper.accessor((row) => row.location.city, {
        id: 'city',
        header: '시군구',
        size: 120,
      }),
      columnHelper.accessor((row) => row.location.district, {
        id: 'district',
        header: '읍면동',
        size: 120,
      }),
      columnHelper.accessor((row) => row.location.address || '', {
        id: 'address',
        header: '상세주소',
        size: 200,
      }),
      columnHelper.accessor((row) => row.location.roadAddress || '', {
        id: 'roadAddress',
        header: '도로명상세주소',
        size: 120,
      }),

      columnHelper.accessor(
        (row) => {
          const latestInspection = row.inspections[row.inspections.length - 1];
          return latestInspection ? latestInspection.date : '';
        },
        {
          id: 'inspectionDate',
          header: '안전점검일자',
          size: 120,
        }
      ),
      columnHelper.accessor(
        (row) => {
          const latestInspection = row.inspections[row.inspections.length - 1];
          return latestInspection ? latestInspection.result : '';
        },
        {
          id: 'inspectionResult',
          header: '안전점검결과코드',
          size: 130,
        }
      ),
      columnHelper.accessor(
        (row) => {
          const latestInspection = row.inspections[row.inspections.length - 1];
          return latestInspection ? latestInspection.riskLevel : '';
        },
        {
          id: 'riskLevel',
          header: '재해위험도평가등급코드',
          size: 170,
        }
      ),
      columnHelper.accessor(
        (row) => {
          const latestInspection = row.inspections[row.inspections.length - 1];
          return latestInspection ? latestInspection.riskType : '';
        },
        {
          id: 'riskType',
          header: '재해위험도평가종류코드',
          size: 170,
        }
      ),
      columnHelper.accessor((row) => row.collapseRisk?.districtNo || '', {
        id: 'districtNo',
        header: '붕괴위험지구번호',
        size: 130,
      }),
      columnHelper.accessor((row) => row.collapseRisk?.districtName || '', {
        id: 'districtName',
        header: '붕괴위험지구명',
        size: 130,
      }),
      columnHelper.accessor(
        (row) => (row.collapseRisk.designated ? '지정' : '미지정'),
        {
          id: 'riskDesignation',
          header: '붕괴위험지구지정여부',
          size: 160,
        }
      ),
      columnHelper.accessor(
        (row) => {
          if (!row.collapseRisk?.designationDate) return '';
          return row.collapseRisk.designationDate;
        },
        {
          id: 'designationDate',
          header: '붕괴위험지구지정일자',
          size: 160,
        }
      ),

      columnHelper.accessor((row) => row.maintenanceProject?.type || '', {
        id: 'maintenanceProject',
        header: '정비사업유형코드',
        size: 130,
      }),
      columnHelper.accessor((row) => row.maintenanceProject?.year || '', {
        id: 'maintenanceYear',
        header: '정비사업년도',
        size: 120,
      }),
    ],
    []
  );
  const flatData = useMemo(
    () => data?.pages.flatMap((page) => page.data) ?? [],
    [data]
  );

  // 스크롤 이벤트 핸들러
  const handleScroll = useCallback(() => {
    const element = tableContainerRef.current;
    if (!element || !hasNextPage || isFetching) return;

    const { scrollTop, scrollHeight, clientHeight } = element;
    if (scrollHeight - scrollTop - clientHeight < 300) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetching]);
  const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
    const itemRank = rankItem(row.getValue(columnId), value);
    addMeta({ itemRank });
    return itemRank.passed;
  };

  const table = useReactTable({
    data: flatData,
    columns,
    state: {
      columnVisibility,
      columnSizing,
    },
    onColumnVisibilityChange: setColumnVisibility,
    onColumnSizingChange: setColumnSizing,
    columnResizeMode: 'onChange' as ColumnResizeMode,
    enableColumnResizing: true,
    getCoreRowModel: getCoreRowModel(),
    defaultColumn: {
      minSize: 80,
      maxSize: 400,
    },
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    globalFilterFn: 'fuzzy',
  });

  const { rows } = table.getRowModel();

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => tableContainerRef.current,
    estimateSize: () => 40,
    overscan: 10,
  });

  const paddingTop = rowVirtualizer.getVirtualItems()[0]?.start || 0;
  const paddingBottom =
    rowVirtualizer.getTotalSize() -
    (paddingTop + rowVirtualizer.getVirtualItems().length * 40);

  return (
    <Container>
      <ColumnControls>
        {table.getAllColumns().map((column) => (
          <ColumnLabel key={column.id}>
            <ColumnCheckbox
              type="checkbox"
              checked={column.getIsVisible()}
              onChange={column.getToggleVisibilityHandler()}
            />
            <span>{column.columnDef.header as string}</span>
          </ColumnLabel>
        ))}
      </ColumnControls>

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
                <td style={{ height: `${paddingTop}px` }} />
              </tr>
            )}
            {rowVirtualizer.getVirtualItems().map((virtualRow) => {
              const row = rows[virtualRow.index];
              return (
                <TableRow key={virtualRow.index}>
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
                <td style={{ height: `${paddingBottom}px` }} />
              </tr>
            )}
          </tbody>
        </Table>
      </TableContainer>
      {isFetchingNextPage && (
        <LoadingMessage>데이터를 불러오는 중...</LoadingMessage>
      )}
    </Container>
  );
};

export default SteepSlopeLookUp;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const ColumnControls = styled.div`
  padding: 0.5rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  background-color: #f3f4f6;
`;

const ColumnLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ColumnCheckbox = styled.input`
  width: 1rem;
  height: 1rem;
`;

const TableContainer = styled.div`
  height: calc(100vh - 100px);
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
  background-color: #f9fafb;
`;

const HeaderCell = styled.th<{ width?: number }>`
  border-bottom: 1px solid #e5e7eb;
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
  width: 4px;
  cursor: col-resize;
  background-color: #d1d5db;
  opacity: 0;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }
`;

const TableRow = styled.tr`
  &:hover {
    background-color: #f9fafb;
  }
`;

const TableCell = styled.td<{ width?: number }>`
  border-bottom: 1px solid #e5e7eb;
  padding: 0.5rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: ${(props) => props.width}px;
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 0.5rem 0;
`;
