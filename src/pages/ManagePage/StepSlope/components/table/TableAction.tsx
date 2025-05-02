import styled from 'styled-components';
import React from 'react';
import { Slope } from '../../../../../apis/slopeMap';
import LoadingMessage from '../../../components/LoadingMessage';
interface TableActionProps {
  isLoading: boolean;
  selectedRow: Slope | null;
  openEditModal: () => void;
  openDeleteModal: () => void;
}
const TableAction: React.FC<TableActionProps> = ({
  isLoading,
  selectedRow,
  openEditModal,
  openDeleteModal,
}) => {
  return (
    <>
      {isLoading && <LoadingMessage text="데이터를 불러오는 중" />}
      {/* 하단 버튼 컨테이너 */}
      {selectedRow && (
        <BottomButtonContainer>
          <ActionButton onClick={openEditModal}>수정</ActionButton>
          <ActionButton onClick={openDeleteModal} className="delete">
            삭제
          </ActionButton>
        </BottomButtonContainer>
      )}
    </>
  );
};

export default TableAction;
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
