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
import DmarkerIcon from '../../../assets/d.png';
import FmarkerIcon from '../../../assets/f.png';
import UserPosIcon from '../../../assets/current_position.png';
import { MapComponentProps } from '../interface';

const MapComponent: React.FC<MapComponentProps> = ({
  selectedMarkerId,
  escarpmentData,
  allTextShow,
  userLocation,
  setUserLocation,
  //추가
  mapInstance,
  setMapInstance,
  onMarkerClick,
}) => {
  const navermaps = useNavermaps();
  const [_errorMessage, setErrorMessage] = useState<string | null>(null);
  // console.log(errorMessage);
  // console.log(escarpmentData);

  useEffect(() => {
    if (!navermaps) return;

    let watchId: number;

    if (navigator.geolocation) {
      watchId = navigator.geolocation.watchPosition(
        (position) => {
          try {
            const { latitude, longitude } = position.coords;
            if (latitude && longitude) {
              setUserLocation(new navermaps.LatLng(latitude, longitude));
            }
          } catch (error) {
            console.error('Error:', error);
            setErrorMessage('위치 정보를 가져올 수 없습니다.');
            setUserLocation(new navermaps.LatLng(37.5665, 126.978));
          }
        },
        (error) => {
          console.error('Error:', error);
          setErrorMessage('브라우저가 위치 정보를 지원하지 않습니다.');
          setUserLocation(new navermaps.LatLng(37.5665, 126.978));
        },
        {
          enableHighAccuracy: true, // 높은 정확도
          maximumAge: 0, // 캐시된 위치정보를 사용하지 않음
          timeout: 5000,
        }
      );
    }

    // cleanup
    return () => {
      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [navermaps, setUserLocation]);
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
        <NaverMap
          defaultCenter={userLocation}
          defaultZoom={15}
          ref={(ref) => {
            if (ref && !mapInstance) {
              setMapInstance(ref);
            }
          }}
        >
          <Marker
            position={userLocation}
            icon={{
              content: `     
              <div style="cursor: pointer; position: relative; display: flex; justify-content: center; align-items: center;">    
                <div style="
                  position: absolute;
                  width: 40px;
                  height: 40px;
                  background-color: rgba(0, 123, 255, 0.2);
                  border-radius: 50%;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                ">
                </div>
                  <img 
                    src="${UserPosIcon}"
                    alt="marker"
                    style="width: 30px; height: 30px;"
                  />
              </div>
                `,
            }}
          />
          {escarpmentData.length > 0
            ? escarpmentData.map((item, index) => {
                // console.log(item);
                const grade = item.disaster?.riskLevel.includes('A')
                  ? 'A'
                  : item.disaster?.riskLevel.includes('B')
                  ? 'B'
                  : item.disaster?.riskLevel.includes('C')
                  ? 'C'
                  : item.disaster?.riskLevel.includes('D')
                  ? 'D'
                  : 'F';

                // 적합한 마커 아이콘 선택
                const markerIcon =
                  grade === 'A'
                    ? AmarkerIcon
                    : grade === 'B'
                    ? BmarkerIcon
                    : grade === 'C'
                    ? CmarkerIcon
                    : grade === 'D'
                    ? DmarkerIcon
                    : FmarkerIcon;

                return (
                  <Marker
                    key={index}
                    position={
                      new navermaps.LatLng(
                        item.location.coordinates.start.coordinates[1],
                        item.location.coordinates.start.coordinates[0]
                      )
                    }
                    icon={{
                      content: `
          <div style="cursor: pointer; position:relative;">
          ${
            selectedMarkerId === index || allTextShow
              ? `<div style="position:absolute; top:-15px; left:-46px; width:120px; display:flex; justify-content:center;z-index:1;">
                  <div style="${
                    selectedMarkerId === index
                      ? 'color:#0b5275;font-weight:500;'
                      : ''
                  } font-size:16px;">
                    ${item.name}
                  </div>
                </div>`
              : ''
          }
                    <img src="${markerIcon}"
                        alt="marker"
                        style="width: 22px; height: 22px;"
                    />
                  </div>
                `,
                      anchor: new navermaps.Point(16, 16),
                    }}
                    onClick={() => {
                      onMarkerClick(item, index);
                    }}
                  />
                );
              })
            : null}
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
