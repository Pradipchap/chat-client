import { lazy } from "react";
const Search = lazy(() => import("./Search"));
const FriendList = lazy(() => import("./FriendList"));
import { Suspense } from "react";
import FriendBoxSkeleton from "./Skeleton/FriendBoxSkeleton";

export default function Friends() {
  return (
    <div className="relative min-h-screen max-h-screen border-r border-gray-200 flex gap-1">
      <div className="overflow-y-auto mt-10 flex-1 px-2 md:px-5">
        <h1 className="text-2xl mb-5">Messages</h1>
        <Search />
        <Suspense
          fallback={
            <>
              <FriendBoxSkeleton />
              <FriendBoxSkeleton />
              <FriendBoxSkeleton />
              <FriendBoxSkeleton />
            </>
          }
        >
          <FriendList />
        </Suspense>
      </div>
    </div>
  );
}
