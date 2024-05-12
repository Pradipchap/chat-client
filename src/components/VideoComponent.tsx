import { RefObject, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../utils/reduxHooks";
import sendSocketMessage from "../../functions/sendSocketMessage";
import { closeCall, endCall, startCall } from "../../redux/slices/CallSlice";
import { DetailsObjectInterface } from "../../interfaces/dataInterfaces";
import Icon from "./Icon";

export default function VideoComponent({ wsClient }: { wsClient: WebSocket }) {
  const dispatch = useAppDispatch();
  const previewRef = useRef<HTMLVideoElement>();
  const videoRef = useRef<HTMLVideoElement>();

  const blobArray = [];
  const userID = useAppSelector((state) => state.currentUser.userID);
  const callStatus = useAppSelector((state) => state.call.callStatus);
  const secondaryChatter = useAppSelector(
    (state) => state.call.secondaryChatter
  );

  useEffect(() => {
    async function handleMessage(connection: MessageEvent<any>) {
      console.log("message got", connection.data);
      const parsedData: DetailsObjectInterface = JSON.parse(
        await connection.data.slice(0, 92).text()
      );
      console.log(parsedData);
      const messageBlob = await connection.data.slice(92);
      console.log(await messageBlob.text());

      switch (parsedData.type) {
        case "callGoi": {
          if (callStatus === "ended") {
            return;
          } else {
            console.log("sadf");
            blobArray.push(messageBlob);
            if (callStatus !== "ongoing") dispatch(startCall());
            const currentTime = videoRef.current?.currentTime;
            const blob = new Blob(blobArray, { type: "video/mp4" });
            videoRef.current.src = window.URL.createObjectURL(blob);
            videoRef.current.currentTime = currentTime;
            videoRef.current?.play();
            break;
          }
        }
        default: {
          return;
        }
      }
    }
    wsClient.addEventListener("message", handleMessage);
    return () => wsClient.removeEventListener("message", handleMessage);
  }, []);

  useEffect(() => {
    async function getUserMedia() {
      console.log("first");
      try {
        navigator.mediaDevices
          .getUserMedia({
            video: true,
            audio: true,
          })
          .then((stream) => {
            if (previewRef.current) {
              previewRef.current.srcObject = stream;
              const recorder = new MediaRecorder(stream);
              recorder.ondataavailable = (event) => {
                // videoRef.current.src=new URL.createObjectURL(event.data)
                console.log(event.data);
                sendSocketMessage({
                  sender: userID,
                  receiver: secondaryChatter,
                  data: event.data,
                  wsClient: wsClient,
                  type: "callGoi",
                });
              };
              recorder.start(1000);
            }
          });
      } catch (error) {
        dispatch(closeCall());
        console.log(error);
      }
    }
    if (callStatus === "ongoing") getUserMedia();
  }, [callStatus]);

  function handleCallEnd() {
    dispatch(endCall());
    sendSocketMessage({
      sender: userID,
      receiver: secondaryChatter,
      type: "callEnd",
      data: new Blob(),
      wsClient: wsClient,
    });
  }
  if (callStatus === "close") {
    return (
      <div className="bg-gray-800 min-h-screen w-full flex justify-center items-center">
        <p className="text-white text-xl">Call ended</p>
      </div>
    );
  } else {
    return (
      <div className="bg-green-900 w-full min-h-screen flex flex-col gap-5 px-2">
        <video
          autoPlay
          ref={previewRef as RefObject<HTMLVideoElement>}
          controls
          playsInline
          className="absolute top-0 left-0 z-20 w-64 h-64 appearance-none"
        ></video>
        <video
          autoPlay
          ref={videoRef as RefObject<HTMLVideoElement>}
          controls
          className=" absolute top-0 right-0 h-full w-full appearance-none"
        ></video>
        <button
          onClick={handleCallEnd}
          className="bg-red-600 px-4 py-3 text-white rounded-full hover:bg-red-500 transition-all absolute bottom-5 left-1/2 -translate-x-1/2"
        >
          <Icon name="Phone" className="text-white px-5 text-2xl" />
        </button>
      </div>
    );
  }
}
