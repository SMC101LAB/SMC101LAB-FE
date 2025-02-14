import { useState, useEffect } from 'react';

import styled from 'styled-components';

import BottomSheet from './components/BottomSheet';
import MapComponent from './components/MapComponent';
import { Slope, slopeAPI } from '../../apis/Map/LookUp';

const MapPage = () => {
  // console.log(escarpmentData);
  // console.log(escarpmentData);
  const [selectedMarkerId, setSelectedMarkerId] = useState<number | null>(null);
  const [allTextShow, setAllTextShow] = useState<boolean>(false);
  const [userLocation, setUserLocation] = useState<naver.maps.LatLng | null>(
    null
  );
  const [slopeData, setSlopeData] = useState<Slope[]>([]);

  useEffect(() => {
    const fetchSlopes = async () => {
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

    fetchSlopes();
  }, [userLocation]);

  return (
    <BaseBackground>
      <MapComponent
        selectedMarkerId={selectedMarkerId}
        setSelectedMarkerId={setSelectedMarkerId}
        escarpmentData={slopeData}
        allTextShow={allTextShow}
        userLocation={userLocation}
        setUserLocation={setUserLocation}
      />
      <BottomSheet
        selectItem={
          selectedMarkerId !== null ? slopeData[selectedMarkerId] : null
        }
      />

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
  top: 10px;
  right: 10px;
  border: none;
  border-radius: 8px;
  padding: 5px 10px;
  box-shadow: 0px 0px 5px #444;
  font-weight: 550;
  background-color: ${({ $isSelect, theme }) =>
    $isSelect ? theme.colors.secondary : '#fff'};
  color: ${({ $isSelect, theme }) =>
    !$isSelect ? theme.colors.secondary : '#fff'};
  &:focus {
    outline: none;
  }
`;
