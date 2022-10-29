import Navbar from "./components/layout/Navbar";
import Landing from "./pages/Landing";
import Footer from "./components/layout/Footer";
import Overview from "./components/overview/Overview";
import Form from "./components/reserve/Form";
import Reserve from "./components/reserve/Reserve";
import TimeSelect from "./components/reserve/TimeSelect";

const App = () => {
  return (
    <div>
      <Navbar />
      {/*     <Landing />
      <Footer /> */}
      {/* <Overview /> */}
      {/*   <Form /> */}
      <Reserve />
      {/*    <TimeSelect /> */}
    </div>
  );
};

export default App;
