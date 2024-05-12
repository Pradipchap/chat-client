import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { store } from "../redux/store.ts";
import { fetchSessionData } from "../redux/slices/SessionSlice.ts";
import ReduxProvider from "../redux/ReduxProvider.tsx";
import WsProvider from "../utils/WsProvider.tsx";

store.dispatch(fetchSessionData());
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ReduxProvider>
      <WsProvider>
        <App />
      </WsProvider>
    </ReduxProvider>
  </React.StrictMode>
);
