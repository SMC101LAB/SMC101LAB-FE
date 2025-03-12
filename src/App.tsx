import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import Router from './Router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import GlobalStyle from './styles/globalStyle';
import './styles/font.css';
import { NotificationProvider } from './components/NotificationProvider';
function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Router />
        </ThemeProvider>
      </QueryClientProvider>
      <NotificationProvider />
    </>
  );
}

export default App;
