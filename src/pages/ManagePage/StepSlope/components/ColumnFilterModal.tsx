import styled from 'styled-components';
import { Table } from '@tanstack/react-table';
import { Slope } from '../../../../apis/Map/slopeMap';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  table: Table<Slope>;
}

const FilterModal = ({ isOpen, onClose, table }: FilterModalProps) => {
  return (
    <ModalOverlay $isOpen={isOpen}>
      <ModalContent>
        <ModalHeader>
          <h2>표시할 열 항목 설정</h2>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>
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
      </ModalContent>
    </ModalOverlay>
  );
};
export default FilterModal;

const ModalOverlay = styled.div<{ $isOpen: boolean }>`
  display: ${(props) => (props.$isOpen ? 'flex' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  width: 100%;
  max-width: 500px;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  h2 {
    margin: 0;
    font-size: 20px;
  }
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

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  padding: 0;
`;
