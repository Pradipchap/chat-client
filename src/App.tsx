import "./App.css";
import Toast from "./components/Toast";
import Login from "./sections/Login.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./sections/Signup.tsx";
import AuthenticatedRoute from "./AuthenticatedRoute.tsx";
import { lazy, Suspense, useContext, useEffect } from "react";
import Friends from "./sections/Friends.tsx";
import FriendsGroup from "./sections/FriendsGroup.tsx";
import Loading from "./components/Loading.tsx";
import UserProfile from "./sections/UserProfile.tsx";
import { SERVER_BASE_URL } from "../utils/constants.ts";
import { useAppDispatch, useAppSelector } from "../utils/reduxHooks.ts";
import Chat from "./components/ChatBox.tsx";
import getSocketData from "../functions/getSocketData.ts";
import { setWsStatus } from "../redux/slices/wsClientSlice.ts";
import { WsContext } from "../utils/WsProvider.tsx";

import {
  pushChat,
  pushMessage,
  updateChats,
} from "../redux/slices/ChatSlice.ts";
import { ChatsDataInterface } from "../interfaces/dataInterfaces.ts";
import { updateLatestMessage } from "../redux/slices/UsersSlice.ts";

const AddFriends = lazy(async () => import(".//sections/AddFriends.tsx"));
const FriendRequests = lazy(async () =>
  import("./sections/FriendRequests.tsx")
);
import useSound from "../customHooks/useSound.ts";
import MessageTone from "./assets/messageTone.mp3";

function App() {
  const wsClient = useContext(WsContext);
  const currentUser = useAppSelector((state) => state.currentUser);
  const secondaryChatter = useAppSelector(
    (state) => state.chat.secondaryChatter
  );
  const dispatch = useAppDispatch();
  const [play, pause] = useSound(MessageTone);

  useEffect(() => {
    //eslint-disable-next-line
    async function handleMessage(connection: MessageEvent<any>) {
      const { message, details } = await getSocketData(connection.data);
      //console.log(secondaryChatter);
      //console.log(primaryChatter);
      switch (details.type) {
        case "newUser": {
          //console.log("new user");
          dispatch(setWsStatus());
          break;
        }
        case "message":
          {
            //console.log(message);
            //console.log("dispatching");
            //console.log(details.sender + " " + secondaryChatter);
            if (details.sender === secondaryChatter) {
              //console.log(message);
              //console.log("dispatching");
              dispatch(pushMessage([{ message: message, isReceiver: true }]));
            } else {
              if (typeof play !== "boolean") {
                play();
              }
              if (typeof pause !== "boolean") {
                pause();
              }
            }
            dispatch(
              updateLatestMessage({
                message,
                messagerID: details.sender,
                datetime: new Date().toString(),
              })
            );
          }
          break;
        case "getMess":
          {
            const chat: ChatsDataInterface = JSON.parse(message);
            console.log(chat.seen);
            const finalChats = chat.messages.map((item) => {
              const isReceiver = item.sender !== currentUser.userID;
              return {
                message: item.message,
                isReceiver,
                time: new Date(item.datetime),
                id: item._id,
              };
            });
            const reversedChats = finalChats.reverse();
            //console.log(reversedChats);
            if (chat.page === 1) dispatch(updateChats(reversedChats));
            else dispatch(pushChat(reversedChats));
          }
          break;
        case "msgSeen":
          {
            //console.log("msg seen");
          }
          break;
        default: {
          return;
        }
      }
    }
    if (wsClient instanceof WebSocket)
      wsClient.addEventListener("message", handleMessage);
    return () => {
      if (wsClient instanceof WebSocket) {
        wsClient.removeEventListener("message", handleMessage);
      }
    };
  }, [wsClient, secondaryChatter]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <AuthenticatedRoute />,
      children: [
        {
          path: "chat/:chatterID",
          element: <Chat />,
          // loader: async ({ request, params }) => {
          //   if (wsClient.readyState === 1 && params.chatterID !== ""){
          //     //console.log("hello")
          //     sendSocketMessage({
          //       sender: currentUser.userID,
          //       receiver: params.chatterID || "",
          //       type: "getMess",
          //       data: new Blob([JSON.stringify({ page: 1 })]),
          //       wsClient: wsClient,
          //     });
          //   }
          //   return null;
          // },
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    { path: "/register", element: <Signup /> },
    {
      path: "/friends",
      element: <Friends />,
      children: [
        {
          path: "friends",
          element: <FriendsGroup />,
        },
        {
          path: "addFriends",
          element: (
            <Suspense fallback={<Loading />}>
              <AddFriends />
            </Suspense>
          ),
        },
        {
          path: "friendRequests",
          element: (
            <Suspense fallback={<Loading />}>
              <FriendRequests />
            </Suspense>
          ),
        },
        {
          path: "userProfile/:userID",
          element: <UserProfile />,
          loader: async ({ request, params }) => {
            return fetch(
              `${SERVER_BASE_URL}/api/user?userID=${params.userID}`,
              {
                method: "POST",
                headers: {
                  Authorization: `Bearer ${currentUser.accessToken}`,
                },
                signal: request.signal,
              }
            );
          },
        },
      ],
    },
  ]);
  return (
    <>
      <Toast />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
