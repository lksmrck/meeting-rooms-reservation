import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { BrowserRouter } from "react-router-dom";
import { AppContextProvider } from "./state/AppContext";
import { AuthContextProvider } from "./state/AuthContext";
import { ReservationContextProvider } from "./state/ReservationContext";
import chakraTheme from "./chakraTheme";

import { ChakraProvider } from "@chakra-ui/react";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <ChakraProvider theme={chakraTheme}>
    <AuthContextProvider>
      <ReservationContextProvider>
        <AppContextProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </AppContextProvider>
      </ReservationContextProvider>
    </AuthContextProvider>
  </ChakraProvider>
);
