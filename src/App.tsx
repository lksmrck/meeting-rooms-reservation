import Navbar from "./components/ui/Navbar";
import Landing from "./pages/Landing";
import Footer from "./components/ui/Footer";
import DailyOverview from "./components/overview";
import Reserve from "./components/reserve";
import Home from "./components/datePick";
import Auth from "./components/auth";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useContext, useEffect } from "react";
import AppContext from "./state/AppContext";
import { timeCheck } from "./utils/timeCheck";
import ErrorScreen from "./pages/screens/ErrorScreen";
import { useNavigate } from "react-router-dom";
import RoomsList from "./components/admin/rooms";
import UsersList from "./components/admin/users";
import Settings from "./components/admin";
import { ADMIN, USER } from "./common/constants";
import RequireAuth from "./components/auth/RequireAuth";
import useAuth from "./hooks/useAuth";
import Unauthorized from "./pages/screens/Unauthorized";

const App = () => {
  const navigate = useNavigate();

  const { user, setUser } = useAuth();
  const { error, setError } = useContext(AppContext);

  const location = useLocation();

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
        <Navbar />
        <Routes>
          <Route
            path="/conference-room-reservation"
            element={<Navigate replace to="/home" />}
          />
          <Route path="/something-wrong" element={<ErrorScreen />}></Route>
          {/* <Route index element={<Landing />} /> */}
          {/* GH pages */}
          <Route path="/home" element={<Landing />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          {/* //Protected routes - musí být logged in + User nebo Admin */}
          <Route element={<RequireAuth allowedRights={[ADMIN, USER]} />}>
            <Route path="/datepick" element={<Home />} />
            <Route
              path="/date/:pickedDate/:pickedRoomId/reserve"
              element={<Reserve />}
            />
            <Route
              path="/date/:pickedDate/overview"
              element={<DailyOverview />}
            />
            {/* <Route path="overview" element={<DailyOverview />} /> */}
            {/*  </Route> */}
            {/* //Protected routes - musí být logged in + Admin */}
            <Route element={<RequireAuth allowedRights={[ADMIN]} />}>
              <Route path="/settings" element={<Settings />} />
              <Route path="/settings/rooms" element={<RoomsList />} />
              <Route path="/settings/users" element={<UsersList />} />
            </Route>
          </Route>
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
