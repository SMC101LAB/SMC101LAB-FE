import styled from 'styled-components';

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
}
const CommentDeleteModal = ({
  isOpen,
  onClose,
  onSubmit,
}: DeleteModalProps) => {
  return (
    <ModalOverlay $isOpen={isOpen}>
      <DeleteModalContent>
        <ModalHeader>
          <h2>삭제 확인</h2>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>
        <DeleteModalText>정말 삭제하시겠습니까?</DeleteModalText>
        <ButtonGroup>
          <CancelButton type="button" onClick={onClose}>
            취소
          </CancelButton>
          <DeleteButton onClick={onSubmit}>삭제</DeleteButton>
        </ButtonGroup>
      </DeleteModalContent>
    </ModalOverlay>
  );
};

export default CommentDeleteModal;

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

const DeleteModalContent = styled.div`
  background: white;
  padding: 24px;
  border-radius: 8px;
  width: 90%;
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
    font-weight: 600;
  }
`;

const DeleteModalText = styled.p`
  margin: 0 0 24px 0;
  font-size: ${({ theme }) => theme.fonts.sizes.m};
  color: ${({ theme }) => theme.colors.grey[700]};
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;
  padding: 0;

  &:hover {
    color: #333;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;

const Button = styled.button`
  padding: 8px 16px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: 500;
`;

const DeleteButton = styled(Button)`
  background: #dc2626;
  color: white;

  &:hover {
    background: #b91c1c;
  }
`;

const CancelButton = styled(Button)`
  background: #e5e7eb;
  color: #374151;

  &:hover {
    background: #d1d5db;
  }
`;
