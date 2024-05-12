import { useAppSelector } from "../../utils/reduxHooks";
import UserCard from "../components/UserCard";

export default function FriendsGroup() {
  const friends = useAppSelector((state) => state.users.Friends);
  return (
    <div className="flex gap-5 p-2">
      {friends.length > 0 &&
        friends[0] !== null &&
        friends.map(( user ) => {
          return (
            <UserCard
              username={user.username}
              email={user.email}
              userID={user._id}
            />
          );
        })}
    </div>
  );
}
