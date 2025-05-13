import { useEffect } from 'react';

import styled from 'styled-components';

import BottomSheet from './BottomSheet';
import MapComponent from './components/map/MapComponent';
import SearchComponent from './components/map/Search';

import { useMapStore } from './mapStore';
import ButtonGroup from './components/ButtonGroup';
const MapPage = () => {
  const { userLocation, searchMod, fetchSlopes, handleSearch } = useMapStore();

  useEffect(() => {
    if (!searchMod) fetchSlopes();
  }, [userLocation, searchMod, fetchSlopes]);

  return (
    <>
      <BaseBackground>
        <MapComponent />
        <BottomSheet />
        <SearchComponent onSearch={handleSearch} />
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
