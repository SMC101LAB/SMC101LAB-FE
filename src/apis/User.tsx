import { api } from './api';
export interface User {
  _id: number;
  name: string;
  organization: string;
  phone: string;
  isAdmin: boolean;
  isApproved: boolean;
}
export interface LoginFormType {
  phone: string;
  password: string;
}

export const userAPI = {
  fetchUser: async () => {
    const response = await api.get('auth/users');
    console.log('User조회', response.data.data);
    return response.data.data;
  },
  approveUser: async (id: number) => {
    const response = await api.put(`auth/users/approve/${id}`);
    return response.data;
  },
};
