import { useEffect, useState } from "react";
import { FriendBoxInterface } from "../interfaces/dataInterfaces";
import { useAppSelector } from "../utils/reduxHooks";
import { SERVER_BASE_URL } from "../utils/constants";

interface props {
  currentPath: string;
}

export default function useUsersFetch({ currentPath }: props) {
  const [pageNo, setPageNo] = useState(1);
  const [loading, setLoading] = useState(false);
  const currentUser = useAppSelector((state) => state.currentUser);
  const [result, setResult] = useState<{
    users: FriendBoxInterface[];
    noOfUsers: number;
  } | null>(null);

  useEffect(() => {
    async function getData() {
      setLoading(true);
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
          setResult(data);
        }
      } catch (error) {
        //console.log(error);
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, []);

  return { result, loading, setPageNo, pageNo };
}
