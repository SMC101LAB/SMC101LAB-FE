import { Slope } from '../../../../apis/slopeMap';
import SlopeForm from './SlopeForm';
import { slopeManageAPI } from '../../../../apis/slopeManage';

interface AddSlopeProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddSlope = ({ isOpen, onClose }: AddSlopeProps) => {
  const onSubmit = async (newSlopeData: Slope) => {
    try {
      await slopeManageAPI.createSlope(newSlopeData);
      onClose();
    } catch (error) {
      console.error('파일 업로드 오류:', error);
    }
  };

  if (!isOpen) return null;
  return (
    <SlopeForm
      titleText="급경사지 신규 생성"
      initialData={createDefaultSlope()}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={(data: Slope) => {
        onSubmit(data);
      }}
      submitButtonText="저장"
    />
  );
};

export default AddSlope;

const createDefaultSlope = (): Slope => {
  const today = new Date();

  return {
    managementNo: '',
    name: '',
    location: {
      province: '',
      city: '',
      district: '',
      address: '',
      roadAddress: '',
      mountainAddress: '',
      mainLotNumber: '',
      subLotNumber: '',
      coordinates: {
        start: {
          type: '',
          coordinates: [0, 0],
          startLatDegree: 0,
          startLatMinute: 0,
          startLatSecond: 0,
          startLongDegree: 0,
          startLongMinute: 0,
          startLongSecond: 0,
        },
        end: {
          type: '',
          coordinates: [0, 0],
          endLatDegree: 0,
          endLatMinute: 0,
          endLatSecond: 0,
          endLongDegree: 0,
          endLongMinute: 0,
          endLongSecond: 0,
        },
      },
    },
    management: {
      organization: '',
      department: '',
      authority: '',
    },
    inspections: {
      serialNumber: '',
      date: today,
      result: '',
    },
    disaster: {
      serialNumber: '',
      riskDate: today,
      riskLevel: '',
      riskScore: '',
      riskType: '',
    },
    collapseRisk: {
      districtNo: '',
      districtName: '',
      designated: false,
      designationDate: today,
    },
    maintenanceProject: {
      year: '',
      type: '',
    },
    slopeInspectionHistory: {
      historyNumber: '',
      inspectionDate: '',
    },
    priority: {
      usage: '',
      slopeNature: '',
      slopeType: '',
      slopeStructure: '',
      maxVerticalHeight: '',
      longitudinalLength: '',
      averageSlope: '',
      images: [
        {
          url: '',
          createdAt: today,
        },
      ],
      Score: '',
      grade: '',
    },
    createdAt: today,
    _id: '',
  };
};
