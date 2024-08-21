import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { store } from "../redux/store.ts";
import { fetchSessionData } from "../redux/slices/SessionSlice.ts";
import ReduxProvider from "../redux/ReduxProvider.tsx";
import { Analytics } from "@vercel/analytics/react";

store.dispatch(fetchSessionData());
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ReduxProvider>
      <Analytics />
      <App />
    </ReduxProvider>
  </React.StrictMode>
);
