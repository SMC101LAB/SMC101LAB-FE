import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { DeleteConfirmModalProps } from '../../interface';

const DeleteConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  selectedRow,
  selectedRows = [],
}: DeleteConfirmModalProps) => {
  const [count, setCount] = useState(0);
  const [isMulti, setIsMulti] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm();
    onClose();
  };
  useEffect(() => {
    if (isOpen) {
      const selectedCount = selectedRows.length;
      setCount(selectedCount);
      setIsMulti(selectedCount > 1);
      console.log('Modal opened with:', {
        selectedCount,
        isMulti: selectedCount > 1,
        selectedRows,
      });
    }
  }, [isOpen, selectedRows]);
  return (
    <ModalOverlay $isOpen={isOpen}>
      <ModalContent>
        <ModalHeader>
          <h2>데이터 삭제</h2>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>
        <form onSubmit={handleSubmit}>
          <DeleteMessage>
            {isMulti ? (
              // 다중 선택 시 메시지
              <>
                선택한 <BoldName>{count}개</BoldName>의 항목을 삭제하시려면
                입력창에
                <BoldText>삭제</BoldText>라고 입력해 주세요.
              </>
            ) : (
              // 단일 선택 시 메시지
              <>
                <BoldName>{selectedRow?.name}</BoldName>를 삭제하시려면 입력창에
                <BoldText>삭제</BoldText>라고 입력해 주세요.
              </>
            )}
          </DeleteMessage>
          <FormGroup>
            <input
              type="text"
              placeholder="삭제"
              onChange={(e) => {
                const submitButton = document.getElementById(
                  'deleteSubmitButton'
                ) as HTMLButtonElement;
                if (submitButton) {
                  submitButton.disabled = e.target.value !== '삭제';
                }
              }}
            />
          </FormGroup>
          <ButtonGroup>
            <SubmitButton id="deleteSubmitButton" type="submit" disabled>
              확인
            </SubmitButton>
            <CancelButton type="button" onClick={onClose}>
              취소
            </CancelButton>
          </ButtonGroup>
        </form>
      </ModalContent>
    </ModalOverlay>
  );
};
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
  max-width: 400px;
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

const DeleteMessage = styled.p`
  margin-bottom: 20px;
  line-height: 1.5;
  color: #374151;
`;

const BoldName = styled.span`
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
`;
const BoldText = styled.span`
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  color: #dc2626;
  margin-left: 4px;
`;

const FormGroup = styled.div`
  margin-bottom: 16px;

  input[type='text'] {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;

    &::placeholder {
      color: #9ca3af;
    }
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 24px;
`;

const Button = styled.button`
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  cursor: pointer;

  &:disabled {
    background-color: #9ca3af;
    cursor: not-allowed;
  }
`;

const SubmitButton = styled(Button)`
  background: #24478f;
  color: white;
`;

const CancelButton = styled(Button)`
  background: #e5e7eb;
  color: #374151;

  &:hover {
    background: #d1d5db;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  padding: 0;
  color: #374151;
`;

export default DeleteConfirmModal;
