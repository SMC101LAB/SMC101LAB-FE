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
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { Slope } from '../../../../apis/slopeMap';
import styled from 'styled-components';

import { slopeManageAPI } from '../../../../apis/slopeManage';
import FilterModal from '../components/ColumnFilterModal';
import Title from '../../components/Title';
import LoadingMessage from '../../components/LoadingMessage';
import RegionFilterModal from '../components/RegionFilterModal';

import filterIcon from '../../../../assets/Icons/column.svg';
import search from '../../../../assets/Icons/search.svg';
import refresh from '../../../../assets/Icons/refresh.svg';
import download from '../../../../assets/Icons/download.svg';
import DeleteConfirmModal from '../components/DeleteModal';
import EditModal from '../components/EditModal';

const FETCH_SIZE = 50;
declare module '@tanstack/react-table' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>;
  }
}

//기본 표시할 열 항목 필터 설정
const SteepSlopeLookUp = () => {
  const queryClient = useQueryClient();

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    startLatDegree: false,
    startLatMinute: false,
    startLatSecond: false,
    startLongDegree: false,
    startLongMinute: false,
    startLongSecond: false,
    endLatDegree: false,
    endLatMinute: false,
    endLatSecond: false,
    endLongDegree: false,
    endLongMinute: false,
    endLongSecond: false,
  });
  const [columnSizing, setColumnSizing] = useState<ColumnSizingState>({}); // 표 열 변수
  const tableContainerRef = useRef<HTMLDivElement>(null); //표 변수
  const columnHelper = createColumnHelper<Slope>(); //열 선언 변수
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

  // //flatData를 통해 페이지  계산
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
  const columns = useMemo(
    () => [
      columnHelper.accessor(
        (_row, index) => {
          const pageIndex = Math.floor(index / FETCH_SIZE);
          return pageIndex * FETCH_SIZE + index + 1;
        },
        {
          id: 'index',
          header: '번호',
          size: 60,
        }
      ),
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
      columnHelper.accessor((row) => row.location.mountainAddress || '', {
        id: 'mountainAddress',
        header: '산주소여부',
        size: 90,
      }),
      columnHelper.accessor((row) => row.location.mainLotNumber || '', {
        id: 'mainLotNumber',
        header: '주지번',
        size: 60,
      }),
      columnHelper.accessor((row) => row.location.subLotNumber || '', {
        id: 'subLotNumber',
        header: '부지번',
        size: 60,
      }),
      columnHelper.accessor(
        (row) => {
          const start = row.location.coordinates.start;
          return start
            ? `${start.coordinates[1].toFixed(
                6
              )}°N, ${start.coordinates[0].toFixed(6)}°E`
            : '';
        },
        {
          id: 'coordinates.start',
          header: '시점위경도',
          size: 150,
        }
      ),

      columnHelper.accessor(
        (row) => {
          const end = row.location.coordinates.end;
          return end
            ? `${end.coordinates[1].toFixed(6)}°N, ${end.coordinates[0].toFixed(
                6
              )}°E`
            : '';
        },
        {
          id: 'coordinates.end',
          header: '종점위경도',
          size: 150,
        }
      ),
      columnHelper.accessor(
        (row) => row.location.coordinates.start.startLatDegree || '',
        {
          id: 'startLatDegree',
          header: 'GIS좌표시점위도도',
          size: 60,
        }
      ),
      columnHelper.accessor(
        (row) => row.location.coordinates.start.startLatMinute || '',
        {
          id: 'startLatMinute',
          header: 'GIS좌표시점위도분',
          size: 60,
        }
      ),
      columnHelper.accessor(
        (row) => row.location.coordinates.start.startLatSecond || '',
        {
          id: 'startLatSecond',
          header: 'GIS좌표시점위도초',
          size: 60,
        }
      ),
      columnHelper.accessor(
        (row) => row.location.coordinates.start.startLongDegree || '',
        {
          id: 'startLongDegree',
          header: 'GIS좌표시점경경도도',
          size: 60,
        }
      ),
      columnHelper.accessor(
        (row) => row.location.coordinates.start.startLongMinute || '',
        {
          id: 'startLongMinute',
          header: 'GIS좌표시점경경도분',
          size: 60,
        }
      ),
      columnHelper.accessor(
        (row) => row.location.coordinates.start.startLongSecond || '',
        {
          id: 'startLongSecond',
          header: 'GIS좌표시점경경도초',
          size: 60,
        }
      ),
      columnHelper.accessor(
        (row) => row.location.coordinates.end.endLatDegree || '',
        {
          id: 'endLatDegree',
          header: 'GIS좌표종점점위도도',
          size: 60,
        }
      ),
      columnHelper.accessor(
        (row) => row.location.coordinates.end.endLatMinute || '',
        {
          id: 'endLatMinute',
          header: 'GIS좌표종점점위도분',
          size: 60,
        }
      ),
      columnHelper.accessor(
        (row) => row.location.coordinates.end.endLatSecond || '',
        {
          id: 'endLatSecond',
          header: 'GIS좌표종점위도초',
          size: 60,
        }
      ),
      columnHelper.accessor(
        (row) => row.location.coordinates.end.endLongDegree || '',
        {
          id: 'endLongDegree',
          header: 'GIS좌표종점점위도도',
          size: 60,
        }
      ),
      columnHelper.accessor(
        (row) => row.location.coordinates.end.endLongMinute || '',
        {
          id: 'endLongMinute',
          header: 'GIS좌표종점점위도분',
          size: 60,
        }
      ),
      columnHelper.accessor(
        (row) => row.location.coordinates.end.endLongSecond || '',
        {
          id: 'endLongSecond',
          header: 'GIS좌표종점위도초',
          size: 60,
        }
      ),
      columnHelper.accessor((row) => row.inspections?.serialNumber ?? '', {
        id: 'inspections_serialNumber',
        header: '안전점검일련번호',
        size: 130,
      }),
      columnHelper.accessor((row) => row.inspections?.date ?? '', {
        id: 'inspectionDate',
        header: '안전점검일자',
        size: 120,
      }),
      columnHelper.accessor((row) => row.inspections?.result ?? '', {
        id: 'inspectionResult',
        header: '안전점검결과코드',
        size: 130,
      }),
      columnHelper.accessor((row) => row.disaster?.serialNumber ?? '', {
        id: 'serialNumber',
        header: '재해위험도평가일련번호',
        size: 180,
      }),
      columnHelper.accessor((row) => row.disaster?.riskDate ?? '', {
        id: 'riskDate',
        header: '재해위험도평가일자',
        size: 170,
      }),
      columnHelper.accessor((row) => row.disaster?.riskLevel ?? '', {
        id: 'riskLevel',
        header: '재해위험도평가등급코드',
        size: 180,
      }),
      columnHelper.accessor((row) => row.disaster?.riskScore ?? '', {
        id: 'riskScore',
        header: '재해위험도평가등급코드',
        size: 180,
      }),
      columnHelper.accessor((row) => row.disaster?.riskType ?? '', {
        id: 'riskType',
        header: '재해위험도평가종류코드',
        size: 180,
      }),
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
    setColumnVisibility({
      startLatDegree: false,
      startLatMinute: false,
      startLatSecond: false,
      startLongDegree: false,
      startLongMinute: false,
      startLongSecond: false,
      endLatDegree: false,
      endLatMinute: false,
      endLatSecond: false,
      endLongDegree: false,
      endLongMinute: false,
      endLongSecond: false,
    });
  };

  //삭제 수정을 위한 행 선택 state
  const [selectedRow, setSelectedRow] = useState<Slope | null>(null);

  //삭제 모달 및 삭제 api
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const handleDelete = async () => {
    try {
      if (selectedRow) {
        await slopeManageAPI.deleteSlope([selectedRow.managementNo]);
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

  const handleDownload = async () => {
    try {
      await slopeManageAPI.downloadExcel({
        searchQuery: searchQuery || undefined,
        city: selectedRegion?.city,
        county: selectedRegion?.county,
      });
    } catch (error) {
      console.error('다운로드 실패:', error);
    }
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
            <FilterIcon src={filterIcon} alt="filter" />
            <p>표시할 열 항목 설정</p>
          </FilterButton>
          <FilterButton onClick={() => setIsRegionModalOpen(true)}>
            {selectedRegion
              ? `${selectedRegion.city} ${
                  selectedRegion.county === '모두' ? '' : selectedRegion.county
                }`
              : '지역선택'}
          </FilterButton>
          <FilterButton onClick={handleReset}>
            <FilterIcon src={refresh} alt="refresh" />
            <p>초기화</p>
          </FilterButton>
          <FilterButton onClick={handleDownload}>
            <FilterIcon
              src={download}
              alt="download"
              style={{ width: '16px' }}
            />
            <p>다운로드</p>
          </FilterButton>
          <SearchWrapper>
            <SearchInput>
              <SearchIcon
                src={search}
                alt="search"
                onClick={() => setSearchQuery(inputValue)}
              />
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

const FilterIcon = styled.img`
  width: 20px;
  height: 20px;
  opacity: 0.7;
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
const SearchIcon = styled.img`
  position: absolute;
  width: 30px;
  left: 8px;
  top: 50%;
  transform: translateY(-50%);
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
