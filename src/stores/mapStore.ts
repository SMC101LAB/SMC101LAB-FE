import { create } from 'zustand';
import { Slope, slopeMapAPI } from '../apis/slopeMap';

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
  originalSlopeData: Slope[]; // 필터링 전 원본 데이터
  searchMod: boolean;
  bottomSheetHeight: number;
  mapInstance: naver.maps.Map | null;
  mapTypeId: MapTypeId;
  isMapReady: boolean;

  grades: string[];
  selectedGrade: string | null;
  isGradeDrawerOpen: boolean;

  // 액션
  setSelectedMarkerId: (id: number | null) => void;
  setAllTextShow: (show: boolean) => void;
  setUserLocation: (location: naver.maps.LatLng | null) => void;
  setSlopeData: (data: Slope[]) => void;
  setOriginalSlopeData: (data: Slope[]) => void; // 원본 데이터 설정
  setSearchMod: (mod: boolean) => void;
  setBottomSheetHeight: (height: number) => void;
  setMapInstance: (map: naver.maps.Map | null) => void;
  setMapTypeId: (typeId: MapTypeId) => void;
  setIsMapReady: (isReady: boolean) => void;

  setSelectedGrade: (value: string | null) => void;
  setIsGradeDrawerOpen: (value: boolean) => void;

  // 비즈니스 로직
  fetchSlopes: () => Promise<void>;
  handleSearch: (searchValue: string) => void;
  chooseSelectItem: (item: Slope, index: number) => void;
  moveToMyLocation: () => void;
  closeInfo: () => void;

  handleGradeSelect: (grade: string) => void;
  handleGradeButtonClick: () => void;
  applyGradeFilter: () => void; // 등급 필터 적용 함수
}

export const useMapStore = create<MapState>((set, get) => ({
  // 초기 상태
  selectedMarkerId: null,
  allTextShow: false,
  userLocation: null,
  slopeData: [],
  originalSlopeData: [], // 원본 데이터 초기화
  searchMod: false,
  bottomSheetHeight: 200,
  mapInstance: null,
  mapTypeId: MapTypeId.NORMAL,
  isMapReady: false,
  isGradeDrawerOpen: false,
  selectedGrade: null,
  grades: ['A', 'B', 'C', 'D', 'E'],

  // 액션
  setSelectedMarkerId: (id) => set({ selectedMarkerId: id }),
  setAllTextShow: (show) => set({ allTextShow: show }),
  setUserLocation: (location) => set({ userLocation: location }),
  setSlopeData: (data) => set({ slopeData: data }),
  setOriginalSlopeData: (data) => set({ originalSlopeData: data }), // 추가
  setSearchMod: (mod) => set({ searchMod: mod }),
  setBottomSheetHeight: (height) => set({ bottomSheetHeight: height }),
  setMapInstance: (map) => set({ mapInstance: map }),
  setMapTypeId: (typeId) => set({ mapTypeId: typeId }),
  setIsMapReady: (isReady) => set({ isMapReady: isReady }),
  setIsGradeDrawerOpen: (value) => set({ isGradeDrawerOpen: value }),
  setSelectedGrade: (value) => set({ selectedGrade: value }),

  // 등급 필터 적용 함수 추가
  applyGradeFilter: () => {
    const { originalSlopeData, selectedGrade } = get();

    if (!selectedGrade || selectedGrade === '전체') {
      // 등급이 선택되지 않았거나 '전체'인 경우 원본 데이터 표시
      set({ slopeData: originalSlopeData });
    } else {
      // 선택된 등급에 맞는 데이터만 필터링
      const filteredData = originalSlopeData.filter(
        (slope) => slope.priority?.grade === selectedGrade
      );
      set({ slopeData: filteredData });
    }
  },

  // 비즈니스 로직
  fetchSlopes: async () => {
    const { userLocation, isMapReady, applyGradeFilter } = get();
    if (!isMapReady || !userLocation?.lat() || !userLocation?.lng()) return;

    try {
      const data = await slopeMapAPI.fetchNearbySlopes(
        userLocation.lat(),
        userLocation.lng()
      );

      // 수정: 원본 데이터와 표시 데이터 모두 설정
      set({
        originalSlopeData: data || [],
        slopeData: data || [],
      });

      // 등급 필터 적용
      applyGradeFilter();
    } catch (error) {
      console.error('Error fetching slopes:', error);
      set({
        slopeData: [],
        originalSlopeData: [],
      });
    }
  },

  handleSearch: async (searchValue) => {
    const {
      fetchSlopes,
      userLocation,
      mapInstance,
      isMapReady,
      applyGradeFilter,
    } = get();
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

      // 수정: 검색 결과도 원본 데이터로 저장하고 필터 적용
      set({
        originalSlopeData: data || [],
        slopeData: data || [],
      });

      // 등급 필터 적용
      applyGradeFilter();

      if (mapInstance && data && data.length > 0) {
        const coordinates = data[0].location.coordinates.start.coordinates;
        mapInstance.panTo(
          new naver.maps.LatLng(coordinates[1], coordinates[0])
        );
      }
    } catch (error) {
      console.error('Error search slopes:', error);
      set({
        slopeData: [],
        originalSlopeData: [],
      });
    }
  },

  chooseSelectItem: (item, index) => {
    const { mapInstance, selectedMarkerId, isMapReady } = get();

    if (!isMapReady || !mapInstance) return;

    if (item) {
      const coordinates = item.location.coordinates.start.coordinates;
      mapInstance.panTo(new naver.maps.LatLng(coordinates[1], coordinates[0]));

      const targetHeight = window.innerHeight * 0.68;

      set({
        selectedMarkerId: selectedMarkerId === index ? null : index,
        bottomSheetHeight: selectedMarkerId === index ? 200 : targetHeight,
      });
    }
  },

  moveToMyLocation: () => {
    const { mapInstance, userLocation, fetchSlopes, isMapReady } = get();

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

  handleGradeSelect: (grade: string) => {
    const { setSelectedGrade, setIsGradeDrawerOpen, applyGradeFilter } = get();

    const selectedGradeValue = grade === '전체' ? null : grade;

    setSelectedGrade(selectedGradeValue);
    setIsGradeDrawerOpen(false);

    // 등급 필터 적용
    applyGradeFilter();

    console.log('Selected grade:', grade);
  },

  handleGradeButtonClick: () => {
    const { isGradeDrawerOpen, setIsGradeDrawerOpen } = get();
    setIsGradeDrawerOpen(!isGradeDrawerOpen);
  },
}));
