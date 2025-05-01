import { createColumnHelper } from '@tanstack/react-table';
import { Slope } from '../../../../../apis/slopeMap';

const columnHelper = createColumnHelper<Slope>();

export const getSlopeColumns = () => [
  columnHelper.accessor(
    (_row, index) => {
      return index + 1;
    },
    {
      id: 'index',
      header: '번호',
      size: 60,
    }
  ),
  columnHelper.accessor('managementNo', {
    header: '관리번호',
    size: 120,
  }),
  columnHelper.accessor('name', {
    header: '급경사지명',
    size: 150,
  }),
  columnHelper.accessor((row) => row.management.organization || '', {
    id: 'organization',
    header: '시행청명',
    size: 120,
  }),
  columnHelper.accessor((row) => row.management.authority || '', {
    id: 'authority',
    header: '관리주체구분코드',
    size: 150,
  }),
  columnHelper.accessor((row) => row.management.department || '', {
    id: 'department',
    header: '소관부서명',
    size: 150,
  }),
  columnHelper.accessor((row) => row.location.province, {
    id: 'province',
    header: '시도',
    size: 100,
  }),
  columnHelper.accessor((row) => row.location.city, {
    id: 'city',
    header: '시군구',
    size: 120,
  }),
  columnHelper.accessor((row) => row.location.district, {
    id: 'district',
    header: '읍면동',
    size: 120,
  }),
  columnHelper.accessor((row) => row.location.address || '', {
    id: 'address',
    header: '상세주소',
    size: 200,
  }),
  columnHelper.accessor((row) => row.location.roadAddress || '', {
    id: 'roadAddress',
    header: '도로명상세주소',
    size: 120,
  }),
  columnHelper.accessor((row) => row.location.mountainAddress || '', {
    id: 'mountainAddress',
    header: '산주소여부',
    size: 90,
  }),
  columnHelper.accessor((row) => row.location.mainLotNumber || '', {
    id: 'mainLotNumber',
    header: '주지번',
    size: 60,
  }),
  columnHelper.accessor((row) => row.location.subLotNumber || '', {
    id: 'subLotNumber',
    header: '부지번',
    size: 60,
  }),
  columnHelper.accessor(
    (row) => {
      const start = row.location.coordinates.start;
      return start
        ? `${start.coordinates[1].toFixed(6)}°N, ${start.coordinates[0].toFixed(
            6
          )}°E`
        : '';
    },
    {
      id: 'coordinates.start',
      header: '시점위경도',
      size: 150,
    }
  ),
  columnHelper.accessor(
    (row) => {
      const end = row.location.coordinates.end;
      return end
        ? `${end.coordinates[1].toFixed(6)}°N, ${end.coordinates[0].toFixed(
            6
          )}°E`
        : '';
    },
    {
      id: 'coordinates.end',
      header: '종점위경도',
      size: 150,
    }
  ),
  columnHelper.accessor(
    (row) => row.location.coordinates.start.startLatDegree || '',
    {
      id: 'startLatDegree',
      header: 'GIS좌표시점위도도',
      size: 60,
    }
  ),
  columnHelper.accessor(
    (row) => row.location.coordinates.start.startLatMinute || '',
    {
      id: 'startLatMinute',
      header: 'GIS좌표시점위도분',
      size: 60,
    }
  ),
  columnHelper.accessor(
    (row) => row.location.coordinates.start.startLatSecond || '',
    {
      id: 'startLatSecond',
      header: 'GIS좌표시점위도초',
      size: 60,
    }
  ),
  columnHelper.accessor(
    (row) => row.location.coordinates.start.startLongDegree || '',
    {
      id: 'startLongDegree',
      header: 'GIS좌표시점경경도도',
      size: 60,
    }
  ),
  columnHelper.accessor(
    (row) => row.location.coordinates.start.startLongMinute || '',
    {
      id: 'startLongMinute',
      header: 'GIS좌표시점경경도분',
      size: 60,
    }
  ),
  columnHelper.accessor(
    (row) => row.location.coordinates.start.startLongSecond || '',
    {
      id: 'startLongSecond',
      header: 'GIS좌표시점경경도초',
      size: 60,
    }
  ),
  columnHelper.accessor(
    (row) => row.location.coordinates.end.endLatDegree || '',
    {
      id: 'endLatDegree',
      header: 'GIS좌표종점점위도도',
      size: 60,
    }
  ),
  columnHelper.accessor(
    (row) => row.location.coordinates.end.endLatMinute || '',
    {
      id: 'endLatMinute',
      header: 'GIS좌표종점점위도분',
      size: 60,
    }
  ),
  columnHelper.accessor(
    (row) => row.location.coordinates.end.endLatSecond || '',
    {
      id: 'endLatSecond',
      header: 'GIS좌표종점위도초',
      size: 60,
    }
  ),
  columnHelper.accessor(
    (row) => row.location.coordinates.end.endLongDegree || '',
    {
      id: 'endLongDegree',
      header: 'GIS좌표종점점위도도',
      size: 60,
    }
  ),
  columnHelper.accessor(
    (row) => row.location.coordinates.end.endLongMinute || '',
    {
      id: 'endLongMinute',
      header: 'GIS좌표종점점위도분',
      size: 60,
    }
  ),
  columnHelper.accessor(
    (row) => row.location.coordinates.end.endLongSecond || '',
    {
      id: 'endLongSecond',
      header: 'GIS좌표종점위도초',
      size: 60,
    }
  ),
  columnHelper.accessor((row) => row.inspections?.serialNumber ?? '', {
    id: 'inspections_serialNumber',
    header: '안전점검일련번호',
    size: 130,
  }),
  columnHelper.accessor((row) => row.inspections?.date ?? '', {
    id: 'inspectionDate',
    header: '안전점검일자',
    size: 120,
  }),
  columnHelper.accessor((row) => row.inspections?.result ?? '', {
    id: 'inspectionResult',
    header: '안전점검결과코드',
    size: 130,
  }),
  columnHelper.accessor((row) => row.disaster?.serialNumber ?? '', {
    id: 'serialNumber',
    header: '재해위험도평가일련번호',
    size: 180,
  }),
  columnHelper.accessor((row) => row.disaster?.riskDate ?? '', {
    id: 'riskDate',
    header: '재해위험도평가일자',
    size: 170,
  }),
  columnHelper.accessor((row) => row.disaster?.riskLevel ?? '', {
    id: 'riskLevel',
    header: '재해위험도평가등급코드',
    size: 180,
  }),
  columnHelper.accessor((row) => row.disaster?.riskScore ?? '', {
    id: 'riskScore',
    header: '재해위험도평가등급코드',
    size: 180,
  }),
  columnHelper.accessor((row) => row.disaster?.riskType ?? '', {
    id: 'riskType',
    header: '재해위험도평가종류코드',
    size: 180,
  }),
  columnHelper.accessor((row) => row.collapseRisk?.districtNo || '', {
    id: 'districtNo',
    header: '붕괴위험지구번호',
    size: 130,
  }),
  columnHelper.accessor((row) => row.collapseRisk?.districtName || '', {
    id: 'districtName',
    header: '붕괴위험지구명',
    size: 130,
  }),
  columnHelper.accessor(
    (row) => (row.collapseRisk.designated ? '지정' : '미지정'),
    {
      id: 'riskDesignation',
      header: '붕괴위험지구지정여부',
      size: 160,
    }
  ),
  columnHelper.accessor(
    (row) => {
      if (!row.collapseRisk?.designationDate) return '';
      return row.collapseRisk.designationDate;
    },
    {
      id: 'designationDate',
      header: '붕괴위험지구지정일자',
      size: 160,
    }
  ),
  columnHelper.accessor((row) => row.maintenanceProject?.type || '', {
    id: 'maintenanceProject',
    header: '정비사업유형코드',
    size: 130,
  }),
  columnHelper.accessor((row) => row.maintenanceProject?.year || '', {
    id: 'maintenanceYear',
    header: '정비사업년도',
    size: 120,
  }),
  columnHelper.accessor((row) => row.priority?.usage || '', {
    id: 'usage',
    header: '비탈면용도',
    size: 120,
  }),
  columnHelper.accessor((row) => row.priority?.slopeNature || '', {
    id: 'slopeNature',
    header: '자연/인공',
    size: 100,
  }),
  columnHelper.accessor((row) => row.priority?.slopeType || '', {
    id: 'slopeType',
    header: '비탈면유형',
    size: 120,
  }),
  columnHelper.accessor((row) => row.priority?.slopeStructure || '', {
    id: 'slopeStructure',
    header: '비탈면구조',
    size: 120,
  }),
  columnHelper.accessor((row) => row.priority?.maxVerticalHeight || '', {
    id: 'maxVerticalHeight',
    header: '최고수직고',
    size: 100,
  }),
  columnHelper.accessor((row) => row.priority?.longitudinalLength || '', {
    id: 'longitudinalLength',
    header: '종단길이',
    size: 100,
  }),
  columnHelper.accessor((row) => row.priority?.averageSlope || '', {
    id: 'averageSlope',
    header: '평균경사',
    size: 100,
  }),
  columnHelper.accessor((row) => row.priority?.Score || '', {
    id: 'Score',
    header: '점수',
    size: 80,
  }),
  columnHelper.accessor((row) => row.priority?.grade || '', {
    id: 'grade',
    header: '등급',
    size: 80,
  }),
];

// 기본 표시할 열 항목 필터 설정
export const getDefaultColumnVisibility = () => ({
  roadAddress: false,
  mountainAddress: false,
  mainLotNumber: false,
  subLotNumber: false,
  startLatDegree: false,
  startLatMinute: false,
  startLatSecond: false,
  startLongDegree: false,
  startLongMinute: false,
  startLongSecond: false,
  endLatDegree: false,
  endLatMinute: false,
  endLatSecond: false,
  endLongDegree: false,
  endLongMinute: false,
  endLongSecond: false,
  inspections_serialNumber: false,
  inspectionDate: false,
  inspectionResult: false,
  serialNumber: false,
  riskDate: false,
  riskLevel: false,
  riskScore: false,
  riskType: false,
  districtNo: false,
  districtName: false,
  riskDesignation: false,
  designationDate: false,
  maintenanceProject: false,
  maintenanceYear: false,
});
