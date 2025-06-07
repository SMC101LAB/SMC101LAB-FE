// components/ProtectedRoute.tsx
import { useEffect, useState, ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { authAPI } from '../apis/Auth';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [isAuthChecking, setIsAuthChecking] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const authStatus = authAPI.checkAuth();

        if (!authStatus) {
          // 인증되지 않은 경우 로그인 페이지로 리다이렉트
          navigate('/', {
            replace: true,
            state: { from: location.pathname }, // 로그인 후 돌아갈 경로 저장
          });
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        navigate('/', { replace: true });
      } finally {
        setIsAuthChecking(false);
      }
    };

    checkAuth();
  }, [navigate, location.pathname]);

  // 인증 체크 중일 때 로딩 화면
  if (isAuthChecking) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          fontSize: '18px',
        }}
      >
        로딩 중...
      </div>
    );
  }

  // 인증된 경우에만 자식 컴포넌트 렌더링
  // authAPI.checkAuth()가 false면 이미 리다이렉트되었으므로 여기까지 오지 않음
  return authAPI.checkAuth() ? <>{children}</> : null;
};

export default ProtectedRoute;
