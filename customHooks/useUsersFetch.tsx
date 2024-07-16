import { useEffect, useState } from "react";
import { FriendBoxInterface } from "../interfaces/dataInterfaces";
import { useAppSelector } from "../utils/reduxHooks";
import { SERVER_BASE_URL } from "../utils/constants";

interface props {
  currentPath: string;
}

export default function useUsersFetch({ currentPath }: props) {
  const [pageNo, setPageNo] = useState(1);
  const [totalData, setTotalData] = useState(0);
  const currentUser = useAppSelector((state) => state.currentUser);
  // const friendRequests = useAppSelector((state) => state.users.FriendRequests);
  const [users, setUsers] = useState<FriendBoxInterface[]>([]);

  useEffect(() => {
    async function getData() {
      try {
        const apiUrl =
          currentPath === `addFriends`
            ? `users`
            : currentPath === "friendRequests"
            ? `getFriendRequests`
            : currentPath;
        const response = await fetch(
          SERVER_BASE_URL + "/api/" + `${apiUrl}?pageNo=${pageNo}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer" + " " + currentUser.accessToken,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setUsers(data.users);
          setTotalData(data.noOfUsers);
        }
      } catch (error) {
        //console.log(error);
      }
    }
    getData();
  }, []);

  return { users, totalData, setPageNo, pageNo };
}
