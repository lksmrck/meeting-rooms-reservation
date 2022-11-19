import Navbar from "./components/ui/Navbar";
import Landing from "./pages/Landing";
import Footer from "./components/ui/Footer";
import DailyOverview from "./components/overview/DailyOverview";
import Reserve from "./components/reserve/Reserve";
import Home from "./components/datePick/Home";
import Auth from "./components/auth/Auth";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useContext, useEffect } from "react";
import AuthContext from "./state/AuthContext";
import AppContext from "./state/AppContext";
import { timeCheck } from "./utils/timeCheck";
import ErrorScreen from "./pages/screens/ErrorScreen";
import { useNavigate } from "react-router-dom";

const App = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const appContext = useContext(AppContext);

  const { user, setUser } = authContext;
  const { error } = appContext;

  const location = useLocation();

  //Při každé změně route se obnoví session timer pro automatické odhlášení
  useEffect(() => {
    if (user) timeCheck(setUser);
  }, [location]);

  useEffect(() => {
    if (error.error) navigate("/something-wrong");
  }, [error]);

  //Protect paths - lze navštívit po loginu
  const RequireAuth = ({ children }: any) => {
    return user ? children : <Navigate to="/login" />;
  };

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/">
          {error.error ? (
            <Route path="something-wrong" element={<ErrorScreen />} />
          ) : (
            ""
          )}
          <Route index element={<Landing />} />
          <Route path="login" element={<Auth />} />
          <Route
            path="home"
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          />
          <Route
            //UPRAVIT - přidat do path room id
            path="reserve"
            element={
              <RequireAuth>
                <Reserve />
              </RequireAuth>
            }
          />
          <Route
            //UPRAVIT - přidat do path room id
            path="overview"
            element={
              <RequireAuth>
                <DailyOverview />
              </RequireAuth>
            }
          />
        </Route>
      </Routes>

      {/*  <Footer /> */}
    </>
  );
};

export default App;
