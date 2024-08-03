import { lazy } from "react";
import useUsersFetch from "../../customHooks/useUsersFetch";
import Pagination from "../components/Pagination";
import FriendsGroupSkeleton from "../components/Skeleton/FriendsGroupSkeleton";
const SendRequestCard = lazy(() => import("../components/SendRequestCard"));

export default function AddFriends() {
  const { pageNo, result, loading, setPageNo } = useUsersFetch({
    currentPath: "addFriends",
  });
  const users = result?.users || [];
  const totalData = result?.noOfUsers || 0;

  if (loading) return <FriendsGroupSkeleton />;
  return (
    <div className="p-2 mt-10">
      <div className="flex w-full gap-5">
        {users?.length > 0 &&
          users.map((user) => {
            return (
              <SendRequestCard
                key={user._id}
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
