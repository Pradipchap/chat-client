interface args {
  sender: string;
  receiver: string;
  type:
    | "newUser"
    | "message"
    | "callGoi"
    | "callInc"
    | "callEnd"
    | "callReq"
    | "callRej"
    | "callTmo"
    | "callAcc"
    | "getMess"
    | "msgSeen"
    | "conClos";
  wsClient: WebSocket | null;
  data?: Blob;
}

function sendSocketMessage({
  sender,
  receiver,
  type,
  wsClient,
  data = new Blob([]),
}: args) {
  const detailsBlob = new Blob([
    JSON.stringify({
      type,
      sender,
      receiver,
    }),
  ]);
  const combinedBlob = new Blob([detailsBlob, data]);
  wsClient?.send(combinedBlob);
}
export default sendSocketMessage;
