import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { User } from '../../../../apis/User';

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
  onSubmit: (updatedUser: User) => void;
}

const EditModal = ({ isOpen, onClose, user, onSubmit }: EditModalProps) => {
  const [editUser, setEditUser] = useState<User>(user);
  useEffect(() => {
    setEditUser(user);
  }, [user]);
  const handleSubmit = (e: React.FormEvent) => {
    console.log('handleSubmit', editUser);
    onSubmit(editUser);
    e.preventDefault();
    onClose();
  };

  return (
    <ModalOverlay $isOpen={isOpen}>
      <ModalContent>
        <ModalHeader>
          <h2>사용자 정보 수정</h2>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <label>이름</label>
            <input
              type="text"
              value={editUser.name}
              onChange={(e) => {
                setEditUser({ ...editUser, name: e.target.value });
                console.log('수정', editUser);
              }}
            />
          </FormGroup>
          <FormGroup>
            <label>소속</label>
            <input
              type="text"
              value={editUser.organization}
              onChange={(e) =>
                setEditUser({ ...editUser, organization: e.target.value })
              }
            />
          </FormGroup>
          <FormGroup>
            <label>전화번호</label>
            <input
              type="text"
              value={editUser.phone}
              onChange={(e) =>
                setEditUser({ ...editUser, phone: e.target.value })
              }
            />
          </FormGroup>
          <FormGroup>
            <label>관리자 권한</label>
            <input
              type="checkbox"
              checked={editUser.isAdmin}
              onChange={(e) =>
                setEditUser({ ...editUser, isAdmin: e.target.checked })
              }
            />
          </FormGroup>
          <ButtonGroup>
            <SubmitButton type="submit">저장</SubmitButton>
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

const FormGroup = styled.div`
  margin-bottom: 16px;

  label {
    display: block;
    margin-bottom: 8px;
    font-size: ${({ theme }) => theme.fonts.sizes.ms};
    font-weight: ${({ theme }) => theme.fonts.weights.bold};
  }

  input[type='text'] {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  input[type='checkbox'] {
    width: 20px;
    height: 20px;
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
`;

const SubmitButton = styled(Button)`
  background: #3b82f6;
  color: white;

  &:hover {
    background: #2563eb;
  }
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
`;

export default EditModal;
