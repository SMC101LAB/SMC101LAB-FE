import styled from 'styled-components';
import {
  Container as MapDiv,
  NaverMap,
  useNavermaps,
  Marker,
} from 'react-naver-maps';
import { useState, useEffect } from 'react';
import AmarkerIcon from '../../../../assets/a.webp';
import BmarkerIcon from '../../../../assets/b.webp';
import CmarkerIcon from '../../../../assets/c.webp';
import DmarkerIcon from '../../../../assets/d.webp';
import EmarkerIcon from '../../../../assets/e.webp';
import UserPosIcon from '../../../../assets/current_position.png';
import { MapTypeId, useMapStore } from '../../../../stores/mapStore';
declare global {
  interface Window {
    ReactNativeWebView?: {
      postMessage: (message: string) => void;
    };
  }
}

const MapComponent = () => {
  const {
    selectedMarkerId,
    slopeData,
    allTextShow,
    userLocation,
    setUserLocation,
    mapInstance,
    setMapInstance,
    chooseSelectItem,
  } = useMapStore();

  const { mapTypeId, setIsMapReady } = useMapStore();
  const navermaps = useNavermaps();
  const [_errorMessage, setErrorMessage] = useState<string | null>(null);

  //지도가 준비된 경우
  useEffect(() => {
    if (mapInstance) setIsMapReady(true);
  }, [mapInstance, setIsMapReady]);

  const getNaverMapTypeId = () => {
    if (!navermaps) return undefined;

    switch (mapTypeId) {
      case MapTypeId.SATELLITE:
        return navermaps.MapTypeId.SATELLITE;
      case MapTypeId.HYBRID:
        return navermaps.MapTypeId.HYBRID;
      case MapTypeId.TERRAIN:
        return navermaps.MapTypeId.TERRAIN;
      case MapTypeId.NORMAL:
      default:
        return navermaps.MapTypeId.NORMAL;
    }
  };

  //앱에서 위치 수신
  useEffect(() => {
    const isReactNativeWebView =
      typeof window != 'undefined' && window.ReactNativeWebView != null;

    if (isReactNativeWebView) {
      const handleMessage = (event: any) => {
        try {
          const data = JSON.parse(event.data);

          if (data.latitude && data.longitude) {
            console.log('앱에서 받은 위치:', data.latitude, data.longitude);
            // navermaps가 있을 때만 setUserLocation 호출
            if (navermaps) {
              setUserLocation(
                new navermaps.LatLng(data.latitude, data.longitude)
              );
            }
          }
        } catch (error) {
          console.error('메시지 파싱 오류:', error);
        }
      };

      // IOS
      window.addEventListener('message', handleMessage);
      // Android
      document.addEventListener('message', handleMessage);

      return () => {
        window.removeEventListener('message', handleMessage);
        document.removeEventListener('message', handleMessage);
      };
    }
  }, [navermaps, setUserLocation]);

  useEffect(() => {
    if (!navermaps) return;

    let watchId: number;
    const isReactNativeWebView =
      typeof window != 'undefined' && window.ReactNativeWebView != null;
    // 리액트 네이티브 앱이면 postMessage로 전송
    if (isReactNativeWebView) {
      window.ReactNativeWebView!.postMessage(
        JSON.stringify({ type: 'GPS_PERMISSIONS' })
      );
      return;
    } else {
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
          mapTypeId={getNaverMapTypeId()}
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
          {slopeData.length > 0
            ? slopeData.map((item, index) => {
                // console.log(item);
                const grade = item.priority?.grade.includes('A')
                  ? 'A'
                  : item.priority?.grade.includes('B')
                  ? 'B'
                  : item.priority?.grade.includes('C')
                  ? 'C'
                  : item.priority?.grade.includes('D')
                  ? 'D'
                  : 'E';

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
                    : EmarkerIcon;

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
                                  ? `<div style="position:absolute; top:-25px; left:50%; transform:translateX(-50%); z-index:1;">
                                      <div style="
                                        ${
                                          selectedMarkerId === index
                                            ? 'color:#0b5275;font-weight:700;'
                                            : 'color:#333;'
                                        }
                                        font-size:16px;
                                        background-color:white;
                                        padding:2px 6px;
                                        border-radius:6px;
                                        white-space:nowrap;
                                        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                                        border: 1px solid #e0e0e0;
                                      ">
                                        ${item.name}
                                      </div>
                                    </div>`
                                  : ''
                              }
                              <img src="${markerIcon}"
                                  alt="marker"
                                  style="width: 36px; height: 36px;"
                              />
                              </div>
                            `,
                      anchor: new navermaps.Point(18, 18),
                    }}
                    onClick={() => {
                      chooseSelectItem(item, index);
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
