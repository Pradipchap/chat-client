import { ReactNode, createContext, useEffect, useState } from "react";
import { useAppSelector } from "./reduxHooks";
import sendSocketMessage from "../functions/sendSocketMessage";
import { WEBSOCKET_BASE_URL } from "./constants";

const WS_URL = WEBSOCKET_BASE_URL;

export const WsContext = createContext<null | WebSocket>(null);

export default function WsProvider({ children }: { children: ReactNode }) {
  const userID = useAppSelector((state) => state.currentUser.userID);
  const [wsClient, setWsClient] = useState<WebSocket | null>(null);

  const handleConnection = (ws: WebSocket) => {
    //console.log("connection established", userID);
    const otherBlob = new Blob(["sdfadfasdfasd"]);
    if (ws.readyState !== WebSocket.OPEN) return;
    try {
      sendSocketMessage({
        sender: userID,
        receiver: userID,
        type: "newUser",
        wsClient: ws,
        data: otherBlob,
      });
    } catch (error) {
      //console.log(error);
    }
    //console.log("success");

    //console.log("ws initialized");
  };

  useEffect(() => {
    //console.log(userID);
  }, [userID]);

  useEffect(() => {
    // if (userID) {
    function connectToSocket() {
      const ws = new WebSocket(WS_URL);
      ws.addEventListener("open", () => {
        //console.log("WebSocket connection established.");
        setWsClient(ws);
        handleConnection(ws);
      });
      ws.onclose = () => {
        //console.log("WebSocket connection closed.", event);
        setWsClient(null);
      };
      ws.onerror = (error) => {
        setWsClient(null);
        console.error("WebSocket error:", error);
        setTimeout(connectToSocket, 3000);
      };

      return ws;
    }
    if (userID) {
      const ws = connectToSocket();
      if (wsClient instanceof WebSocket)
        return () => {
          ws.close();
        };
    }
  }, [userID]);

  return <WsContext.Provider value={wsClient}>{children}</WsContext.Provider>;
}
