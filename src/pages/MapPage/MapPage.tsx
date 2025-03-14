import { useState, useEffect, useCallback } from 'react';

import styled from 'styled-components';

import BottomSheet from './BottomSheet';
import MapComponent from './components/map/MapComponent';
import SearchComponent from './components/map/Search';

import { Slope, slopeMapAPI } from '../../apis/slopeMap';
import MyLocationIcon from '@mui/icons-material/MyLocationRounded';
const MapPage = () => {
  // console.log(escarpmentData);
  // console.log(escarpmentData);
  const [selectedMarkerId, setSelectedMarkerId] = useState<number | null>(null);
  const [allTextShow, setAllTextShow] = useState<boolean>(false);
  const [userLocation, setUserLocation] = useState<naver.maps.LatLng | null>(
    null
  );
  const [slopeData, setSlopeData] = useState<Slope[]>([]);

  const [searchMod, setSearchMod] = useState<boolean>(false);
  const [bottomSheetHeight, setBottomSheetHeight] = useState<number>(200); //bottomsheet 높이 조절 state

  const fetchSlopes = useCallback(async () => {
    //위치정보가 없는 경우 호출 안함
    if (!userLocation?.lat() || !userLocation?.lng()) return;

    try {
      const data = await slopeMapAPI.fetchNearbySlopes(
        userLocation.lat(),
        userLocation.lng()
      );
      setSlopeData(data || []);
    } catch (error) {
      console.error('Error fetching slopes:', error);
      setSlopeData([]);
    }
  }, [userLocation]);

  useEffect(() => {
    if (!searchMod) fetchSlopes();
  }, [userLocation, searchMod, fetchSlopes]);
  const [mapInstance, setMapInstance] = useState<naver.maps.Map | null>(null);

  //검색 핸들 callback
  const handleSearch = useCallback(
    (searchValue: string) => {
      if (searchValue === '') {
        setSearchMod(false);
        fetchSlopes();
        setSelectedMarkerId(null);
        return;
      }
      setSelectedMarkerId(null);
      setSearchMod(true);

      const searchSlope = async () => {
        if (!userLocation?.lat() || !userLocation?.lng()) return; //위치정보가 없는 경우 호출 안함
        // console.log('Searching for:', searchValue);
        // console.log('Searching Mod:', searchMod);
        try {
          const data = await slopeMapAPI.searchSlopes(
            searchValue,
            userLocation.lat(),
            userLocation.lng()
          );
          setSlopeData(data || []);
          if (mapInstance && data) {
            const coordinates = data[0].location.coordinates.start.coordinates;
            mapInstance.panTo(
              new naver.maps.LatLng(coordinates[1], coordinates[0])
            );
          }
        } catch (error) {
          console.error('Error search slopes:', error);
          setSlopeData([]);
        }
      };
      searchSlope();
    },
    [userLocation]
  );

  //아이템 선택
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

  //내 위치로 이동
  const moveToMyLocation = useCallback(() => {
    if (!mapInstance || !userLocation) return;

    // 줌 레벨 먼저 변경
    mapInstance.setZoom(15);

    // 약간 지연 후 위치 이동
    setTimeout(() => {
      mapInstance.panTo(userLocation);
    }, 100);

    fetchSlopes();
  }, [mapInstance, userLocation, fetchSlopes]);
  return (
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
      <AllShowButton
        $isSelect={allTextShow}
        onClick={() => {
          // console.log(allTextShow);
          // console.log(allTextShow);
          setAllTextShow(!allTextShow);
        }}
      >
        {allTextShow ? '전체표기' : '개별표기'}
      </AllShowButton>
      <MyPosition onClick={moveToMyLocation}>
        <MyLocationIcon />
      </MyPosition>
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
