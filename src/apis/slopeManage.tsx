import { api } from './api';
import { Slope } from './slopeMap';

export const slopeManageAPI = {
  batchSlope: async () => {
    const response = await api.get(`slopes/batch`);
    console.log(' 경사지 전체 조회', response.data);
    return response.data.data;
  },
  deleteSlope: async (slopeIds: string[]) => {
    const response = await api.delete(`slopes/delete`, { data: { slopeIds } });
    console.log(' 경사지 전체 조회', response.data);
    return;
  },
  updateSlope: async (slope: Slope) => {
    const response = await api.put(`slopes/update`, {
      slopeId: slope._id,
      updateData: slope,
    });
    console.log(' 경사지 전체 조회', response.data);
    return;
  },
};
