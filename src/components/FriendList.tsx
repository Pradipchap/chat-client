import { ChatterInterface } from "../../interfaces/dataInterfaces";
import FriendBoxSkeleton from "./Skeleton/FriendBoxSkeleton.tsx";
import useInfiniteScrolling from "../../customHooks/useInfiniteScrolling";
import { useGetChatters } from "../../customHooks/queryHooks/useGetChatters.ts";

import { lazy, useRef } from "react";
import { useAppSelector } from "../../utils/reduxHooks.ts";
const FriendBox = lazy(() => import("./FriendBox.tsx"));
const Icon = lazy(() => import("./Icon.tsx"));

export default function FriendList() {
  const spinnerRef = useRef<HTMLDivElement | null>(null);
  const chatters = useAppSelector(state => state.users.chatters);
  const { isPending, setPage, error } = useGetChatters();
  useInfiniteScrolling(spinnerRef, isPending, () => {
    setPage(page => page + 1);
  });

  if (error) {
    return <p>something wrong happened {error.message}</p>;
  }
  if (isPending) {
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
        {chatters?.length === 0 ? (
          <p className="w-full text-center">No users</p>
        ) : (
          chatters?.map((element: ChatterInterface) => {
            return <FriendBox key={element._id} {...element} />;
          })
        )}
        {chatters?.length >= 12 && (
          <div ref={spinnerRef} onClick={() => setPage(page => page + 1)} className="self-center w-max">
            <Icon name="Loading" />
          </div>
        )}
      </div>
    );
}
