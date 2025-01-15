export interface CheckboxState {
  all: boolean;
  상당구: boolean;
  서원구: boolean;
  청원구: boolean;
  흥덕구: boolean;
}
export interface DataType {
  managementNo: string;
  steepSlopeName: string;
  implementationOffice: string;
  managementTypeCode: string;
  departmentName: string;
  province: string;
  city: string;
  district: string;
  detailAddress: string;
  mainLotNumber: string;
  subLotNumber: string;
  lat: number;
  lng: number;
  grade: string;
}
export interface MapComponentProps {
  selectedMarkerId: number | null;
  setSelectedMarkerId: (id: number | null) => void;
  escarpmentData: DataType[];
  allTextShow: boolean;
}
