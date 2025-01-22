import axios from 'axios';

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

export const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authAPI = {
  login: async (data: LoginFormType) => {
    const response = await api.post('auth/login', data);
    return response.data;
  },
  join: async (data: JoinFormType) => {
    const response = await api.post('auth/register', data);
    return response.data;
  },
};
