import styled from 'styled-components';
import { useMapStore, MapTypeId } from '../../../stores/mapStore';
import MyLocationIcon from '@mui/icons-material/MyLocationRounded';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const ButtonGroup = () => {
  const {
    allTextShow,
    setAllTextShow,
    moveToMyLocation,
    mapTypeId,
    setMapTypeId,

    isGradeDrawerOpen,
    selectedGrade,
    grades,
    handleGradeSelect,
    handleGradeButtonClick,
  } = useMapStore();

  return (
    <Container>
      <MapTypeButton
        $isSelect={mapTypeId === MapTypeId.HYBRID}
        onClick={() => {
          setMapTypeId(
            mapTypeId === MapTypeId.NORMAL ? MapTypeId.HYBRID : MapTypeId.NORMAL
          );
        }}
      >
        {mapTypeId === MapTypeId.HYBRID ? '일반지도' : '위성지도'}
      </MapTypeButton>

      <TextDisplayButton
        $isSelect={allTextShow}
        onClick={() => {
          setAllTextShow(!allTextShow);
        }}
      >
        {allTextShow ? '전체표기' : '개별표기'}
      </TextDisplayButton>

      <LocationButton onClick={moveToMyLocation}>
        <MyLocationIcon />
      </LocationButton>

      <GradeContainer>
        <GradeButton
          $isSelect={selectedGrade !== null}
          $isOpen={isGradeDrawerOpen}
          onClick={handleGradeButtonClick}
        >
          <GradeButtonContent>
            <span>{selectedGrade || '등급'}</span>
            {isGradeDrawerOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </GradeButtonContent>
        </GradeButton>

        <GradeDrawer $isOpen={isGradeDrawerOpen}>
          {grades.map((grade) => (
            <GradeOption
              key={grade}
              $isSelected={selectedGrade === grade}
              onClick={() => handleGradeSelect(grade)}
            >
              {grade}
            </GradeOption>
          ))}
          {selectedGrade && (
            <GradeOption
              $isSelected={false}
              onClick={() => handleGradeSelect('전체')}
            >
              전체
            </GradeOption>
          )}
        </GradeDrawer>
      </GradeContainer>
    </Container>
  );
};

export default ButtonGroup;

const Container = styled.div`
  position: absolute;
  top: 50px;
  right: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 100;
`;

// 버튼 기본 스타일을 공통으로 분리
const BaseButton = styled.button`
  border: none;
  border-radius: 8px;
  padding: 5px 10px;
  box-shadow: ${({ theme }) => theme.shadows.sm};
  transition: all 0.15s ease-in-out;

  &:focus {
    outline: none;
  }

  &:active {
    transform: scale(1.1);
  }
`;

// 지도 타입 변경 버튼
const MapTypeButton = styled(BaseButton)<{ $isSelect: boolean }>`
  height: 30px;
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  font-size: ${({ theme }) => theme.fonts.sizes.ms};
  background-color: ${({ $isSelect, theme }) =>
    $isSelect ? theme.colors.primaryDark : '#fff'};
  color: ${({ $isSelect, theme }) =>
    !$isSelect ? theme.colors.primaryDark : '#fff'};
`;

// 텍스트 표시 방식 변경 버튼
const TextDisplayButton = styled(BaseButton)<{ $isSelect: boolean }>`
  height: 30px;
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  font-size: ${({ theme }) => theme.fonts.sizes.ms};
  background-color: ${({ $isSelect, theme }) =>
    $isSelect ? theme.colors.primaryDark : '#fff'};
  color: ${({ $isSelect, theme }) =>
    !$isSelect ? theme.colors.primaryDark : '#fff'};
`;

// 내 위치로 이동 버튼
const LocationButton = styled(BaseButton)`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;

  &:hover {
    background-color: ${({ theme }) => theme.colors.grey[200]};
  }
`;

// 등급 컨테이너
const GradeContainer = styled.div`
  position: relative;
`;

// 등급 버튼
const GradeButton = styled(BaseButton)<{
  $isSelect: boolean;
  $isOpen: boolean;
}>`
  height: 30px;
  width: 100%;
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  font-size: ${({ theme }) => theme.fonts.sizes.ms};
  background-color: ${({ $isSelect, theme }) =>
    $isSelect ? theme.colors.primaryDark : '#fff'};
  color: ${({ $isSelect, theme }) =>
    !$isSelect ? theme.colors.primaryDark : '#fff'};
  border-radius: ${({ $isOpen }) => ($isOpen ? '8px 8px 0 0' : '8px')};
`;

const GradeButtonContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  svg {
    width: 16px;
    height: 16px;
  }
`;

// 등급 드로어
const GradeDrawer = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: #fff;
  border-radius: 0 0 8px 8px;
  box-shadow: ${({ theme }) => theme.shadows.sm};
  overflow: hidden;
  max-height: ${({ $isOpen }) => ($isOpen ? '200px' : '0')};
  transition: max-height 0.3s ease-in-out;
  z-index: 1;
`;

// 등급 옵션
const GradeOption = styled.button<{ $isSelected: boolean }>`
  width: 100%;
  padding: 8px 12px;
  border: none;
  background-color: ${({ $isSelected, theme }) =>
    $isSelected ? theme.colors.primaryLight : '#fff'};
  color: ${({ $isSelected, theme }) =>
    $isSelected ? theme.colors.primaryDark : '#333'};
  font-size: ${({ theme }) => theme.fonts.sizes.ms};
  cursor: pointer;
  transition: background-color 0.15s ease-in-out;

  &:hover {
    background-color: ${({ theme }) => theme.colors.grey[100]};
  }

  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.grey[200]};
  }
`;
