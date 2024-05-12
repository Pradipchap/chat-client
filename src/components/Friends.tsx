import Search from "./Search";
import FriendList from "./FriendList";
import Setting from "./Setting";

export default function Friends() {
  return (
    <div className="relative bg-gray-900 min-h-screen border-r-2 border-gray-700 px-2 py-2 flex flex-col gap-5">
      <div className="h-[calc(100vh-48px)] overflow-y-auto">
        <h1 className="text-2xl">Chats</h1>
        <Search />
        <FriendList />
      </div>
      <Setting />
    </div>
  );
}

