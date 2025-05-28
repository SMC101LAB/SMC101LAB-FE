import React, { useRef, useCallback, useEffect, useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  ColumnResizeMode,
  FilterFn,
  RowSelectionState,
} from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import { rankItem } from '@tanstack/match-sorter-utils';
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { Slope } from '../../../../apis/slopeMap';
import styled from 'styled-components';

import { slopeManageAPI } from '../../../../apis/slopeManage';
import { useNotificationStore } from '../../../../hooks/notificationStore';
import { getSlopeColumns } from '../components/table/coloums';
import { useSteepSlopeEmptyStore } from '../../../../stores/steepSlopeStore';

import TableToolbar from '../components/table/TableToolbar';
import DataTable from '../components/table/DataTable';
import TableAction from '../components/table/TableAction';
import TableModals from '../components/table/TableModals';

const FETCH_SIZE = 50;
declare module '@tanstack/react-table' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>;
  }
}

const SteepSlopeEmpty = () => {
  const queryClient = useQueryClient();

  // Zustand 스토어에서 상태 및 액션 가져오기
  const {
    columnVisibility,
    setColumnVisibility,
    columnSizing,
    setColumnSizing,
    totalCount,
    setTotalCount,
    searchQuery,
    setSearchQuery,
    inputValue,
    setInputValue,
    selectedRegion,
    setSelectedRegion,
    grade,

    isModalOpen,
    closeModal,
    isRegionModalOpen,

    closeRegionModal,
    isDeleteModalOpen,
    openDeleteModal,
    closeDeleteModal,
    isEditModalOpen,
    openEditModal,
    closeEditModal,

    selectedRow,
    setSelectedRow,
    resetFilters,
    setSelectedRows,
    selectedRows,
  } = useSteepSlopeEmptyStore();

  // 테이블 컨테이너 ref는 훅 내에서 직접 생성
  const tableContainerRef = useRef<HTMLDivElement>(null);

  // 알림 함수 가져오기
  const showNotification = useNotificationStore(
    (state) => state.showNotification
  );

  //데이터 조회 쿼리
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['slopes', searchQuery, selectedRegion, grade],
    queryFn: async ({ pageParam = 0 }) => {
      const response = await slopeManageAPI.findOutlierEmpty({
        page: pageParam,
        pageSize: FETCH_SIZE,
        searchQuery: searchQuery || undefined,
        city: selectedRegion?.city,
        grade: grade,
        county: selectedRegion?.county,
      });
      return response;
    },
    getNextPageParam: (lastPage) =>
      lastPage?.meta?.hasMore ? lastPage.meta.currentPage + 1 : undefined,
    initialPageParam: 0,
  });

  //flatData를 통해 페이지 계산
  const flatData = React.useMemo(() => {
    return data?.pages.flatMap((page) => page.data) ?? [];
  }, [data]);

  // 검색어나 지역 필터 변경시 데이터 리페치
  useEffect(() => {
    refetch();
  }, [searchQuery, selectedRegion, refetch]);

  //데이터 전체 수
  useEffect(() => {
    if (data?.pages[0]?.meta?.totalCount)
      setTotalCount(data.pages[0].meta.totalCount);
    else setTotalCount(0);
  }, [data, setTotalCount]);
  //데이터 열 선언
  const columns = React.useMemo(() => getSlopeColumns(), []);

  //필터 선언
  const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
    const itemRank = rankItem(row.getValue(columnId), value);
    addMeta({ itemRank });
    return itemRank.passed;
  };
  // 행 선택 상태 추가
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  //테이블 선언
  const table = useReactTable({
    data: flatData,
    columns,
    state: {
      columnVisibility,
      columnSizing,
      rowSelection,
    },
    onColumnVisibilityChange: setColumnVisibility,
    onColumnSizingChange: setColumnSizing,
    columnResizeMode: 'onChange' as ColumnResizeMode,
    enableColumnResizing: true,
    onRowSelectionChange: setRowSelection,
    enableRowSelection: true,
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

  useEffect(() => {
    // rowSelection 상태에서 선택된 행 추출
    const selectedRowsArray = Object.keys(rowSelection)
      .filter((key) => rowSelection[key])
      .map((key) => flatData[parseInt(key)]);

    // 선택된 행 정보 업데이트
    setSelectedRows(selectedRowsArray);
    setSelectedRow(selectedRowsArray.length > 0 ? selectedRowsArray[0] : null);
  }, [rowSelection, flatData, setSelectedRow, setSelectedRows]);

  // 스크롤 이벤트 핸들러(무한스크롤 기능)
  const handleScroll = useCallback(() => {
    if (!tableContainerRef.current || !hasNextPage || isFetching) return;

    const { scrollTop, scrollHeight, clientHeight } = tableContainerRef.current;
    if (scrollHeight - scrollTop - clientHeight < 300) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetching]);

  const { rows } = table.getRowModel();

  //보이는 행만 보일 수 있도록 가상화
  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => tableContainerRef.current,
    estimateSize: () => 40,
    overscan: 10,
  });

  const handleRegionSelect = (city: string, county: string) => {
    if (county === '모두') {
      console.log(`${city}`);
    } else {
      console.log(`${city} ${county} `);
    }
    setSelectedRegion({ city, county });
  };

  const handleDelete = async () => {
    try {
      // 선택된 행들이 있는지 확인 (단일 선택 또는 다중 선택)
      const rowsToDelete =
        selectedRows.length > 0
          ? selectedRows
          : selectedRow
          ? [selectedRow]
          : [];

      if (rowsToDelete.length > 0) {
        const idsToDelete = rowsToDelete.map((row) => row._id); // 선택된 모든 항목의 ID 추출
        await slopeManageAPI.deleteSlope(idsToDelete); // API 호출로 삭제 처리
        await queryClient.invalidateQueries({ queryKey: ['slopes'] }); // 삭제 성공 후 데이터 갱신

        // rowSelection 상태를 사용하는 경우
        if (setRowSelection) setRowSelection({});
        // 선택된 행 상태 초기화
        if (setSelectedRows) setSelectedRows([]);
        setSelectedRow(null);

        closeDeleteModal(); // 모달 닫기

        if (showNotification) {
          showNotification(`${idsToDelete.length}개 항목이 삭제되었습니다.`, {
            severity: 'success',
          });
        }
      }
    } catch (error) {
      console.error('삭제 실패:', error);
      // 실패 알림 (알림 기능이 있는 경우)
      if (showNotification) {
        showNotification('삭제 중 오류가 발생했습니다.', {
          severity: 'error',
        });
      }
    }
  };
  const handleEdit = async (updatedSlope: Slope) => {
    try {
      await slopeManageAPI.updateSlope(updatedSlope);
      // 수정 성공 후 데이터 갱신
      await queryClient.invalidateQueries({ queryKey: ['slopes'] });
      setSelectedRow(null);
      closeEditModal();
    } catch (error) {
      console.error('수정 실패:', error);
    }
  };

  // 다운로드 mutation 설정
  const { mutate: downloadExcel, isPending: isDownloading } = useMutation({
    mutationFn: (params: {
      searchQuery?: string;
      city?: string;
      county?: string;
    }) => slopeManageAPI.downloadExcel(params),

    onSuccess: () => {
      showNotification('엑셀 파일 다운로드가 완료되었습니다.', {
        severity: 'success',
      });
    },

    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message || '다운로드에 실패했습니다.';
      showNotification(errorMessage, {
        severity: 'error',
        autoHideDuration: 6000,
      });
      console.error('다운로드 실패:', error);
    },
  });

  return (
    <Container>
      {/* 모달 */}
      <TableModals
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        table={table}
        isRegionModalOpen={isRegionModalOpen}
        closeRegionModal={closeRegionModal}
        handleRegionSelect={handleRegionSelect}
        isDeleteModalOpen={isDeleteModalOpen}
        closeDeleteModal={closeDeleteModal}
        handleDelete={handleDelete}
        selectedRow={selectedRow}
        selectedRows={selectedRows}
        isEditModalOpen={isEditModalOpen}
        closeEditModal={closeEditModal}
        handleEdit={handleEdit}
      />

      <TableToolbar
        title="빈 값 찾기(관리번호, 이름, 지역)"
        setSearchQuery={setSearchQuery}
        inputValue={inputValue}
        setInputValue={setInputValue}
        selectedRegion={selectedRegion}
        resetFilters={resetFilters}
        downloadExcel={() =>
          downloadExcel({
            searchQuery: searchQuery || undefined,
            city: selectedRegion?.city,
            county: selectedRegion?.county,
          })
        }
        isDownloading={isDownloading}
        totalCount={totalCount}
      />
      <DataTable
        tableContainerRef={tableContainerRef}
        handleScroll={handleScroll}
        table={table}
        rows={rows}
        rowVirtualizer={rowVirtualizer}
        selectedRow={selectedRow}
        setSelectedRow={setSelectedRow}
      />

      <TableAction
        isLoading={isFetchingNextPage || !data}
        selectedRow={selectedRow}
        selectedRows={selectedRows}
        openEditModal={openEditModal}
        openDeleteModal={openDeleteModal}
      />
    </Container>
  );
};

export default SteepSlopeEmpty;

//전체 컨테이너너
const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
