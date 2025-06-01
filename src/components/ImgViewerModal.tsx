import { useImgViewerStore } from '../stores/imgViewerStore';
import styled from 'styled-components';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';

const ImgViewerModal = () => {
  const {
    isOpen,
    onClose,
    currentImageType,
    currentImageUrl,
    getPrevImageType,
    getNextImageType,
    getImagePosition,
    canGoPrev,
    canGoNext,
    openImage,
    images,
  } = useImgViewerStore();

  if (!isOpen || !currentImageType || !images) return null;

  const { current, total } = getImagePosition();
  const prevEnabled = canGoPrev();
  const nextEnabled = canGoNext();

  // 이미지 타입별 한국어 이름
  const getImageTypeName = (type: string) => {
    switch (type) {
      case 'position':
        return '위치도';
      case 'start':
        return '시점';
      case 'end':
        return '종점';
      case 'overview':
        return '전경';
      default:
        return '';
    }
  };

  const handlePrev = () => {
    const prevType = getPrevImageType();
    if (prevType && images[prevType]?.url) {
      openImage(images[prevType].url, prevType);
    }
  };

  const handleNext = () => {
    const nextType = getNextImageType();
    if (nextType && images[nextType]?.url) {
      openImage(images[nextType].url, nextType);
    }
  };

  // 키보드 이벤트 처리
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft' && prevEnabled) {
      handlePrev();
    } else if (e.key === 'ArrowRight' && nextEnabled) {
      handleNext();
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <ModalOverlay onClick={onClose} onKeyDown={handleKeyDown} tabIndex={0}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <HeaderTitle>
            {getImageTypeName(currentImageType)} ({current}/{total})
          </HeaderTitle>
          <CloseButton onClick={onClose}>✕</CloseButton>
        </ModalHeader>

        <ImageContainer>
          {/* 이미지 */}
          <MainImage
            src={currentImageUrl || ''}
            alt={getImageTypeName(currentImageType)}
            onError={() => {
              console.error('이미지 로드 실패:', currentImageUrl);
            }}
          />

          {/* 왼쪽 화살표 - MUI 아이콘 사용 */}
          <ArrowButton
            $position="left"
            $enabled={prevEnabled}
            onClick={handlePrev}
            disabled={!prevEnabled}
          >
            <ArrowBackIosRoundedIcon sx={{ fontSize: '48px' }} />
          </ArrowButton>

          {/* 오른쪽 화살표 - MUI 아이콘 사용 */}
          <ArrowButton
            $position="right"
            $enabled={nextEnabled}
            onClick={handleNext}
            disabled={!nextEnabled}
          >
            <ArrowForwardIosRoundedIcon sx={{ fontSize: '48px' }} />
          </ArrowButton>
        </ImageContainer>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default ImgViewerModal;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.85);
  z-index: 2000;
  display: flex;
  flex-direction: column;
  outline: none;
`;

const ModalContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0));
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 20;
  padding-top: 45px;
`;

const HeaderTitle = styled.h1`
  font-size: 18px;
  font-weight: 600;
  margin: 0;
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
`;

const CloseButton = styled.button`
  background: rgba(0, 0, 0, 0.6);
  border: none;
  font-size: 28px;
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  border-radius: 50%;
  width: 44px;
  height: 44px;
  backdrop-filter: blur(10px);
  transition: all 0.2s ease;
  &:hover {
    background: rgba(0, 0, 0, 0.8);
    transform: scale(1.1);
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const MainImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const ArrowButton = styled.button<{
  $position: 'left' | 'right';
  $enabled: boolean;
}>`
  position: absolute;
  ${({ $position }) => $position}: 30px;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.7);
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: ${({ $enabled }) => ($enabled ? 'white' : 'rgba(255, 255, 255, 0.3)')};
  cursor: ${({ $enabled }) => ($enabled ? 'pointer' : 'not-allowed')};
  padding: 20px;
  border-radius: 50%;
  backdrop-filter: blur(20px);
  transition: all 0.3s ease;
  z-index: 10;

  /* MUI 아이콘을 위한 스타일 조정 */
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;

  &:hover {
    background: ${({ $enabled }) =>
      $enabled ? 'rgba(0, 0, 0, 0.9)' : 'rgba(0, 0, 0, 0.7)'};
    border-color: ${({ $enabled }) =>
      $enabled ? 'rgba(255, 255, 255, 0.6)' : 'rgba(255, 255, 255, 0.3)'};
    transform: translateY(-50%)
      ${({ $enabled }) => ($enabled ? 'scale(1.1)' : 'scale(1)')};
    box-shadow: ${({ $enabled }) =>
      $enabled ? '0 8px 32px rgba(0, 0, 0, 0.5)' : 'none'};
  }

  &:disabled {
    cursor: not-allowed;
  }

  /* MUI 아이콘 스타일 조정 */
  .MuiSvgIcon-root {
    color: inherit;
  }

  @media (max-width: 768px) {
    ${({ $position }) => $position}: 15px;
    width: 60px;
    height: 60px;
    padding: 15px;

    .MuiSvgIcon-root {
      font-size: 36px !important;
    }
  }

  @media (max-width: 480px) {
    ${({ $position }) => $position}: 10px;
    width: 50px;
    height: 50px;
    padding: 12px;

    .MuiSvgIcon-root {
      font-size: 28px !important;
    }
  }
`;
