import { lazy } from "react";
import useUsersFetch from "../../customHooks/useUsersFetch";
import Pagination from "../components/Pagination";
const SendRequestCard = lazy(() => import("../components/SendRequestCard"));

export default function AddFriends() {
  const { pageNo, users, setPageNo, totalData } = useUsersFetch({
    currentPath: "addFriends",
  });
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
