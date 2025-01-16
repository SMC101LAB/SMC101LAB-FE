import axios from 'axios';

export interface JoinFormType {
  name: string;
  phone: string;
  organization: string;
  password: string;
}

export const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authAPI = {
  join: async (data: JoinFormType) => {
    const response = await api.post('auth/users/join', data);
    return response.data;
  },
};
