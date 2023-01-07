import Navbar from "./components/ui/Navbar";
import Landing from "./pages/Landing";
import Footer from "./components/ui/Footer";
import DailyOverview from "./pages/Overview";
import Reserve from "./pages/Reserve";
import Home from "./pages/Datepick";
import Auth from "./pages/Login";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import AppContext from "./state/AppContext";
import { timeCheck } from "./utils/timeCheck";
import ErrorScreen from "./pages/screens/ErrorScreen";
import { useNavigate } from "react-router-dom";
import RoomsList from "./pages/Admin/Rooms";
import UsersList from "./pages/Admin/Users";
import Settings from "./pages/Admin";
import { ADMIN, USER } from "./data/constants";
import RequireAuth from "./components/login/RequireAuth";
import useAuth from "./hooks/useAuth";
import Unauthorized from "./pages/screens/Unauthorized";
import { LandingRefsObject } from "./types/types";
import FloatingScrollButton from "./components/ui/FloatingScrollingButton";

const App = () => {
  const navigate = useNavigate();

  const { user, setUser } = useAuth();
  const { error, setError } = useContext(AppContext);

  const location = useLocation();

  //Refs pro elementy v Landing page -> přes linky ve footeru je možné scrollovat na jednotlivé komponenty.
  const [landingRefs, setLandingRefs] = useState({} as LandingRefsObject);

  const gatherLandingRefs = (refs: LandingRefsObject) => {
    setLandingRefs(refs);
  };

  //Při každé změně route se obnoví session timer pro automatické odhlášení
  //+ když je error, tak při změně URL dá error state na false
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
    <div className="overflow-y-scroll scrollbar-hide w-screen flex flex-col  ">
      <div>
        <FloatingScrollButton />
        <Navbar />
        <Routes>
          {/* 1. Public routes */}
          <Route path="/" element={<Navigate replace to="/home" />} />
          <Route
            path="/conference-room-reservation"
            element={<Navigate replace to="/home" />}
          />

          <Route path="/something-wrong" element={<ErrorScreen />}></Route>

          <Route
            path="/home"
            element={<Landing gatherLandingRefs={gatherLandingRefs} />}
          />
          <Route path="/login" element={<Auth />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          {/* 2. Protected routes - musí být logged in + práva User nebo Admin */}
          <Route element={<RequireAuth allowedRights={[ADMIN, USER]} />}>
            <Route path="/datepick" element={<Home />} />
            <Route path="/reserve" element={<Reserve />} />
            <Route path="/overview" element={<DailyOverview />} />

            {/* 3. Protected routes - musí být logged in + práva Admin */}
            <Route element={<RequireAuth allowedRights={[ADMIN]} />}>
              <Route path="/settings" element={<Settings />} />
              <Route path="/settings/rooms" element={<RoomsList />} />
              <Route path="/settings/users" element={<UsersList />} />
            </Route>
          </Route>
        </Routes>
      </div>
      <Footer landingRefs={landingRefs} />
    </div>
  );
};

export default App;
