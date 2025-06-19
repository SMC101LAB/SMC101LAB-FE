import axios, {
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from 'axios';

export const api = axios.create({
  baseURL: `${import.meta.env.VITE_SERVER_ADDRESS}`,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// TypeScript 타입 정의
interface QueueItem {
  resolve: (token: string) => void;
  reject: (error: any) => void;
}

interface RefreshTokenResponse {
  accessToken: string;
  refreshToken?: string;
}

// Race Condition 방지를 위한 전역 변수들
let isRefreshing = false;
let failedQueue: QueueItem[] = [];

// 대기열에 있는 요청들을 처리하는 함수
const processQueue = (error: any, token: string | null = null): void => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token!);
    }
  });

  failedQueue = [];
};

// Request interceptor
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken && config.headers) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// Response interceptor with Race Condition prevention
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // 로그인 요청은 interceptor 적용 안 함
    if (originalRequest.url?.includes('/auth/login')) {
      return Promise.reject(error);
    }

    // 401 에러이고, 재시도하지 않은 요청인 경우
    if (error.response?.status === 401 && !originalRequest._retry) {
      // 이미 refresh가 진행 중인 경우
      if (isRefreshing) {
        // 대기열에 추가하고 결과를 기다림
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token: string) => {
              if (originalRequest.headers) {
                originalRequest.headers.Authorization = `Bearer ${token}`;
              }
              resolve(api(originalRequest));
            },
            reject,
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        console.log('Token refresh 시작...');

        // Refresh Token으로 새로운 Access Token 요청
        const response = await axios.post<RefreshTokenResponse>(
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

        console.log('Token refresh 성공');

        // 대기 중인 모든 요청들에게 새 토큰 전달
        processQueue(null, accessToken);

        // 원래 요청에 새로운 Access Token 적용하여 재시도
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        }
        return api(originalRequest);
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);

        // 대기 중인 모든 요청들을 reject
        processQueue(refreshError, null);

        // 네트워크 에러 vs 인증 에러 구분
        const axiosRefreshError = refreshError as AxiosError;
        if (
          axiosRefreshError.response?.status === 401 ||
          axiosRefreshError.response?.status === 403 ||
          (refreshError as Error).message === 'No refresh token available'
        ) {
          // 진짜 인증 만료 - 로그아웃 처리
          console.log('인증 만료로 인한 로그아웃 처리');

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
          window.location.href = '/';
        } else {
          // 네트워크 에러 등 - 토큰은 유지하고 원본 에러만 반환
          console.warn('Network error during refresh, keeping tokens');
        }

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

// 디버깅을 위한 함수
//리프레시 토큰 상태 출력
export const getRefreshStatus = (): {
  isRefreshing: boolean;
  queueLength: number;
} => ({
  isRefreshing,
  queueLength: failedQueue.length,
});

// 강제로 refresh 상태를 리셋하는 함수
export const resetRefreshState = (): void => {
  isRefreshing = false;
  processQueue(new Error('Refresh state reset'), null);
  console.log('Refresh state has been reset');
};
