import Navbar from "./components/ui/Navbar";
import Landing from "./pages/Landing";
import Footer from "./components/ui/Footer";
import DailyOverview from "./components/overview/DailyOverview";
import Form from "./components/reserve/Form";
import Reserve from "./components/reserve/Reserve";
import TimeSelect from "./components/reserve/TimeSelect";
import Home from "./components/overview/Home";
import Auth from "./components/auth/Auth";
import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "./state/AuthContext";

const App = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) return null;
  const { user } = authContext;
  /*   const currentUser = false; */
  /*   console.log(user.email); */

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
