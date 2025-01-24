import { useMemo, useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { userAPI, User } from '../../../apis/User';
import { styled } from 'styled-components';
import {
  PaginationState,
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
  getSortedRowModel,
} from '@tanstack/react-table';
import search from '../../../assets/Icons/search.svg';
import approve from '../../../assets/Icons/approve.svg';
import reject from '../../../assets/Icons/reject.svg';
import { FilterFn, getFilteredRowModel } from '@tanstack/react-table';
import { rankItem } from '@tanstack/match-sorter-utils';
import Title from '../components/Title';
import { DebouncedInputProps } from '../interface';

const columnHelper = createColumnHelper<User>();

declare module '@tanstack/react-table' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>;
  }
}
const UserLookUp = () => {
  //기본 테이블 설정을 위한 구조 선언
  const columns = [
    columnHelper.accessor('name', {
      header: () => <span>이름</span>,
    }),
    columnHelper.accessor('phone', {
      header: () => <span>전화번호</span>,
    }),
    columnHelper.accessor('organization', {
      header: () => <span>소속</span>,
    }),
    columnHelper.accessor('isAdmin', {
      header: () => <span>권한</span>,
      cell: ({ getValue }) => (
        <Badge variant={getValue() ? '관리자' : '일반회원'}>
          {getValue() ? '관리자' : '일반회원'}
        </Badge>
      ),
    }),
    columnHelper.accessor('isApproved', {
      header: () => <span>상태</span>,
      cell: ({ getValue }) => (
        <Badge variant={getValue() ? '승인' : '대기'}>
          {getValue() ? '승인' : '대기'}
        </Badge>
      ),
    }),
    columnHelper.accessor((row) => row, {
      id: 'actions',
      header: () => <span>관리</span>,
      cell: ({ row }) =>
        row.original.isApproved === false && (
          <div>
            <DecisionIcon src={approve} alt="승인" />
            <DecisionIcon src={reject} alt="거절" />
          </div>
        ),
    }),
  ];
  // 검색필터와, 페이지네이션 state선언
  const [globalFilter, setGlobalFilter] = useState<string>('');
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  // 표 데이터 및 쿼리
  const { data, isLoading } = useQuery({
    queryKey: ['users', pagination],
    queryFn: () => userAPI.fetchUser(),
  });
  const defaultData = useMemo(() => [], []);

  //검색 필터 관련 함수 선언
  const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
    const itemRank = rankItem(row.getValue(columnId), value);
    addMeta({ itemRank });
    return itemRank.passed;
  };
  function DebouncedInput({
    value: initialValue,
    onChange,
    debounce = 500,
    ...props
  }: DebouncedInputProps) {
    const [value, setValue] = useState(initialValue);

    useEffect(() => {
      setValue(initialValue);
    }, [initialValue]);

    useEffect(() => {
      const timeout = setTimeout(() => {
        onChange(value);
      }, debounce);
      return () => clearTimeout(timeout);
    }, [value]);

    return (
      <input
        {...props}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    );
  }

  //기본 테이블 설정
  const table = useReactTable({
    data: data ?? defaultData,
    columns,
    rowCount: data?.length ?? 0,
    state: {
      pagination,
      globalFilter,
    },

    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    debugTable: true,

    //초기 정렬
    initialState: {
      sorting: [
        {
          id: 'isApproved',
          desc: false,
        },
      ],
    },
    getSortedRowModel: getSortedRowModel(),

    // 필터 및 검색
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    globalFilterFn: 'fuzzy',
  });

  return (
    <BaseContainer>
      <TableContainer>
        <Header>
          <div onClick={() => setGlobalFilter('')}>
            <Title text={'회원관리'} />
          </div>
          <SearchWrapper>
            <SearchInput>
              <SearchIcon src={search} alt="search" />
              <DebouncedInput
                value={globalFilter ?? ''}
                onChange={(value) => {
                  setGlobalFilter(String(value));
                }}
                placeholder="검색..."
              />
            </SearchInput>
          </SearchWrapper>
        </Header>

        <TableWrapper>
          <Table>
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} colSpan={header.colSpan}>
                      {!header.isPlaceholder && (
                        <div>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </div>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>
          <PaginationContainer>
            <ButtonGroup>
              <PaginationButton
                onClick={() => table.firstPage()}
                disabled={!table.getCanPreviousPage()}
              >
                {'<<'}
              </PaginationButton>
              <PaginationButton
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                {'<'}
              </PaginationButton>
              <PageButton active>
                {table.getState().pagination.pageIndex + 1}
              </PageButton>
              <PaginationButton
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                {'>'}
              </PaginationButton>
              <PaginationButton
                onClick={() => table.lastPage()}
                disabled={!table.getCanNextPage()}
              >
                {'>>'}
              </PaginationButton>
            </ButtonGroup>

            <PageInfo>
              Page {table.getState().pagination.pageIndex + 1} of{' '}
              {table.getPageCount()}
            </PageInfo>

            <PageSelect
              value={table.getState().pagination.pageSize}
              onChange={(e) => table.setPageSize(Number(e.target.value))}
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </PageSelect>

            {isLoading && <LoadingText>Loading...</LoadingText>}
          </PaginationContainer>
        </TableWrapper>
      </TableContainer>
    </BaseContainer>
  );
};

export default UserLookUp;
const BaseContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  overflow-y: auto;
`;
const TableContainer = styled.div`
  max-width: 1200px;
  flex: 1;
`;

const TableWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

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
`;

const DecisionIcon = styled.img`
  width: 40px;
  padding: 6px;
  border-radius: 8px;
  cursor: pointer;
  transition: box-shadow 0.2s ease-in-out;

  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }
`;

const Table = styled.table`
  width: 100%;
  th {
    padding: 12px 24px;
    font-size: ${({ theme }) => theme.fonts.sizes.mm};
    font-weight: ${({ theme }) => theme.fonts.weights.bold};
    color: #4b5563;
    background: #f9fafb;
    text-align: left;
    border-bottom: 1px solid #e5e7eb;
  }

  td {
    font-size: ${({ theme }) => theme.fonts.sizes.ms};
    padding: 16px 24px;
    border-bottom: 1px solid #e5e7eb;
  }

  tr:hover {
    background: #f9fafb;
  }
`;

const Badge = styled.span<{
  variant: '관리자' | '일반회원' | '대기' | '승인';
}>`
  padding: 4px 10px;
  border-radius: 9999px;
  font-size: ${({ theme }) => theme.fonts.sizes.ms};

  ${(props) => {
    switch (props.variant) {
      case '관리자':
        return `
         background: #dbeafe;
         color: #1d4ed8;
       `;
      case '일반회원':
        return `
         background: #f3f4f6;
         color: #374151;
       `;
      case '대기':
        return `
         background: #fef3c7;
         color: #b45309;
       `;
      case '승인':
        return `
         background: #d1fae5;
         color: #047857;
       `;
    }
  }}
`;

//페이지 네이션

const ButtonGroup = styled.div`
  display: flex;
  gap: 4px;
`;

const PageButton = styled.button<{ active?: boolean }>`
  padding: 6px 12px;
  border-radius: 6px;
  font-size: ${({ theme }) => theme.fonts.sizes.ms};

  background: ${(props) => (props.active ? '#3b82f6' : 'transparent')};
  color: ${(props) => (props.active ? 'white' : 'inherit')};
  border: ${(props) => (props.active ? 'none' : '1px solid #e5e7eb')};

  &:hover:not(:disabled) {
    background: ${(props) => (props.active ? '#2563eb' : '#f9fafb')};
  }
`;

const LoadingText = styled.span`
  color: #6b7280;
  font-size: ${({ theme }) => theme.fonts.sizes.ms};
`;
const PaginationContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 16px;
  padding: 16px 24px;
`;

const PaginationButton = styled.button<{ disabled?: boolean }>`
  padding: 6px 12px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  font-size: ${({ theme }) => theme.fonts.sizes.ms};

  &:hover:not(:disabled) {
    background-color: #f9fafb;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const PageInfo = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: ${({ theme }) => theme.fonts.sizes.ms};
  color: #4b5563;
`;

const PageSelect = styled.select`
  padding: 6px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  font-size: ${({ theme }) => theme.fonts.sizes.ms};
`;
