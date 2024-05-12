import { useAppDispatch, useAppSelector } from "../../utils/reduxHooks";
import {
  callStatusType,
  closeCall,
  endCall,
  startCall,
} from "../../redux/slices/CallSlice";
import { createPortal } from "react-dom";
import Button from "./Button";
import sendSocketMessage from "../../functions/sendSocketMessage";
import { useNavigate } from "react-router-dom";

export default function CallIncomingOutgoing({
  callStatus,
  wsClient,
}: {
  callStatus: callStatusType;
  wsClient: WebSocket;
}) {
  const navigator = useNavigate();
  const dispatch = useAppDispatch();
  const caller = useAppSelector((state) => state.call);
  const sender = useAppSelector((state) => state.currentUser.userID);

  function rejectCall() {
    dispatch(endCall());
    console.log("daf", caller.secondaryChatter);
    sendSocketMessage({
      sender,
      receiver: caller.secondaryChatter,
      type: "callRej",
      wsClient,
      data: new Blob(),
    });
  }

  function onclose() {
    dispatch(closeCall());
    sendSocketMessage({
      sender,
      receiver: caller.secondaryChatter,
      type: "callEnd",
      wsClient,
      data: new Blob(),
    });
  }

  function acceptCall() {
    dispatch(startCall());
    sendSocketMessage({
      sender,
      receiver: caller.secondaryChatter,
      type: "callAcc",
      wsClient,
      data: new Blob(),
    });
    navigator("/call");
  }

  function getComponent() {
    switch (callStatus) {
      case "incoming":
        return (
          <div className="absolute top-0 w-full h-full bg-gray-700/60 flex flex-col justify-center items-center gap-16">
            <div className="profile w-32 h-32 bg-red-600 rounded-full"></div>
            <p className="text-white text-lg">{caller.secondaryChatterName}</p>
            <div className="flex gap-10">
              <Button
                onClick={rejectCall}
                className="bg-red-500 hover:bg-red-400 px-8 py-4 text-xl"
              >
                Dismiss
              </Button>
              <Button
                onClick={acceptCall}
                className="px-8 hover:bg-green-700 py-4 text-xl"
              >
                Accept
              </Button>
            </div>
          </div>
        );
      case "requesting":
        return (
          <div className="absolute top-0 w-full h-full bg-gray-700/60 flex flex-col justify-center items-center gap-5">
            <div className="profile w-32 h-32 bg-red-600 rounded-full"></div>
            <p className="text-white">calling</p>
            <div className="flex gap-10 pt-10">
              <Button
                onClick={onclose}
                className="bg-red-500 hover:bg-red-400 px-8 py-4 text-xl"
              >
                Dismiss
              </Button>
            </div>
          </div>
        );
      default:
        return null;
    }
  }

  return createPortal(getComponent(), document.body);
}
