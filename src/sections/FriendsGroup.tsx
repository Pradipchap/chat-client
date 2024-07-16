import { lazy } from "react";
import useUsersFetch from "../../customHooks/useUsersFetch";
import Pagination from "../components/Pagination";
const UserCard = lazy(() => import("../components/UserCard"));

export default function FriendsGroup() {
  const { pageNo, users: friends, setPageNo, totalData } = useUsersFetch({
    currentPath: "friends",
  });
  return (
    <div className="w-[80%] flex flex-col gap-10">
      <div className="flex gap-5 p-2">
        {friends.length > 0 &&
          friends[0] !== null &&
          friends.map((user) => {
            return (
              <UserCard
                username={user.username}
                email={user.email}
                userID={user._id}
              />
            );
          })}
      </div>
      {totalData > 0 && (
        <Pagination
          currentPage={pageNo}
          dataLength={totalData}
          dataPerPage={10}
          onPageChange={setPageNo}
        />
      )}
    </div>
  );
}
