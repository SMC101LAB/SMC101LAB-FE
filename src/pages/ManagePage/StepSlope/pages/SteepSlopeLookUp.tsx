import React, {
  useState,
  useMemo,
  useRef,
  useCallback,
  useEffect,
} from 'react';
import {
  useReactTable,
  getCoreRowModel,
  VisibilityState,
  createColumnHelper,
  ColumnResizeMode,
  ColumnSizingState,
} from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import { FilterFn } from '@tanstack/react-table';
import { rankItem } from '@tanstack/match-sorter-utils';
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { Slope } from '../../../../apis/slopeMap';
import styled from 'styled-components';

import { slopeManageAPI } from '../../../../apis/slopeManage';
import FilterModal from '../components/ColumnFilterModal';
import Title from '../../components/Title';
import LoadingMessage from '../../components/LoadingMessage';
import RegionFilterModal from '../components/RegionFilterModal';

import DeleteConfirmModal from '../components/DeleteModal';
import EditModal from '../components/EditModal';

import TuneRoundedIcon from '@mui/icons-material/TuneRounded';
import CachedRoundedIcon from '@mui/icons-material/CachedRounded';
import TravelExploreRoundedIcon from '@mui/icons-material/TravelExploreRounded';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { useNotificationStore } from '../../../../hooks/notificationStore';
import {
  getSlopeColumns,
  getDefaultColumnVisibility,
} from '../components/table/coloums';

const FETCH_SIZE = 50;
declare module '@tanstack/react-table' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>;
  }
}

//기본 표시할 열 항목 필터 설정
const SteepSlopeLookUp = () => {
  const queryClient = useQueryClient();

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
    getDefaultColumnVisibility()
  );
  const [columnSizing, setColumnSizing] = useState<ColumnSizingState>({}); // 표 열 변수
  const tableContainerRef = useRef<HTMLDivElement>(null); //표 변수
  const [totalCount, setTotalCount] = useState(0); //전체 데이터
  const [searchQuery, setSearchQuery] = useState(''); //검색어쿼리
  const [inputValue, setInputValue] = useState(''); //검색어
  const [selectedRegion, setSelectedRegion] = useState<{
    city: string;
    county: string;
  } | null>(null); //지역 검색

  //데이터 조회 쿼리
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['slopes', searchQuery, selectedRegion],
    queryFn: async ({ pageParam = 0 }) => {
      const response = await slopeManageAPI.batchSlope({
        page: pageParam,
        pageSize: FETCH_SIZE,
        searchQuery: searchQuery || undefined,
        city: selectedRegion?.city,
        county: selectedRegion?.county,
      });
      return response;
    },
    getNextPageParam: (lastPage) =>
      lastPage.meta.hasMore ? lastPage.meta.currentPage + 1 : undefined,
    initialPageParam: 0,
  });

  //flatData를 통해 페이지  계산
  const flatData = useMemo(() => {
    return data?.pages.flatMap((page) => page.data) ?? [];
  }, [data]);

  // 검색어나 지역 필터 변경시 데이터 리페치
  useEffect(() => {
    refetch();
  }, [searchQuery, selectedRegion, refetch]);

  //데이터 전체 수
  useEffect(() => {
    if (data?.pages[0]?.meta.totalCount) {
      setTotalCount(data.pages[0].meta.totalCount);
    }
  }, [data]);

  //데이터 열 선언
  const columns = useMemo(() => getSlopeColumns(), []);
  //필터 선언
  const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
    const itemRank = rankItem(row.getValue(columnId), value);
    addMeta({ itemRank });
    return itemRank.passed;
  };

  //테이블 선언
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

  const paddingTop = rowVirtualizer.getVirtualItems()[0]?.start || 0;
  const paddingBottom =
    rowVirtualizer.getTotalSize() -
    (paddingTop + rowVirtualizer.getVirtualItems().length * 40);

  //필터 모달 관련 state함수
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const onCloseModal = () => {
    setIsModalOpen(false);
  };

  //지역 선택 모달 함수
  const [isRegionModalOpen, setIsRegionModalOpen] = useState<boolean>(false);
  const onCloseRegionModal = () => {
    setIsRegionModalOpen(false);
  };
  const handleRegionSelect = (city: string, county: string) => {
    if (county === '모두') {
      console.log(`${city}`);
    } else {
      console.log(`${city} ${county} `);
    }
    setSelectedRegion({ city, county });
  };

  // 필터 초기화
  const handleReset = () => {
    setInputValue('');
    setSearchQuery('');
    setSelectedRegion(null);
    refetch();
    setColumnVisibility(getDefaultColumnVisibility());
  };

  //삭제 수정을 위한 행 선택 state
  const [selectedRow, setSelectedRow] = useState<Slope | null>(null);

  //삭제 모달 및 삭제 api
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const handleDelete = async () => {
    try {
      if (selectedRow) {
        await slopeManageAPI.deleteSlope([selectedRow._id]);
        // 삭제 성공 후 데이터 갱신
        await queryClient.invalidateQueries({ queryKey: ['slopes'] });
        setSelectedRow(null);
        setIsDeleteModalOpen(false);
      }
    } catch (error) {
      console.error('삭제 실패:', error);
    }
  };

  //수정 모달 및 수정 api
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleEdit = async (updatedSlope: Slope) => {
    try {
      await slopeManageAPI.updateSlope(updatedSlope);
      // 수정 성공 후 데이터 갱신
      await queryClient.invalidateQueries({ queryKey: ['slopes'] });
      setSelectedRow(null);
      setIsEditModalOpen(false);
    } catch (error) {
      console.error('수정 실패:', error);
    }
  };

  // 알림 함수 가져오기
  const showNotification = useNotificationStore(
    (state) => state.showNotification
  );

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

  // 다운로드 버튼 클릭 핸들러
  const handleDownload = () => {
    downloadExcel({
      searchQuery: searchQuery || undefined,
      city: selectedRegion?.city,
      county: selectedRegion?.county,
    });
  };
  return (
    <Container>
      {/* 모달 */}
      <FilterModal isOpen={isModalOpen} onClose={onCloseModal} table={table} />
      <RegionFilterModal
        isOpen={isRegionModalOpen}
        onClose={onCloseRegionModal}
        onRegionSelect={handleRegionSelect}
      />
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        selectedRow={selectedRow}
      />
      <EditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleEdit}
        selectedRow={selectedRow}
      />

      {/* 헤더 */}
      <HeaderContainer>
        <Title text={'급경사지 조회'}></Title>
        <HeaderWrapper>
          <FilterButton
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            <TuneRoundedIcon
              sx={{
                width: '18px',
                height: '18px',
                color: '#24478f',
              }}
            />

            <p>표시할 열 항목 설정</p>
          </FilterButton>
          <FilterButton onClick={() => setIsRegionModalOpen(true)}>
            <TravelExploreRoundedIcon
              sx={{
                width: '18px',
                height: '18px',
                color: '#24478f',
              }}
            />
            {selectedRegion
              ? `${selectedRegion.city} ${
                  selectedRegion.county === '모두' ? '' : selectedRegion.county
                }`
              : '지역선택'}
          </FilterButton>
          <FilterButton onClick={handleReset}>
            <CachedRoundedIcon
              sx={{
                width: '18px',
                height: '18px',
                color: '#24478f',
              }}
            />
            <p>초기화</p>
          </FilterButton>
          <FilterButton onClick={handleDownload} disabled={isDownloading}>
            <DownloadRoundedIcon
              sx={{
                width: '18px',
                height: '18px',
                color: '#24478f',
              }}
            />
            <p>{isDownloading ? '다운로드 중...' : '엑셀 다운로드'}</p>
          </FilterButton>
          <SearchWrapper>
            <SearchInput>
              <SearchIcon onClick={() => setSearchQuery(inputValue)} />
              <input
                placeholder="검색..."
                value={inputValue}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setInputValue(e.target.value);
                }}
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                  if (e.key === 'Enter') {
                    setSearchQuery(inputValue);
                  }
                }}
              />
            </SearchInput>
          </SearchWrapper>
        </HeaderWrapper>
      </HeaderContainer>
      <TableSubInfo>
        <TotalCount>총 {totalCount}개</TotalCount>
      </TableSubInfo>

      {/* 테이블 */}
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
                <TableRow
                  key={virtualRow.index}
                  onClick={() => {
                    if (selectedRow === row.original) setSelectedRow(null);
                    else setSelectedRow(row.original);
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
                <td style={{ height: `${paddingBottom}px` }} />
              </tr>
            )}
          </tbody>
        </Table>
      </TableContainer>
      {(isFetchingNextPage || !data) && (
        <LoadingMessage text="데이터를 불러오는 중" />
      )}
      {/* 하단 버튼 컨테이너 */}
      {selectedRow && (
        <BottomButtonContainer>
          <ActionButton
            onClick={() => {
              setIsEditModalOpen(true);
            }}
          >
            수정
          </ActionButton>
          <ActionButton
            onClick={() => {
              setIsDeleteModalOpen(true);
            }}
            className="delete"
          >
            삭제
          </ActionButton>
        </BottomButtonContainer>
      )}
    </Container>
  );
};

export default SteepSlopeLookUp;
//전체 컨테이너너
const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
//헤더
const HeaderContainer = styled.div`
  width: 100%;
  height: 8%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
`;
const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const FilterButton = styled.button`
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
  padding: 0 8px;
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #f9fafb;
    border-color: #d1d5db;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  }

  &:active {
    background-color: #f3f4f6;
    transform: scale(1.06);
  }
`;

//검색바
const SearchWrapper = styled.div`
  display: flex;
  gap: 12px;
`;

const SearchInput = styled.div`
  position: relative;

  input {
    width: 288px;
    padding: 8px 16px 8px 40px;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
  }
`;
const SearchIcon = styled(SearchRoundedIcon)`
  position: absolute;
  width: 30px;
  left: 8px;
  top: 50%;
  transform: translateY(-50%);
  color: #bdbdbd;
  cursor: pointer;
`;

const TableSubInfo = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 0 30px;
`;
const TotalCount = styled.div`
  font-size: ${({ theme }) => theme.fonts.sizes.ms};
  color: #374151;
  margin-bottom: 8px;
`;

//테이블블
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
  /* background-color: #f9fafb; */
  background-color: ${({ theme }) => theme.colors.grey[100]};
`;

const HeaderCell = styled.th<{ width?: number }>`
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

const TableRow = styled.tr<{ $selected?: boolean }>`
  cursor: pointer;
  background-color: ${(props) => (props.$selected ? '#f0f7ff' : 'transparent')};

  &:hover {
    background-color: ${(props) => (props.$selected ? '#f0f7ff' : '#f9fafb')};
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

//추가 수정 삭제 관련 css
const BottomButtonContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px;
  background-color: white;
  border-top: 1px solid #e5e7eb;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  z-index: 10;
`;

const ActionButton = styled.button`
  padding: 8px 16px;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: #24478f;
  color: white;
  border: none;

  &:hover {
    opacity: 0.9;
  }

  &.delete {
    background-color: #dc2626;
  }
`;
