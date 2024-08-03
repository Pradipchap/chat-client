import { lazy } from "react";
import useUsersFetch from "../../customHooks/useUsersFetch";
import Pagination from "../components/Pagination";
import FriendsGroupSkeleton from "../components/Skeleton/FriendsGroupSkeleton";
const UserCard = lazy(() => import("../components/UserCard"));

export default function FriendsGroup() {
  const { pageNo, result, loading, setPageNo } = useUsersFetch({
    currentPath: "friends",
  });
  const friends = result?.users || [];
  const totalData = result?.noOfUsers || 0;

  if (loading) return <FriendsGroupSkeleton />;
  return (
    <div className="p-2 mt-10">
      <div className="flex w-full gap-5">
        {friends.length > 0 &&
          friends.map((user) => {
            return (
              <UserCard
                key={user._id}
                username={user.username}
                email={user.email}
                userID={user._id}
              />
            );
          })}
      </div>
      {totalData > 0 ? (
        <Pagination
          currentPage={pageNo}
          dataLength={totalData}
          dataPerPage={10}
          onPageChange={setPageNo}
        />
      ) : (
        <div className="w-max m-auto text-lg font-medium">
          Sorry , there are no friends <br /> <p>Please ,add friends to chat</p>{" "}
        </div>
      )}
    </div>
  );
}
