import styled from 'styled-components';
import { FC } from 'react';
import { PaginationProps } from '../interface';

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
}) => {
  return (
    <PaginationContainer>
      <ButtonGroup>
        <PaginationButton onClick={onFirstPage} disabled={!canPreviousPage}>
          {'<<'}
        </PaginationButton>
        <PaginationButton onClick={onPreviousPage} disabled={!canPreviousPage}>
          {'<'}
        </PaginationButton>
        <PageButton $active>{currentPage + 1}</PageButton>
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

  background: ${(props) => (props.$active ? '#3b82f6' : 'transparent')};
  color: ${(props) => (props.$active ? 'white' : 'inherit')};
  border: ${(props) => (props.$active ? 'none' : '1px solid #e5e7eb')};

  &:hover:not(:disabled) {
    background: ${(props) => (props.$active ? '#2563eb' : '#f9fafb')};
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
