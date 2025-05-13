import { create } from 'zustand';
import { Slope, slopeMapAPI } from '../../apis/slopeMap';

// 문자열 상수로 맵 타입 정의
export enum MapTypeId {
  NORMAL = 'NORMAL',
  SATELLITE = 'SATELLITE',
  HYBRID = 'HYBRID',
  TERRAIN = 'TERRAIN',
}

export interface MapState {
  // 맵 상태
  selectedMarkerId: number | null;
  allTextShow: boolean;
  userLocation: naver.maps.LatLng | null;
  slopeData: Slope[];
  searchMod: boolean;
  bottomSheetHeight: number;
  mapInstance: naver.maps.Map | null;
  mapTypeId: MapTypeId;
  isMapReady: boolean; // 추가: 맵이 완전히 로드되었는지 확인하는 플래그

  // 액션
  setSelectedMarkerId: (id: number | null) => void;
  setAllTextShow: (show: boolean) => void;
  setUserLocation: (location: naver.maps.LatLng | null) => void;
  setSlopeData: (data: Slope[]) => void;
  setSearchMod: (mod: boolean) => void;
  setBottomSheetHeight: (height: number) => void;
  setMapInstance: (map: naver.maps.Map | null) => void;
  setMapTypeId: (typeId: MapTypeId) => void;
  setIsMapReady: (isReady: boolean) => void; // 추가: 맵 준비 상태 설정

  // 비즈니스 로직
  fetchSlopes: () => Promise<void>;
  handleSearch: (searchValue: string) => void;
  chooseSelectItem: (item: Slope, index: number) => void;
  moveToMyLocation: () => void;
  closeInfo: () => void;
}

export const useMapStore = create<MapState>((set, get) => ({
  // 초기 상태
  selectedMarkerId: null,
  allTextShow: false,
  userLocation: null,
  slopeData: [],
  searchMod: false,
  bottomSheetHeight: 200,
  mapInstance: null,
  mapTypeId: MapTypeId.NORMAL,
  isMapReady: false, // 초기값: 맵 미준비 상태

  // 액션
  setSelectedMarkerId: (id) => set({ selectedMarkerId: id }),
  setAllTextShow: (show) => set({ allTextShow: show }),
  setUserLocation: (location) => set({ userLocation: location }),
  setSlopeData: (data) => set({ slopeData: data }),
  setSearchMod: (mod) => set({ searchMod: mod }),
  setBottomSheetHeight: (height) => set({ bottomSheetHeight: height }),
  setMapInstance: (map) => set({ mapInstance: map }),
  setMapTypeId: (typeId) => set({ mapTypeId: typeId }),
  setIsMapReady: (isReady) => set({ isMapReady: isReady }),

  // 비즈니스 로직
  fetchSlopes: async () => {
    const { userLocation, isMapReady } = get();
    // 맵이 준비되지 않았거나 위치 정보가 없으면 중단
    if (!isMapReady || !userLocation?.lat() || !userLocation?.lng()) return;

    try {
      const data = await slopeMapAPI.fetchNearbySlopes(
        userLocation.lat(),
        userLocation.lng()
      );
      set({ slopeData: data || [] });
    } catch (error) {
      console.error('Error fetching slopes:', error);
      set({ slopeData: [] });
    }
  },

  handleSearch: async (searchValue) => {
    const { fetchSlopes, userLocation, mapInstance, isMapReady } = get();
    // 맵이 준비되지 않았으면 중단
    if (!isMapReady) return;

    if (searchValue === '') {
      set({ searchMod: false, selectedMarkerId: null });
      fetchSlopes();
      return;
    }

    set({ selectedMarkerId: null, searchMod: true });

    if (!userLocation?.lat() || !userLocation?.lng()) return;

    try {
      const data = await slopeMapAPI.searchSlopes(
        searchValue,
        userLocation.lat(),
        userLocation.lng()
      );
      set({ slopeData: data || [] });

      if (mapInstance && data && data.length > 0) {
        const coordinates = data[0].location.coordinates.start.coordinates;
        mapInstance.panTo(
          new naver.maps.LatLng(coordinates[1], coordinates[0])
        );
        mapInstance.panTo(
          new naver.maps.LatLng(coordinates[1], coordinates[0])
        );
      }
    } catch (error) {
      console.error('Error search slopes:', error);
      set({ slopeData: [] });
    }
  },

  chooseSelectItem: (item, index) => {
    const { mapInstance, selectedMarkerId, isMapReady } = get();

    // 맵이 준비되지 않았으면 중단
    if (!isMapReady || !mapInstance) return;

    if (item) {
      const coordinates = item.location.coordinates.start.coordinates;
      mapInstance.panTo(new naver.maps.LatLng(coordinates[1], coordinates[0]));

      set({ selectedMarkerId: selectedMarkerId === index ? null : index });
    }
  },

  moveToMyLocation: () => {
    const { mapInstance, userLocation, fetchSlopes, isMapReady } = get();

    // 맵이 준비되지 않았으면 중단
    if (!isMapReady || !mapInstance || !userLocation) return;

    mapInstance.setZoom(15);

    setTimeout(() => {
      mapInstance.panTo(userLocation);
    }, 100);

    fetchSlopes();
  },

  closeInfo: () => {
    set({ selectedMarkerId: null });
  },
}));
