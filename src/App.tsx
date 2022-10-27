import Navbar from "./components/layout/Navbar";
import Landing from "./pages/Landing";
import Footer from "./components/layout/Footer";
import Overview from "./components/overview/Overview";

const App = () => {
  return (
    <div>
      <Navbar />
      {/*     <Landing />
      <Footer /> */}
      <Overview />
    </div>
  );
};

export default App;
