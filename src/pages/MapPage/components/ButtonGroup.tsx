// import styled from 'styled-components'
// import { useMapStore } from '../mapStore';
// import MyLocationIcon from '@mui/icons-material/MyLocationRounded';

// const ButtonGroup = () => {
//     const {allTextShow,setAllTextShow,moveToMyLocation}=useMapStore();
//   return (
//     <Container>
//       <AllShowButton
//         $isSelect={allTextShow}
//         onClick={() => {
//           setAllTextShow(!allTextShow);
//         }}
//       >
//         {allTextShow ? '위성지도' : '일반지도'}
//       </AllShowButton>
//       <AllShowButton
//         $isSelect={allTextShow}
//         onClick={() => {
//           setAllTextShow(!allTextShow);
//         }}
//       >
//         {allTextShow ? '전체표기' : '개별표기'}
//       </AllShowButton>
//       <MyPosition onClick={moveToMyLocation}>
//         <MyLocationIcon />
//       </MyPosition>
//     </Container>
//   );
// };

// export default ButtonGroup;

// const Container=styled.div`
//   position: absolute;
//   top: 50px;
//   right: 10px;
// `
// const AllShowButton = styled.button<{ $isSelect: boolean }>`
//   position: absolute;
//   top: 50px;
//   right: 10px;
//   border: none;
//   border-radius: 8px;
//   height: 30px;
//   padding: 5px 10px;
//   box-shadow: ${({ theme }) => theme.shadows.sm};
//   font-weight: ${({ theme }) => theme.fonts.weights.bold};
//   font-size: ${({ theme }) => theme.fonts.sizes.ms};
//   background-color: ${({ $isSelect, theme }) =>
//     $isSelect ? theme.colors.primaryDark : '#fff'};
//   color: ${({ $isSelect, theme }) =>
//     !$isSelect ? theme.colors.primaryDark : '#fff'};
//   &:focus {
//     outline: none;
//   }
//   transition: all 0.15s ease-in-out;

//   &:active {
//     transform: scale(1.1);
//   }
// `;

// const MyPosition = styled.button`
//   position: absolute;
//   top: 90px;
//   right: 10px;
//   border: none;
//   border-radius: 8px;
//   padding: 5px 10px;
//   box-shadow: ${({ theme }) => theme.shadows.sm};
//   font-weight: 550;
//   background-color: #fff;
//   transition: all 0.15s ease-in-out;
//   &:hover {
//     background-color: ${({ theme }) => theme.colors.grey[200]};
//   }
//   &:active {
//     transform: scale(1.1);
//   }
// `;
import styled from 'styled-components';
import { useMapStore, MapTypeId } from '../mapStore';
import MyLocationIcon from '@mui/icons-material/MyLocationRounded';

const ButtonGroup = () => {
  const {
    allTextShow,
    setAllTextShow,
    moveToMyLocation,
    mapTypeId,
    setMapTypeId,
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
  z-index: 1000;
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
