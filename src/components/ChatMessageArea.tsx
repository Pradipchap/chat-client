import {
  Fragment,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useAppSelector } from "../../utils/reduxHooks";
import ChatMessage from "./ChatMessage";
import sendSocketMessage from "../../functions/sendSocketMessage";
import { useParams } from "react-router-dom";
import { WsContext } from "../../utils/WsProvider";

export default function ChatMessageArea() {
  const wsClient = useContext(WsContext);
  const currentChats = useAppSelector((state) => state.chat.chats);
  const isSeen = useAppSelector((state) => state.chat.isSeen);
  const params = useParams();
  const userID = useAppSelector((state) => state.currentUser.userID);
  const secondaryChatter = params.chatterID;
  const [page, setPage] = useState(1);
  const isWsReady = useAppSelector((state) => state.ws.isActive);

  const DivRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (DivRef.current) DivRef.current.scrollTop = DivRef.current.scrollHeight;
  }, []);

  useEffect(() => {
    function getChats() {
      //console.log("retrieving");
      console.log(secondaryChatter);
      //console.log(wsClient);
      sendSocketMessage({
        sender: userID,
        receiver: secondaryChatter || "",
        type: "getMess",
        data: new Blob([JSON.stringify({ page })]),
        wsClient: wsClient,
      });
    }
    if (
      isWsReady === true &&
      userID !== "" &&
      secondaryChatter !== "" &&
      typeof secondaryChatter !== "undefined" &&
      wsClient instanceof WebSocket
    )
      getChats();
  }, [userID, isWsReady, secondaryChatter, page, wsClient]);

  return (
    <div className="top-14 w-full h-[calc(100vh-120px)] bg-gray-200 flex flex-col-reverse gap-5 px-2 py-10 scroll-smooth overflow-y-auto">
      <div ref={DivRef} className="w-full h-max flex flex-col gap-5">
        {currentChats.map((chat) => {
          return (
            <Fragment key={chat.id}>
              <ChatMessage
                isReceiver={chat.isReceiver}
                message={chat.message}
                time={new Date()}
              />
            </Fragment>
          );
        })}
        {isSeen && (
          <img
            className="self-end text-gray-500 px-2"
            height={12}
            width={12}
          ></img>
        )}
      </div>
      {/* <div ref={spinnerRef} className="w-full flex justify-center">
        <Icon name="Loading" className="animate-spin" />
      </div> */}
      {currentChats.length > 10 && (
        <button
          onClick={() => setPage((page) => page + 1)}
          className=" self-center bg-red-800 rounded-full px-3 py-1 text-white w-max border border-red-900"
        >
          older
        </button>
      )}
    </div>
  );
}
