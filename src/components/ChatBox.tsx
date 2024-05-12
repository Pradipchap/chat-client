import WriteMessage from "./WriteMessage";
import ChatBoxTopBar from "./ChatBoxTopBar";
import { useContext, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../utils/reduxHooks";
import ChatMessageArea from "./ChatMessageArea";
import sendSocketMessage from "../../functions/sendSocketMessage";
import {
  closeCall,
  incomingCall,
  startCall,
  updateCallDetails,
} from "../../redux/slices/CallSlice";
import {
  DetailsObjectInterface,
  FriendBoxInterface,
} from "../../interfaces/dataInterfaces";
import CallIncomingOutgoing from "./CallIncomingOutgoing";
import { useNavigate, useParams } from "react-router-dom";
import getSocketData from "../../functions/getSocketData";
import { WsContext } from "../../utils/WsProvider";

export default function Chat() {
  const { wsClient } = useContext(WsContext);
  const previewRef = useRef<HTMLVideoElement>();
  const videoRef = useRef<HTMLVideoElement>();
  // const readyState = wsClient.readyState;
  const navigator = useNavigate();
  const blobArray = [];

  const userID = useAppSelector((state) => state.currentUser.userID);
  const isCallOpen = useAppSelector((state) => state.call.callStatus);
  const videoCallers = useAppSelector((state) => state.call);
  const dispatch = useAppDispatch();
  const secondaryChatter = useAppSelector(
    (state) => state.chat.secondaryChatter
  );

  // useEffect(() => {
  //   function handleConnection() {
  //     console.log("connection established", userID);
  //     const detailsMessage: DetailsObjectInterface = {
  //       type: "newUser",
  //       sender: userID,
  //       receiver: userID,
  //     };
  //     const detailsBlob = new Blob([JSON.stringify(detailsMessage)]);
  //     const otherBlob = new Blob(["sdfadfasdfasd"]);
  //     const combinedBlob = new Blob([detailsBlob, otherBlob]);
  //     console.log("ws initialized");
  //     wsClient.send(combinedBlob);
  //   }
  //   wsClient.addEventListener("open", handleConnection);

  //   return () => wsClient.removeEventListener("open", handleConnection);
  // }, [userID, wsClient, readyState]);

  // useEffect(() => {
  //   async function handleMessage(connection: MessageEvent<any>) {
  //     console.log("message got", connection.data);
  //     const { message, details } = await getSocketData(connection.data);
  //     switch (details.type) {
  //       case "callGoi": {
  //         return;
  //       }
  //       case "callInc":
  //         {
  //           console.log("incoming");
  //           if (isCallOpen === "ended") {
  //             console.log("call ended");
  //             dispatch(closeCall());
  //             return;
  //           } else if (isCallOpen === "accepted" || isCallOpen === "ongoing") {
  //             return;
  //           } else {
  //             const callerData: FriendBoxInterface = JSON.parse(message);
  //             console.log(callerData);
  //             console.log(details.sender);
  //             console.log(userID);
  //             if (details.sender !== videoCallers.secondaryChatter) {
  //               dispatch(
  //                 updateCallDetails({
  //                   primaryChatter: userID,
  //                   secondaryChatter: details.sender,
  //                 })
  //               );
  //             }
  //             dispatch(
  //               incomingCall({
  //                 name: callerData.username,
  //                 image: callerData.image,
  //               })
  //             );
  //           }
  //         }
  //         break;
  //       case "callAcc":
  //         {
  //           dispatch(startCall());
  //           navigator("/call");
  //         }
  //         break;
  //       case "callRej":
  //         {
  //           dispatch(closeCall());
  //           console.log("call rejected");
  //           setTimeout(() => {
  //             sendSocketMessage({
  //               sender: userID,
  //               receiver: details.sender,
  //               type: "callEnd",
  //               data: new Blob(),
  //               wsClient,
  //             });
  //           }, 5000);
  //         }
  //         break;
  //       case "callEnd":
  //         {
  //           console.log("call ending");
  //           dispatch(closeCall());
  //         }
  //         break;
  //       case "callTmo":
  //         {
  //           console.log("call ending");
  //           dispatch(closeCall());
  //         }
  //         break;
  //       case "message": {
  //         break;
  //         // console.log(message);
  //         // console.log("dispatching");
  //         // if (details.sender === secondaryChatter)
  //         //   dispatch(pushMessage([{ message: message, isReceiver: true }]));
  //       }
  //       case "getMess":
  //         {
  //           // const chat: { page: number; messages: [] } = JSON.parse(message);
  //           // console.log("sdf", chat);
  //           // const finalChats = chat.messages.map((item) => {
  //           //   const isReceiver = item.sender !== userID;
  //           //   return {
  //           //     message: item.message,
  //           //     isReceiver,
  //           //     time: item.datetime,
  //           //     id: item._id,
  //           //   };
  //           // });
  //           // console.log("finalchats", finalChats);
  //           // console.log(chat.page);
  //           // if (chat.page === 1) dispatch(updateChats(finalChats));
  //           // else dispatch(pushChat(finalChats));
  //         }
  //         break;
  //       default:
  //         {
  //           dispatch(closeCall());
  //         }
  //         break;
  //     }
  //   }
  //   wsClient.addEventListener("message", handleMessage);
  //   return () => wsClient.removeEventListener("message", handleMessage);
  // }, []);

  // useEffect(() => {
  //   async function handleCallInitiation() {
  //     if (isCallOpen === "requesting" || isCallOpen === "incoming") {
  //       // Preload video elements to avoid flickering
  //       if (videoRef.current) {
  //         videoRef.current.preload = "auto";
  //       }

  //       // Smoothly transition by setting the video source and playing
  //       if (isCallOpen === "requesting" && videoRef.current) {
  //         const currentTime = videoRef.current.currentTime;
  //         const blob = new Blob(blobArray, { type: "video/mp4" });
  //         videoRef.current.src = window.URL.createObjectURL(blob);
  //         videoRef.current.currentTime = currentTime;
  //         videoRef.current.play();
  //       }
  //     }
  //   }

  //   handleCallInitiation();
  // }, [isCallOpen]);

  // useEffect(() => {
  //   async function getUserMedia() {
  //     console.log("first");
  //     try {
  //       navigator.mediaDevices
  //         .getUserMedia({
  //           video: true,
  //           audio: true,
  //         })
  //         .then((stream) => {
  //           if (previewRef.current) {
  //             previewRef.current.srcObject = stream;
  //             const recorder = new MediaRecorder(stream);
  //             recorder.ondataavailable = (event) => {
  //               // videoRef.current.src=new URL.createObjectURL(event.data)
  //               console.log(event.data);
  //               sendSocketMessage({
  //                 sender: userID,
  //                 receiver: videoCallers.secondaryChatter,
  //                 data: event.data,
  //                 wsClient: wsClient,
  //                 type: "callGoi",
  //               });
  //             };
  //             recorder.start(1000);
  //           }
  //         });
  //     } catch (error) {
  //       dispatch(closeCall());
  //       console.log(error);
  //     }
  //   }
  //   if (isCallOpen === "ongoing") getUserMedia();
  // }, [isCallOpen]);

  return (
    <div className="relative bg-blue-950 min-h-screen flex-col flex justify-end">
      {/* <p className="text-white">asdfasd{secondaryChatter}</p> */}
      <ChatBoxTopBar />
      <p className="text-white">{isCallOpen}</p>
      {/* {isCallOpen === "requesting" || isCallOpen == "incoming" ? (
        <CallIncomingOutgoing callStatus={isCallOpen} wsClient={wsClient} />
      ) : ( */}
      <>
        <ChatMessageArea />
        <WriteMessage wsClient={wsClient} />
      </>
      {/* )} */}
    </div>
  );
}
