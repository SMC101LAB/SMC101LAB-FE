import { Slope } from '../../apis/Map/LookUp';

export interface MapComponentProps {
  selectedMarkerId: number | null;
  setSelectedMarkerId: (id: number | null) => void;
  escarpmentData: Slope[];
  allTextShow: boolean;
  userLocation: naver.maps.LatLng | null;
  setUserLocation: (location: naver.maps.LatLng | null) => void;
}
export interface SelectItemProps {
  selectItem: Slope | null;
}
