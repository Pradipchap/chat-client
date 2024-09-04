import { useParams } from "react-router-dom";
import sendSocketMessage from "../../functions/sendSocketMessage";
import { pushMessage, updateSeenStatus } from "../../redux/slices/ChatSlice";
import { useAppDispatch, useAppSelector } from "../../utils/reduxHooks";
import { updateLatestMessage } from "../../redux/slices/UsersSlice";
import { useContext } from "react";
import { WsContext } from "../../utils/WsProvider";

export default function WriteMessage() {
  const wsClient = useContext(WsContext);
  const dispatch = useAppDispatch();
  const primaryChatter = useAppSelector((state) => state.currentUser.userID);
  const params = useParams();
  const secondaryChatter = params.chatterID;

  function SendMessage(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      event.preventDefault();
      if (
        wsClient instanceof WebSocket === false ||
        primaryChatter === "" ||
        secondaryChatter === ""
      ) {
        ////console.log(false,secondaryChatter);
        return;
      }
      if (event.currentTarget.value.length < 1) return;
      try {
        const text = event.currentTarget.value;
        const nextBlob = new Blob([text]);
        dispatch(pushMessage([{ message: text, isReceiver: false }]));
        sendSocketMessage({
          sender: primaryChatter,
          receiver: secondaryChatter || "",
          type: "message",
          wsClient: wsClient,
          data: nextBlob,
        });
        event.currentTarget.value = "";
        dispatch(updateSeenStatus(false));
        dispatch(
          updateLatestMessage({
            message: text,
            messagerID: secondaryChatter,
            whoMessaged: primaryChatter,
            datetime: new Date().toISOString(),
          })
        );
      } catch (error) {
        ////console.log("error is ", error);
      }
    } else {
      return;
    }
  }

  return (
    <form className="w-full gap-5 h-16 flex items-center px-2 border-t bg-gray-100 border-gray-300">
      <button>
        {/* <Icon name="Plus" className="bg-blue-600 p-2 rounded-full" /> */}
      </button>
      <input
        className="flex-1 bg-gray-100 outline-none px-5 py-3"
        name="message"
        onKeyDown={SendMessage}
        placeholder="Write your Message"
        autoFocus
      />
      {/* <Icon name="Plus" className=" bg-blue-600 p-2 rounded-full" /> */}
      {/* <Icon name="Plus" className=" bg-blue-600 p-2 rounded-full" /> */}
    </form>
  );
}
