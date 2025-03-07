import { api } from './api';

export interface JoinFormType {
  name: string;
  phone: string;
  organization: string;
  password: string;
}
export interface LoginFormType {
  phone: string;
  password: string;
}

export const authAPI = {
  login: async (data: LoginFormType) => {
    const response = await api.post('auth/login', data);
    // console.log(response.data);
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('_id', response.data.user.id);
    localStorage.setItem('isAdmin', response.data.user.isAdmin);
    return response.data;
  },
  join: async (data: JoinFormType) => {
    const response = await api.post('auth/register', data);
    return response.data;
  },
};
