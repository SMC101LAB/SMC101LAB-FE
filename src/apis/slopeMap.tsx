import { api } from './api';

export interface Slope {
  managementNo: string;
  name: string;
  location: {
    province: string;
    city: string;
    district: string;
    address?: string;
    roadAddress?: string;
    mountainAddress: string;
    mainLotNumber: string;
    subLotNumber: string;
    coordinates: {
      start: {
        type: string;
        coordinates: [number, number];
        startLatDegree: number;
        startLatMinute: number;
        startLatSecond: number;
        startLongDegree: number;
        startLongMinute: number;
        startLongSecond: number;
      };
      end: {
        type: string;
        coordinates: [number, number];
        endLatDegree: number;
        endLatMinute: number;
        endLatSecond: number;
        endLongDegree: number;
        endLongMinute: number;
        endLongSecond: number;
      };
    };
  };
  management: {
    organization?: string;
    department?: string;
    authority?: string;
  };
  inspections: {
    serialNumber: string;
    date: Date;
    result: string;
  };
  disaster: {
    serialNumber: string;
    riskDate: Date;
    riskLevel: string;
    riskScore: string;
    riskType: string;
  };
  collapseRisk: {
    districtNo: string;
    districtName: string;
    designated: boolean;
    designationDate: Date;
  };
  maintenanceProject: {
    year: string;
    type: string;
  };
  slopeInspectionHistory: {
    historyNumber: string;
    inspectionDate: string;
  };
  priority: {
    usage: string; // 비탈면용도
    slopeNature: string; // 자연/인공 구분
    slopeType: string; // 비탈면유형
    slopeStructure: string; // 비탈면구조
    maxVerticalHeight: string; // 최고수직고 (단위: m)
    longitudinalLength: string; // 종단길이 (단위: m)
    averageSlope: string; // 평균경사 (단위: 도)
    images: [
      {
        // 이미지
        url: string; // url
        createdAt: Date; // 이미지 생성날짜
      }
    ];
    Score: string; //점수
    grade: string; // 등급
  };
  createdAt: Date;
  _id: string;
}

export const slopeMapAPI = {
  fetchNearbySlopes: async (latitude: number, longitude: number) => {
    console.log(latitude, longitude);
    const response = await api.post(`slopes/nearby`, {
      latitude,
      longitude,
    });
    // console.log('근처 급 경사지 조회', response.data);
    return response.data.data;
  },

  searchSlopes: async (
    keyWord: string,
    latitude: number,
    longitude: number
  ) => {
    console.log(keyWord, latitude, longitude);
    const response = await api.post(`slopes/search`, {
      keyWord,
      latitude,
      longitude,
    });
    console.log('급경사지 검색', response.data);
    return response.data.data;
  },
};

export const slopeCommentAPI = {
  getComment: async (slopeId: string) => {
    const response = await api.get(`slopes/${slopeId}/comments`);
    // console.log('급경사지 코멘트 조회 완료', response.data);
    return response.data.data;
  },
  createComment: async (formData: FormData) => {
    const slopeId = formData.get('slopeId');
    const response = await api.post(`slopes/${slopeId}/comments`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    // console.log('급경사지 코멘트 생성 완료', response.data);
    return response.data;
  },
  updateComment: async (formData: FormData) => {
    const commentId = formData.get('commentId');
    const response = await api.put(`slopes/comments/${commentId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    // console.log('급경사지 코멘트 수정 완료', response.data);
    return response.data;
  },
  deleteComment: async (commentId: string) => {
    const response = await api.delete(`slopes/comments/${commentId}`);
    // console.log('급경사지 코멘트 삭제 완료', response.data);
    return response.data;
  },
};
