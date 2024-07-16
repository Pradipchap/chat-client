import { lazy } from "react";
import { Outlet } from "react-router-dom";
const CustomLink = lazy(() => import("../components/CustomLink"));
const Loginstatus = lazy(() => import("../components/Loginstatus"));

export default function Friends() {
  return (
    <main className="flex">
      <div className="w-[20%] bg-blue-950 border-r border-blue-900">
        <Navigation />
      </div>
      <div className="w-[80%] flex flex-col gap-10">
        {/* <SearchFriends /> */}
        <Outlet />
      </div>
    </main>
  );
}

const NavigationItems = [
  { name: "Friends", url: "friends", icon: "Users" },
  { name: "Friend Requests", url: "friendRequests", icon: "FriendRequest" },
  { name: "Add friends", url: "addFriends", icon: "Plus" },
  { name: "Profile", url: "profile", icon: "Profile" },
];
function Navigation() {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <div className="px-5 py-5 flex flex-col gap-2 items-start">
        <CustomLink
          to={"/"}
          className=" active:bg-red-600 text-white justify-center bg-transparent gap-2 items-center text-xl mb-10"
          iconClassName="text-white"
          icon="Back"
        >
          Back
        </CustomLink>
        {NavigationItems.map((item) => {
          return (
            <CustomLink
              key={item.url}
              to={item.url}
              icon={item.icon}
              iconClassName="text-white"
              className="w-full text-white bg-transparent hover:bg-gray-200/10 active:bg-red-900 gap-5 justify-start text-xl py-3"
            >
              {item.name}
            </CustomLink>
          );
        })}
      </div>
      <Loginstatus />
    </div>
  );
}
