import { useContext } from "react";
import sendSocketMessage from "../../functions/sendSocketMessage";
import { requestCall } from "../../redux/slices/CallSlice";
import { useAppDispatch, useAppSelector } from "../../utils/reduxHooks";
import { WsContext } from "../../utils/WsProvider";
import Icon from "./Icon";

export default function ChatBoxTopBar() {
  const dispatch = useAppDispatch();
  const wsClient = useContext(WsContext);
  const userId = useAppSelector((state) => state.currentUser.userID);
  const chatter = useAppSelector((state) => state.chat);
  const callDetails = useAppSelector((state) => state.call);

  async function handleCallOpen() {
    try {
      if (callDetails.callStatus === "close") {
        // const response = await fetch(`${SERVER_BASE_URL}/getPeerId`);
        // if (!response.ok) {
        //   throw "";
        // }
        // const result = await response.json();

        dispatch(
          requestCall({
            secondaryChatter: chatter.secondaryChatter,
            secondaryChatterName: chatter.secondaryChatterName,
            secondaryChatterImage: chatter.secondaryChatterImage,
            // peerId: result.peerId,
          })
        );
        const blob = new Blob([]);
        sendSocketMessage({
          sender: userId,
          receiver: chatter.secondaryChatter,
          wsClient,
          data: blob,
          type: "callReq",
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="bg-gray-200 border-b border-gray-400 font-bold text-black h-14 w-full absolute top-0 flex justify-between items-center px-2">
      <p>{chatter.secondaryChatterName}</p>
      <button
        onClick={handleCallOpen}
        title="Call"
        aria-label="Call Button"
        className="px-3 py-2"
      >
        <Icon name="Call" className=" hover:text-gray-700 text-xl" />
      </button>
    </div>
  );
}
