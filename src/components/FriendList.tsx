import FriendBox from "./FriendBox";
import { ChatterInterface } from "../../interfaces/dataInterfaces";
import { useAppSelector } from "../../utils/reduxHooks";
import FriendBoxSkeleton from "./FriendBoxSkeleton";

export default function FriendList() {
  const chatters = useAppSelector((state) => state.users.chatters);
  const loading = useAppSelector((state) => state.users.loading);
  const error = useAppSelector((state) => state.users.error);
  if (error) {
    return <p>something wrong happened</p>;
  }
  if (loading) {
    return (
      <>
        {/* {new Array(4).map(() => { */}
        <FriendBoxSkeleton />
        <FriendBoxSkeleton />
        <FriendBoxSkeleton />
        <FriendBoxSkeleton />
        {/* })} */}
      </>
    );
  } else
    return (
      <div>
        {chatters.length === 0 ? (
          <p>No users</p>
        ) : (
          chatters.map((element: ChatterInterface) => {
            return <FriendBox key={element._id} {...element} />;
          })
        )}
      </div>
    );
}
