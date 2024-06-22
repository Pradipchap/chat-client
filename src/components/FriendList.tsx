import {
  ChatterDetailsInterface,
  ChatterInterface,
} from "../../interfaces/dataInterfaces";
import { useAppDispatch, useAppSelector } from "../../utils/reduxHooks";
import FriendBoxSkeleton from "./FriendBoxSkeleton";
import useInfiniteScrolling from "../../customHooks/useInfiniteScrolling";
import { lazy, startTransition, useEffect, useRef, useState } from "react";
const FriendBox = lazy(() => import("./FriendBox.tsx"));
import Icon from "./Icon";
import { SERVER_BASE_URL } from "../../utils/constants";
import { pushChatters } from "../../redux/slices/UsersSlice";

export default function FriendList() {
  const chatters = useAppSelector((state) => state.users.chatters);
  const accessToken = useAppSelector((state) => state.currentUser.accessToken);
  const loading = useAppSelector((state) => state.users.loading);
  const error = useAppSelector((state) => state.users.error);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [page, setPage] = useState(1);
  const spinnerRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useAppDispatch();

  useInfiniteScrolling(spinnerRef, isLoading, () => {
    setPage((page) => page + 1);
  });

  useEffect(() => {
    async function handleScroll() {
      if (page <= 1) {
        return;
      }
      console.log("first");
      try {
        setIsLoading(true);
        const response = await fetch(`${SERVER_BASE_URL}/api/chatters`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer" + " " + accessToken,
          },
          body: JSON.stringify({ page: page }),
        });
        const results: {
          users: ChatterDetailsInterface[];
        } = await response.json();
        console.log(results.users);
        startTransition(() => {
          dispatch(pushChatters(results.users));
        });
      } finally {
        setIsLoading(false);
      }
    }
    handleScroll();
  }, [page]);

  if (error) {
    return <p>something wrong happened</p>;
  }
  if (loading) {
    return (
      <>
        <FriendBoxSkeleton />
        <FriendBoxSkeleton />
        <FriendBoxSkeleton />
        <FriendBoxSkeleton />
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
        {chatters.length >= 12 && (
          <div
            ref={spinnerRef}
            onClick={() => setPage((page) => page + 1)}
            className="self-center w-max"
          >
            <Icon name="Loading" />
          </div>
        )}
      </div>
    );
}
