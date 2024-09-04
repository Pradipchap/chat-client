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
    ////console.log("connection established", userID);
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
      ////console.log(error);
    }
  };

  useEffect(() => {
    function connectToSocket() {
      const ws = new WebSocket(WS_URL);
      ws.addEventListener("open", () => {
        setWsClient(ws);
        handleConnection(ws);
      });
      ws.onclose = () => {
        setWsClient(null);
      };
      ws.onerror = () => {
        setWsClient(null);
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
