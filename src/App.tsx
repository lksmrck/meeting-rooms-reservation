import Navbar from "./components/layout/Navbar";
import Landing from "./pages/Landing";
import Footer from "./components/layout/Footer";
import Overview from "./components/overview/Overview";
import Form from "./components/reserve/Form";

const App = () => {
  return (
    <div>
      <Navbar />
      {/*     <Landing />
      <Footer /> */}
      {/*  <Overview /> */}
      <Form />
    </div>
  );
};

export default App;
