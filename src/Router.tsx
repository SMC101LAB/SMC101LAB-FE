import { NavermapsProvider } from 'react-naver-maps';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage';
import MapPage from './pages/MapPage/MapPage';
import ManagePage from './pages/ManagePage/ManagePage';
import SteepSlopeLookUp from './pages/ManagePage/pages/SteepSlopeLookUp';
import SteepSlopeModi from './pages/ManagePage/pages/SteepSlopeModi';
import SteepSlopeAdd from './pages/ManagePage/pages/SteepSlopeAdd';
import UserLookUp from './pages/ManagePage/pages/UserLookUp';
import UserModi from './pages/ManagePage/pages/UserModi';
import Home from './pages/ManagePage/pages/Home';
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
              <Route path="edit" element={<SteepSlopeModi />} />
              <Route path="add" element={<SteepSlopeAdd />} />
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
