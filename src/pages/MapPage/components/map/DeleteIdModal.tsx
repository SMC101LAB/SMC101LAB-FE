import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { userAPI } from '../../../../apis/User';
import { useNotificationStore } from '../../../../hooks/notificationStore';
import { DeleteConfirmModalProps, UserDelete } from '../../interface';

const DeleteIdModal = ({ isOpen, onClose }: DeleteConfirmModalProps) => {
  const [inputValue, setInputValue] = useState('');
  const [user, setUser] = useState<UserDelete | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const userId = localStorage.getItem('_id');
      const userData = await userAPI.getUser(userId!);
      setUser(userData);
    };
    getUser();
  }, []);
  const showNotification = useNotificationStore(
    (state) => state.showNotification
  );
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue === '회원탈퇴') {
      userAPI.selfDeleteUser(user!._id);
      showNotification('회원탈퇴가 정상처리 되었습니다.', {
        severity: 'success',
      });
      window.location.href = '/';
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // 사용자 정보가 로드되지 않았을 때 렌더링 방지
  if (!isOpen) return null;
  return (
    <ModalOverlay $isOpen={isOpen} onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <h2>회원탈퇴</h2>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>
        <form onSubmit={handleSubmit}>
          <DeleteMessage>
            <BoldName>{user?.name || '사용자'}</BoldName>님의 계정을
            삭제하시려면 입력창에
            <BoldText>회원탈퇴</BoldText>라고 입력해 주세요.
          </DeleteMessage>
          <FormGroup>
            <input
              type="text"
              placeholder="회원탈퇴"
              value={inputValue}
              onChange={handleInputChange}
            />
          </FormGroup>
          <ButtonGroup>
            <SubmitButton
              id="deleteSubmitButton"
              type="submit"
              disabled={inputValue !== '회원탈퇴'}
            >
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
export default DeleteIdModal;
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
  z-index: 1200;
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
