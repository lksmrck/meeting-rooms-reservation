import {
  Route,
  Routes as RouterRoutes,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Landing from "../pages/Landing";
import DailyOverview from "../pages/Overview";
import Reserve from "../pages/Reserve";
import Home from "../pages/Datepick";
import Auth from "../pages/Login";
import useAuth from "../hooks/useAuth";
import { useContext } from "react";
import AppContext from "../state/AppContext";
import NotFound from "../pages/screens/NotFound";
import ProtectedRoutes from "../components/login/ProtectedRoutes";
import Unauthorized from "../pages/screens/Unauthorized";
import { ADMIN, USER } from "../data/constants";
import UsersList from "../pages/Admin/Users";
import RoomsList from "../pages/Admin/Rooms";
import { FC, useEffect } from "react";
import { LandingRefsObject } from "../types/types";
import ErrorScreen from "../pages/screens/ErrorScreen";
import Settings from "../pages/Admin/index";
import { timeCheck } from "../utils/timeCheck";

type RoutesProps = {
  gatherLandingRefs: (refs: LandingRefsObject) => void;
};

const Routes: FC<RoutesProps> = ({ gatherLandingRefs }) => {
  const { user, setUser } = useAuth();
  const { error, setError } = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (user) {
      timeCheck(setUser);
      if (error.error) setError({ error: false, message: "" });
    }
  }, [location]);

  useEffect(() => {
    if (error.error) navigate("/something-wrong");
  }, [error]);

  return (
    <RouterRoutes>
      <Route path="*" element={<NotFound />} />
      {/* 1. Public routes */}
      <Route path="/" element={<Navigate replace to="/home" />} />
      <Route
        path="/meeting-rooms-reservation"
        element={<Navigate replace to="/home" />}
      />
      <Route path="/something-wrong" element={<ErrorScreen />} />
      <Route
        path="/home"
        element={<Landing gatherLandingRefs={gatherLandingRefs} />}
      />
      <Route path="/login" element={<Auth />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      {/* 2. Protected routes -> logged in + ADMIN or USER rights */}
      <Route element={<ProtectedRoutes allowedRights={[ADMIN, USER]} />}>
        <Route path="/datepick" element={<Home />} />
        <Route path="/reserve" element={<Reserve />} />
        <Route path="/overview" element={<DailyOverview />} />
        {/* 3. Protected routes -> logged in + ADMIN rights */}
        <Route element={<ProtectedRoutes allowedRights={[ADMIN]} />}>
          <Route path="/settings" element={<Settings />} />
          <Route path="/settings/rooms" element={<RoomsList />} />
          <Route path="/settings/users" element={<UsersList />} />
        </Route>
      </Route>
    </RouterRoutes>
  );
};

export default Routes;
