import { NavermapsProvider } from 'react-naver-maps';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage';
import MapPage from './pages/MapPage/MapPage';
import ManagePage from './pages/ManagePage/ManagePage';
import SteepSlopeLookUp from './pages/ManagePage/StepSlope/pages/SteepSlopeLookUp';
import SteepSlopeAdd from './pages/ManagePage/StepSlope/pages/SteepSlopeAdd';
import UserLookUp from './pages/ManagePage/User/pages/UserLookUp';
import UserModi from './pages/ManagePage/User/pages/UserModi';
import Home from './pages/ManagePage/Home';
import SteepSlopeDup from './pages/ManagePage/StepSlope/StepSlopeOutlier/SteepSlopeDup';
import SteepSlopeEmpty from './pages/ManagePage/StepSlope/StepSlopeOutlier/SteepSlopeEmpty';
const Router = () => {
  return (
    <NavermapsProvider ncpClientId={`${import.meta.env.VITE_NAVER_MAP_ID}`}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/manage" element={<ManagePage />}>
            <Route index element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="slope">
              <Route path="list" element={<SteepSlopeLookUp />} />
              <Route path="add" element={<SteepSlopeAdd />} />
            </Route>
            <Route path="outlier">
              <Route path="empty" element={<SteepSlopeEmpty />} />
              <Route path="dup" element={<SteepSlopeDup />} />
              <Route path="location" element={<SteepSlopeDup />} />
            </Route>
            <Route path="member">
              <Route path="list" element={<UserLookUp />} />
              <Route path="edit" element={<UserModi />} />
            </Route>
            <Route path="map" element={<MapPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </NavermapsProvider>
  );
};
export default Router;
