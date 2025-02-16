import { api } from '../api';

export const slopeManageAPI = {
  batchSlope: async () => {
    const response = await api.get(`slopes/batch`);
    console.log(' 경사지 전체 조회', response.data);
    return response.data.data;
  },
};
