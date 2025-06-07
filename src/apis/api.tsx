import axios from 'axios';

export const api = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_ADDRESS}`,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Request interceptor
api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('accessToken'); // 'token' → 'accessToken'으로 변경
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 401 에러이고, 재시도하지 않은 요청인 경우
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        // Refresh Token으로 새로운 Access Token 요청
        const response = await axios.post(
          `${import.meta.env.VITE_SERVER_ADDRESS}/auth/refresh`,
          {},
          {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
              'Content-Type': 'application/json',
            },
          }
        );

        // 새로운 토큰들 저장
        const { accessToken, refreshToken: newRefreshToken } = response.data;
        localStorage.setItem('accessToken', accessToken);

        if (newRefreshToken) {
          localStorage.setItem('refreshToken', newRefreshToken);
        }

        // 원래 요청에 새로운 Access Token 적용하여 재시도
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh Token도 만료되었거나 오류 발생
        console.error('Token refresh failed:', refreshError);

        // 모든 토큰 정보 삭제 (아이디 저장 기능은 유지)
        const rememberedPhone = localStorage.getItem('rememberedPhone');
        const rememberPhoneChecked = localStorage.getItem(
          'rememberPhoneChecked'
        );

        localStorage.clear();

        // 아이디 저장이 체크되어 있었다면 복원
        if (rememberPhoneChecked === 'true' && rememberedPhone) {
          localStorage.setItem('rememberedPhone', rememberedPhone);
          localStorage.setItem('rememberPhoneChecked', 'true');
        }

        // 로그인 페이지로 리다이렉트
        window.location.href = '/login';

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
