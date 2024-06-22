import { lazy } from "react";
const ChatMessageArea = lazy(() => import("./ChatMessageArea"));
const WriteMessage = lazy(() => import("./WriteMessage"));
const ChatBoxTopBar = lazy(() => import("./ChatBoxTopBar"));

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
