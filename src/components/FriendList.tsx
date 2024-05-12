import FriendBox from "./FriendBox";
import { ChatterInterface } from "../../interfaces/dataInterfaces";
import { useAppSelector } from "../../utils/reduxHooks";

export default function FriendList() {
  const users = useAppSelector((state) => state.users.chatters);
  const loading = useAppSelector((state) => state.users.loading);
  const error = useAppSelector((state) => state.users.error);

  if (error) {
    return <p>something wrong happened</p>;
  }
  if (loading) {
    return <p>loading</p>;
  } else
    return (
      <div>
        {users.length === 0 ? (
          <p>No users</p>
        ) : (
          users.map((element: ChatterInterface) => {
            return <FriendBox key={element._id} {...element} />;
          })
        )}
      </div>
    );
}
