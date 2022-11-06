import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { BrowserRouter } from "react-router-dom";
import { AppContextProvider } from "./state/AppContext";
import { AuthContextProvider } from "./state/AuthContext";
import { ReservationContextProvider } from "./state/ReservationContext";
import { reducers } from "./state/reducers";
import { ChakraProvider } from "@chakra-ui/react";

const store = createStore(reducers, compose(applyMiddleware(thunk)));

//Typescript + Redux requirements - from official documentation
//https://redux.js.org/tutorials/typescript-quick-start

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <ChakraProvider>
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
  </Provider>
);
