import Navbar from "./components/layout/Navbar";
import Landing from "./pages/Landing";
import Footer from "./components/layout/Footer";
import DailyOverview from "./components/overview/DailyOverview";
import Form from "./components/reserve/Form";
import Reserve from "./components/reserve/Reserve";
import TimeSelect from "./components/reserve/TimeSelect";
import Overview from "./components/overview/Overview";
import Auth from "./components/auth/Auth";
import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "./state/AuthContext";

const App = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) return null;
  const { user } = authContext;
  /*   const currentUser = false; */
  console.log(user);

  const RequireAuth = ({ children }: any) => {
    return user ? children : <Navigate to="/login" />;
  };

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/">
          <Route path="login" element={<Auth />} />
          <Route
            index
            element={
              <RequireAuth>
                <Overview />
              </RequireAuth>
            }
          />

          {/*     <Landing />
      <Footer /> */}
          {/* <DailyOverview /> */}
          {/* <Overview /> */}
          {/* <Reserve /> */}
        </Route>
      </Routes>
    </div>
  );
};

export default App;
