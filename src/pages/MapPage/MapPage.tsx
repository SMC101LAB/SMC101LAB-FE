import { useEffect } from 'react';

import styled from 'styled-components';

import BottomSheet from './BottomSheet';
import MapComponent from './components/map/MapComponent';
import SearchComponent from './components/map/Search';

import { useMapStore } from './mapStore';
import ButtonGroup from './components/ButtonGroup';
const MapPage = () => {
  const {
    selectedMarkerId,
    allTextShow,
    userLocation,
    slopeData,
    searchMod,
    bottomSheetHeight,
    mapInstance,
    setAllTextShow,
    setBottomSheetHeight,
    fetchSlopes,
    handleSearch,
    chooseSelectItem,
    moveToMyLocation,
    setUserLocation,
    setMapInstance,
    setSelectedMarkerId,
  } = useMapStore();

  useEffect(() => {
    if (!searchMod) fetchSlopes();
  }, [userLocation, searchMod, fetchSlopes]);

  return (
    <>
      <BaseBackground>
        <MapComponent
          selectedMarkerId={selectedMarkerId}
          escarpmentData={slopeData}
          allTextShow={allTextShow}
          userLocation={userLocation}
          setUserLocation={setUserLocation}
          mapInstance={mapInstance}
          setMapInstance={setMapInstance}
          onMarkerClick={chooseSelectItem}
        />
        <BottomSheet
          slopeData={slopeData}
          selectItem={
            selectedMarkerId !== null ? slopeData[selectedMarkerId] : null
          }
          onItemClick={chooseSelectItem}
          height={bottomSheetHeight}
          setHeight={setBottomSheetHeight}
          onCloseInfo={() => {
            setSelectedMarkerId(null);
          }}
          searchMod={searchMod}
        />

        <SearchComponent onSearch={handleSearch} />
        {/* <AllShowButton
        $isSelect={allTextShow}
        onClick={() => {
          setAllTextShow(!allTextShow);
        }}
      >
        {allTextShow ? '위성지도' : '일반지도'}
      </AllShowButton>
      <AllShowButton
        $isSelect={allTextShow}
        onClick={() => {
          setAllTextShow(!allTextShow);
        }}
      >
        {allTextShow ? '전체표기' : '개별표기'}
      </AllShowButton>
      <MyPosition onClick={moveToMyLocation}>
        <MyLocationIcon />
      </MyPosition> */}
        <ButtonGroup />
      </BaseBackground>
    </>
  );
};

export default MapPage;

const BaseBackground = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overscroll-behavior: none;
  position: relative;
`;

const AllShowButton = styled.button<{ $isSelect: boolean }>`
  position: absolute;
  top: 50px;
  right: 10px;
  border: none;
  border-radius: 8px;
  height: 30px;
  padding: 5px 10px;
  box-shadow: ${({ theme }) => theme.shadows.sm};
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  font-size: ${({ theme }) => theme.fonts.sizes.ms};
  background-color: ${({ $isSelect, theme }) =>
    $isSelect ? theme.colors.primaryDark : '#fff'};
  color: ${({ $isSelect, theme }) =>
    !$isSelect ? theme.colors.primaryDark : '#fff'};
  &:focus {
    outline: none;
  }
  transition: all 0.15s ease-in-out;

  &:active {
    transform: scale(1.1);
  }
`;

const MyPosition = styled.button`
  position: absolute;
  top: 90px;
  right: 10px;
  border: none;
  border-radius: 8px;
  padding: 5px 10px;
  box-shadow: ${({ theme }) => theme.shadows.sm};
  font-weight: 550;
  background-color: #fff;
  transition: all 0.15s ease-in-out;
  &:hover {
    background-color: ${({ theme }) => theme.colors.grey[200]};
  }
  &:active {
    transform: scale(1.1);
  }
`;
