import { Slope } from '../../apis/slopeMap';

export interface MapComponentProps {
  selectedMarkerId: number | null;
  escarpmentData: Slope[];
  allTextShow: boolean;
  userLocation: naver.maps.LatLng | null;
  setUserLocation: (location: naver.maps.LatLng | null) => void;
  mapInstance: naver.maps.Map | null;
  setMapInstance: (map: naver.maps.Map | null) => void;
  onMarkerClick: (item: Slope, index: number) => void;
}
export interface BottomSheetProps {
  slopeData: Slope[];
  selectItem: Slope | null;
  onItemClick: (item: Slope, index: number) => void;
  height: number;
  setHeight: (height: number) => void;
}
export interface InfotableProps {
  selectItem: Slope | null;
}
export interface ListProps {
  item: Slope | null;
  onClick?: () => void;
}

export interface SearchComponentProps {
  onSearch: (value: string) => void;
}
