import {
  Fragment,
  lazy,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useAppDispatch, useAppSelector } from "../../utils/reduxHooks";
const ChatMessage = lazy(() => import("./ChatMessage"));
import { useParams } from "react-router-dom";
import useInfiniteScrolling from "../../customHooks/useInfiniteScrolling";
import { SERVER_BASE_URL } from "../../utils/constants";
import { ChatsDataInterface } from "../../interfaces/dataInterfaces";
import Icon from "./Icon";
import { updateChats, updateSeenStatus } from "../../redux/slices/ChatSlice";
const ProfilePic = lazy(() => import("./ProfilePic"));

export default function ChatMessageArea() {
  const currentChats = useAppSelector((state) => state.chat.chats);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const isSeen = useAppSelector((state) => state.chat.isSeen);
  const params = useParams();
  const currentUser = useAppSelector((state) => state.currentUser);
  const secondaryChatter = params.chatterID;
  const secondaryChatterImage = useAppSelector(
    (state) => state.chat.secondaryChatterImage
  );
  const [page, setPage] = useState(1);
  const DivRef = useRef<HTMLDivElement>(null);
  const spinnerRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setPage(1);
  }, [secondaryChatter]);

  useInfiniteScrolling(spinnerRef, isLoading, () => {
    setPage((page) => page + 1);
  });

  useLayoutEffect(() => {
    if (DivRef.current) DivRef.current.scrollTop = DivRef.current.scrollHeight;
  }, []);

  useEffect(() => {
    async function getChats() {
      setIsLoading(true);
      try {
        const response = await fetch(`${SERVER_BASE_URL}/api/chats`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer" + " " + currentUser.accessToken,
          },
          body: JSON.stringify({
            requestID: secondaryChatter,
            page,
          }),
        });
        if (!(await response.ok)) {
          throw "";
        }
        const chats: ChatsDataInterface = await response.json();
        if (chats.messages.length === 0) {
          if (spinnerRef.current) spinnerRef.current.hidden = true;
          if (page > 1) return;
        }
        dispatch(updateSeenStatus(chats.seen));
        const finalChats: {
          message: string;
          isReceiver: boolean;
          time: Date;
          id: string;
        }[] = await chats.messages.map((item) => {
          const isReceiver = item.sender !== currentUser.userID;
          return {
            message: item.message,
            isReceiver,
            time: new Date(item.datetime),
            id: item._id,
          };
        });
        const reversedChats = await finalChats.reverse();
        if (chats.page === 1) {
          // setCurrentChats(await reversedChats);
          dispatch(updateChats(await reversedChats));
        } else {
          dispatch(updateChats([...currentChats, ...reversedChats]));
        }
      } finally {
        setIsLoading(false);
      }
    }
    if (currentUser.accessToken !== "" && secondaryChatter) {
      getChats();
    }
  }, [currentUser, secondaryChatter, page]);

  return (
    <div className="top-14 w-full h-[calc(100vh-120px)] flex flex-col-reverse gap-5 px-2 py-10 scroll-smooth overflow-y-auto">
      <div ref={DivRef} className="w-full h-max flex flex-col gap-5">
        {isLoading && page === 1 ? (
          <p></p>
        ) : currentChats.length === 0 && !isLoading ? (
          <p className="text-center">No messages</p>
        ) : (
          currentChats.map((chat) => {
            return (
              <Fragment key={chat.id}>
                <ChatMessage
                  id={chat.id}
                  isReceiver={chat.isReceiver}
                  message={chat.message}
                  time={new Date()}
                  image={secondaryChatterImage}
                />
              </Fragment>
            );
          })
        )}
        {isSeen && !currentChats.at(-1)?.isReceiver && (
          <ProfilePic
            className="self-end text-gray-500 h-4 w-4"
            image={secondaryChatterImage}
          />
        )}
      </div>

      {currentChats.length >= 20 && (
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
