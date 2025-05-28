import { useEffect, useState } from 'react';
import styled from 'styled-components';
import PrivacyPolicyModal from './PrivacyPolicyModal';
import DeleteIdModal from './DeleteIdModal';
import { userAPI } from '../../../../apis/User';
import TermsofUseModal from './TermsofUseModal';
import ArrowBackIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import { useNotificationStore } from '../../../../hooks/notificationStore';
import { LeftModalProps } from '../../interface';

const LeftModal = ({ isOpen, onClose }: LeftModalProps) => {
  const [animationOpen, setAnimationOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<string | null>(null);
  const [isPrivacyPolicyOpen, setIsPrivacyPolicyOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isTermofUseOpen, setIsTermofUseOpen] = useState(false);
  //전역 알람
  const showNotification = useNotificationStore(
    (state) => state.showNotification
  );
  useEffect(() => {
    if (isOpen) setTimeout(() => setAnimationOpen(true), 10);
    else {
      setAnimationOpen(false);
      setSelectedMenu(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleBackClick = () => {
    if (selectedMenu) {
      setSelectedMenu(null);
    } else {
      onClose();
    }
  };

  const handleMenuClick = (menu: string) => {
    setSelectedMenu(menu);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('_id');
    localStorage.removeItem('isAdmin');
    onClose();
    showNotification('로그아웃 되었습니다.', { severity: 'success' });
    window.location.href = '/';
  };

  return (
    <ModalOverlay onClick={onClose}>
      <LeftModalContainer
        $animationOpen={animationOpen}
        onClick={(e) => e.stopPropagation()}
      >
        <TitleContainer>
          <ArrowBackIcon
            sx={{
              width: 20,
              height: 20,
              cursor: 'pointer',
            }}
            onClick={handleBackClick}
          />
          <Menu>{selectedMenu || '메뉴'}</Menu>
        </TitleContainer>
        <Divider />

        {selectedMenu === '계정' ? (
          // 계정 서브메뉴
          <>
            <MenuItem onClick={() => handleMenuClick('내정보')}>
              내정보
            </MenuItem>
            <MenuItem onClick={handleLogout}>로그아웃</MenuItem>
            <MenuItem
              onClick={() => {
                setIsDeleteModalOpen(true);
              }}
            >
              회원탈퇴
            </MenuItem>
          </>
        ) : selectedMenu === '내정보' ? (
          <Profile />
        ) : (
          // 메인 메뉴
          <>
            <MenuItem onClick={() => handleMenuClick('계정')}>계정</MenuItem>
            <MenuItem onClick={() => setIsTermofUseOpen(true)}>
              이용약관
            </MenuItem>

            <MenuItem onClick={() => setIsPrivacyPolicyOpen(true)}>
              개인정보처리방침
            </MenuItem>
          </>
        )}
      </LeftModalContainer>
      {/* 이용약관 */}
      <TermsofUseModal
        isOpen={isTermofUseOpen}
        onClose={() => setIsTermofUseOpen(false)}
      />
      {/* 개인정보 처리방침 모달 */}
      <PrivacyPolicyModal
        isOpen={isPrivacyPolicyOpen}
        onClose={() => setIsPrivacyPolicyOpen(false)}
      />
      {/* 회원삭제  모달 */}
      <DeleteIdModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      />
    </ModalOverlay>
  );
};

export default LeftModal;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  align-items: center;
  z-index: 1000;
`;

const LeftModalContainer = styled.div<{ $animationOpen: boolean }>`
  width: 70%;
  height: 100%;
  background-color: #fff;
  position: absolute;
  left: 0;
  top: 0;
  transform: translateX(${(props) => (props.$animationOpen ? '0' : '-100%')});
  transition: transform 0.3s ease-in-out;
  padding: 20px;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  margin-top: 35px;
`;

const Menu = styled.div`
  font-size: ${({ theme }) => theme.fonts.sizes.ml};
  font-weight: 500;
  padding: 5px 0;
`;

const Divider = styled.div`
  height: 1px;
  background-color: #e0e0e0;
  margin: 10px 0;
`;

const MenuItem = styled.div`
  padding: 8px 0;
  font-size: ${({ theme }) => theme.fonts.sizes.mm};
  cursor: pointer;
`;
interface UserInfo {
  _id: string;
  isAdmin: string;
  name: string;
  organization: string;
  phone: string;
}
const Profile = () => {
  const [user, setUser] = useState<UserInfo | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const userId = localStorage.getItem('_id');
      if (userId) {
        const userData = await userAPI.getUser(userId);
        setUser(userData);
      }
    };
    getUser();
  }, []);

  return (
    <ProfileContainer>
      {user ? (
        <>
          <ProfileItem>
            <ProfileLabel>이름</ProfileLabel>
            <ProfileValue>{user.name}</ProfileValue>
          </ProfileItem>
          <ProfileItem>
            <ProfileLabel>소속</ProfileLabel>
            <ProfileValue>{user.organization}</ProfileValue>
          </ProfileItem>
          <ProfileItem>
            <ProfileLabel>연락처</ProfileLabel>
            <ProfileValue>{user.phone}</ProfileValue>
          </ProfileItem>
        </>
      ) : (
        <LoadingText>정보를 불러오는 중...</LoadingText>
      )}
    </ProfileContainer>
  );
};

const ProfileContainer = styled.div`
  margin-top: 10px;
`;

const ProfileItem = styled.div`
  margin-bottom: 20px;
`;

const ProfileLabel = styled.div`
  font-size: 14px;
  color: #666;
  margin-bottom: 5px;
`;

const ProfileValue = styled.div`
  font-size: 18px;
  font-weight: 500;
`;

const LoadingText = styled.div`
  font-size: 16px;
  color: #666;
  text-align: center;
  margin-top: 20px;
`;
