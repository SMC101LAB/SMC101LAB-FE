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
    // console.log('User조회', response.data.data);
    return response.data.data;
  },
  getUser: async (id: string) => {
    const response = await api.get(`auth/users/${id}`);
    // console.log('User 단일조회', response.data.data);
    return response.data.data;
  },
  approveUser: async (id: number) => {
    const response = await api.put(`auth/users/approve/${id}`);
    return response.data;
  },
  deleteUser: async (id: number) => {
    //관리 페이지
    const response = await api.delete(`auth/users/${id}`);
    return response.data;
  },
  selfDeleteUser: async (id: string) => {
    //사용자 직접 삭제
    const response = await api.delete(`auth/users/${id}`);
    alert('회원탈퇴가 정상처리 되었습니다.');
    return response.data;
  },
  modifyUser: async (data: User) => {
    const response = await api.put(`auth/users/${data._id}`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('수정 결과', response.data);
    return response.data;
  },
};
