import WriteMessage from "./WriteMessage";
import ChatBoxTopBar from "./ChatBoxTopBar";
import ChatMessageArea from "./ChatMessageArea";

export default function Chat() {
  return (
    <div className="relative bg-gray-200 min-h-screen flex-col flex justify-end">
      <ChatBoxTopBar />
      <>
        <ChatMessageArea />
        <WriteMessage />
      </>
    </div>
  );
}
