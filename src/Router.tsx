import { NavermapsProvider } from 'react-naver-maps';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage';
import MapPage from './pages/MapPage/MapPage';
import ManagePage from './pages/ManagePage/ManagePage';
const Router = () => {
  return (
    <BrowserRouter>
      <NavermapsProvider ncpClientId={`${import.meta.env.VITE_NAVER_MAP_ID}`}>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/manage" element={<ManagePage />} />
        </Routes>
      </NavermapsProvider>
    </BrowserRouter>
  );
};

export default Router;
