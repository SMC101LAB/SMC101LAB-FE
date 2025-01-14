import { NavermapsProvider } from 'react-naver-maps';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import MapPage from './pages/MapPage/MapPage';
const Router = () => {
  return (
    <BrowserRouter>
      <NavermapsProvider ncpClientId={`${import.meta.env.VITE_NAVER_MAP_ID}`}>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/map" element={<MapPage />} />
        </Routes>
      </NavermapsProvider>
    </BrowserRouter>
  );
};

export default Router;
