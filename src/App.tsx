import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import Router from './Router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import GlobalStyle from './styles/globalStyle';
import './styles/font.css';
import { NotificationProvider } from './components/NotificationProvider';
import { NavermapsProvider } from 'react-naver-maps';
import { BrowserRouter } from 'react-router-dom';
// import { useEffect } from 'react';
// import { api, getRefreshStatus, resetRefreshState } from './apis/api';

function App() {
  const queryClient = new QueryClient();

  // //리프레시 함수 디버깅을 위한 전역함수 등록 (개발시에만 사용)
  // useEffect(() => {
  //   (window as any).checkRefreshStatus = getRefreshStatus;
  //   (window as any).resetRefresh = resetRefreshState;
  //   (window as any).api = api;
  //   const interval = setInterval(() => {
  //     const status = getRefreshStatus();
  //     if (status.isRefreshing || status.queueLength > 0) {
  //       console.log('🔄 Refresh Status:', status);
  //     }
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, []);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <NavermapsProvider
            ncpClientId={`${import.meta.env.VITE_NAVER_MAP_ID}`}
          >
            <BrowserRouter>
              <Router />
            </BrowserRouter>
          </NavermapsProvider>
        </ThemeProvider>
      </QueryClientProvider>
      <NotificationProvider />
    </>
  );
}

export default App;
