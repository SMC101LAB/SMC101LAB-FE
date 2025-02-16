import { api } from '../api';

export interface Slope {
  managementNo: string;
  name: string;
  location: {
    province: string;
    city: string;
    district: string;
    address?: string;
    roadAddress?: string;
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
  inspections: Array<{
    date: Date;
    result: string;
    riskLevel: string;
    riskType: string;
  }>;
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
  createdAt: Date;
}

export const slopeMapAPI = {
  fetchNearbySlopes: async (latitude: number, longitude: number) => {
    console.log(latitude, longitude);
    const response = await api.post(`slopes/nearby`, {
      latitude,
      longitude,
    });
    console.log('근처 급 경사지 조회', response.data);
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
