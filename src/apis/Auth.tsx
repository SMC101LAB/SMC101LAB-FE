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
  rememberPhone?: boolean;
}

export const authAPI = {
  login: async (data: LoginFormType) => {
    const response = await api.post('auth/login', data);
    // console.log(response.data);
    localStorage.setItem('accessToken', response.data.accessToken);
    localStorage.setItem('refreshToken', response.data.refreshToken);

    localStorage.setItem('token', response.data.token);
    localStorage.setItem('_id', response.data.user.id);
    localStorage.setItem('isAdmin', response.data.user.isAdmin);
    if (data.rememberPhone) {
      localStorage.setItem('rememberedPhone', data.phone);
      localStorage.setItem('rememberPhoneChecked', 'true');
    } else {
      localStorage.removeItem('rememberedPhone');
      localStorage.removeItem('rememberPhoneChecked');
    }
    return response.data;
  },
  join: async (data: JoinFormType) => {
    const response = await api.post('auth/register', data);
    return response.data;
  },
  logout: async () => {
    try {
      // 서버에 로그아웃 요청 (Refresh Token 무효화)
      await api.post('auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // 로컬 데이터 삭제 (아이디 저장 기능은 유지)
      const rememberedPhone = localStorage.getItem('rememberedPhone');
      const rememberPhoneChecked = localStorage.getItem('rememberPhoneChecked');

      localStorage.clear();

      // 아이디 저장이 체크되어 있었다면 복원
      if (rememberPhoneChecked === 'true' && rememberedPhone) {
        localStorage.setItem('rememberedPhone', rememberedPhone);
        localStorage.setItem('rememberPhoneChecked', 'true');
      }
    }
  },

  // 토큰 유효성 검사
  checkAuth: () => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    return !!(accessToken && refreshToken);
  },

  // 저장된 아이디 가져오기
  getRememberedPhone: () => {
    return {
      phone: localStorage.getItem('rememberedPhone') || '',
      checked: localStorage.getItem('rememberPhoneChecked') === 'true',
    };
  },

  // 현재 사용자 정보 가져오기
  getCurrentUser: () => {
    return {
      id: localStorage.getItem('_id'),
      isAdmin: localStorage.getItem('isAdmin') === 'true',
    };
  },
};
