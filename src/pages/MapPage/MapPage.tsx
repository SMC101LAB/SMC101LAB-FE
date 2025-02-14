import { useState, useEffect } from 'react';

import styled from 'styled-components';

import BottomSheet from './components/BottomSheet';
import MapComponent from './components/MapComponent';
import { Slope, slopeAPI } from '../../apis/Map/LookUp';
import search from '../../assets/Icons/searchWhite.svg';

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
      <SearchContainer>
        <SearchInput placeholder="검색..."></SearchInput>

        <SearchIconWrapper>
          <SearchIcon src={search} alt="검색" />
        </SearchIconWrapper>
      </SearchContainer>
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

const SearchContainer = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  display: flex;
  gap: 10px;
  padding: 5px 10px;
`;

const SearchInput = styled.input`
  padding: 5px 15px;
  border-radius: 20px;
  /* border: 2px solid;
  border-color: ${({ theme }) => theme.colors.primaryDark};
 */
  background-color: #fff;
  box-shadow: ${({ theme }) => theme.shadows.lg};
`;
const SearchIcon = styled.img`
  width: 23px;
  z-index: 1;
`;
const SearchIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 35px;
  height: 30px;
  border-radius: 15px;
  background-color: ${({ theme }) => theme.colors.primaryDark};
  box-shadow: ${({ theme }) => theme.shadows.md};
`;
