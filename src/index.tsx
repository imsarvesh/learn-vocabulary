import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { StoreProvider } from "appStore";
import AppReducer from "reducer";

let initialState = {
  position: 0,
};

const storeKey = "POSITION";

try {
  initialState =
    JSON.parse(localStorage.getItem(storeKey) || "") || initialState;
} catch {}

const reducer = (state: any, action: any) => {
  const newState = AppReducer(state, action);
  localStorage.setItem(storeKey, JSON.stringify(newState));
  return newState;
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <StoreProvider reducer={reducer} initialState={initialState}>
      <App />
    </StoreProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
