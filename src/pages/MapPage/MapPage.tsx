import { useState, useEffect, useCallback } from 'react';

import styled from 'styled-components';

import BottomSheet from './components/BottomSheet';
import MapComponent from './components/MapComponent';
import SearchComponent from './components/Search';

import { Slope, slopeAPI } from '../../apis/Map/slope';

const MapPage = () => {
  // console.log(escarpmentData);
  // console.log(escarpmentData);
  const [selectedMarkerId, setSelectedMarkerId] = useState<number | null>(null);
  const [allTextShow, setAllTextShow] = useState<boolean>(false);
  const [userLocation, setUserLocation] = useState<naver.maps.LatLng | null>(
    null
  );
  const [slopeData, setSlopeData] = useState<Slope[]>([]);

  const fetchSlopes = async () => {
    //위치정보가 없는 경우 호출 안함
    if (!userLocation?.lat() || !userLocation?.lng()) return;

    try {
      const data = await slopeAPI.fetchNearbySlopes(
        userLocation.lat(),
        userLocation.lng()
      );
      setSlopeData(data || []);
    } catch (error) {
      console.error('Error fetching slopes:', error);
      setSlopeData([]);
    }
  };

  useEffect(() => {
    fetchSlopes();
  }, [userLocation]);

  const handleSearch = useCallback((searchValue: string) => {
    console.log('Searching for:', searchValue);
    if (searchValue === '') {
      fetchSlopes();
      return;
    }

    const searchSlope = async () => {
      //위치정보가 없는 경우 호출 안함
      if (!userLocation?.lat() || !userLocation?.lng()) return;

      try {
        const data = await slopeAPI.searchSlopes(
          searchValue,
          userLocation.lat(),
          userLocation.lng()
        );
        setSlopeData(data || []);
      } catch (error) {
        console.error('Error search slopes:', error);
        setSlopeData([]);
      }
    };
    searchSlope();
  }, []);

  const [mapInstance, setMapInstance] = useState<naver.maps.Map | null>(null);

  const chooseSelectItem = useCallback(
    (item: Slope, index: number) => {
      if (mapInstance && item) {
        // 지도 이동
        const coordinates = item.location.coordinates.start.coordinates;
        mapInstance.panTo(
          new naver.maps.LatLng(coordinates[1], coordinates[0])
        );

        // 마커 선택 상태 변경
        setSelectedMarkerId((prevId) => (prevId === index ? null : index));
      }
    },
    [mapInstance]
  );

  return (
    <BaseBackground>
      <MapComponent
        selectedMarkerId={selectedMarkerId}
        escarpmentData={slopeData}
        allTextShow={allTextShow}
        userLocation={userLocation}
        setUserLocation={setUserLocation}
        // 추가
        mapInstance={mapInstance}
        setMapInstance={setMapInstance}
        onMarkerClick={chooseSelectItem}
      />
      <BottomSheet
        slopeData={slopeData}
        selectItem={
          selectedMarkerId !== null ? slopeData[selectedMarkerId] : null
        }
        // 추가
        onItemClick={chooseSelectItem}
      />

      <SearchComponent onSearch={handleSearch} />
      <AllShowButton
        $isSelect={allTextShow}
        onClick={() => {
          console.log(allTextShow);
          console.log(allTextShow);
          setAllTextShow(!allTextShow);
        }}
      >
        {allTextShow ? '전체표기' : '개별표기'}
      </AllShowButton>
    </BaseBackground>
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
  top: 15px;
  right: 10px;
  border: none;
  border-radius: 8px;
  padding: 5px 10px;
  box-shadow: ${({ theme }) => theme.shadows.sm};
  font-weight: 550;
  background-color: ${({ $isSelect, theme }) =>
    $isSelect ? theme.colors.primaryDark : '#fff'};
  color: ${({ $isSelect, theme }) =>
    !$isSelect ? theme.colors.primaryDark : '#fff'};
  &:focus {
    outline: none;
  }
`;
