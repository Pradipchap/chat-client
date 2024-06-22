import Search from "./Search";
import FriendList from "./FriendList";
import Setting from "./Setting";
import { Suspense } from "react";

export default function Friends() {
  return (
    <div className="relative bg-gray-200 min-h-screen border-r border-gray-400 px-2 py-2 flex flex-col gap-5">
      <div className="h-[calc(100vh-48px)] overflow-y-auto">
        <h1 className="text-2xl">Chats</h1>
        <Search />
        <Suspense fallback={null}>
          <FriendList />
        </Suspense>
      </div>
      <Setting />
    </div>
  );
}
