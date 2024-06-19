import { Fragment, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useAppSelector } from "../../utils/reduxHooks";
import ChatMessage from "./ChatMessage";
import { useParams } from "react-router-dom";
import useInfiniteScrolling from "../../customHooks/useInfiniteScrolling";
import { SERVER_BASE_URL } from "../../utils/constants";
import {
  ChatsDataInterface,
  MessageInterface,
} from "../../interfaces/dataInterfaces";
import Icon from "./Icon";

export default function ChatMessageArea() {
  const [currentChats, setCurrentChats] = useState<MessageInterface[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const isSeen = useAppSelector((state) => state.chat.isSeen);
  const params = useParams();
  const currentUser = useAppSelector((state) => state.currentUser);
  const secondaryChatter = params.chatterID;
  const [page, setPage] = useState(1);
  const DivRef = useRef<HTMLDivElement>(null);
  const spinnerRef = useRef<HTMLDivElement | null>(null);

  // useEffect(() => {}, []);

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
        console.log(reversedChats);
        if (chats.page === 1) {
          console.log(1);
          setCurrentChats(await reversedChats);
        } else {
          setCurrentChats((state) => [...reversedChats, ...state]);
        }
      } catch (error) {
        setCurrentChats((state) => [...state]);
      } finally {
        setIsLoading(false);
      }
    }
    if (currentUser.accessToken !== "" && secondaryChatter) getChats();
  }, [currentUser, secondaryChatter, page]);

  return (
    <div className="top-14 w-full h-[calc(100vh-120px)] bg-gray-200 flex flex-col-reverse gap-5 px-2 py-10 scroll-smooth overflow-y-auto">
      <div ref={DivRef} className="w-full h-max flex flex-col gap-5">
        {currentChats.map((chat) => {
          return (
            <Fragment key={chat.id}>
              <ChatMessage
                id={chat.id}
                isReceiver={chat.isReceiver}
                message={chat.message}
                time={new Date()}
              />
            </Fragment>
          );
        })}
        {isSeen && (
          <img
            className="self-end text-gray-500 px-2"
            height={12}
            width={12}
          ></img>
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
