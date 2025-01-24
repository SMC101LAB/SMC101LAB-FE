import { api } from './api';
export interface User {
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
};
