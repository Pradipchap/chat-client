import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { store } from "../redux/store.ts";
import { fetchSessionData } from "../redux/slices/SessionSlice.ts";
import ReduxProvider from "../redux/ReduxProvider.tsx";
import { Analytics } from "@vercel/analytics/react";
import WsProvider from "../utils/WsProvider.tsx";
import PeerProvider from "../utils/PeerProvider.tsx";
import { QueryProvider } from "./providers/QueryProvider.tsx";

store.dispatch(fetchSessionData());
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ReduxProvider>
      <WsProvider>
        <QueryProvider>
          <PeerProvider>
            <Analytics />
            <App />
          </PeerProvider>
        </QueryProvider>
      </WsProvider>
    </ReduxProvider>
  </React.StrictMode>
);
