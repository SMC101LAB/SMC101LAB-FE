import { FC, useState, useEffect } from 'react';
import styled from 'styled-components';
import { SideComponentsProps } from '../interface';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { userAPI, User } from '../../../apis/User';
import { authAPI } from '../../../apis/Auth';
import { useNotificationStore } from '../../../hooks/notificationStore';

const SideComponents: FC<SideComponentsProps> = ({
  selectPage,
  ChooseIndex,
}) => {
  const [toggle, setToggle] = useState<boolean[]>([false, false, false]);
  const [showProfileModal, setShowProfileModal] = useState<boolean>(false);
  const [isModalClicked, setIsModalClicked] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<User>({
    _id: 0,
    name: '',
    organization: '',
    phone: '',
    isAdmin: false,
    isApproved: false,
  });

  // 로딩 상태 추가
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // 컴포넌트 마운트 시 사용자 정보 가져오기
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        setIsLoading(true);
        // localStorage나 context에서 사용자 ID를 가져와야 함
        const userId = localStorage.getItem('_id'); // 또는 다른 방법으로 ID 획득

        if (userId) {
          const userData = await userAPI.getUser(userId);
          setUserInfo(userData);
        }
      } catch (error) {
        console.error('사용자 정보 조회 실패:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  //프로필 영역 hover와 active기능 구현
  const handleProfileClick = () => {
    setIsModalClicked(true);
    setShowProfileModal(true);
  };

  const handleProfileMouseEnter = () => {
    if (!isModalClicked) {
      setShowProfileModal(true);
    }
  };

  const handleProfileMouseLeave = () => {
    if (!isModalClicked) {
      setShowProfileModal(false);
    }
  };

  const handleOutsideClick = () => {
    setIsModalClicked(false);
    setShowProfileModal(false);
  };

  const showNotification = useNotificationStore(
    (state) => state.showNotification
  );
  const handleLogout = async () => {
    await authAPI.logout();

    showNotification('로그아웃 되었습니다.', { severity: 'success' });
    window.location.href = '/';
  };
  return (
    <SideContainer>
      <LogoWrapper>
        <Logo>SMC101LAB</Logo>
      </LogoWrapper>
      <IndexWrapper>
        {/* <IndexContainer
          $isSelect={selectPage[0]}
          onClick={() => ChooseIndex(0)}
        >
          <TitleIndexText>홈</TitleIndexText>
        </IndexContainer> */}
        <ToggleIndexContainer
          onClick={() => {
            setToggle([!toggle[0], toggle[1], toggle[2]]);
          }}
        >
          <ToggleIndexText $isOpen={toggle[0]}>급경사지 관리</ToggleIndexText>
          <Arrow $isOpen={toggle[0]} />
        </ToggleIndexContainer>
        {toggle[0] && (
          <>
            <SubIndexContainer
              $isSelect={selectPage[1]}
              onClick={() => ChooseIndex(1)}
            >
              <IndexText $isSelect={selectPage[1]}>
                급경사지 조회/수정/삭제
              </IndexText>
            </SubIndexContainer>
            <SubIndexContainer
              $isSelect={selectPage[2]}
              onClick={() => ChooseIndex(2)}
            >
              <IndexText $isSelect={selectPage[2]}>
                급경사지 추가/복구
              </IndexText>
            </SubIndexContainer>
          </>
        )}
        <ToggleIndexContainer
          onClick={() => {
            setToggle([toggle[0], !toggle[1], toggle[2]]);
          }}
        >
          <ToggleIndexText $isOpen={toggle[1]}>급경사지 이상값</ToggleIndexText>
          <Arrow $isOpen={toggle[1]} />
        </ToggleIndexContainer>
        {toggle[1] && (
          <>
            <SubIndexContainer
              $isSelect={selectPage[3]}
              onClick={() => ChooseIndex(3)}
            >
              <IndexText $isSelect={selectPage[3]}>빈값 찾기</IndexText>
            </SubIndexContainer>
            <SubIndexContainer
              $isSelect={selectPage[4]}
              onClick={() => ChooseIndex(4)}
            >
              <IndexText $isSelect={selectPage[4]}>중복값 찾기</IndexText>
            </SubIndexContainer>
            {/* <SubIndexContainer
              $isSelect={selectPage[5]}
              onClick={() => ChooseIndex(5)}
            >
              <IndexText $isSelect={selectPage[5]}>위치이상</IndexText>
            </SubIndexContainer> */}
          </>
        )}
        <ToggleIndexContainer
          onClick={() => {
            setToggle([toggle[0], toggle[1], !toggle[2]]);
          }}
        >
          <ToggleIndexText $isOpen={toggle[2]}>회원관리</ToggleIndexText>
          <Arrow $isOpen={toggle[2]} />
        </ToggleIndexContainer>
        {toggle[2] && (
          <>
            <SubIndexContainer
              $isSelect={selectPage[6]}
              onClick={() => ChooseIndex(6)}
            >
              <IndexText $isSelect={selectPage[6]}>회원조회 및 승인</IndexText>
            </SubIndexContainer>
            <SubIndexContainer
              $isSelect={selectPage[7]}
              onClick={() => ChooseIndex(7)}
            >
              <IndexText $isSelect={selectPage[7]}>회원수정 및 삭제</IndexText>
            </SubIndexContainer>
          </>
        )}
        <IndexContainer
          $isSelect={selectPage[8]}
          onClick={() => ChooseIndex(8)}
        >
          <TitleIndexText $isSelect={selectPage[8]}>지도</TitleIndexText>
        </IndexContainer>
      </IndexWrapper>
      <BottomWrapper>
        <CopyrightWrapper>
          <CopyrightText>© 2025. SMC101LAB</CopyrightText>
        </CopyrightWrapper>

        {/* 프로필 영역 */}
        <ProfileWrapper
          onClick={handleProfileClick}
          onMouseEnter={handleProfileMouseEnter}
          onMouseLeave={handleProfileMouseLeave}
        >
          {isLoading ? (
            <LoadingWrapper>
              <LoadingText>사용자 정보 로딩 중...</LoadingText>
            </LoadingWrapper>
          ) : (
            <ProfileContainer>
              <AccountCircleIcon
                style={{
                  fontSize: '2rem',
                  color: '#666',
                  cursor: 'pointer',
                }}
              />
              <ProfileName>{userInfo.name}</ProfileName>
              {/* 프로필 모달 */}
              {showProfileModal && (
                <ProfileModal>
                  <ProfileInfo>
                    <InfoItem>
                      <InfoLabel>이름 :</InfoLabel>
                      <InfoValue>{userInfo.name}</InfoValue>
                    </InfoItem>
                    <InfoItem>
                      <InfoLabel>권한 :</InfoLabel>
                      <InfoValue>
                        {userInfo.isAdmin ? (
                          <AdminBadge>관리자</AdminBadge>
                        ) : (
                          <UserBadge>일반 사용자</UserBadge>
                        )}
                      </InfoValue>
                    </InfoItem>
                    <InfoItem>
                      <InfoLabel>소속 :</InfoLabel>
                      <InfoValue>{userInfo.organization}</InfoValue>
                    </InfoItem>
                  </ProfileInfo>
                  <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
                </ProfileModal>
              )}
            </ProfileContainer>
          )}
        </ProfileWrapper>
      </BottomWrapper>

      {/* 모달이 클릭으로 열린 상태일 때 외부 클릭으로 닫기 */}
      {isModalClicked && <ModalOverlay onClick={handleOutsideClick} />}
    </SideContainer>
  );
};
export default SideComponents;
const SideContainer = styled.div`
  @media ${({ theme }) => theme.device.mobile} {
    width: 0;
    display: none;
  }
  width: 15%;
  height: 100%;
  border-right: 1px solid ${({ theme }) => theme.colors.grey[300]};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-top: 10px;
  position: relative;
`;

const Logo = styled.div`
  @media ${({ theme }) => theme.device.tablet} {
    font-size: ${({ theme }) => theme.fonts.sizes.ml};
  }
  color: ${({ theme }) => theme.colors.primaryDark};
  font-size: ${({ theme }) => theme.fonts.sizes.ts};
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
`;
const LogoWrapper = styled.div`
  width: 100%;
  padding: 40px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ToggleIndexContainer = styled.div`
  width: 100%;
  padding: 8px 20px;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  &:hover {
    background-color: ${({ theme }) => theme.colors.grey[100]};
    padding-left: 24px;
  }
`;

const ToggleIndexText = styled.div<{ $isOpen: boolean }>`
  @media ${({ theme }) => theme.device.tablet} {
    font-size: ${({ theme }) => theme.fonts.sizes.ms};
  }
  color: ${({ theme }) => theme.colors.grey[700]};
  font-size: ${({ theme }) => theme.fonts.sizes.mm};
  font-weight: ${({ $isOpen, theme }) =>
    $isOpen ? theme.fonts.weights.bold : theme.fonts.weights.medium};
`;
const Arrow = styled.div<{ $isOpen: boolean }>`
  position: relative;
  &::before {
    position: absolute;
    transition: 0.4s all ease-in-out;
    left: -10px;
    top: ${({ $isOpen }) => ($isOpen ? '5px' : 0)};
    content: '';
    width: 10px;
    height: 10px;
    border-top: 2px solid #bdbdbd;
    border-right: 2px solid #bdbdbd;
    transform: ${({ $isOpen }) =>
      $isOpen ? 'rotate(315deg)' : 'rotate(135deg)'};
  }
`;

const IndexContainer = styled.div<{ $isSelect: boolean }>`
  width: 100%;
  padding: 0px 20px;
  background-color: ${({ $isSelect, theme }) =>
    $isSelect ? theme.colors.primary : '#fff'};
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${({ theme }) => theme.colors.grey[100]};
    padding-left: 24px;
  }
`;

const TitleIndexText = styled.div<{ $isSelect: boolean }>`
  @media ${({ theme }) => theme.device.tablet} {
    font-size: ${({ theme }) => theme.fonts.sizes.ms};
  }
  color: ${({ $isSelect, theme }) =>
    $isSelect ? '#fff' : theme.colors.grey[700]};
  font-size: ${({ theme }) => theme.fonts.sizes.mm};
  font-weight: ${({ $isSelect, theme }) =>
    $isSelect ? theme.fonts.weights.bold : theme.fonts.weights.medium};
  &:hover {
    color: ${({ $isSelect, theme }) =>
      $isSelect ? theme.colors.grey[700] : theme.colors.grey[700]};
  }
  padding: 8px 0px;
`;

const SubIndexContainer = styled.div<{ $isSelect: boolean }>`
  width: 100%;

  background-color: ${({ $isSelect, theme }) =>
    $isSelect ? theme.colors.primary : '#fff'};

  cursor: pointer;
  transition: 0.1s all ease-in;
  &:hover {
    background-color: ${({ theme }) => theme.colors.grey[200]};
    transform: scale(1.1);
  }
`;

const IndexText = styled.div<{ $isSelect: boolean }>`
  @media ${({ theme }) => theme.device.tablet} {
    font-size: ${({ theme }) => theme.fonts.sizes.ms};
  }
  color: ${({ $isSelect, theme }) =>
    $isSelect ? '#fff' : theme.colors.grey[700]};
  font-size: ${({ theme }) => theme.fonts.sizes.mm};
  font-weight: ${({ theme }) => theme.fonts.weights.medium};
  &:hover {
    color: ${({ theme }) => theme.colors.grey[700]};
  }
  padding: 5px 0px;
  padding-left: 30px;
`;

const CopyrightText = styled.div`
  @media ${({ theme }) => theme.device.tablet} {
    font-size: ${({ theme }) => theme.fonts.sizes.ms};
  }
  color: ${({ theme }) => theme.colors.grey[500]};
  font-size: ${({ theme }) => theme.fonts.sizes.ms};
  text-align: center;
`;

const ProfileContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border-radius: 8px;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${({ theme }) => theme.colors.grey[100]};
  }
`;

const ProfileName = styled.div`
  color: ${({ theme }) => theme.colors.grey[700]};
  font-size: ${({ theme }) => theme.fonts.sizes.ms};
  font-weight: ${({ theme }) => theme.fonts.weights.medium};
`;

const ProfileModal = styled.div`
  position: absolute;
  bottom: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid ${({ theme }) => theme.colors.grey[300]};
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  padding: 16px;
  margin-bottom: 8px;
  z-index: 1000;

  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 20px;
    border: 6px solid transparent;
    border-top-color: white;
  }
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 12px;
`;

const InfoItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const InfoLabel = styled.span`
  color: ${({ theme }) => theme.colors.grey[600]};
  font-size: ${({ theme }) => theme.fonts.sizes.ms};
  font-weight: ${({ theme }) => theme.fonts.weights.medium};
`;

const InfoValue = styled.span`
  color: ${({ theme }) => theme.colors.grey[800]};
  font-size: ${({ theme }) => theme.fonts.sizes.ms};
`;

const AdminBadge = styled.span`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: ${({ theme }) => theme.fonts.sizes.xs};
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
`;

const UserBadge = styled.span`
  background-color: ${({ theme }) => theme.colors.grey[400]};
  color: white;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: ${({ theme }) => theme.fonts.sizes.xs};
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
`;

const LogoutButton = styled.button`
  width: 100%;
  padding: 8px 12px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  border-radius: 4px;
  font-size: ${({ theme }) => theme.fonts.sizes.ms};
  font-weight: ${({ theme }) => theme.fonts.weights.medium};
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
  }
`;
const IndexWrapper = styled.div`
  width: 100%;
  flex: 1;
`;

const BottomWrapper = styled.div`
  width: 100%;
  margin-top: auto;
`;

const CopyrightWrapper = styled.div`
  width: 100%;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProfileWrapper = styled.div`
  width: 100%;
  padding: 8px;
  border-top: 1px solid ${({ theme }) => theme.colors.grey[300]};
`;
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  background: transparent;
`;
const LoadingWrapper = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoadingText = styled.div`
  color: ${({ theme }) => theme.colors.grey[600]};
  font-size: ${({ theme }) => theme.fonts.sizes.ms};
`;
