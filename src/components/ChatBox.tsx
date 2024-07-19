import { lazy, useEffect } from "react";
import { useAppSelector } from "../../utils/reduxHooks";
import NonFriendsDetails from "./NonFriendsDetails";
const ChatMessageArea = lazy(() => import("./ChatMessageArea"));
const WriteMessage = lazy(() => import("./WriteMessage"));
const ChatBoxTopBar = lazy(() => import("./ChatBoxTopBar"));

export default function Chat() {
  const relation = useAppSelector(
    (state) => state.chat.secondaryChatterRelation
  );

  return (
    <div className="relative bg-gray-200 min-h-screen flex-col flex justify-end">
      <ChatBoxTopBar />
      {relation === "GOTREQUEST" || relation === "SENTREQUEST" ? (
        <NonFriendsDetails />
      ) : relation === "FRIEND" ? (
        <>
          <ChatMessageArea />
          <WriteMessage />
        </>
      ) : null}
    </div>
  );
}
