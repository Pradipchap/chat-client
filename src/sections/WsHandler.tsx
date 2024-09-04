import { useContext, useEffect } from "react";
import { WsContext } from "../../utils/WsProvider";
import { useAppSelector, useAppDispatch } from "../../utils/reduxHooks";
import useSound from "../../customHooks/useSound";
import MessageTone from "../assets/messageTone.mp3";
import getSocketData from "../../functions/getSocketData";
import { setWsStatus } from "../../redux/slices/wsClientSlice";
import {
  pushChat,
  pushMessage,
  updateChats,
  updateSeenStatus,
} from "../../redux/slices/ChatSlice";
import {
  pushChatters,
  updateLatestMessage,
} from "../../redux/slices/UsersSlice";
import { ChatsDataInterface } from "../../interfaces/dataInterfaces";
import getSecondaryChatter from "../../customHooks/useGetChatter";
import {
  closeCall,
  incomingCall,
  rejectCall,
  setTab,
  startCall,
} from "../../redux/slices/CallSlice";
import setCallSession from "../../functions/setCallSession";

export default function WsHandler() {
  const wsClient = useContext(WsContext);
  const currentUser = useAppSelector((state) => state.currentUser);
  const dispatch = useAppDispatch();
  const [play, pause] = useSound(MessageTone);
  const secondaryChatter = getSecondaryChatter();

  useEffect(
    () => {
      //eslint-disable-next-line
      async function handleMessage(connection: MessageEvent<any>) {
        const { message, details } = await getSocketData(connection.data);
        ////console.log(secondaryChatter);
        ////console.log(primaryChatter);
        //console.log(details.type);
        switch (details.type) {
          case "newUser": {
            ////console.log("new user");
            dispatch(setWsStatus());
            break;
          }
          case "message":
            {
              //console.log(message);
              ////console.log("dispatching");
              //console.log(details.sender + "p " + secondaryChatter);
              if (details.sender === secondaryChatter) {
                ////console.log(message);
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
              //console.log(details.sender);
              dispatch(
                pushChatters({
                  chatterID: details.sender,
                  _id: crypto.randomUUID(),
                  relation: "FRIEND",
                })
              );
              //console.log("ooo");
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
              //console.log(message);
              const chat: ChatsDataInterface = JSON.parse(message);
              //console.log(chat);

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
              dispatch(updateSeenStatus(true));
            }
            break;
          case "callInc":
            {
              //console.log("first");
              console.log(JSON.parse(message));
              dispatch(incomingCall(JSON.parse(message)));
            }
            break;
          case "callTmo":
            {
              //console.log("first");
              //console.log(message);
              dispatch(incomingCall(JSON.parse(message)));
            }
            break;
          case "callRej":
            {
              //console.log("first");
              //console.log(message);
              dispatch(rejectCall());
              setTimeout(() => {
                dispatch(closeCall());
              }, 2000);
            }
            break;
          case "callEnd":
            {
              // deleteCallSession();
              dispatch(closeCall());
            }
            break;
          case "callAcc":
            {
              //console.log("first");
              setCallSession();
              dispatch(startCall());
              const newTab = window.open("/call", "_blank");
              //console.log(newTab);
              dispatch(setTab(newTab));
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
    },
    //eslint-disable-next-line
    [wsClient]
  );
  return null;
}
