import { lazy } from "react";
import { useAppSelector } from "../../utils/reduxHooks";
import NonFriendsDetails from "./NonFriendsDetails";
const ChatMessageArea = lazy(() => import("./ChatMessageArea"));
const WriteMessage = lazy(() => import("./WriteMessage"));
const ChatBoxTopBar = lazy(() => import("./ChatBoxTopBar"));

export default function Chat() {
  const relation = useAppSelector(
    (state) => state.chat.secondaryChatterRelation
  );
  console.log(relation);
  return (
    <div className="relative bg-gray-200 min-h-screen flex-col flex justify-end">
      <ChatBoxTopBar />
      {relation === "FRIEND" ? (
        <>
          <ChatMessageArea />
          <WriteMessage />
        </>
      ) : relation === "GOTREQUEST" ||
        relation === "SENTREQUEST" ||
        relation === "NORMAL" ? (
        <NonFriendsDetails />
      ) : (
        <></>
      )}
    </div>
  );
}
