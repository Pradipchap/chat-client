import { useAppDispatch, useAppSelector } from "../../utils/reduxHooks";
import ProfilePic from "../components/ProfilePic";
import StaticImg from "../assets/avatar.svg";
import Button from "../components/Button";
import { closeCall, setTab, startCall } from "../../redux/slices/CallSlice";
import sendSocketMessage from "../../functions/sendSocketMessage";
import { useContext, useEffect, useState } from "react";
import { WsContext } from "../../utils/WsProvider";
import setCallSession from "../../functions/setCallSession";
import getCallSession from "../../functions/getCallSession";
import deleteCallSession from "../../functions/deleteCallSession";

export default function CallStarterPopup() {
  const wsClient = useContext(WsContext);
  const dispatch = useAppDispatch();
  const callDetails = useAppSelector((state) => state.call);
  const userDetails = useAppSelector((state) => state.currentUser);
  const callStatus = callDetails.callStatus;
  const [isOpen, setIsOpen] = useState(false);
  const callChannel = new BroadcastChannel("call-channel");

  useEffect(() => {
    if (
      callStatus === "incoming" ||
      callStatus === "requesting" ||
      callStatus === "ongoing"
    ) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [callStatus]);

  useEffect(() => {
    function handleCallEnd(event) {
      console.log("first");

      if (event.data === "close") {
        console.log("first");
        endCallHandler();
      }
    }
    callChannel.addEventListener("message", handleCallEnd);
    return callChannel.removeEventListener("message", handleCallEnd);
  }, []);

  function acceptCallHandler() {
    dispatch(startCall());
    console.log(wsClient);
    sendSocketMessage({
      sender: userDetails.userID,
      receiver: callDetails.secondaryChatter,
      wsClient: wsClient,
      data: new Blob([]),
      type: "callAcc",
    });
    setCallSession();
    const newTab = window.open("/call", "_blank");
    console.log(newTab);
    dispatch(setTab(newTab));
  }

  function endCallHandler() {
    const { userId } = getCallSession();
    console.log(userId);
    sendSocketMessage({
      sender: userDetails.userID,
      receiver: userId || "",
      wsClient: wsClient,
      data: new Blob([]),
      type: "callEnd",
    });
    dispatch(closeCall());
    deleteCallSession();
    console.log(callDetails.tab);
    callDetails.tab?.close();
    setIsOpen(false);
  }
  function rejectCallHandler() {
    dispatch(closeCall());
    sendSocketMessage({
      sender: userDetails.userID,
      receiver: callDetails.secondaryChatter,
      wsClient: wsClient,
      data: new Blob([]),
      type: "callRej",
    });
    setIsOpen(false);
  }

  if (isOpen)
    return (
      <div className="fixed top-0 z-50 right-1/2 translate-x-1/2 h-max w-max px-3 py-3 rounded-b-lg bg-gray-500/20 backdrop-blur-sm border flex flex-col gap-2">
        {callStatus}
        <div className="flex gap-2">
          <ProfilePic
            className="h-10 w-10"
            image={callDetails.secondaryChatterImage || StaticImg}
          />
          <p>{callDetails.secondaryChatterName}</p>
        </div>
        <div className="flex gap-3 items-center justify-center">
          {callStatus === "incoming" ? (
            <>
              <Button
                onClick={acceptCallHandler}
                icon="Call"
                iconClassName="text-white text-sm"
                className="bg-green-600 w-max text-sm gap-1"
              >
                Accept
              </Button>
              <Button
                onClick={rejectCallHandler}
                icon="Call"
                iconClassName="text-white text-sm"
                className="bg-red-600 text-sm gap-1"
              >
                Reject
              </Button>
            </>
          ) : callStatus === "requesting" ? (
            <Button
              onClick={endCallHandler}
              icon="Call"
              iconClassName="text-white text-sm"
              className="bg-red-600 text-sm gap-1"
            >
              End Call
            </Button>
          ) : callStatus === "rejected" ? (
            <>
              <Button
                onClick={() => {
                  setIsOpen(false);
                }}
                className="bg-black/70 absolute bottom-0 h-[5px] rounded-t-lg py-0 w-10"
              >
                <></>
              </Button>
              <p className="text-sm">call rejected</p>
            </>
          ) : (
            <>
              <Button
                onClick={endCallHandler}
                icon="Call"
                iconClassName="text-white text-sm"
                className="bg-red-600 text-sm gap-1"
              >
                End Call
              </Button>
              <p>call ongoing</p>
            </>
          )}
        </div>
      </div>
    );
  else return null;
}
