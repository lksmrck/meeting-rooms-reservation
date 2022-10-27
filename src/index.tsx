import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { BrowserRouter } from "react-router-dom";

//Typescript + Redux requirements - from official documentation
//https://redux.js.org/tutorials/typescript-quick-start

// Infer the `RootState` and `AppDispatch` types from the store itself
/* export type RootState = ReturnType<typeof store.getState>; */
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
/* export type AppDispatch = typeof store.dispatch; */

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
