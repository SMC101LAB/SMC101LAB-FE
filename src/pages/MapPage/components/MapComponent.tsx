import styled from 'styled-components';
import {
  Container as MapDiv,
  NaverMap,
  useNavermaps,
  Marker,
} from 'react-naver-maps';
import { useState, useEffect } from 'react';
import AmarkerIcon from '../../../assets/a.png';
import BmarkerIcon from '../../../assets/b.png';
import CmarkerIcon from '../../../assets/c.png';
import { MapComponentProps } from '../interface';

const MapComponent: React.FC<MapComponentProps> = ({
  selectedMarkerId,
  setSelectedMarkerId,
  escarpmentData,
  allTextShow,
}) => {
  const navermaps = useNavermaps();
  const [userLocation, setUserLocation] = useState(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  console.log(errorMessage);
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation(new navermaps.LatLng(latitude, longitude));
        },
        (error) => {
          console.error('Error fetching location:', error);
          setErrorMessage('위치 정보를 가져올 수 없습니다.');
          setUserLocation(new navermaps.LatLng(37.5665, 126.978));
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
      setErrorMessage('브라우저가 위치 정보를 지원하지 않습니다.');
      setUserLocation(new navermaps.LatLng(37.5665, 126.978));
    }
  }, [navermaps]);
  if (!userLocation) {
    return <div>지도를 로드 중입니다...</div>;
  }
  return (
    <MapContainer>
      <MapDiv
        style={{
          width: '100%',
          height: '100%',
        }}
      >
        <NaverMap defaultCenter={userLocation} defaultZoom={15}>
          <Marker position={userLocation} />
          {escarpmentData.map((item, index) => {
            const markerIcon =
              item.grade === 'A'
                ? AmarkerIcon
                : item.grade === 'B'
                ? BmarkerIcon
                : CmarkerIcon;
            return (
              <Marker
                key={index}
                position={new navermaps.LatLng(item.lat, item.lng)}
                icon={{
                  content: `
              <div style="cursor: pointer; position:relative;">
              ${
                selectedMarkerId === index || allTextShow
                  ? `<div style="position:absolute; top:-20px; left:-46px; width:120px; display:flex; justify-content:center;z-index:1;">
                    <div style="${
                      selectedMarkerId === index
                        ? 'color:#0b5275;font-weight:550;'
                        : ''
                    } font-size:16px;">
                      ${item.steepSlopeName}
                    </div>
                  </div>`
                  : ''
              }
                <img src="${markerIcon}"
                     alt="marker"
                     style="width: 28px; height: 28px;"
                />
              </div>
            `,
                  anchor: new navermaps.Point(16, 16),
                }}
                onClick={() => {
                  setSelectedMarkerId(
                    selectedMarkerId === index ? null : index
                  );
                }}
              />
            );
          })}
        </NaverMap>
      </MapDiv>
    </MapContainer>
  );
};

export default MapComponent;
const MapContainer = styled.div`
  width: 100%;
  height: 100%;
  flex: 1;
  min-height: 0;
`;
