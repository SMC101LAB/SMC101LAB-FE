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
    setBottomSheetHeight,
    fetchSlopes,
    handleSearch,
    chooseSelectItem,
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
