import Navbar from "./components/ui/Navbar";
import Landing from "./pages/Landing";
import Footer from "./components/ui/Footer";
import DailyOverview from "./components/overview/DailyOverview";
import Reserve from "./components/reserve/Reserve";
import Home from "./components/overview/Home";
import Auth from "./components/auth/Auth";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useContext, useEffect } from "react";
import AuthContext from "./state/AuthContext";
import { timeCheck } from "./utils/timeCheck";

const App = () => {
  const authContext = useContext(AuthContext);

  const { user, setUser } = authContext;

  const location = useLocation();

  //Při každé změně route se obnoví session timer pro automatické odhlášení
  useEffect(() => {
    if (user) timeCheck(setUser);
  }, [location]);

  //Protect paths - lze navštívit po loginu
  const RequireAuth = ({ children }: any) => {
    return user ? children : <Navigate to="/login" />;
  };

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/">
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
      <Footer />
    </div>
  );
};

export default App;
