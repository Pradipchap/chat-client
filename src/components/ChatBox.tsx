import WriteMessage from "./WriteMessage";
import ChatBoxTopBar from "./ChatBoxTopBar";
import { useAppSelector } from "../../utils/reduxHooks";
import ChatMessageArea from "./ChatMessageArea";

export default function Chat() {
  const isCallOpen = useAppSelector((state) => state.call.callStatus);

  return (
    <div className="relative bg-gray-200 min-h-screen flex-col flex justify-end">
      <ChatBoxTopBar />
      <p className="text-white">{isCallOpen}</p>
      <>
        <ChatMessageArea />
        <WriteMessage />
      </>
    </div>
  );
}
