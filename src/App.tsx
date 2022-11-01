import Navbar from "./components/layout/Navbar";
import Landing from "./pages/Landing";
import Footer from "./components/layout/Footer";
import DailyOverview from "./components/overview/DailyOverview";
import Form from "./components/reserve/Form";
import Reserve from "./components/reserve/Reserve";
import TimeSelect from "./components/reserve/TimeSelect";
import Overview from "./components/overview/Overview";
import Auth from "./components/auth/Auth";

const App = () => {
  return (
    <div>
      <Navbar />
      {/*     <Landing />
      <Footer /> */}
      {/* <DailyOverview /> */}
      {/* <Overview /> */}
      {/* <Reserve /> */}
      <Auth />
    </div>
  );
};

export default App;
