import { api } from './api';
import { Slope } from './slopeMap';
interface FetchSlopeParams {
  page: number;
  pageSize: number;
  searchQuery?: string;
  city?: string;
  grade?: string;
  county?: string;
}

export const slopeManageAPI = {
  batchSlope: async (params: FetchSlopeParams) => {
    const response = await api.get('/slopes/batch', { params });
    console.log(' 경사지 전체 조회', response.data);
    return response.data;
  },
  uploadExcelSlope: async (formData: FormData) => {
    const response = await api.post('/slopes/batch', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log('엑셀 업로드', response);
    return response.data;
  },
  createSlope: async (newSlope: Slope) => {
    const response = await api.post(`slopes/create`, newSlope);
    console.log(' 경사지 추가', response.data);
    return;
  },
  deleteSlope: async (slopeIds: string[]) => {
    const response = await api.delete(`slopes/delete`, { data: { slopeIds } });
    console.log(' 경사지 삭제', response.data);
    return;
  },
  updateSlope: async (slope: Slope) => {
    const response = await api.put(`slopes/update`, {
      slopeId: slope._id,
      updateData: slope,
    });
    console.log(' 경사지 수정', response.data);
    return;
  },
  downloadExcel: async (params: {
    searchQuery?: string;
    city?: string;
    county?: string;
  }) => {
    try {
      const response = await api.get('slopes/download', {
        params,
        responseType: 'blob',
      });
      // 파일 다운로드 처리
      const blob = new Blob([response.data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });

      const fileName = `slopes_${new Date().toISOString().split('T')[0]}.xlsx`;
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('엑셀 다운로드 실패:', error);
      throw error;
    }
  },
  findOutlier: async () => {
    const response = await api.get('/slopes/outlier');
    console.log(' 경사지 이상값 조회', response.data.data);
    return response.data.data;
  },
};
