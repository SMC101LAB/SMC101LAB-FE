import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import Router from './Router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import GlobalStyle from './styles/globalStyle';
import './styles/font.css';
import { NotificationProvider } from './components/NotificationProvider';
import { NavermapsProvider } from 'react-naver-maps';
import { BrowserRouter } from 'react-router-dom';

function App() {
  const queryClient = new QueryClient();
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
