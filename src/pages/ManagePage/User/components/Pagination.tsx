import styled from 'styled-components';
import { FC } from 'react';
import { PaginationProps } from '../../interface';

const Pagination: FC<PaginationProps> = ({
  currentPage,
  pageCount,
  pageSize,
  canPreviousPage,
  canNextPage,
  onFirstPage,
  onPreviousPage,
  onNextPage,
  onLastPage,
  onPageSizeChange,
  onPageChange, // 새로 추가된 prop
}) => {
  // 페이지 번호 범위를 계산하는 함수
  const getPageNumbers = () => {
    const maxVisiblePages = 5; // 표시할 최대 페이지 수
    const pages: number[] = [];

    if (pageCount <= maxVisiblePages) {
      // 전체 페이지가 5개 이하면 모든 페이지 표시
      for (let i = 0; i < pageCount; i++) {
        pages.push(i);
      }
    } else {
      // 현재 페이지를 중심으로 5개 페이지 표시
      const start = Math.max(
        0,
        Math.min(currentPage - 2, pageCount - maxVisiblePages)
      );
      const end = Math.min(pageCount, start + maxVisiblePages);

      for (let i = start; i < end; i++) {
        pages.push(i);
      }
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <PaginationContainer>
      <ButtonGroup>
        <PaginationButton onClick={onFirstPage} disabled={!canPreviousPage}>
          {'<<'}
        </PaginationButton>
        <PaginationButton onClick={onPreviousPage} disabled={!canPreviousPage}>
          {'<'}
        </PaginationButton>

        {/* 페이지 번호들을 나열 */}
        {pageNumbers.map((pageIndex) => (
          <PageButton
            key={pageIndex}
            $active={pageIndex === currentPage}
            onClick={() => onPageChange && onPageChange(pageIndex)}
          >
            {pageIndex + 1}
          </PageButton>
        ))}

        <PaginationButton onClick={onNextPage} disabled={!canNextPage}>
          {'>'}
        </PaginationButton>
        <PaginationButton onClick={onLastPage} disabled={!canNextPage}>
          {'>>'}
        </PaginationButton>
      </ButtonGroup>

      <PageInfo>
        Page {currentPage + 1} of {pageCount}
      </PageInfo>

      <PageSelect
        value={pageSize}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          onPageSizeChange(Number(e.target.value))
        }
      >
        {[5, 8].map((size) => (
          <option key={size} value={size}>
            Show {size}
          </option>
        ))}
      </PageSelect>
    </PaginationContainer>
  );
};

export default Pagination;

const ButtonGroup = styled.div`
  display: flex;
  gap: 4px;
`;

const PageButton = styled.button<{ $active?: boolean }>`
  padding: 6px 12px;
  border-radius: 6px;
  font-size: ${({ theme }) => theme.fonts.sizes.ms};
  cursor: pointer;

  background: ${(props) => (props.$active ? '#3b82f6' : 'transparent')};
  color: ${(props) => (props.$active ? 'white' : 'inherit')};
  border: ${(props) => (props.$active ? 'none' : '1px solid #e5e7eb')};

  &:hover:not(:disabled) {
    background: ${(props) => (props.$active ? '#2563eb' : '#f9fafb')};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
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
  cursor: pointer;

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
